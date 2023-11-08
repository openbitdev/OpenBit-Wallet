// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { _ChainInfo } from '@subwallet/chain-list/types';
import { _ChainState } from '@subwallet/extension-base/services/chain-service/types';
import { ChainStore, ReduxStatus } from '@subwallet/extension-koni-ui/stores/types';

const initialState: ChainStore = {
  chainInfoMap: {},
  chainStateMap: {},
  checkChainTarget: '',
  reduxStatus: ReduxStatus.INIT
};

const chainStoreSlice = createSlice({
  initialState,
  name: 'chainStore',
  reducers: {
    updateChainInfoMap (state, action: PayloadAction<Record<string, _ChainInfo>>): ChainStore {
      const { payload } = action;

      return {
        ...state,
        chainInfoMap: payload,
        reduxStatus: ReduxStatus.READY
      };
    },
    updateChainStateMap (state, action: PayloadAction<Record<string, _ChainState>>): ChainStore {
      const { payload } = action;

      return {
        ...state,
        chainStateMap: payload,
        reduxStatus: ReduxStatus.READY
      };
    },
    updateCheckChainTarget (state, action: PayloadAction<string>): ChainStore {
      const { payload } = action;

      return {
        ...state,
        checkChainTarget: payload,
        reduxStatus: ReduxStatus.READY
      };
    }
  }
});

export const { updateChainInfoMap, updateChainStateMap, updateCheckChainTarget } = chainStoreSlice.actions;
export default chainStoreSlice.reducer;
