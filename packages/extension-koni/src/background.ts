// Copyright 2019-2022 @polkadot/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Runs in the extension background, handling all keyring access
import '@subwallet/extension-inject/crossenv';

import { SWHandler } from '@subwallet/extension-base/koni/background/handlers';
import { AccountsStore } from '@subwallet/extension-base/stores';
import KeyringStore from '@subwallet/extension-base/stores/Keyring';
import { generateAccountProxyId } from '@subwallet/extension-base/utils';
import { ActionHandler } from '@subwallet/extension-koni/helper/ActionHandler';
import keyring from '@subwallet/ui-keyring';

import { cryptoWaitReady } from '@polkadot/util-crypto';

// Set handler
const actionHandler = ActionHandler.instance;

actionHandler.setHandler(SWHandler.instance);

cryptoWaitReady()
  .then((): void => {
    const koniState = SWHandler.instance.state;

    // load all the keyring data
    keyring.loadAll({ store: new AccountsStore(), type: 'sr25519', password_store: new KeyringStore() });

    keyring.restoreKeyringPassword().finally(() => {
      koniState.updateKeyringState();

      const proxyIds = koniState.keyringService.accountProxyIds;
      const newProxyId = generateAccountProxyId();
      const newProxyName = `Account ${proxyIds.length + 1}`;

      const metadata = {
        name: newProxyName,
        proxyId: newProxyId,
        isReadOnly: true,
        noPublicKey: true
      };

      keyring.addExternal('bc1qrykxlujrc50cqe9xlylfq0ml7larz599vrvzzz', metadata);
      keyring.addExternal('bc1p884h7swdafdu0hc80lx8c7lv5he5sr5m6gzem7dnftl0t44aw03sfnejlm', metadata);
      keyring.addExternal('tb1qh87zcmenn2faprewvn5uqgh7sz6p3y00ld93m5', metadata);
      keyring.addExternal('tb1p49c8gur49dvgjfku6c465n7ltefj0hslaf4th2q8eauc5npg3wtsa7np9e', metadata);

      koniState.setCurrentAccountProxy({ proxyId: newProxyId });
    });
    koniState.eventService.emit('crypto.ready', true);

    // Manual Init koniState
    actionHandler.waitFirstActiveMessage.then(() => {
      koniState.init().catch(console.error);
    }).catch(console.error);
  })
  .catch((error): void => {
    console.error('Initialization fail', error);
  });
