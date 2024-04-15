"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TYPE_SIGNATURE = void 0;
var _utilCrypto = require("@polkadot/util-crypto");
// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

const TYPE_SIGNATURE = {
  ecdsa: (m, p) => (0, _utilCrypto.secp256k1Sign)(m, p, 'blake2'),
  ed25519: _utilCrypto.ed25519Sign,
  ethereum: (m, p) => (0, _utilCrypto.secp256k1Sign)(m, p, 'keccak'),
  sr25519: _utilCrypto.sr25519Sign,
  'bitcoin-44': _utilCrypto.sr25519Sign,
  // TODO, not to use
  'bitcoin-84': _utilCrypto.sr25519Sign,
  // TODO, not to use
  'bitcoin-86': _utilCrypto.sr25519Sign,
  // TODO, not to use
  'bittest-44': _utilCrypto.sr25519Sign,
  // TODO, not to use
  'bittest-84': _utilCrypto.sr25519Sign,
  // TODO, not to use
  'bittest-86': _utilCrypto.sr25519Sign // TODO, not to use
};
exports.TYPE_SIGNATURE = TYPE_SIGNATURE;