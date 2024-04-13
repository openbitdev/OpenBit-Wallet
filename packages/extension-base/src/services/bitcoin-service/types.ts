// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

export interface BitcoinApiRequest<T> {
  id: number,
  retry: number, // retry < 1 not start, retry === 0 start, retry > 0 number of retry
  status: 'pending' | 'running',
  run: () => Promise<any>;
  resolve: (value: any) => T;
  reject: (error?: any) => void;
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

interface A {
  freeBalance: string;
  address: string;
}

export interface RunesResponse {
  statusCode: number;
  data: RunesFetchedData
}

interface RunesFetchedData {
  limit: number,
  offset: number,
  total: number,
  runes: Rune[]
}

export interface Rune {
  amount: string,
  amount_decimal: string,
  address: string,
  rune: {
    rune_id: string,
    rune: string,
    divisibility: number,
    symbol: string
  }
}

export interface BitcoinTransferItem {
  txid: string;
  version: number;
  locktime: number;
  vin: {
    txid: string;
    vout: number;
    prevout: {
      scriptpubkey: string;
      scriptpubkey_asm: string;
      scriptpubkey_type: string;
      scriptpubkey_address: string;
      value: number;
    };
    scriptsig: string;
    scriptsig_asm: string;
    witness: string[];
    is_coinbase: boolean;
    sequence: number;
  }[];
  vout: {
    scriptpubkey: string;
    scriptpubkey_asm: string;
    scriptpubkey_type: string;
    scriptpubkey_address: string;
    value: number;
  }[];
  size: number;
  weight: number;
  fee: string;
  status: {
    confirmed: boolean;
    block_height: number;
    block_hash: string;
    block_time: number;
  }
}

export interface TransfersListResponse {
  count?: number,
  transfers: null | BitcoinTransferItem[]
}

export type RequestBlockRange = {
  from: number | null,
  to: number | null
}
