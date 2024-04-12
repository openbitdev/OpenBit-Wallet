// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

export interface BlockCypherTransactionError {
  error: string;
}

export interface BlockCypherTransactionCreateRequest {
  inputs: BlockCypherTransactionInput[];
  outputs: BlockCypherTransactionOutput[];
}

export interface BlockCypherTransactionInput {
  addresses: string[];
  prev_hash: string;
  value: number;
  script: string;
  script_type: string;
  output_index: number;
  output_value: number;
}

export interface BlockCypherTransactionOutput {
  value: number;
  script: string;
  addresses: string[];
  script_type: string;
}

export interface BlockCypherTransactionCreateResponse {
  errors: BlockCypherTransactionError[],
  tx: {
    block_height: number;
    block_index: number;
    hash: string;
    addresses: string[];
    total: number;
    fees: number;
    size: number;
    vsize: number;
    preference: 'low' | 'height';
    relayed_by: string;
    received: string;
    ver: number;
    double_spend: boolean;
    vin_sz: number;
    vout_sz: number;
    confirmations: number;
    inputs: BlockCypherTransactionInput[];
    outputs: BlockCypherTransactionOutput[];
  }
}
