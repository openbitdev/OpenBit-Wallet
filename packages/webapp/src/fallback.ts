// Copyright 2019-2022 @subwallet/webapp authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { del, get, keys as storageKeys, set } from 'idb-keyval';

if (!global.chrome) {
  // @ts-ignore
  global.chrome = {};
}

// @ts-ignore
if (!global.chrome.extension) {
  // @ts-ignore
  global.chrome.extension = {
    getURL: (input: string) => input
  };
}

// @ts-ignore
global.chrome.runtime = {
  lastError: undefined
};

global.chrome.windows = {
  // @ts-ignore
  getCurrent: () => {
    // void
  }
};

global.chrome.tabs = {
  // @ts-ignore
  query: () => {
    // void
  }
};

global.chrome.storage = {
  local: {
    // @ts-ignore
    get: (
      keys: string[] | string | undefined | null,
      callback: (val: object) => void
    ) => {
      (async () => {
        if (!keys) {
          keys = await storageKeys();
        }

        if (typeof keys === 'string') {
          keys = [keys];
        }

        const rs: Record<string, any> = {};

        // Mapping keys with promises from get
        await Promise.all(keys.map(async (k) => {
          rs[k] = await get<string>(k);
        }));

        return rs;
      })().then(callback).catch(console.error);
    },
    // @ts-ignore
    set: (input: object, callback?: () => void) => {
      Promise.all(Object.entries(input).map(async ([k, v]) => {
        await set(k, v);
      })).then(callback).catch(console.error);
    },
    // @ts-ignore
    remove: (key: string, value: any, callback?: () => void) => {
      del(key).then(callback).catch(console.error);
    }
  }
};
