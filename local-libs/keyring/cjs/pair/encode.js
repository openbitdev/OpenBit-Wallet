"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encodePair = encodePair;
var _util = require("@polkadot/util");
var _utilCrypto = require("@polkadot/util-crypto");
var _defaults = require("./defaults");
// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

function encodePair(_ref, passphrase) {
  let {
    entropy,
    publicKey,
    secretKey
  } = _ref;
  if (!secretKey) {
    throw new Error('Expected a valid secretKey to be passed to encode');
  }
  let encoded = (0, _util.u8aConcat)(_defaults.PKCS8_HEADER, secretKey, _defaults.PKCS8_DIVIDER, publicKey);

  // new style, add seed after pubKey

  if (entropy) {
    encoded = (0, _util.u8aConcat)(encoded, _defaults.PKCS8_DIVIDER, entropy);
  }
  if (!passphrase) {
    return encoded;
  }
  const {
    params,
    password,
    salt
  } = (0, _utilCrypto.scryptEncode)(passphrase);
  const {
    encrypted,
    nonce
  } = (0, _utilCrypto.naclEncrypt)(encoded, password.subarray(0, 32));
  return (0, _util.u8aConcat)((0, _utilCrypto.scryptToU8a)(salt, params), nonce, encrypted);
}