// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BalanceHandler, BalanceItem } from '@subwallet/extension-base/background/KoniTypes';

import { logger as createLogger } from '@polkadot/util';
import { Logger } from '@polkadot/util/types';

import Network from '../../Chain';

type SUBSCRIPTIONS = 'AccountBalance' | 'TokenBalance';

export default abstract class BaseBalanceHandler implements BalanceHandler {
  protected subscriptions: Record<SUBSCRIPTIONS, () => void>;
  public network: Network;
  protected logger: Logger;

  constructor (network: Network) {
    this.network = network;
    this.logger = createLogger(this.constructor.name);
    this.subscriptions = {} as Record<SUBSCRIPTIONS, () => void>;
  }

  public getBalance (): void {
    console.log('Implement getBalance here.');
  }

  public subscribe (addresses: string[], callback: (address: string, rs: BalanceItem, isSubToken?: boolean) => void): void {
    this.stopSubscribe();

    if (addresses.length) {
      this.subscribeBalance(addresses, callback);
    }
  }

  protected subscribeBalance (addresses: string[], callback: (address: string, rs: BalanceItem, isSubToken?: boolean) => void) {
    if (this.network.options.extra?.balance?.accountBalance) {
      this.subscriptions.AccountBalance = this.subscriAccountbeBalance(addresses, callback);
    }

    if (this.network.options.extra?.balance?.tokenBalance) {
      this.subscriptions.TokenBalance = this.subscriAccountbeBalance(addresses, callback);
    }

    this.logger.warn('Implement subscribeBalance here.');
  }

  protected subscriAccountbeBalance (addresses: string[], callback: (address: string, rs: BalanceItem, isSubToken?: boolean) => void): () => void {
    this.logger.warn('Implement subscribeAccountBalance here.');

    return () => {
      this.logger.warn('Implement subscribeAccountBalance callback here.');
    };
  }

  protected subscribeTokenBalance (addresses: string[], callback: (address: string, rs: BalanceItem, isSubToken?: boolean) => void): () => void {
    this.logger.warn('Implement subscribeTokenBalance here.');

    return () => {
      this.logger.warn('Implement subscribeTokenBalance callback here.');
    };
  }

  public get subscriptionRunning () {
    return Object.keys(this.subscriptions).length;
  }

  public stopSubscribe () {
    Object.entries(this.subscriptions).forEach(([key, unsub]) => {
      unsub();
      delete this.subscriptions[key as SUBSCRIPTIONS];
    });
  }
}
