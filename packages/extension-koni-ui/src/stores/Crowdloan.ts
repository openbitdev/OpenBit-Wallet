// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CrowdloanJson } from '@koniverse/extension-koni-base/background/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit/dist';

const initialState = {
  details: {}
} as CrowdloanJson;

const crowdloanSlice = createSlice({
  initialState,
  name: 'crowdloan',
  reducers: {
    update (state, action: PayloadAction<CrowdloanJson>) {
      const payload = action.payload;

      state.details = payload.details;
    }
  }
});

export const { update } = crowdloanSlice.actions;
export default crowdloanSlice.reducer;
