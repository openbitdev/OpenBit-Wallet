// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { StakingRewardJson } from '@koniverse/extension-koni-base/background/types';
import { subscribeStakingReward } from '@koniverse/extension-koni-ui/messaging';
import { store } from '@koniverse/extension-koni-ui/stores';
import { useEffect } from 'react';

function updateStakingReward (stakingRewardData: StakingRewardJson): void {
  store.dispatch({ type: 'stakingReward/update', payload: stakingRewardData });
}

export default function useSetupStakingReward (): void {
  useEffect((): void => {
    console.log('--- Setup redux: stakingReward');
    subscribeStakingReward(null, updateStakingReward)
      .then(updateStakingReward)
      .catch(console.error);
  }, []);
}
