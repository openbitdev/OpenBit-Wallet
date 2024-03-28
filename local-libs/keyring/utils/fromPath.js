// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { keyHdkdEcdsa } from '@polkadot/util-crypto/key/hdkdEcdsa';
import { keyHdkdEd25519 } from '@polkadot/util-crypto/key/hdkdEd25519';
import { keyHdkdSr25519 } from '@polkadot/util-crypto/key/hdkdSr25519';
const generators = {
  ecdsa: keyHdkdEcdsa,
  ed25519: keyHdkdEd25519,
  // FIXME This is Substrate-compatible, not Ethereum-compatible
  ethereum: keyHdkdEcdsa,
  sr25519: keyHdkdSr25519,
  'bitcoin-44': keyHdkdEcdsa,
  // TODO
  'bitcoin-84': keyHdkdEcdsa,
  // TODO
  'bitcoin-86': keyHdkdEcdsa,
  // TODO
  'bittest-44': keyHdkdEcdsa,
  // TODO
  'bittest-84': keyHdkdEcdsa,
  // TODO
  'bittest-86': keyHdkdEcdsa // TODO
};

export function keyFromPath(pair, path, type) {
  const keyHdkd = generators[type];
  let result = pair;
  for (const junction of path) {
    result = keyHdkd(result, junction);
  }
  return result;
}