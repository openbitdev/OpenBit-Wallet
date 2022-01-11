// Copyright 2019-2021 @polkadot/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BaseStore from './Base';
import {TransactionHistoryItem} from "@polkadot/extension-base/background/types";
import chrome from "@polkadot/extension-inject/chrome";

const lastError = (type: string): void => {
  const error = chrome.runtime.lastError;

  if (error) {
    console.error(`TransactionHistoryStore.${type}:: runtime.lastError:`, error);
  }
};

export default class TransactionHistoryStore extends BaseStore<TransactionHistoryItem[]> {
  constructor() {
    super('koni_transaction_history_');
  }

  public getByMultiKeys(_keys: string[], update: (value: TransactionHistoryItem[]) => void): void {
    const keys: string[] = _keys.map(k => `${this.getPrefix()}${k}`);

    chrome.storage.local.get(keys, (result: Record<string, TransactionHistoryItem[]>): void => {
      lastError('getByMultiKey');

      const items: TransactionHistoryItem[] = [];

      keys.forEach(k => {
        if (result[k]) {
          items.push(...result[k]);
        }
      });

      update(items);
    });
  }
}
