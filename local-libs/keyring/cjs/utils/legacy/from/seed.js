"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TYPE_FROM_SEED = void 0;
var _utilCrypto = require("@polkadot/util-crypto");
// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

const TYPE_FROM_SEED = {
  ecdsa: _utilCrypto.secp256k1PairFromSeed,
  ed25519: _utilCrypto.ed25519PairFromSeed,
  ethereum: _utilCrypto.secp256k1PairFromSeed,
  sr25519: _utilCrypto.sr25519PairFromSeed,
  'bitcoin-44': _utilCrypto.secp256k1PairFromSeed,
  // TODO: need review, create from mnemonic same ethereum
  'bitcoin-84': _utilCrypto.secp256k1PairFromSeed,
  // TODO: need review, create from mnemonic same ethereum
  'bitcoin-86': _utilCrypto.secp256k1PairFromSeed,
  // TODO: need review, create from mnemonic same ethereum
  'bittest-44': _utilCrypto.secp256k1PairFromSeed,
  // TODO: need review, create from mnemonic same ethereum
  'bittest-84': _utilCrypto.secp256k1PairFromSeed,
  // TODO: need review, create from mnemonic same ethereum
  'bittest-86': _utilCrypto.secp256k1PairFromSeed // TODO: need review, create from mnemonic same ethereum
};
exports.TYPE_FROM_SEED = TYPE_FROM_SEED;