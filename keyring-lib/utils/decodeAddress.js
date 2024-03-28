// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as bitcoin from 'bitcoinjs-lib';
import { hexToU8a, isHex, isU8a, u8aToU8a } from '@polkadot/util';
import { decodeAddress as polkadotDecodeAddress } from '@polkadot/util-crypto';
import { validateP2PKHAddress, validateP2TRAddress, validateP2WPKHAddress } from "./validateAddess.js";
export const decodeAddress = (encoded, ignoreChecksum, ss58Format = -1) => {
  if (!encoded) {
    throw new Error('Invalid empty address passed');
  }
  if (isU8a(encoded) || isHex(encoded)) {
    return u8aToU8a(encoded);
  }
  if (validateP2PKHAddress(encoded) !== 'unknown') {
    const base58 = bitcoin.address.fromBase58Check(encoded);
    return hexToU8a(base58.hash.toString('hex'));
  }
  if (validateP2TRAddress(encoded) !== 'unknown' || validateP2WPKHAddress(encoded) !== 'unknown') {
    const bech32 = bitcoin.address.fromBech32(encoded);
    return hexToU8a(bech32.data.toString('hex'));
  }
  return polkadotDecodeAddress(encoded, ignoreChecksum, ss58Format);
};