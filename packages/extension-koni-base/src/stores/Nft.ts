// Copyright 2019-2022 @koniverse/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { EXTENSION_PREFIX } from '@koniverse/extension-base/defaults';
import { NftJson } from '@koniverse/extension-koni-base/background/types';
import SubscribableStore from '@koniverse/extension-koni-base/stores/SubscribableStore';

export default class NftStore extends SubscribableStore<NftJson> {
  constructor () {
    super(EXTENSION_PREFIX ? `${EXTENSION_PREFIX}nft` : null);
  }
}
