// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CurrentAccountInfo } from '@subwallet/extension-base/background/KoniTypes';
import { RequestAccountGroup, RequestCurrentAccountAddress } from '@subwallet/extension-base/background/types';
import { sendMessage } from '@subwallet/extension-koni-ui/messaging/base';

export async function saveCurrentAccountAddress (data: RequestCurrentAccountAddress): Promise<CurrentAccountInfo> {
  return sendMessage('pri(currentAccount.saveAddress)', data);
}

export async function saveCurrentAccountGroup (data: RequestAccountGroup): Promise<boolean> {
  return sendMessage('pri(accountGroups.saveCurrentGroup)', data);
}
