// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { BitcoinAddressSummaryInfo, RunesInfoByAddress } from '@subwallet/extension-base/services/chain-service/handler/bitcoin/strategy/BlockStream/types';
import { ApiRequestStrategy } from '@subwallet/extension-base/strategy/api-request-strategy/types';
import { BitcoinFeeInfo, BitcoinTx, UtxoResponseItem } from '@subwallet/extension-base/types';
import EventEmitter from 'eventemitter3';

export interface BitcoinApiStrategy extends Omit<ApiRequestStrategy, 'addRequest'> {
  getAddressSummaryInfo (address: string): Promise<BitcoinAddressSummaryInfo>;
  getRunes (address: string): Promise<RunesInfoByAddress[]>;
  getAddressTransaction (address: string, limit?: number): Promise<BitcoinTx[]>;
  getTransactionStatus (txHash: string): Promise<boolean>;
  getFeeRate (): Promise<BitcoinFeeInfo>;
  getUtxos (address: string): Promise<UtxoResponseItem[]>;
  getTxHex (txHash: string): Promise<string>;
  sendRawTransaction (rawTransaction: string): EventEmitter<BitcoinTransactionEventMap>;
}

export interface BitcoinTransactionEventMap {
  extrinsicHash: (txHash: string) => void;
  error: (error: string) => void;
  success: () => void;
}
