"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nobody = nobody;
// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

// empty publicKey
const publicKey = new Uint8Array(32);

// pre-computed via encodeAddress(publicKey)
const address = '5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM';
const meta = {
  isTesting: true,
  name: 'nobody'
};
const json = {
  address,
  encoded: '',
  encoding: {
    content: ['pkcs8', 'ed25519'],
    type: 'none',
    version: '0'
  },
  meta
};
const pair = {
  address,
  addressRaw: publicKey,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePkcs8: (newPassphrase, oldPassphrase) => new Uint8Array(0),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  decodePkcs8: (passphrase, encoded) => undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  encodePkcs8: passphrase => new Uint8Array(0),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exportMnemonic: passphrase => '',
  bitcoin: {
    derive: (index, meta) => pair,
    signMessage: (payload, compressed, options) => '',
    signTransaction: transaction => ''
  },
  evm: {
    derive: (index, meta) => pair,
    signMessage: (payload, method) => Promise.resolve(''),
    signTransaction: transaction => ''
  },
  substrate: {
    derive: (suri, meta) => pair,
    sign: (message, options) => new Uint8Array(64)
  },
  isLocked: true,
  haveEntropy: false,
  lock: () => {
    // no locking, it is always locked
  },
  meta,
  publicKey,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setMeta: meta => undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sign: message => new Uint8Array(64),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toJson: passphrase => json,
  type: 'ed25519',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  unlock: passphrase => undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  verify: (message, signature) => false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  vrfSign: (message, context, extra) => new Uint8Array(96),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  vrfVerify: (message, vrfResult, context, extra) => false
};
function nobody() {
  return pair;
}