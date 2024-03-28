"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keyFromPath = keyFromPath;
var _hdkdEcdsa = require("@polkadot/util-crypto/key/hdkdEcdsa");
var _hdkdEd = require("@polkadot/util-crypto/key/hdkdEd25519");
var _hdkdSr = require("@polkadot/util-crypto/key/hdkdSr25519");
// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

const generators = {
  ecdsa: _hdkdEcdsa.keyHdkdEcdsa,
  ed25519: _hdkdEd.keyHdkdEd25519,
  // FIXME This is Substrate-compatible, not Ethereum-compatible
  ethereum: _hdkdEcdsa.keyHdkdEcdsa,
  sr25519: _hdkdSr.keyHdkdSr25519,
  'bitcoin-44': _hdkdEcdsa.keyHdkdEcdsa,
  // TODO
  'bitcoin-84': _hdkdEcdsa.keyHdkdEcdsa,
  // TODO
  'bitcoin-86': _hdkdEcdsa.keyHdkdEcdsa,
  // TODO
  'bittest-44': _hdkdEcdsa.keyHdkdEcdsa,
  // TODO
  'bittest-84': _hdkdEcdsa.keyHdkdEcdsa,
  // TODO
  'bittest-86': _hdkdEcdsa.keyHdkdEcdsa // TODO
};

function keyFromPath(pair, path, type) {
  const keyHdkd = generators[type];
  let result = pair;
  for (const junction of path) {
    result = keyHdkd(result, junction);
  }
  return result;
}