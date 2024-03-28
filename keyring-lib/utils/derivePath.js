// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

export const emvPath = "m/44'/60'/0'/0/{index}";
export const bitPath = "m/{proposal}'/{slip44}'/{index}'/0/0";
export const getEvmDerivePath = index => {
  return emvPath.replace('{index}', index.toString());
};
export const getBitDerivePathFunction = (proposal, slip44) => {
  const path = bitPath.replace('{proposal}', proposal.toString()).replace('{slip44}', slip44.toString());
  return index => {
    return path.replace('{index}', index.toString());
  };
};
export const getDerivePath = type => {
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