// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { APIItemState, BalanceHandler, BalanceItem } from '@subwallet/extension-base/background/KoniTypes';
import { Subscription } from 'rxjs';

import { logger as createLogger } from '@polkadot/util';
import { Logger } from '@polkadot/util/types';

import Network from '../../Network';

export default abstract class BaseBalanceHandler implements BalanceHandler {
  subscription: Subscription | undefined;
  public network: Network;
  protected logger: Logger;

  constructor (network: Network) {
    this.network = network;
    this.logger = createLogger(this.constructor.name);
  }

  public getBalance (): void {
    console.log('Implement getBalance here.');
  }

  public subscribe (addresses: string[], callback: (networkKey: string, rs: BalanceItem) => void): void {
    this.stopSubscribe();

    if (!addresses.length) {
      // Return zero balance if not have any address
      const zeroBalance = {
        state: APIItemState.READY,
        free: '0',
        reserved: '0',
        miscFrozen: '0',
        feeFrozen: '0'
      } as BalanceItem;

      callback(this.network.key, zeroBalance);
    } else {
      this.subscribeBalance(addresses, (rs: BalanceItem) => callback(this.network.key, rs));
    }
  }

  protected subscribeBalance (addresses: string[], callback: (rs: BalanceItem) => void) {
    this.logger.warn('Implement subscribeBalance here.');
  }

  public get subscriptionRunning () {
    return !!this.subscription;
  }

  public stopSubscribe () {
    this.subscription && this.subscription.unsubscribe();
    this.subscription = undefined;
  }
}
