// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BaseMigrationJob from '@subwallet/extension-base/services/migration-service/Base';
import { isFirefox } from '@subwallet/extension-base/utils';

export default class MigrateChainPatrolFirefox extends BaseMigrationJob {
  public override async run (): Promise<void> {
    try {
      return new Promise((resolve) => {
        this.state.settingService.getSettings((currentSettings) => {
          this.state.settingService.setSettings({
            ...currentSettings,
            enableChainPatrol: isFirefox() ? false : currentSettings.enableChainPatrol
          });

          resolve();
        });
      });
    } catch (e) {
      console.error(e);
    }
  }
}
