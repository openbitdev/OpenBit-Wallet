// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { BaseFeeDetail, BaseFeeInfo } from './base';
import { FeeDefaultOption } from './option';

export interface BitcoinFeeRate {
  feeRate: number;
}

export interface BitcoinFeeInfo extends BaseFeeInfo {
  type: 'bitcoin';
  options: {
    slow: BitcoinFeeRate;
    average: BitcoinFeeRate;
    fast: BitcoinFeeRate;
    default: FeeDefaultOption;
  }
}

export interface BitcoinFeeDetail extends BitcoinFeeInfo, BaseFeeDetail {
  vSize: number;
}
