// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { FeeChainType } from '@subwallet/extension-base/types';
import { BehaviorSubject } from 'rxjs';

import { BitcoinFeeDetail, BitcoinFeeInfo, BitcoinFeeRate } from './bitcoin';
import { EvmEIP1995FeeOption, EvmFeeDetail, EvmFeeInfo } from './evm';
import { SubstrateFeeDetail, SubstrateFeeInfo, SubstrateTipInfo } from './substrate';

export type FeeInfo = EvmFeeInfo | SubstrateFeeInfo | BitcoinFeeInfo;
export type FeeDetail = EvmFeeDetail | SubstrateFeeDetail | BitcoinFeeDetail;
export type FeeCustom = EvmEIP1995FeeOption | SubstrateTipInfo | BitcoinFeeRate;

export interface FeeSubscription {
  observer: BehaviorSubject<FeeInfo | undefined>;
  subscription: Record<string, VoidFunction>;
  unsubscribe: VoidFunction;
}

export type GetFeeFunction = (id: string, chain: string, type: FeeChainType) => Promise<FeeInfo>;
