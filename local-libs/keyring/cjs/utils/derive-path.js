"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEvmDerivePath = exports.getDerivePath = exports.getBitDerivePathFunction = exports.emvPath = exports.bitPath = void 0;
// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

const emvPath = "m/44'/60'/0'/0/{index}";
exports.emvPath = emvPath;
const bitPath = "m/{proposal}'/{slip44}'/{index}'/0/0";
exports.bitPath = bitPath;
const getEvmDerivePath = index => {
  return emvPath.replace('{index}', index.toString());
};
exports.getEvmDerivePath = getEvmDerivePath;
const getBitDerivePathFunction = (slip44, proposal) => {
  const path = bitPath.replace('{proposal}', proposal.toString()).replace('{slip44}', slip44.toString());
  return index => {
    return path.replace('{index}', index.toString());
  };
};
exports.getBitDerivePathFunction = getBitDerivePathFunction;
const getDerivePath = type => {
  switch (type) {
    case 'ethereum':
      return getEvmDerivePath;
    case 'bitcoin-44':
      return getBitDerivePathFunction(0, 44);
    case 'bitcoin-84':
      return getBitDerivePathFunction(0, 84);
    case 'bitcoin-86':
      return getBitDerivePathFunction(0, 86);
    case 'bittest-44':
      return getBitDerivePathFunction(1, 44);
    case 'bittest-84':
      return getBitDerivePathFunction(1, 84);
    case 'bittest-86':
      return getBitDerivePathFunction(1, 86);
    default:
      return () => '';
  }
};
exports.getDerivePath = getDerivePath;