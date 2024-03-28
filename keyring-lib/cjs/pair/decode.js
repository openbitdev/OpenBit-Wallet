"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodePair = decodePair;
var _util = require("@polkadot/util");
var _utilCrypto = require("@polkadot/util-crypto");
var _defaults = require("./defaults");
// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

const SEED_OFFSET = _defaults.PKCS8_HEADER.length;
function decodePair(passphrase, encrypted, _encType) {
  const encType = Array.isArray(_encType) || _encType === undefined ? _encType : [_encType];
  const decrypted = (0, _utilCrypto.jsonDecryptData)(encrypted, passphrase, encType);
  const header = decrypted.subarray(0, _defaults.PKCS8_HEADER.length);
  if (!(0, _util.u8aEq)(header, _defaults.PKCS8_HEADER)) {
    throw new Error('Invalid Pkcs8 header found in body');
  }
  let secretKey = decrypted.subarray(SEED_OFFSET, SEED_OFFSET + _defaults.SEC_LENGTH);
  let divOffset = SEED_OFFSET + _defaults.SEC_LENGTH;
  let divider = decrypted.subarray(divOffset, divOffset + _defaults.PKCS8_DIVIDER.length);
  let evmType = false;

  // substrate privateKey is 64, evm privateKey is 32
  if (!(0, _util.u8aEq)(divider, _defaults.PKCS8_DIVIDER)) {
    evmType = true;
    divOffset = SEED_OFFSET + _defaults.SEED_LENGTH;
    secretKey = decrypted.subarray(SEED_OFFSET, divOffset);
    divider = decrypted.subarray(divOffset, divOffset + _defaults.PKCS8_DIVIDER.length);
    if (!(0, _util.u8aEq)(divider, _defaults.PKCS8_DIVIDER)) {
      throw new Error('Invalid Pkcs8 divider found in body');
    }
  }
  const pubOffset = divOffset + _defaults.PKCS8_DIVIDER.length;
  // substrate publicKey is 32, evm publicKey is 33
  const publicKeyLen = _defaults.PUB_LENGTH + (evmType ? 1 : 0);
  const publicKey = decrypted.subarray(pubOffset, pubOffset + publicKeyLen);

  // New style: header, secret, div, pub, div, seed
  // Move div to after publicKey
  divOffset = pubOffset + publicKeyLen;
  divider = decrypted.subarray(divOffset, divOffset + _defaults.PKCS8_DIVIDER.length);
  let entropy;
  if ((0, _util.u8aEq)(divider, _defaults.PKCS8_DIVIDER)) {
    divOffset = divOffset + _defaults.PKCS8_DIVIDER.length;
    entropy = decrypted.subarray(divOffset, divOffset + _defaults.SEED_LENGTH);
  }
  return {
    entropy,
    publicKey,
    secretKey
  };
}