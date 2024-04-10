// Copyright 2019-2022 @subwallet/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BitcoinAddressSummaryInfo, BitcoinTransferItem } from '@subwallet/extension-base/services/bitcoin-service/types';
import { ApiRequestStrategy } from '@subwallet/extension-base/strategy/api-request-strategy/types';

export interface BitcoinApiStrategy extends Omit<ApiRequestStrategy, 'addRequest'> {
  getAddressSummaryInfo (baseUrl: string, address: string): Promise<BitcoinAddressSummaryInfo>;
  getAddressTransaction (baseUrl: string, address: string, limit?: number): Promise<BitcoinTransferItem[]>
}
