"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TYPE_ADDRESS = void 0;
var _utilCrypto = require("@polkadot/util-crypto");
// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

const TYPE_ADDRESS = {
  ecdsa: p => p.length > 32 ? (0, _utilCrypto.blake2AsU8a)(p) : p,
  ed25519: p => p,
  ethereum: p => p.length === 20 ? p : (0, _utilCrypto.keccakAsU8a)((0, _utilCrypto.secp256k1Expand)(p)),
  sr25519: p => p,
  'bitcoin-44': p => p,
  // TODO
  'bitcoin-84': p => p,
  // TODO
  'bitcoin-86': p => p,
  // TODO
  'bittest-44': p => p,
  // TODO
  'bittest-84': p => p,
  // TODO
  'bittest-86': p => p // TODO
};
exports.TYPE_ADDRESS = TYPE_ADDRESS;