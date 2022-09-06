// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BalanceItem, NetworkJson } from '@subwallet/extension-base/background/KoniTypes';

import { logger as createLogger } from '@polkadot/util';
import { Logger } from '@polkadot/util/types';

import { PREDEFINED_NETWORKS } from '../api/predefinedNetworks';
import KoniState from '../background/handlers/State';
import Chain from '../networks/Chain';

export default class ChainService {
  protected logger: Logger;
  protected state: KoniState;
  public configs: Record<string, NetworkJson>;
  public networks: Record<string, Chain> = {};

  constructor (state: KoniState) {
    this.logger = createLogger('Chain-Srv');
    this.configs = PREDEFINED_NETWORKS;
    this.state = state;

    this.initChains();
  }

  initChains () {
    Object.entries(this.configs).forEach(([key, config]) => {
      if (config.active) {
        this.networks[key] = new Chain(this.state, key, config, {
          onBalanceUpdate: this.handleBalanceUpdate
        });
      }
    });
  }

  handleBalanceUpdate (network: string, item: BalanceItem) {
    this.logger.log(`${network}: `, item);
  }
}
