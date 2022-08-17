// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountsStore } from '@subwallet/extension-base/stores';
import BaseMigrationJob from '@subwallet/extension-koni-base/migration/Base';

import { isString } from '@polkadot/util';

export default class ChangeOriginGenesisHashMetaData extends BaseMigrationJob {
  // eslint-disable-next-line @typescript-eslint/require-await
  public override async run (): Promise<void> {
    const oldStore = new AccountsStore();
    const newStore = new AccountsStore();

    oldStore.all((key, value) => {
      const newValue = { ...value };

      if (isString(value.meta.originGenesisHash)) {
        newValue.meta.originGenesisHash = [value.meta.originGenesisHash];
      }

      newStore.set(key, newValue);
    });
  }
}
