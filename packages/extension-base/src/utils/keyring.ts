// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { keyring } from '@subwallet/ui-keyring';

export function keyringGetAccounts () {
  return keyring.getAccounts();
}
