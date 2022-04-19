// Copyright 2019-2022 @koniverse/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { EXTENSION_PREFIX } from '@koniverse/extension-base/defaults';
import { StakingJson } from '@koniverse/extension-koni-base/background/types';
import SubscribableStore from '@koniverse/extension-koni-base/stores/SubscribableStore';

export default class StakingStore extends SubscribableStore<StakingJson> {
  constructor () {
    super(EXTENSION_PREFIX ? `${EXTENSION_PREFIX}staking` : null);
  }
}
