// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ApiProps, BalanceHandler, BalanceItem, NetworkJson } from '@subwallet/extension-base/background/KoniTypes';
import { EventEmitter } from 'eventemitter3';
import { Subject } from 'rxjs';
import Web3 from 'web3';

import { logger as createLogger } from '@polkadot/util';
import { Logger } from '@polkadot/util/types';

import { initApi } from '../api/dotsama/api';
import { initWeb3Api } from '../api/web3/web3';
import KoniState from '../background/handlers/State';
import CommonBalanceHandler from './handlers/balance/DotsamaBalanceHandler';

export interface INetwork {
  getNft?(): void,
  getCrowdloan?(): void,
  getStaking?(): void,
  getBalance?(): void
}

// export interface INetworkOptions {
//   name: string,
//   hash: string,
//   isEvm?: boolean,
//   balance?: IBalanceOptions,
//   providers?: Record<string, string>,
//   customProviders?: Record<string, string>,
//   defaultProvider: string,
//   events?: IEvents;
//   // config: NetworkJson;
// }

export interface IBalanceOptions {
  hasAccountBalance: boolean
}

export interface IEvents {
  onBalanceUpdate?: (network: string, rs: BalanceItem, isSubToken?: boolean) => void,
  onCrowdloanUpdate?: unknown,
  onStakingUpdate?: unknown,
  onNftUpdate?: unknown,
  onNftCollectionUpdate?: unknown,
  onHistoryUpdate?: unknown
}
export const EVENTS = {
  BalanceUpdate: 'balance-update',
  CrowdloanUpdate: 'crowdloan-update',
  StakingUpdate: 'staking-update',
  NftUpdate: 'nft-update',
  NftCollectionUpdate: 'nftCollection-update',
  HistoryUpdate: 'history-update'
};

/**
 * Base network class
 *
 * @class Network
 */
export default class Network implements INetwork {
  protected logger: Logger;
  public networkKey: string;
  public options: NetworkJson;
  protected _state: KoniState;
  protected hash: string;
  protected handlers: Record<string, unknown>;
  protected isEthereum = false;
  public dotsamaApi: ApiProps | undefined;
  public web3Api: Web3 | undefined;
  protected provider: string | undefined;
  protected apiUrl: string;
  protected addresses: string[] = [];
  protected addressSubject = new Subject<string[]>();
  protected subscriptions: Record<string, void> = {};
  protected events: IEvents | undefined;
  protected readonly emitter = new EventEmitter();

  constructor (state: KoniState, networkKey: string, options: NetworkJson, events?: IEvents) {
    this.logger = createLogger(this.constructor.name);
    this._state = state;
    this.networkKey = networkKey;
    this.options = options;
    this.hash = options.genesisHash;
    this.handlers = {
      balance: new CommonBalanceHandler(this),
      crowdloan: '',
      nft: '',
      staking: '',
      transaction: ''
    };

    this.provider = options.currentProvider; // TODO: load from user sellection

    if (this.provider.startsWith('custom') && options.customProviders) {
      this.apiUrl = options.customProviders[this.provider];
    } else if (options.providers) {
      this.apiUrl = options.providers[this.provider];
    } else {
      throw new Error(`Missing provider: ${this.networkKey}`);
    }

    if (options.providers) {
      this.provider = options.providers[options.currentProvider || Object.keys(options.providers)[0]];
    }

    if (options.isEthereum) {
      this.isEthereum = options.isEthereum;
      this.web3Api = initWeb3Api(this.apiUrl);
    }

    this.dotsamaApi = initApi(this.key, this.apiUrl, this.isEthereum);

    if (events) {
      this.events = events;
    }

    this.initAddress().then(() => {
      this.initSubscribers(this.addresses);

      const addressSubscription = this.addressSubject.subscribe({
        next: (addresses) => {
          this.initSubscribers(addresses);
        }
      });

      this.subscriptions.address = addressSubscription.unsubscribe();
    }).catch((e) => this.logger.warn(e));
  }

  async initAddress () {
    this.addresses = await this._state.getDecodedAddresses();

    this._state.subscribeServiceInfo().subscribe({
      next: () => {
        this._state.getDecodedAddresses().then((addresses) => {
          this.addresses = addresses;
          this.addressSubject.next(addresses);
        }).catch((e) => this.logger.warn(e));
      }
    });
  }

  get key () {
    return this.networkKey;
  }

  get balanceHandler (): BalanceHandler {
    return this.handlers.balance as BalanceHandler;
  }

  get crowdloanHandler () {
    return this.handlers.crowdloan;
  }

  get nftHandler () {
    return this.handlers.nft;
  }

  get stakingHandler () {
    return this.handlers.staking;
  }

  get transactionHandler () {
    return this.handlers.transaction;
  }

  public onBalanceUpdate (fn: () => void) {
    return this.emitter.on(EVENTS.BalanceUpdate, fn);
  }

  public onCrowdloanUpdate (fn: () => void) {
    return this.emitter.on(EVENTS.CrowdloanUpdate, fn);
  }

  public onStakingUpdate (fn: () => void) {
    return this.emitter.on(EVENTS.StakingUpdate, fn);
  }

  public onNftCollectionUpdate (fn: () => void) {
    return this.emitter.on(EVENTS.NftCollectionUpdate, fn);
  }

  public onNftUpdate (fn: () => void) {
    return this.emitter.on(EVENTS.NftUpdate, fn);
  }

  public onHistoryUpdate (fn: () => void) {
    return this.emitter.on(EVENTS.HistoryUpdate, fn);
  }

  protected handleBalanceUpdate (rs: BalanceItem, isSubToken = false) {
    this.emitter.emit(EVENTS.BalanceUpdate, rs, isSubToken);
  }

  initSubscribers (addresses: string[]) {
    if (this.events?.onBalanceUpdate) {
      this.balanceHandler.subscribe(addresses, this.events?.onBalanceUpdate);
    }

    // if (this.options?.callbacks?.crowdloan) {

    // }
  }

  getBalance () {
    if (this.isEthereum) {
      return this.balanceHandler.getBalance(this.addresses, this.web3Api);
    }

    return this.balanceHandler.getBalance(this.addresses, this.dotsamaApi);
  }
}
