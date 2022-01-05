// Copyright 2017-2021 @polkadot/apps authors & contributors
// SPDX-License-Identifier: Apache-2.0


import type { EventRecord } from '@polkadot/types/interfaces';
import type { KeyringOptions } from '@polkadot/ui-keyring/options/types';

import React, { useContext, useEffect } from 'react';


import { stringToU8a } from '@polkadot/util';
import { xxhashAsHex } from '@polkadot/util-crypto';
import {ActionStatus} from "@polkadot/extension-ui/koni/react-components/Status/types";
import {Status as StatusDisplay, StatusContext} from "@polkadot/extension-ui/koni/react-components";
import {useApi, useCall} from "@polkadot/extension-ui/koni/react-hooks";
import useTranslation from "@polkadot/extension-ui/hooks/useTranslation";
import {AccountContext} from "@polkadot/extension-ui/components";

interface Props {
  optionsAll?: KeyringOptions;
}

let prevEventHash: string;

function filterEvents (allAccounts: string[], t: <T = string> (key: string, opts?: Record<string, unknown>) => T, optionsAll?: KeyringOptions, events?: EventRecord[]): ActionStatus[] | null {
  const eventHash = xxhashAsHex(stringToU8a(JSON.stringify(events)));

  if (!optionsAll || !events || eventHash === prevEventHash) {
    return null;
  }

  prevEventHash = eventHash;

  return events
    .map(({ event: { data, method, section } }): ActionStatus | null => {
      if (section === 'balances' && method === 'Transfer') {
        const account = data[1].toString();

        if (allAccounts.includes(account)) {
          return {
            account,
            action: `${section}.${method}`,
            message: t<string>('transfer received'),
            status: 'event'
          };
        }
      } else if (section === 'democracy') {
        const index = data[0].toString();

        return {
          action: `${section}.${method}`,
          message: t<string>('update on #{{index}}', {
            replace: {
              index
            }
          }),
          status: 'event'
        };
      }

      return null;
    })
    .filter((item): item is ActionStatus => !!item);
}

function StatusWrapper ({ optionsAll }: Props): React.ReactElement<Props> {
  const { queueAction } = useContext(StatusContext);
  const { api, isApiReady, apiUrl } = useApi();
  const { accounts } = useContext(AccountContext);
  const { t } = useTranslation();
  const events = useCall<EventRecord[]>(isApiReady && api.query.system?.events, undefined, undefined, apiUrl);

  useEffect((): void => {
    const allAccounts = accounts.map(a => a.address);
    const filtered = filterEvents(allAccounts, t, optionsAll, events);

    filtered && queueAction(filtered);
  }, [accounts, events, optionsAll, queueAction, t]);

  return (
    <StatusDisplay />
  );
}

export default React.memo(StatusWrapper);
