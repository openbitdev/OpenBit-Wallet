// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BitcoinFeeRate, FeeDefaultOption } from '@subwallet/extension-base/types';

export type BitcoinFeeOption = { option: FeeDefaultOption } | {
  option: 'custom',
  customValue: BitcoinFeeRate
}
