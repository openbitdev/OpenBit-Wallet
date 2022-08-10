// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

export const getShowGenesisHash = (originGenesisHash?: string[] | null, genesisHash?: string | null): string | null | undefined => {
  if (!genesisHash && !originGenesisHash) {
    return null;
  } else {
    if (originGenesisHash && originGenesisHash.length) {
      if (originGenesisHash.length < 2) {
        return originGenesisHash[0];
      } else {
        if (genesisHash) {
          return originGenesisHash.includes(genesisHash) ? genesisHash : originGenesisHash[0];
        } else {
          return originGenesisHash[0];
        }
      }
    } else {
      return genesisHash;
    }
  }
};
