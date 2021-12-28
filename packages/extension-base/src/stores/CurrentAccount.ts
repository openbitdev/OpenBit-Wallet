// Copyright 2019-2021 @polkadot/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BaseStore from './Base';
import {CurrentAccountInfo} from "@polkadot/extension-base/background/types";

export default class CurrentAccountStore extends BaseStore<CurrentAccountInfo> {
  constructor () {
    super('koni_');
  }
}
