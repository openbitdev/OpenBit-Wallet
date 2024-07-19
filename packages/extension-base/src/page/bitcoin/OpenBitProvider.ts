// Copyright 2019-2022 @subwallet/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BitcoinProviderError } from '@subwallet/extension-base/background/errors/BitcoinProviderError';
import { version } from '@subwallet/extension-base/page/params';
import { OpenBitProviderType } from '@subwallet/extension-inject/types';

import { sendMessage } from '../message';

export const OpenBitProvider: OpenBitProviderType = {
  isOpenBit: true,
  getURL: () => {
    // Implement this method
    throw new Error('Method not implemented.');
  },
  authenticationRequest: (payload: string) => {
    // Implement this method
    throw new Error('Method not implemented.');
  },
  signatureRequest: (payload: string) => {
    // Implement this method
    throw new Error('Method not implemented.');
  },
  structuredDataSignatureRequest: (payload: string) => {
    // Implement this method
    throw new Error('Method not implemented.');
  },
  transactionRequest: (payload: string) => {
    // Implement this method
    throw new Error('Method not implemented.');
  },
  psbtRequest: (payload: string) => {
    // Implement this method
    throw new Error('Method not implemented.');
  },
  profileUpdateRequest: (payload: string) => {
    // Implement this method
    throw new Error('Method not implemented.');
  },
  request: (method: string, params?: any[] | undefined) => {
    // Implement this method
    return new Promise((resolve, reject) => {
      sendMessage('bitcoin(request)', { method, params })
        .then((result) => {
          resolve(result as Record<string, any>);
        })
        .catch((e: BitcoinProviderError) => {
          reject(e);
        });
    });
  },
  getProductInfo: () => {
    return {
      name: 'OpenBit',
      version: version
    };
  }
};
