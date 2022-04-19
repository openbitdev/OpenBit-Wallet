// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { StakingRewardJson } from '@koniverse/extension-koni-base/background/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  details: {}
} as StakingRewardJson;

const stakingRewardSlice = createSlice({
  initialState,
  name: 'stakingReward',
  reducers: {
    update (state, action: PayloadAction<StakingRewardJson>) {
      const payload = action.payload;

      state.details = payload.details;
    }
  }
});

export const { update } = stakingRewardSlice.actions;
export default stakingRewardSlice.reducer;
