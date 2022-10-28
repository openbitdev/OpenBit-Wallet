// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createSubscription } from '@subwallet/extension-base/background/handlers/subscriptions';
import { ActiveCronAndSubscriptionMap, CronServiceType, RequestCronAndSubscriptionAction, RequestInitCronAndSubscription, SubscriptionServiceType } from '@subwallet/extension-base/background/KoniTypes';
import { MessageTypes, RequestTypes, ResponseType } from '@subwallet/extension-base/background/types';
import KoniState from '@subwallet/extension-koni-base/background/handlers/State';
import WebRunnerCron from '@subwallet/extension-koni-base/background/webRunnerCron';
import WebRunnerSubscription from '@subwallet/extension-koni-base/background/webRunnerSubscription';

export default class Mobile {
  private state: KoniState;
  private readonly webRunnerCron: WebRunnerCron;
  private readonly webRunnerSubscription: WebRunnerSubscription;

  constructor (state: KoniState) {
    this.state = state;
    this.webRunnerSubscription = new WebRunnerSubscription(state);
    this.webRunnerCron = new WebRunnerCron(state, this.webRunnerSubscription);
  }

  private cancelSubscription (id: string): boolean {
    return this.state.cancelSubscription(id);
  }

  private createUnsubscriptionHandle (id: string, unsubscribe: () => void): void {
    this.state.createUnsubscriptionHandle(id, unsubscribe);
  }

  public ping (): string {
    return 'mobile:ping';
  }

  public initCronAndSubscription (
    { cron: { activeServices: activeCronServices, intervalMap: cronIntervalMap },
      subscription: { activeServices: activeSubscriptionServices } }: RequestInitCronAndSubscription): ActiveCronAndSubscriptionMap {
    this.webRunnerSubscription.init(activeSubscriptionServices);
    this.webRunnerCron.init(cronIntervalMap, activeCronServices, true);

    return {
      cron: this.webRunnerCron.getActiveServiceMap(),
      subscription: this.webRunnerSubscription.getActiveServiceMap()
    };
  }

