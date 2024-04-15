// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ed25519PairFromSeed as ed25519FromSeed, secp256k1PairFromSeed as secp256k1FromSeed, sr25519PairFromSeed as sr25519FromSeed } from '@polkadot/util-crypto';
export const TYPE_FROM_SEED = {
  ecdsa: secp256k1FromSeed,
  ed25519: ed25519FromSeed,
  ethereum: secp256k1FromSeed,
  sr25519: sr25519FromSeed,
  'bitcoin-44': secp256k1FromSeed,
  // TODO: need review, create from mnemonic same ethereum
  'bitcoin-84': secp256k1FromSeed,
  // TODO: need review, create from mnemonic same ethereum
  'bitcoin-86': secp256k1FromSeed,
  // TODO: need review, create from mnemonic same ethereum
  'bittest-44': secp256k1FromSeed,
  // TODO: need review, create from mnemonic same ethereum
  'bittest-84': secp256k1FromSeed,
  // TODO: need review, create from mnemonic same ethereum
  'bittest-86': secp256k1FromSeed // TODO: need review, create from mnemonic same ethereum
};