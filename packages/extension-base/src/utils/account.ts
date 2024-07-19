// Copyright 2019-2022 @subwallet/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountAuthType, AddressJson } from '@subwallet/extension-base/background/types';
import { reformatAddress } from '@subwallet/extension-base/utils/index';
import { getKeypairTypeByAddress } from '@subwallet/keyring';
import { SubjectInfo } from '@subwallet/ui-keyring/observable/types';

import { isAddress } from '@polkadot/util-crypto';

export function quickFormatAddressToCompare (address?: string) {
  if (!isAddress(address)) {
    return address;
  }

  return reformatAddress(address, 42).toLowerCase();
}

export const convertSubjectInfoToAddresses = (subjectInfo: SubjectInfo): AddressJson[] => {
  return Object.values(subjectInfo).map((info): AddressJson => ({ address: info.json.address, type: info.type, ...info.json.meta }));
};

export const isAddressValidWithAuthType = (address: string, accountAuthType?: AccountAuthType): boolean => {
  const keypairType = getKeypairTypeByAddress(address);

  if (!['ethereum', 'bitcoin-84', 'bitcoin-86', 'bittest-84', 'bittest-86'].includes(keypairType)) {
    return false;
  }

  if (accountAuthType === 'both') {
    return true;
  }

  if (accountAuthType === 'evm') {
    return keypairType === 'ethereum';
  }

  if (accountAuthType === 'bitcoin') {
    return ['bitcoin-86', 'bittest-86', 'bitcoin-84', 'bittest-84'].includes(keypairType);
  }

  return false;
};
