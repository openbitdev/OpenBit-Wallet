// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TransactionHistoryItemType } from '@koniverse/extension-koni-base/background/types';
import { TransactionHistoryReducerType } from '@koniverse/extension-koni-ui/stores/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = { historyMap: {} } as TransactionHistoryReducerType;

const transactionHistorySlice = createSlice({
  initialState,
  name: 'transactionHistory',
  reducers: {
    update (state, action: PayloadAction<Record<string, TransactionHistoryItemType[]>>) {
      state.historyMap = action.payload;
    }
  }
});

export const { update: updateCurrentAccount } = transactionHistorySlice.actions;
export default transactionHistorySlice.reducer;
