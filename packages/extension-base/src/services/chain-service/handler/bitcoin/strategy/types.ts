// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { ApiRequestStrategy } from '@subwallet/extension-base/strategy/api-request-strategy/types';
import EventEmitter from 'eventemitter3';

import { BitcoinAddressSummaryInfo, BitcoinTransferItem } from './BlockStream/types';

export interface BitcoinFeeRate {
  feeRate: number;
}

export interface BitcoinFeeInfo {
  type: 'bitcoin';
  options: {
    slow: BitcoinFeeRate;
    average: BitcoinFeeRate;
    fast: BitcoinFeeRate;
  }
}

export interface BitcoinApiStrategy extends Omit<ApiRequestStrategy, 'addRequest'> {
  getAddressSummaryInfo (address: string): Promise<BitcoinAddressSummaryInfo>;
  getAddressTransaction (address: string, limit?: number): Promise<BitcoinTransferItem[]>;
  getTransactionStatus (txHash: string): Promise<boolean>;
  getFeeRate (): Promise<BitcoinFeeInfo>;
  sendRawTransaction (rawTransaction: string): EventEmitter<BitcoinTransactionEventMap>;
}

export interface BitcoinTransactionEventMap {
  extrinsicHash: (txHash: string) => void;
  error: (error: string) => void;
  success: () => void;
}
