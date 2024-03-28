// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aConcat } from '@polkadot/util';
import { naclEncrypt, scryptEncode, scryptToU8a } from '@polkadot/util-crypto';
import { PKCS8_DIVIDER, PKCS8_HEADER } from "./defaults.js";
export function encodePair({
  entropy,
  publicKey,
  secretKey
}, passphrase) {
  if (!secretKey) {
    throw new Error('Expected a valid secretKey to be passed to encode');
  }
  let encoded = u8aConcat(PKCS8_HEADER, secretKey, PKCS8_DIVIDER, publicKey);

  // new style, add seed after pubKey

  if (entropy) {
    encoded = u8aConcat(encoded, PKCS8_DIVIDER, entropy);
  }
  if (!passphrase) {
    return encoded;
  }
  const {
    params,
    password,
    salt
  } = scryptEncode(passphrase);
  const {
    encrypted,
    nonce
  } = naclEncrypt(encoded, password.subarray(0, 32));
  return u8aConcat(scryptToU8a(salt, params), nonce, encrypted);
}