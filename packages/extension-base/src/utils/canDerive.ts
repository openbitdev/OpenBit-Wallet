// Copyright 2019-2022 @polkadot/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeypairType } from '@subwallet/keyring/types';

export function canDerive (type?: KeypairType): boolean {
  return !!type && ['ed25519', 'sr25519', 'ecdsa', 'ethereum', 'bitcoin-44', 'bitcoin-84', 'bitcoin-86', 'bittest-44', 'bittest-84', 'bittest-86'].includes(type);
}
