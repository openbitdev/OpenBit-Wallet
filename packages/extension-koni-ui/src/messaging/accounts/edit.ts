// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { sendMessage } from '../base';

export async function editAccount (address: string, name: string): Promise<boolean> {
  return sendMessage('pri(accounts.edit)', { address, name });
}

export async function editAccountGroup (groupId: string, name: string): Promise<boolean> {
  return sendMessage('pri(accountGroups.edit)', { groupId, name });
}

export async function forgetAccount (address: string, lockAfter = false): Promise<boolean> {
  return sendMessage('pri(accounts.forget)', { address, lockAfter });
}

export async function forgetAccountGroup (groupId: string): Promise<boolean> {
  return sendMessage('pri(accountGroups.forget)', { groupId });
}
