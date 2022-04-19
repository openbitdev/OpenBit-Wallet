// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BalanceJson } from '@koniverse/extension-koni-base/background/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit/dist';

const initialState = {
  details: {}
} as BalanceJson;

const balanceSlice = createSlice({
  initialState,
  name: 'balance',
  reducers: {
    update (state, action: PayloadAction<BalanceJson>) {
      const payload = action.payload;

      state.details = payload.details;
    }
  }
});

export const { update: updateBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
