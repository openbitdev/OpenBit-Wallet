// Copyright 2019-2021 @polkadot/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BaseStore from './Base';
import {TransactionHistoryItem} from "@polkadot/extension-base/background/types";

export default class TransactionHistory extends BaseStore<TransactionHistoryItem[]> {
  constructor() {
    super('koni_transaction_history_');
  }
}
