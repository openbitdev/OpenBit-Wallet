// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

export const TYPE_PREFIX = {
  ecdsa: new Uint8Array([2]),
  ed25519: new Uint8Array([0]),
  ethereum: new Uint8Array([2]),
  sr25519: new Uint8Array([1]),
  'bitcoin-44': new Uint8Array([3]),
  // TODO, not use
  'bitcoin-84': new Uint8Array([3]),
  // TODO, not use
  'bitcoin-86': new Uint8Array([3]),
  // TODO, not use
  'bittest-44': new Uint8Array([3]),
  // TODO, not use
  'bittest-84': new Uint8Array([3]),
  // TODO, not use
  'bittest-86': new Uint8Array([3]) // TODO, not use
};