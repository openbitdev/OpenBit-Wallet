// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ApiProps, BalanceHandler, BalanceItem, CrowdloanItem, NetworkJson, NftCollection, NftItem, StakingItem, TransactionHistoryItemType } from '@subwallet/extension-base/background/KoniTypes';
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
  onBalanceUpdate?: (network: string, address: string, rs: BalanceItem, isSubToken?: boolean) => void,
  onCrowdloanUpdate?: (address: string, rs: CrowdloanItem) => void,
  onStakingUpdate?: (address: string, rs: StakingItem) => void,
  onNftUpdate?: (address: string, rs: NftItem) => void,
  onNftCollectionUpdate?: (rs: NftCollection) => void,
  onHistoryUpdate?: (address: string, rs: TransactionHistoryItemType) => void
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
      // TODO: create handler depend on configurations
      balance: new CommonBalanceHandler(this),
      crowdloan: '',
      nft: '',
      nftCollection: '',
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

    this.initSubscribers();

    this.initAddressSubscriber().then(() => {
      this.initEvents(this.addresses);

      const addressSubscription = this.addressSubject.subscribe({
        next: (addresses) => {
          this.initEvents(addresses);
        }
      });

      this.subscriptions.address = addressSubscription.unsubscribe();
    }).catch((e) => this.logger.warn(e));
  }

  async initAddressSubscriber () {
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

  get nftCollectionHandler () {
    return this.handlers.nftCollection;
  }

  get stakingHandler () {
    return this.handlers.staking;
  }

  get transactionHandler () {
    return this.handlers.transaction;
  }

  public onBalanceUpdate (fn: (network: string, address: string, rs: BalanceItem, isSubToken?: boolean) => void) {
    return this.emitter.on(EVENTS.BalanceUpdate, fn);
  }

  public onCrowdloanUpdate (fn: (network: string, address: string, rs: CrowdloanItem) => void) {
    return this.emitter.on(EVENTS.CrowdloanUpdate, fn);
  }

  public onStakingUpdate (fn: (network: string, address: string, rs: StakingItem) => void) {
    return this.emitter.on(EVENTS.StakingUpdate, fn);
  }

  public onNftCollectionUpdate (fn: (network: string, rs: NftCollection) => void) {
    return this.emitter.on(EVENTS.NftCollectionUpdate, fn);
  }

  public onNftUpdate (fn: (network: string, address: string, rs: NftItem) => void) {
    return this.emitter.on(EVENTS.NftUpdate, fn);
  }

  public onHistoryUpdate (fn: (network: string, address: string, rs: TransactionHistoryItemType) => void) {
    return this.emitter.on(EVENTS.HistoryUpdate, fn);
  }

  protected handleBalanceUpdate (address: string, rs: BalanceItem, isSubToken = false) {
    this.emitter.emit(EVENTS.BalanceUpdate, this.key, address, rs, isSubToken);
  }

  protected handleCrowdloanUpdate (address: string, rs: CrowdloanItem) {
    this.emitter.emit(EVENTS.CrowdloanUpdate, this.key, address, rs);
  }

  protected handleStakingUpdate (address: string, rs: StakingItem) {
    this.emitter.emit(EVENTS.StakingUpdate, this.key, address, rs);
  }

  protected handleNftCollectionUpdate (rs: NftCollection) {
    this.emitter.emit(EVENTS.NftCollectionUpdate, this.key, rs);
  }

  protected handleNftUpdate (address: string, rs: NftItem) {
    this.emitter.emit(EVENTS.NftUpdate, this.key, address, rs);
  }

  protected handleHistoryUpdate (address: string, rs: TransactionHistoryItemType) {
    this.emitter.emit(EVENTS.HistoryUpdate, this.key, address, rs);
  }

  initEvents (addresses: string[]) {
    this.balanceHandler.subscribe(addresses, this.handleBalanceUpdate);
    // TODO: Uncomment to implement logic
    // this.crowdloanHandler.subscribe(addresses, this.handleCrowdloanUpdate);
    // this.stakingHandler.subscribe(addresses, this.handleStakingUpdate);
    // this.nftHandler.subscribe(addresses, this.handleNftUpdate);
    // this.nftCollectionHandler.subscribe(addresses, this.handleNftCollectionUpdate);
    // this.transactionHandler.subscribe(addresses, this.handleHistoryUpdate);
  }

  initSubscribers () {
    if (this.events?.onBalanceUpdate) {
      this.onBalanceUpdate(this.events?.onBalanceUpdate);
    }

    // TODO: Uncomment to implement logic
    // if (this.events?.onCrowdloanUpdate) {
    //   this.onCrowdloanUpdate(this.events?.onCrowdloanUpdate);
    // }

    // if (this.events?.onStakingUpdate) {
    //   this.onStakingUpdate(this.events?.onStakingUpdate);
    // }

    // if (this.events?.onNftUpdate) {
    //   this.onNftUpdate(this.events?.onNftUpdate);
    // }

    // if (this.events?.onNftCollectionUpdate) {
    //   this.onNftCollectionUpdate(this.events?.onNftCollectionUpdate);
    // }

    // if (this.events?.onHistoryUpdate) {
    //   this.onHistoryUpdate(this.events?.onHistoryUpdate);
    // }
  }

  getBalance () {
    if (this.isEthereum) {
      return this.balanceHandler.getBalance(this.addresses, this.web3Api);
    }

    return this.balanceHandler.getBalance(this.addresses, this.dotsamaApi);
  }
}
