// Copyright 2019-2022 @koniverse/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AuthUrls } from '@koniverse/extension-base/background/handlers/State';
import { EXTENSION_PREFIX } from '@koniverse/extension-base/defaults';
import SubscribableStore from '@koniverse/extension-koni-base/stores/SubscribableStore';

export default class AuthorizeStore extends SubscribableStore<AuthUrls> {
  constructor () {
    super(EXTENSION_PREFIX ? `${EXTENSION_PREFIX}authorize` : null);
  }
}
