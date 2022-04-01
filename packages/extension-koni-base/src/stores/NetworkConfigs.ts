// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NetWorkInfo } from '@polkadot/extension-base/background/KoniTypes';
import { EXTENSION_PREFIX } from '@polkadot/extension-base/defaults';
import SubscribableStore from '@polkadot/extension-koni-base/stores/SubscribableStore';

export default class NetworkConfigsStore extends SubscribableStore<Record<string, NetWorkInfo>> {
  constructor () {
    super(EXTENSION_PREFIX ? `${EXTENSION_PREFIX}network_configs` : null);
  }
}
