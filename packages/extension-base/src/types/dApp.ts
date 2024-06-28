// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

export type Response<T> = {
  result: T
}

export type AuthAddress = {
  address: string;
  publicKey?: string;
  tweakedPublicKey?: string;
  derivationPath?: string;
  isTestnet?: boolean;
  type: 'p2tr' | 'p2wpkh' | 'p2sh' | 'ethereum' | 'unknown';
}

export type RequestAddressesResult = {
  addresses: AuthAddress[];
};
