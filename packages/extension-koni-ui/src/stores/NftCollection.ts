// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NftCollectionJson } from '@koniverse/extension-koni-base/background/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  ready: false,
  nftCollectionList: []
} as NftCollectionJson;

const nftCollectionSlice = createSlice({
  initialState,
  name: 'nftCollection',
  reducers: {
    update (state, action: PayloadAction<NftCollectionJson>) {
      const payload = action.payload;

      state.nftCollectionList = payload.nftCollectionList;
      state.ready = payload.ready;
    }
  }
});

export const { update } = nftCollectionSlice.actions;
export default nftCollectionSlice.reducer;
