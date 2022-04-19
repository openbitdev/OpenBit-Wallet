// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { EXTENSION_PREFIX } from '@koniverse/extension-base/defaults';
import { TransactionHistoryItemType } from '@koniverse/extension-koni-base/background/types';
import SubscribableStore from '@koniverse/extension-koni-base/stores/SubscribableStore';

const lastError = (type: string): void => {
  const error = chrome.runtime.lastError;

  if (error) {
    console.error(`TransactionHistoryStore.${type}:: runtime.lastError:`, error);
  }
};

export default class TransactionHistoryStore extends SubscribableStore<TransactionHistoryItemType[]> {
  constructor () {
    super(EXTENSION_PREFIX ? `${EXTENSION_PREFIX}transaction_history` : null);
  }

  public getByMultiKeys (_keys: string[], update: (value: TransactionHistoryItemType[]) => void): void {
    const keys: string[] = _keys.map((k) => `${this.getPrefix()}${k}`);

    chrome.storage.local.get(keys, (result: Record<string, TransactionHistoryItemType[]>): void => {
      lastError('getByMultiKey');

      const items: TransactionHistoryItemType[] = [];

      keys.forEach((k) => {
        if (result[k]) {
          items.push(...result[k]);
        }
      });

      update(items);
    });
  }
}
