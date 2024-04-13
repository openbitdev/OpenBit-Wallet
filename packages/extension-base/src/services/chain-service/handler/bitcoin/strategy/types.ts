// Copyright 2019-2022 @subwallet/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BitcoinAddressSummaryInfo, BitcoinTransferItem, Rune } from '@subwallet/extension-base/services/bitcoin-service/types';
import { TransactionEventResponse } from '@subwallet/extension-base/services/transaction-service/types';
import { ApiRequestStrategy } from '@subwallet/extension-base/strategy/api-request-strategy/types';
import EventEmitter from 'eventemitter3';

export interface BitcoinApiStrategy extends Omit<ApiRequestStrategy, 'addRequest'> {
  getAddressSummaryInfo (address: string): Promise<BitcoinAddressSummaryInfo>;
  getRunes (address: string): Promise<Rune[]>;
  getAddressTransaction (address: string, limit?: number): Promise<BitcoinTransferItem[]>;
  sendRawTransaction (rawTransaction: string): EventEmitter<BitcoinTransactionEventMap>;
}

export interface BitcoinTransactionEventMap {
  extrinsicHash: (response: TransactionEventResponse) => void;
  error: (response: TransactionEventResponse) => void;
  success: (response: TransactionEventResponse) => void;
}
