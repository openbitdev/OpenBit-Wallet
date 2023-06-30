// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _ChainState } from '@subwallet/extension-base/services/chain-service/types';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function useChainState (slug: string): _ChainState | null {
  const chainStateMap = useSelector((state: RootState) => state.chainStore.chainStateMap);
  const networkState = useMemo(() => {
    return chainStateMap[slug] || null;
  },
  [chainStateMap, slug]);

  return networkState;
}
