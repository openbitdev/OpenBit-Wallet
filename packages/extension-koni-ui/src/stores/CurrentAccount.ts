// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountJson } from '@koniverse/extension-base/background/types';
import { CurrentAccountType } from '@koniverse/extension-koni-ui/stores/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {} as CurrentAccountType;

const currentAccountSlice = createSlice({
  initialState,
  name: 'currentAccount',
  reducers: {
    update (state, action: PayloadAction<AccountJson>) {
      state.account = action.payload;
    }
  }
});

export const { update: updateCurrentAccount } = currentAccountSlice.actions;
export default currentAccountSlice.reducer;
