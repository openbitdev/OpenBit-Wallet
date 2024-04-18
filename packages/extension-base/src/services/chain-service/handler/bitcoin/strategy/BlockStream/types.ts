// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

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

export interface RunesByAddressResponse {
  statusCode: number;
  data: RunesByAddressFetchedData
}

interface RunesByAddressFetchedData {
  limit: number,
  offset: number,
  total: number,
  runes: RuneInfoByAddress[]
}

export interface RuneInfoByAddress {
  amount: string,
  amount_decimal: string,
  address: string,
  rune_id: string,
  rune: {
    rune_id: string,
    rune: string,
    divisibility: number,
    symbol: string
  }
}

export interface RunesCollectionInfoResponse {
  statusCode: number;
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
