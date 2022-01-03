import BigN from "bignumber.js";

export type AccountInfoByChain = {
  totalBalance: string
  freeBalance: string
  frozenFee: string
  reservedBalance: string
  frozenMisc: string
}

export type AccountInfoItem = {
  network: string;
  tokenDecimals: number[];
  tokenSymbol: string[];
  info: Record<string, AccountInfoByChain>;
}

export type Info = {
  ss58Format: number
  tokenDecimals?: number[]
  tokenSymbol: string[]
  icon: string
  name: string
}

export type ChainInfo = {
  [key: string]: Info
}

export type BalanceSubInfo = {
  key: string;
  label: string;
  symbol: string;
  totalValue: BigN;
  balanceValue: BigN;
}

export type AccountInfoByNetwork = {
  key: string;
  networkName: string;
  networkDisplayName: string;
  networkPrefix: number;
  networkLogo: string;
  networkIconTheme: string;
  address: string;
}

export type BalanceInfo = {
  symbol: string;
  totalValue: BigN;
  balanceValue: BigN;
  detailBalances: BalanceSubInfo[];
  childrenBalances: BalanceSubInfo[];
}
