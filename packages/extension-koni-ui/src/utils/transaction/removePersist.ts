// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ExtrinsicType } from '@subwallet/extension-base/background/KoniTypes';
import { NFT_TRANSACTION, STAKE_TRANSACTION, TRANSFER_TRANSACTION } from '@subwallet/extension-koni-ui/constants';

import { removeStorage } from '../common';

const detectKey = (type?: ExtrinsicType): string => {
  switch (type) {
    case ExtrinsicType.SEND_NFT:
      return NFT_TRANSACTION;
    case ExtrinsicType.TRANSFER_BALANCE:
    case ExtrinsicType.TRANSFER_TOKEN:
    case ExtrinsicType.TRANSFER_XCM:
      return TRANSFER_TRANSACTION;
    case ExtrinsicType.STAKING_BOND:
    case ExtrinsicType.STAKING_JOIN_POOL:
      return STAKE_TRANSACTION;
    default:
      return '';
  }
};

export const removePersist = (type?: ExtrinsicType) => {
  const key = detectKey(type);

  if (key) {
    removeStorage(key);
  }
};
