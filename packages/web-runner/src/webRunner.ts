// Copyright 2019-2022 @subwallet/web-runner authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '@subwallet/extension-inject/crossenv';

import { AccountsStore } from '@subwallet/extension-base/stores';
import { KoniCron } from '@subwallet/extension-koni-base/background/cron';
import { state } from '@subwallet/extension-koni-base/background/handlers';
import { KoniSubscription } from '@subwallet/extension-koni-base/background/subscription';
import Migration from '@subwallet/extension-koni-base/migration';

import keyring from '@polkadot/ui-keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';

import { PageStatus, responseMessage, setupHandlers } from './messageHandle';

let cron: KoniCron;
let subscriptions: KoniSubscription;

responseMessage({ id: '0', response: { status: 'load' } } as PageStatus);

setupHandlers({
  hotReload: ({ id }) => {
    if (!cron || !subscriptions) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
      cron && cron.stop();
      subscriptions && subscriptions.stop();

      setTimeout(() => {
        cron.stop();
        subscriptions.stop();
      }, 333);

      setTimeout(() => {
        cron.start();
        subscriptions.start();
        resolve();
      }, 999);
    });
  }
});

state.setServiceInfoDelay(999);

// initial setup
cryptoWaitReady()
  .then((): void => {
    console.log('[Mobile] crypto initialized');

    // load all the keyring data
    keyring.loadAll({ store: new AccountsStore(), type: 'sr25519' });

    // Migration
    const migration = new Migration(state);

    migration.run().catch((err) => console.warn(err));

    // Init subcription
    subscriptions = new KoniSubscription({ balance: true, crowdloan: false, stakingOnChain: false });

    // Init cron
    cron = new KoniCron(subscriptions, {
      autoRecoverDotsamaInterval: 20000,
      getApiMapStatusInterval: 5000,
      refreshHistoryInterval: 60000,
      refreshNftInterval: 0,
      refreshPriceInterval: 30000,
      refreshStakeUnlockingInfoInterval: 0,
      refreshStakingRewardInterval: 0
    });
    setTimeout(() => {
      cron.start();
      subscriptions.start();
    }, 3000);

    responseMessage({ id: '0', response: { status: 'crypto_ready' } } as PageStatus);

    console.log('[Mobile] initialization completed');
  })
  .catch((error): void => {
    console.error('[Mobile] initialization failed', error);
  });
