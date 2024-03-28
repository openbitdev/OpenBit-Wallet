// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ed25519Sign, secp256k1Sign, sr25519Sign } from '@polkadot/util-crypto';
export const TYPE_SIGNATURE = {
  ecdsa: (m, p) => secp256k1Sign(m, p, 'blake2'),
  ed25519: ed25519Sign,
  ethereum: (m, p) => secp256k1Sign(m, p, 'keccak'),
  sr25519: sr25519Sign,
  'bitcoin-44': sr25519Sign,
  // TODO, not to use
  'bitcoin-84': sr25519Sign,
  // TODO, not to use
  'bitcoin-86': sr25519Sign,
  // TODO, not to use
  'bittest-44': sr25519Sign,
  // TODO, not to use
  'bittest-84': sr25519Sign,
  // TODO, not to use
  'bittest-86': sr25519Sign // TODO, not to use
};