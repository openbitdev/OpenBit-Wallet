// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { StakingJson } from '@koniverse/extension-koni-base/background/types';
import { subscribeStaking } from '@koniverse/extension-koni-ui/messaging';
import { store } from '@koniverse/extension-koni-ui/stores';
import { useEffect } from 'react';

function updateStaking (stakingData: StakingJson): void {
  store.dispatch({ type: 'staking/update', payload: stakingData });
}

export default function useSetupStaking (): void {
  useEffect((): void => {
    console.log('--- Setup redux: staking');
    subscribeStaking(null, updateStaking)
      .then(updateStaking)
      .catch(console.error);
  }, []);
}
