// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { blake2AsU8a, keccakAsU8a, secp256k1Expand } from '@polkadot/util-crypto';
export const TYPE_ADDRESS = {
  ecdsa: p => p.length > 32 ? blake2AsU8a(p) : p,
  ed25519: p => p,
  ethereum: p => p.length === 20 ? p : keccakAsU8a(secp256k1Expand(p)),
  sr25519: p => p,
  'bitcoin-44': p => p,
  // TODO
  'bitcoin-84': p => p,
  // TODO
  'bitcoin-86': p => p,
  // TODO
  'bittest-44': p => p,
  // TODO
  'bittest-84': p => p,
  // TODO
  'bittest-86': p => p // TODO
};