// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { KeypairType } from '@subwallet/keyring/types';

export const SUBSTRATE_ACCOUNT_TYPE: KeypairType = 'sr25519';
export const EVM_ACCOUNT_TYPE: KeypairType = 'ethereum';
export const BIT44_ACCOUNT_TYPE: KeypairType = 'bitcoin-44';
export const BIT84_ACCOUNT_TYPE: KeypairType = 'bitcoin-84';
export const BIT86_ACCOUNT_TYPE: KeypairType = 'bitcoin-86';
export const BITTEST44_ACCOUNT_TYPE: KeypairType = 'bittest-44';
export const BITTEST84_ACCOUNT_TYPE: KeypairType = 'bittest-84';
export const BITTEST86_ACCOUNT_TYPE: KeypairType = 'bittest-86';

export const NEED_MASTER_ACCOUNT_TO_DERIVE_TYPES: KeypairType[] = [
  EVM_ACCOUNT_TYPE,
  BIT44_ACCOUNT_TYPE,
  BIT84_ACCOUNT_TYPE,
  BIT86_ACCOUNT_TYPE,
  BITTEST44_ACCOUNT_TYPE,
  BITTEST84_ACCOUNT_TYPE,
  BITTEST86_ACCOUNT_TYPE
];

export const DEFAULT_ACCOUNT_TYPES: KeypairType[] = [BIT84_ACCOUNT_TYPE, BITTEST84_ACCOUNT_TYPE];
