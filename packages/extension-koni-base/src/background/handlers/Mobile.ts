// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createSubscription } from '@subwallet/extension-base/background/handlers/subscriptions';
import { ActiveCronAndSubscriptionMap, CronServiceType, RequestInitCronAndSubscription, SubscriptionServiceType } from '@subwallet/extension-base/background/KoniTypes';
import { MessageTypes, RequestTypes, ResponseType } from '@subwallet/extension-base/background/types';
import CronManager from '@subwallet/extension-koni-base/background/cronManager';
import KoniState from '@subwallet/extension-koni-base/background/handlers/State';
import SubscriptionManager from '@subwallet/extension-koni-base/background/subscriptionManager';

export default class Mobile {
  private state: KoniState;
  private readonly cronManager: CronManager;
  private readonly subscriptionManager: SubscriptionManager;

  constructor (state: KoniState) {
    this.state = state;
    this.subscriptionManager = new SubscriptionManager(state);
    this.cronManager = new CronManager(state, this.subscriptionManager);
  }

  private cancelSubscription (id: string): boolean {
    return this.state.cancelSubscription(id);
  }

  private createUnsubscriptionHandle (id: string, unsubscribe: () => void): void {
    this.state.createUnsubscriptionHandle(id, unsubscribe);
  }

  public initCronAndSubscription (
    { cron: { activeServices: activeCronServices, intervalMap: cronIntervalMap },
      subscription: { activeServices: activeSubscriptionServices } }: RequestInitCronAndSubscription): ActiveCronAndSubscriptionMap {
    this.subscriptionManager.init(activeSubscriptionServices);
    this.cronManager.init(cronIntervalMap, activeCronServices);

    return {
      cron: this.cronManager.getActiveServiceMap(),
      subscription: this.subscriptionManager.getActiveServiceMap()
    };
  }

  public subscribeActiveCronAndSubscriptionServiceMap (id: string, port: chrome.runtime.Port): ActiveCronAndSubscriptionMap {
    const updater = createSubscription<'mobile(cronAndSubscription.activeService.subscribe)'>(id, port);
    const cronSub = this.cronManager.getActiveServiceMapSubject()
      .subscribe((activeCronServiceMap: Record<CronServiceType, boolean>): void => {
        updater({
          cron: activeCronServiceMap,
          subscription: this.subscriptionManager.getActiveServiceMap()
        });
      });

    const subscriptionSub = this.subscriptionManager.getActiveServiceMapSubject()
      .subscribe((activeSubscriptionServiceMap: Record<SubscriptionServiceType, boolean>): void => {
        updater({
          cron: this.cronManager.getActiveServiceMap(),
          subscription: activeSubscriptionServiceMap
        });
      });

    this.createUnsubscriptionHandle(id, () => {
      cronSub.unsubscribe();
      subscriptionSub.unsubscribe();
    });

    port.onDisconnect.addListener((): void => {
      this.cancelSubscription(id);
    });

    return {
      cron: this.cronManager.getActiveServiceMap(),
      subscription: this.subscriptionManager.getActiveServiceMap()
    };
  }

  public startCronService (service: CronServiceType): void {
    this.cronManager.startService(service, true);
  }

  public startMultiCronServices (services: CronServiceType[]): void {
    services.forEach((sv) => {
      this.cronManager.startService(sv);
    });

    this.cronManager.getActiveServiceMapSubject().next(this.cronManager.getActiveServiceMap());
  }

  public stopCronService (service: CronServiceType): void {
    this.cronManager.stopService(service, true);
  }

  public stopMultiCronServices (services: CronServiceType[]): void {
    services.forEach((sv) => {
      this.cronManager.stopService(sv);
    });

    this.cronManager.getActiveServiceMapSubject().next(this.cronManager.getActiveServiceMap());
  }

  public restartCronService (service: CronServiceType): void {
    this.cronManager.restartService(service, true);
  }

  public restartMultiCronServices (services: CronServiceType[]): void {
    services.forEach((sv) => {
      this.cronManager.restartService(sv);
    });

    this.cronManager.getActiveServiceMapSubject().next(this.cronManager.getActiveServiceMap());
  }

  public startSubscriptionService (service: SubscriptionServiceType): void {
    this.subscriptionManager.startService(service, true);
  }

  public startMultiSubscriptionServices (services: SubscriptionServiceType[]): void {
    services.forEach((sv) => {
      this.subscriptionManager.startService(sv);
    });

    this.subscriptionManager.getActiveServiceMapSubject().next(this.subscriptionManager.getActiveServiceMap());
  }

  public stopSubscriptionService (service: SubscriptionServiceType): void {
    this.subscriptionManager.stopService(service, true);
  }

  public stopMultiSubscriptionServices (services: SubscriptionServiceType[]): void {
    services.forEach((sv) => {
      this.subscriptionManager.stopService(sv);
    });

    this.subscriptionManager.getActiveServiceMapSubject().next(this.subscriptionManager.getActiveServiceMap());
  }

  public restartSubscriptionService (service: SubscriptionServiceType): void {
    this.subscriptionManager.restartService(service, true);
  }

  public restartMultiSubscriptionServices (services: SubscriptionServiceType[]): void {
    services.forEach((sv) => {
      this.subscriptionManager.restartService(sv);
    });

    this.subscriptionManager.getActiveServiceMapSubject().next(this.subscriptionManager.getActiveServiceMap());
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async handle<TMessageType extends MessageTypes> (
    id: string,
    type: TMessageType,
    request: RequestTypes[TMessageType],
    port: chrome.runtime.Port): Promise<ResponseType<TMessageType>> {
    switch (type) {
      case 'mobile(cronAndSubscription.init)':
        return this.initCronAndSubscription(request as RequestInitCronAndSubscription);
      case 'mobile(cronAndSubscription.activeService.subscribe)':
        return this.subscribeActiveCronAndSubscriptionServiceMap(id, port);
      case 'mobile(cron.start)':
        return this.startCronService(request as CronServiceType);
      case 'mobile(cron.multi.start)':
        return this.startMultiCronServices(request as CronServiceType[]);
      case 'mobile(cron.stop)':
        return this.stopCronService(request as CronServiceType);
      case 'mobile(cron.multi.stop)':
        return this.stopMultiCronServices(request as CronServiceType[]);
      case 'mobile(cron.restart)':
        return this.restartCronService(request as CronServiceType);
      case 'mobile(cron.multi.restart)':
        return this.restartMultiCronServices(request as CronServiceType[]);
      case 'mobile(subscription.start)':
        return this.startSubscriptionService(request as SubscriptionServiceType);
      case 'mobile(subscription.multi.start)':
        return this.startMultiSubscriptionServices(request as SubscriptionServiceType[]);
      case 'mobile(subscription.stop)':
        return this.stopSubscriptionService(request as SubscriptionServiceType);
      case 'mobile(subscription.multi.stop)':
        return this.stopMultiSubscriptionServices(request as SubscriptionServiceType[]);
      case 'mobile(subscription.restart)':
        return this.restartSubscriptionService(request as SubscriptionServiceType);
      case 'mobile(subscription.multi.restart)':
        return this.restartMultiSubscriptionServices(request as SubscriptionServiceType[]);
      default:
        throw new Error(`Unable to handle message of type ${type}`);
    }
  }
}
