import { useToast } from '@chakra-ui/react';
import { useWeb3Context } from 'contexts/Web3Context';
import { BigNumber } from 'ethers';
import { useApproval } from 'hooks/useApproval';
import { useCurrentDay } from 'hooks/useCurrentDay';
import { useFeeType } from 'hooks/useFeeType';
import { useRewardAddress } from 'hooks/useRewardAddress';
import { useTotalConfirms } from 'hooks/useTotalConfirms';
import {
  fetchToAmount,
  fetchTokenLimits,
  fetchToToken,
  transferTokens,
} from 'lib/bridge';
import { ADDRESS_ZERO } from 'lib/constants';
import {
  fetchQueryParams,
  getBridgeNetwork,
  getDefaultToken,
  isxDaiChain,
  logError,
  parseValue,
} from 'lib/helpers';
import { fetchTokenDetails } from 'lib/token';
import React, { useCallback, useEffect, useState } from 'react';

export const BridgeContext = React.createContext({});

export const BridgeProvider = ({ children }) => {
  const { ethersProvider, account, providerChainId } = useWeb3Context();

  const [receiver, setReceiver] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [{ fromToken, toToken }, setTokens] = useState({});
  const [{ fromAmount, toAmount }, setAmounts] = useState({
    fromAmount: BigNumber.from(0),
    toAmount: BigNumber.from(0),
  });
  const [isTokenInjected, setIsTokenInjected] = useState({
    status: false,
    token: null,
  });
  const [toAmountLoading, setToAmountLoading] = useState(false);
  const [queryTrigger, setQueryTrigger] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateBalance, setUpdateBalance] = useState(false);
  const [fromBalance, setFromBalance] = useState(BigNumber.from(0));
  const [toBalance, setToBalance] = useState(BigNumber.from(0));
  const [txHash, setTxHash] = useState();
  const [tokenLimits, setTokenLimits] = useState();

  const toast = useToast();
  const totalConfirms = useTotalConfirms();
  const isRewardAddress = useRewardAddress();
  const currentDay = useCurrentDay();
  const { homeToForeignFeeType, foreignToHomeFeeType } = useFeeType();
  const {
    allowed,
    updateAllowance,
    unlockLoading,
    approvalTxHash,
    approve,
  } = useApproval(fromToken, fromAmount);

  const setAmount = useCallback(
    async inputAmount => {
      if (!fromToken || !toToken) return;
      setToAmountLoading(true);
      const amount = parseValue(inputAmount, fromToken.decimals);
      const isxDai = isxDaiChain(providerChainId);
      const feeType = !isxDai ? foreignToHomeFeeType : homeToForeignFeeType;
      const gotToAmount = await fetchToAmount(
        isRewardAddress,
        feeType,
        fromToken,
        toToken,
        amount,
      );
      setAmounts({ fromAmount: amount, toAmount: gotToAmount });
      setToAmountLoading(false);
    },
    [
      fromToken,
      toToken,
      providerChainId,
      isRewardAddress,
      homeToForeignFeeType,
      foreignToHomeFeeType,
    ],
  );

  const setToken = useCallback(
    async tokenWithoutMode => {
      const isCustomTokenPresent = !queryTrigger && isTokenInjected.status;
      try {
        const [token, gotToToken] = await Promise.all([
          fetchTokenDetails(tokenWithoutMode),
          fetchToToken(tokenWithoutMode),
        ]);
        setTokens({ fromToken: token, toToken: gotToToken });
        return true;
      } catch (tokenDetailsError) {
        toast({
          title: 'Error',
          description: !isCustomTokenPresent
            ? 'Cannot fetch token details. Wait for a few minutes and reload the application'
            : 'Token not found.',
          status: 'error',
          duration: isCustomTokenPresent ? 2000 : null,
          isClosable: !isCustomTokenPresent,
        });
        logError({ tokenDetailsError });
        return false;
      }
    },
    [toast, isTokenInjected.status, queryTrigger],
  );

  const transfer = useCallback(async () => {
    setLoading(true);
    try {
      const tx = await transferTokens(
        ethersProvider,
        fromToken,
        receiver || account,
        fromAmount,
      );
      setTxHash(tx.hash);
    } catch (transferError) {
      setLoading(false);
      logError({
        transferError,
        fromToken,
        receiver: receiver || account,
        fromAmount: fromAmount.toString(),
        account,
      });
    }
  }, [fromToken, account, receiver, ethersProvider, fromAmount]);

  const setDefaultToken = useCallback(
    chainId => {
      if (
        fromToken &&
        toToken &&
        toToken.chainId === chainId &&
        toToken.address !== ADDRESS_ZERO
      ) {
        setTokens({ fromToken: toToken, toToken: fromToken });
      } else if (!fromToken || fromToken.chainId !== chainId) {
        setToken(getDefaultToken(chainId));
      }
    },
    [setToken, fromToken, toToken],
  );

  const checkForCustomToken = useCallback(async () => {
    const { token: address, status } = isTokenInjected;
    if (!status) {
      setDefaultToken(providerChainId);
    } else if (!fromToken || !toToken) {
      const isCustomTokenSet = await setToken({
        chainId: providerChainId,
        address,
      });
      !isCustomTokenSet && setDefaultToken(providerChainId);
    }
    setLoading(false);
  }, [
    isTokenInjected,
    providerChainId,
    setDefaultToken,
    setToken,
    fromToken,
    toToken,
  ]);

  useEffect(() => {
    setQueryTrigger(true);
    const queryParams = fetchQueryParams();
    setUpdateBalance(t => !t);
    setIsTokenInjected({
      status: !!queryParams,
      token: queryParams?.token || null,
    });
    setQueryTrigger(false);
  }, []);

  useEffect(() => {
    queryTrigger !== null && checkForCustomToken();
  }, [queryTrigger, checkForCustomToken]);

  const updateTokenLimits = useCallback(async () => {
    if (
      providerChainId &&
      fromToken &&
      fromToken.chainId === providerChainId &&
      toToken &&
      toToken.chainId === getBridgeNetwork(providerChainId) &&
      ethersProvider &&
      fromToken.symbol === toToken.symbol &&
      currentDay
    ) {
      const limits = await fetchTokenLimits(
        ethersProvider,
        fromToken,
        toToken,
        currentDay,
      );
      setTokenLimits(limits);
    }
  }, [fromToken, toToken, currentDay, providerChainId, ethersProvider]);

  useEffect(() => {
    updateTokenLimits();
  }, [updateTokenLimits]);

  useEffect(() => {
    setUpdateBalance(t => !t);
  }, [txHash]);

  return (
    <BridgeContext.Provider
      value={{
        fromAmount,
        toAmount,
        toAmountLoading,
        setAmount,
        fromToken,
        toToken,
        setToken,
        setDefaultToken,
        isTokenInjected,
        setIsTokenInjected,
        allowed,
        approve,
        transfer,
        loading,
        setLoading,
        txHash,
        setTxHash,
        totalConfirms,
        amountInput,
        setAmountInput,
        fromBalance,
        setFromBalance,
        toBalance,
        setToBalance,
        tokenLimits,
        updateTokenLimits,
        updateAllowance,
        receiver,
        setReceiver,
        updateBalance,
        setUpdateBalance,
        unlockLoading,

        approvalTxHash,
      }}
    >
      {children}
    </BridgeContext.Provider>
  );
};