  public subscribeActiveCronAndSubscriptionServiceMap (id: string, port: chrome.runtime.Port): ActiveCronAndSubscriptionMap {
    const updater = createSubscription<'mobile(cronAndSubscription.activeService.subscribe)'>(id, port);
    const cronSub = this.webRunnerCron.getActiveServiceMapSubject()
      .subscribe((activeCronServiceMap: Record<CronServiceType, boolean>): void => {
        updater({
          cron: activeCronServiceMap,
          subscription: this.webRunnerSubscription.getActiveServiceMap()
        });
      });

    const subscriptionSub = this.webRunnerSubscription.getActiveServiceMapSubject()
      .subscribe((activeSubscriptionServiceMap: Record<SubscriptionServiceType, boolean>): void => {
        updater({
          cron: this.webRunnerCron.getActiveServiceMap(),
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
      cron: this.webRunnerCron.getActiveServiceMap(),
      subscription: this.webRunnerSubscription.getActiveServiceMap()
    };
  }

  public startCronAndSubscriptionServices ({ cronServices, subscriptionServices }: RequestCronAndSubscriptionAction): void {
    subscriptionServices.forEach((sv) => {
      this.webRunnerSubscription.startService(sv);
    });

    cronServices.forEach((sv) => {
      this.webRunnerCron.startService(sv);
    });

    this.webRunnerCron.getActiveServiceMapSubject().next(this.webRunnerCron.getActiveServiceMap());
  }

  public stopCronAndSubscriptionServices ({ cronServices, subscriptionServices }: RequestCronAndSubscriptionAction): void {
    subscriptionServices.forEach((sv) => {
      this.webRunnerSubscription.stopService(sv);
    });

    cronServices.forEach((sv) => {
      this.webRunnerCron.stopService(sv);
    });

    this.webRunnerCron.getActiveServiceMapSubject().next(this.webRunnerCron.getActiveServiceMap());
  }

  public restartCronAndSubscriptionServices ({ cronServices, subscriptionServices }: RequestCronAndSubscriptionAction): void {
    subscriptionServices.forEach((sv) => {
      this.webRunnerSubscription.restartService(sv);
    });

    cronServices.forEach((sv) => {
      this.webRunnerCron.restartService(sv);
    });

    this.webRunnerCron.getActiveServiceMapSubject().next(this.webRunnerCron.getActiveServiceMap());
  }

  public startCronServices (services: CronServiceType[]): void {
    services.forEach((sv) => {
      this.webRunnerCron.startService(sv);
    });

    this.webRunnerCron.getActiveServiceMapSubject().next(this.webRunnerCron.getActiveServiceMap());
  }

  public stopCronServices (services: CronServiceType[]): void {
    services.forEach((sv) => {
      this.webRunnerCron.stopService(sv);
    });

    this.webRunnerCron.getActiveServiceMapSubject().next(this.webRunnerCron.getActiveServiceMap());
  }

  public restartCronServices (services: CronServiceType[]): void {
    services.forEach((sv) => {
      this.webRunnerCron.restartService(sv);
    });

    this.webRunnerCron.getActiveServiceMapSubject().next(this.webRunnerCron.getActiveServiceMap());
  }

  public startSubscriptionServices (services: SubscriptionServiceType[]): void {
    services.forEach((sv) => {
      this.webRunnerSubscription.startService(sv);
    });

    this.webRunnerSubscription.getActiveServiceMapSubject().next(this.webRunnerSubscription.getActiveServiceMap());
  }

  public stopSubscriptionServices (services: SubscriptionServiceType[]): void {
    services.forEach((sv) => {
      this.webRunnerSubscription.stopService(sv);
    });

    this.webRunnerSubscription.getActiveServiceMapSubject().next(this.webRunnerSubscription.getActiveServiceMap());
  }

  public restartSubscriptionServices (services: SubscriptionServiceType[]): void {
    services.forEach((sv) => {
      this.webRunnerSubscription.restartService(sv);
    });

    this.webRunnerSubscription.getActiveServiceMapSubject().next(this.webRunnerSubscription.getActiveServiceMap());
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async handle<TMessageType extends MessageTypes> (
    id: string,
    type: TMessageType,
    request: RequestTypes[TMessageType],
    port: chrome.runtime.Port): Promise<ResponseType<TMessageType>> {
    switch (type) {
      case 'mobile(ping)':
        return this.ping();
      case 'mobile(cronAndSubscription.init)':
        return this.initCronAndSubscription(request as RequestInitCronAndSubscription);
      case 'mobile(cronAndSubscription.activeService.subscribe)':
        return this.subscribeActiveCronAndSubscriptionServiceMap(id, port);
      case 'mobile(cronAndSubscription.start)':
        return this.startCronAndSubscriptionServices(request as RequestCronAndSubscriptionAction);
      case 'mobile(cronAndSubscription.stop)':
        return this.stopCronAndSubscriptionServices(request as RequestCronAndSubscriptionAction);
      case 'mobile(cronAndSubscription.restart)':
        return this.restartCronAndSubscriptionServices(request as RequestCronAndSubscriptionAction);
      case 'mobile(cron.start)':
        return this.startCronServices(request as CronServiceType[]);
      case 'mobile(cron.stop)':
        return this.stopCronServices(request as CronServiceType[]);
      case 'mobile(cron.restart)':
        return this.restartCronServices(request as CronServiceType[]);
      case 'mobile(subscription.start)':
        return this.startSubscriptionServices(request as SubscriptionServiceType[]);
      case 'mobile(subscription.stop)':
        return this.stopSubscriptionServices(request as SubscriptionServiceType[]);
      case 'mobile(subscription.restart)':
        return this.restartSubscriptionServices(request as SubscriptionServiceType[]);
      default:
        throw new Error(`Unable to handle message of type ${type}`);
    }
  }
}
