// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ALL_ACCOUNT_KEY } from '@koniverse/extension-koni-base/constants';

export function isAccountAll (address: string): boolean {
  return address === ALL_ACCOUNT_KEY;
}
