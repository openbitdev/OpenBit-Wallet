// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountsStore } from '@subwallet/extension-base/stores';
import BaseMigrationJob from '@subwallet/extension-koni-base/migration/Base';

import { isString } from '@polkadot/util';

export default class ChangeOriginGenesisHashMetaData extends BaseMigrationJob {
  // eslint-disable-next-line @typescript-eslint/require-await
  public override async run (): Promise<void> {
    const store = new AccountsStore();

    store.all((key, value) => {
      if (key.startsWith('account:') && value.meta && isString(value.meta?.originGenesisHash)) {
        const newValue = { ...value };

        newValue.meta.originGenesisHash = [value.meta.originGenesisHash];
        store.set(key, newValue);
      }
    });
  }
}
