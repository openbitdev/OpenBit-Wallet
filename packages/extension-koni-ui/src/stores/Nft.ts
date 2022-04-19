// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NftJson } from '@koniverse/extension-koni-base/background/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  total: 0,
  nftList: []
} as NftJson;

const nftSlice = createSlice({
  initialState,
  name: 'nft',
  reducers: {
    update (state, action: PayloadAction<NftJson>) {
      const payload = action.payload;

      state.total = payload.total;
      state.nftList = payload.nftList;
    }
  }
});

export const { update } = nftSlice.actions;
export default nftSlice.reducer;
