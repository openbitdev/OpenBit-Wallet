// Copyright 2017-2022 @polkadot/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { decodeAddress } from '@subwallet/keyring';
import { u8aToHex } from '@polkadot/util';
const ACCOUNT_PREFIX = 'account:';
const ADDRESS_PREFIX = 'address:';
const CONTRACT_PREFIX = 'contract:';
const SUBWALLET_KEYRING = 'keyring:subwallet';
function toHex(address) {
  return u8aToHex(
  // When saving pre-checksum changes, ensure that we can decode
  decodeAddress(address, true));
}
const accountKey = address => `${ACCOUNT_PREFIX}${toHex(address)}`;
const addressKey = address => `${ADDRESS_PREFIX}${toHex(address)}`;
const contractKey = address => `${CONTRACT_PREFIX}${toHex(address)}`;
const accountRegex = new RegExp(`^${ACCOUNT_PREFIX}0x[0-9a-f]*`, '');
const addressRegex = new RegExp(`^${ADDRESS_PREFIX}0x[0-9a-f]*`, '');
const contractRegex = new RegExp(`^${CONTRACT_PREFIX}0x[0-9a-f]*`, '');
export { accountKey, accountRegex, addressKey, addressRegex, contractKey, contractRegex, SUBWALLET_KEYRING };