// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

export interface BTCRequest<T> {
  id: number,
  retry: number, // retry < 1 not start, retry === 0 start, retry > 0 number of retry
  status: 'pending' | 'running',
  run: () => Promise<any>;
  resolve: (value: any) => T;
  reject: (error?: any) => void;
}

export interface BTCResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface AccountBalances {
  txid: string;
  vout: string;
  status: {
    confirmed: boolean;
    block_height: string;
    block_hash: string;
    block_time: string;
  };
  value: string;
}

export interface AddressBalances {
  txid: string;
  vout: string;
  status: {
    confirmed: boolean;
    block_height: string;
    block_hash: string;
    block_time: string;
  };
  value: string;
}
export interface TransferItemBitCoin {
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
  transfers: null | TransferItemBitCoin[]
}


export type RequestBlockRange = {
  from: number | null,
  to: number | null
}
