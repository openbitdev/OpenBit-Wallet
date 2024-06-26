// Copyright 2017-2022 @polkadot/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { combineLatest, map } from 'rxjs';
import { accounts } from "./accounts.js";
import { addresses } from "./addresses.js";
import { contracts } from "./contracts.js";
export const obervableAll = combineLatest([accounts.subject, addresses.subject, contracts.subject]).pipe(map(([accounts, addresses, contracts]) => ({
  accounts,
  addresses,
  contracts
})));