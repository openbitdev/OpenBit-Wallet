// Copyright 2019-2022 @koniverse/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { EXTENSION_PREFIX } from '@koniverse/extension-base/defaults';
import { BalanceJson } from '@koniverse/extension-koni-base/background/types';
import SubscribableStore from '@koniverse/extension-koni-base/stores/SubscribableStore';

export default class BalanceStore extends SubscribableStore<BalanceJson> {
  constructor () {
    super(EXTENSION_PREFIX ? `${EXTENSION_PREFIX}balance` : null);
  }
}
