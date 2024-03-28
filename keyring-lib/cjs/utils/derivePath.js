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
const getBitDerivePathFunction = (proposal, slip44) => {
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
      return getBitDerivePathFunction(44, 0);
    case 'bitcoin-84':
      return getBitDerivePathFunction(84, 0);
    case 'bitcoin-86':
      return getBitDerivePathFunction(86, 0);
    case 'bittest-44':
      return getBitDerivePathFunction(44, 1);
    case 'bittest-84':
      return getBitDerivePathFunction(84, 1);
    case 'bittest-86':
      return getBitDerivePathFunction(86, 1);
    default:
      return () => '';
  }
};
exports.getDerivePath = getDerivePath;