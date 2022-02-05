import { BigNumber } from 'ethers';

export const HPB_ETH_BRIDGE = 'hpb-eth';
export const HPB_BSC_BRIDGE = 'hpb-bnb';
export const HPB_GNO_BRIDGE = 'hpb-xdai';


export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';
export const ETHER_CURRENCY_LOGO =
  'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png';
export const BNB_CURRENCY_LOGO =
  'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png';
export const XDAI_CURRENCY_LOGO =
  'https://s2.coinmarketcap.com/static/img/coins/64x64/8635.png';

export const LARGEST_UINT256 = BigNumber.from(
  '115792089237316195423570985008687907853269984665640564039457584007913129639935',
);

export const POLLING_INTERVAL =
  process.env.REACT_APP_UI_STATUS_UPDATE_INTERVAL || 5000;

export const DEFAULT_BRIDGE_DIRECTION =
  process.env.REACT_APP_DEFAULT_BRIDGE_DIRECTION || ETH_XDAI_BRIDGE;

export const COINZILLA_API_KEY =
  process.env.REACT_APP_COINZILLA_API_KEY || null;

export const NON_ETH_CHAIN_IDS = [56, 100, 269];

export const HPB_CHAIN_IDS = [269];

export const nativeCurrencies = {
  1: {
    chainId: 1,
    decimals: 18,
    logoURI: ETHER_CURRENCY_LOGO,
    address: ADDRESS_ZERO,
    name: 'Ether',
    symbol: 'ETH',
    mode: 'NATIVE',
    homeTokenAddress:
      '0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1'.toLowerCase(),
  },

  56: {
    chainId: 56,
    decimals: 18,
    logoURI: BNB_CURRENCY_LOGO,
    name: 'Binance Coin',
    address: ADDRESS_ZERO,
    symbol: 'BNB',
    mode: 'NATIVE',
    homeTokenAddress:
      '0xCa8d20f3e0144a72C6B5d576e9Bd3Fd8557E2B04'.toLowerCase(),
  },
  
  100: {
    chainId: 100,
    decimals: 18,
    logoURI: XDAI_CURRENCY_LOGO,
    name: 'XDAI',
    address: ADDRESS_ZERO,
    symbol: 'XDAI',
    mode: 'NATIVE',
    homeTokenAddress:
      '0x9fe3864F9Ae7cfb5668Dae90C0e20c4C3D437664'.toLowerCase(),
  },
  
    269: {
    chainId: 269,
    decimals: 18,
    logoURI: HPB_CURRENCY_LOGO,
    name: 'HPB',
    address: ADDRESS_ZERO,
    symbol: 'HPB',
    mode: 'NATIVE',
    homeTokenAddress:
      '0x9fe3864F9Ae7cfb5668Dae90C0e20c4C3D437664'.toLowerCase(),
  },
  
  
  
};

export const nativeCurrencyMediators = {
  1: '0x000000000'.toLowerCase(),
  56: '0x000000000'.toLowerCase(),
  100: '0x000000000'.toLowerCase(),
  269: '0x000000000'.toLowerCase(),
};

export const networkNames = {
  1: 'Ethereum',
  56: 'Binance Smart Chain',
  100: 'Gnosis Chain',
  269: 'HPB',
};

export const networkLabels = {
  1: 'Ethereum',
  56: 'BSC',
  100: 'Gnosis Chain',
  269: 'HPB',
};

export const networkCurrencies = {
  1: {
    name: 'Ethereum',
    symbol: 'ETH',
  },
  56: {
    name: 'Binance Coin',
    symbol: 'BNB',
  },
  100: {
    name: 'xDai',
    symbol: 'xDai',
  },
  269: {
    name: 'HPB',
    symbol: 'HPB',
  },
};

const {
  REACT_APP_ETHEREUM_RPC_URL,
  REACT_APP_BSC_RPC_URL,
  REACT_APP_GNOSIS_RPC_URL,
  REACT_APP_HPB_RPC_URL,
} = process.env;

export const chainUrls = {
  1: {
    rpc: REACT_APP_ETHEREUM_RPC_URL.split(' '),
    explorer: 'https://blockscout.com/eth/mainnet',
    chainId: 1,
    name: networkNames[1],
  },
  56: {
    rpc: REACT_APP_BSC_RPC_URL.split(' '),
    explorer: 'https://bscscan.com',
    chainId: 56,
    name: networkNames[56],
  },
  100: {
    rpc: REACT_APP_GNOSIS_RPC_URL.split(' '),
    explorer: 'https://blockscout.com/xdai/mainnet',
    chainId: 100,
    name: networkNames[100],
  },
  269: {
    rpc: REACT_APP_HPB_RPC_URL.split(' '),
    explorer: 'https://hscan.org',
    chainId: 269,
    name: networkNames[269],
  },
};

export const defaultTokensUrl = {
  1: 'https://tokens.uniswap.org',
  56: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/tokenlist.json',
  100: 'https://tokens.honeyswap.org',
  269: 'https://dex.hpbnode.com/download/hpdex.tokenlist.json',
};

export const GRAPH_HEALTH_ENDPOINT = 'http://localhost:8030/graphql';

export const LOCAL_STORAGE_KEYS = {
  DONT_SHOW_CLAIMS: 'dont-show-claims',
  ETHEREUM_RPC_URL: 'ethereum-rpc-url',
  BSC_RPC_URL: 'bsc-rpc-url',
  GNOSIS_RPC_URL: 'gnosis-rpc-url',
  HPB_RPC_URL: 'hpb-rpc-url',
  NEVER_SHOW_CLAIMS: 'never-show-claims',
  INFINITE_UNLOCK: 'infinite-unlock',
  CUSTOM_TOKENS: 'customTokens',
  DISABLE_BALANCE_WHILE_TOKEN_FETCH: 'disable-balance-while-token-fetch',
  BRIDGE_DIRECTION: 'bridge-direction',
};
