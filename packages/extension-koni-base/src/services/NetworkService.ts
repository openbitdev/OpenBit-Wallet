// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BalanceItem, NetworkJson } from '@subwallet/extension-base/background/KoniTypes';

import { logger as createLogger } from '@polkadot/util';
import { Logger } from '@polkadot/util/types';

import { PREDEFINED_NETWORKS } from '../api/predefinedNetworks';
import KoniState from '../background/handlers/State';
import Network from '../networks/Network';

export default class NetworkService {
  protected logger: Logger;
  protected state: KoniState;
  public configs: Record<string, NetworkJson>;
  public networks: Record<string, Network> = {};

  constructor (state: KoniState) {
    this.logger = createLogger('Network-Srv');
    this.configs = PREDEFINED_NETWORKS;
    this.state = state;

    this.initNetworks();
  }

  initNetworks () {
    Object.entries(this.configs).forEach(([key, config]) => {
      if (config.active) {
        this.networks[key] = new Network(this.state, key, config, {
          onBalanceUpdated: this.handleBalanceUpdate
        });
      }
    });
  }

  handleBalanceUpdate (network: string, item: BalanceItem) {
    this.logger.log(`${network}: `, item);
  }
}
