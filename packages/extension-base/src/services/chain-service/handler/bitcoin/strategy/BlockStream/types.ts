// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

export interface BlockStreamBlock {
  id: string;
  height: number;
  version: number;
  timestamp: number;
  tx_count: number;
  size: number;
  weight: number;
  merkle_root: string;
  previousblockhash: string;
  mediantime: number;
  nonce: number;
  bits: number;
  difficulty: number;
}

export interface BitcoinAddressSummaryInfo {
  address: string,
  chain_stats: {
    funded_txo_count: number,
    funded_txo_sum: number,
    spent_txo_count: number,
    spent_txo_sum: number,
    tx_count: number
  },
  mempool_stats: {
    funded_txo_count: number,
    funded_txo_sum: number,
    spent_txo_count: number,
    spent_txo_sum: number,
    tx_count: number
  }
}

// todo: combine RunesByAddressResponse & RunesCollectionInfoResponse

export interface RunesInfoByAddressResponse {
  statusCode: number,
  data: RunesInfoByAddressFetchedData
}

interface RunesInfoByAddressFetchedData {
  limit: number,
  offset: number,
  total: number,
  runes: RunesInfoByAddress[]
}

// todo: check is_hot and turbo and cenotaph attributes meaning in RuneInfoByAddress

export interface RunesInfoByAddress {
  amount: string,
  address: string,
  rune_id: string,
  rune: {
    rune: string,
    rune_name: string,
    divisibility: number,
    premine: string,
    spacers: string,
    symbol: string
  }
}

export interface RunesCollectionInfoResponse {
  statusCode: number,
  data: RunesCollectionInfoFetchedData
}

interface RunesCollectionInfoFetchedData {
  limit: number,
  offset: number,
  total: number,
  runes: RunesCollectionInfo[]
}

export interface RunesCollectionInfo {
  rune_id: string,
  rune: string,
  rune_name: string,
  divisibility: string,
  spacers: string
}

export interface RuneTxsResponse {
  statusCode: number,
  data: RuneTxsFetchedData
}

interface RuneTxsFetchedData {
  limit: number,
  offset: number,
  total: number,
  transactions: RuneTxs[]
}

export interface RuneTxs {
  txid: string,
  vout: RuneTxsUtxosVout[]
}

interface RuneTxsUtxosVout {
  n: number,
  value: number,
  runeInject: any
}

export interface Brc20MetadataFetchedData {
  token: Brc20Metadata
}

export interface Brc20Metadata {
  ticker: string,
  decimals: number
}

export interface Brc20BalanceFetchedData {
  limit: number,
  offset: number,
  total: number,
  results: Brc20Balance[]
}

export interface Brc20Balance {
  ticker: string,
  available_balance: string,
  transferrable_balance: string,
  overall_balance: string
}

export interface Brc20BalanceItem {
  free: string,
  locked: string
}

export interface InscriptionFetchedData {
  limit: number,
  offset: number,
  total: number,
  results: Inscription[]
}

export interface Inscription {
  id: string;
  number: number;
  address: string;
  genesis_block_height: number;
  genesis_block_hash: string;
  genesis_timestamp: number;
  tx_id: string;
  location: string;
  output: string;
  value: string;
  offset: string;
  fee: number;
  sat_ordinal: string;
  sat_rarity: string;
  content_type: string;
  content_length: number;
  // content: any
}

export interface BlockStreamUtxo {
  txid: string;
  vout: number;
  status: {
    confirmed: boolean;
    block_height?: number;
    block_hash: string;
    block_time?: number;
  },
  value: number;
}

export interface BlockStreamTransactionStatus {
  confirmed: boolean;
  block_height: number;
  block_hash: string;
  block_time: number;
}

export interface BlockStreamFeeEstimates {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
  10: number;
  11: number;
  12: number;
  13: number;
  14: number;
  15: number;
  16: number;
  17: number;
  18: number;
  19: number;
  20: number;
  21: number;
  22: number;
  23: number;
  24: number;
  25: number;
  144: number;
  504: number;
  1008: number;
}
