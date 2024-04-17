// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

// https://github.com/leather-wallet/extension/blob/dev/src/app/query/bitcoin/bitcoin-client.ts
export interface UtxoResponseItem {
  txid: string;
  vout: number;
  status: {
    confirmed: boolean;
    block_height?: number;
    block_hash?: string;
    block_time?: number;
  };
  value: number;
}

// https://github.com/leather-wallet/extension/blob/dev/src/app/common/transactions/bitcoin/coinselect/local-coin-selection.ts
export interface DetermineUtxosForSpendArgs {
  sender: string;
  amount: number;
  feeRate: number;
  recipient: string;
  utxos: UtxoResponseItem[];
}

// https://github.com/leather-wallet/extension/blob/dev/src/app/common/transactions/bitcoin/coinselect/local-coin-selection.ts
export class InsufficientFundsError extends Error {
  constructor () {
    super('Insufficient funds');
  }
}
