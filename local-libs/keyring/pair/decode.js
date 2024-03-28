// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aEq } from '@polkadot/util';
import { jsonDecryptData } from '@polkadot/util-crypto';
import { PKCS8_DIVIDER, PKCS8_HEADER, PUB_LENGTH, SEC_LENGTH, SEED_LENGTH } from "./defaults.js";
const SEED_OFFSET = PKCS8_HEADER.length;
export function decodePair(passphrase, encrypted, _encType) {
  const encType = Array.isArray(_encType) || _encType === undefined ? _encType : [_encType];
  const decrypted = jsonDecryptData(encrypted, passphrase, encType);
  const header = decrypted.subarray(0, PKCS8_HEADER.length);
  if (!u8aEq(header, PKCS8_HEADER)) {
    throw new Error('Invalid Pkcs8 header found in body');
  }
  let secretKey = decrypted.subarray(SEED_OFFSET, SEED_OFFSET + SEC_LENGTH);
  let divOffset = SEED_OFFSET + SEC_LENGTH;
  let divider = decrypted.subarray(divOffset, divOffset + PKCS8_DIVIDER.length);
  let evmType = false;

  // substrate privateKey is 64, evm privateKey is 32
  if (!u8aEq(divider, PKCS8_DIVIDER)) {
    evmType = true;
    divOffset = SEED_OFFSET + SEED_LENGTH;
    secretKey = decrypted.subarray(SEED_OFFSET, divOffset);
    divider = decrypted.subarray(divOffset, divOffset + PKCS8_DIVIDER.length);
    if (!u8aEq(divider, PKCS8_DIVIDER)) {
      throw new Error('Invalid Pkcs8 divider found in body');
    }
  }
  const pubOffset = divOffset + PKCS8_DIVIDER.length;
  // substrate publicKey is 32, evm publicKey is 33
  const publicKeyLen = PUB_LENGTH + (evmType ? 1 : 0);
  const publicKey = decrypted.subarray(pubOffset, pubOffset + publicKeyLen);

  // New style: header, secret, div, pub, div, seed
  // Move div to after publicKey
  divOffset = pubOffset + publicKeyLen;
  divider = decrypted.subarray(divOffset, divOffset + PKCS8_DIVIDER.length);
  let entropy;
  if (u8aEq(divider, PKCS8_DIVIDER)) {
    divOffset = divOffset + PKCS8_DIVIDER.length;
    entropy = decrypted.subarray(divOffset, divOffset + SEED_LENGTH);
  }
  return {
    entropy,
    publicKey,
    secretKey
  };
}