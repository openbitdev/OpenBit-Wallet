// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BN_ZERO } from '@koniverse/extension-koni-ui/util';
import { BalanceInfo } from '@koniverse/extension-koni-ui/util/types';
import BigN from 'bignumber.js';

export function hasAnyChildTokenBalance (balanceInfo: BalanceInfo): boolean {
  if (!balanceInfo.childrenBalances || !balanceInfo.childrenBalances.length) {
    return false;
  }

  for (const item of balanceInfo.childrenBalances) {
    if (item.balanceValue.gt(BN_ZERO)) {
      return true;
    }
  }

  return false;
}

export function getTotalConvertedBalanceValue (balanceInfo: BalanceInfo): BigN {
  let result = new BigN(balanceInfo.convertedBalanceValue);

  if (balanceInfo.childrenBalances && balanceInfo.childrenBalances.length) {
    balanceInfo.childrenBalances.forEach((i) => {
      result = result.plus(i.convertedBalanceValue);
    });
  }

  return result;
}
