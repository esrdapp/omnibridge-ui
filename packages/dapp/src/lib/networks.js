import {
  HPB_ETHEREUM_BRIDGE,
  HPB_BSC_BRIDGE,
  HPB_GNOSIS_BRIDGE,
  nativeCurrencies,
} from 'lib/constants';

export {
  HPB_ETHEREUM_BRIDGE,
  HPB_BSC_BRIDGE,
  HPB_GNOSIS_BRIDGE,
};

const HPB_ETHEREUM_BRIDGE_CONFIG = {
  label: 'hpb⥊eth',
  homeChainId: 269,
  foreignChainId: 1,
  enableReversedBridge: true,
  enableForeignCurrencyBridge: true,
  foreignMediatorAddress:
    '0x0000000'.toLowerCase(),
  homeMediatorAddress:
    '0x0000000'.toLowerCase(),
  foreignAmbAddress: '0x0000000'.toLowerCase(),
  homeAmbAddress: '0x0000000'.toLowerCase(),
  foreignGraphName: 'hpbridge/ethereum-hpbridge',
  homeGraphName: 'hpbridge/hpb-hpbridge',
  ambLiveMonitorPrefix: 'https://URL',
  claimDisabled: false,
  tokensClaimDisabled: [],
};

const HPB_BSC_BRIDGE_CONFIG = {
  label: 'hpb⥊bsc',
  homeChainId: 269,
  foreignChainId: 1,
  enableReversedBridge: true,
  enableForeignCurrencyBridge: true,
  foreignMediatorAddress:
    '0x0000000'.toLowerCase(),
  homeMediatorAddress:
    '0x0000000'.toLowerCase(),
  foreignAmbAddress: '0x0000000'.toLowerCase(),
  homeAmbAddress: '0x0000000'.toLowerCase(),
  foreignGraphName: 'hpbridge/bsc-hpbridge',
  homeGraphName: 'hpbridge/hpb-hpbridge',
  ambLiveMonitorPrefix: 'https://URL',
  claimDisabled: false,
  tokensClaimDisabled: [],
};

const HPB_GNOSIS_BRIDGE_CONFIG = {
  label: 'hpb⥊gno',
  homeChainId: 269,
  foreignChainId: 1,
  enableReversedBridge: true,
  enableForeignCurrencyBridge: true,
  foreignMediatorAddress:
    '0x0000000'.toLowerCase(),
  homeMediatorAddress:
    '0x0000000'.toLowerCase(),
  foreignAmbAddress: '0x0000000'.toLowerCase(),
  homeAmbAddress: '0x0000000'.toLowerCase(),
  foreignGraphName: 'hpbridge/gnosis-hpbridge',
  homeGraphName: 'hpbridge/hpb-hpbridge',
  ambLiveMonitorPrefix: 'https://URL',
  claimDisabled: false,
  tokensClaimDisabled: [],
};


const ENABLED_BRIDGES = process.env.REACT_APP_ENABLED_BRIDGES.split(' ').map(
  b => b.toLowerCase(),
);

const bridgeInfo = {
  [HPB_ETHEREUM_BRIDGE]: HPB_ETHEREUM_BRIDGE_CONFIG,
  [HPB_BSC_BRIDGE]: HPB_BSC_BRIDGE_CONFIG,
  [HPB_GNOSIS_BRIDGE]: HPB_GNOSIS_BRIDGE_CONFIG,
};

const getNetworkConfig = bridges => {
  if (bridges && bridges.length > 0 && bridgeInfo) {
    return bridges.reduce((t, b) => ({ ...t, [b]: bridgeInfo[b] }), {});
  }
  return bridgeInfo;
};

export const networks = getNetworkConfig(ENABLED_BRIDGES);

export const defaultTokens = {
  [HPB_ETHEREUM_BRIDGE]: {
    269: {
      address: '0x0000000000',
      chainId: 269,
      symbol: 'WETH',
      name: 'Wrapped ETH from Ethereum',
    },
    1: {
      address: '0x0000000000',
      chainId: 1,
      symbol: 'WETH',
      name: 'Wrapped ETH',
    },
  },
  [HPB_BSC_BRIDGE]: {
    269: {
      address: '0x0000000000',
      chainId: 269,
      symbol: 'WBNB',
      name: 'Wrapped BNB from BSC',
    },
    1: {
      address: '0x0000000000',
      chainId: 56,
      symbol: 'WBNB',
      name: 'Wrapped BNB',
    },
  },
  [HPB_GNO_BRIDGE]: {
    269: {
      address: '0x0000000000',
      chainId: 269,
      symbol: 'WXDAI',
      name: 'Wrapped XDAI from Gnosis',
    },
    1: {
      address: '0x0000000000',
      chainId: 100,
      symbol: 'WXDAI',
      name: 'Wrapped XDAI',
    },
  },
};
