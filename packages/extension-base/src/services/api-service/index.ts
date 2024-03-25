// Copyright 2019-2022 @subwallet/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountApiGroup } from '@subwallet/extension-base/services/api-service/groups/account';

export class ApiService {
  private readonly accountApiGroup: AccountApiGroup;

  constructor () {
    this.accountApiGroup = new AccountApiGroup();
  }

  public getAccountApiGroup () {
    return this.accountApiGroup;
  }
}
