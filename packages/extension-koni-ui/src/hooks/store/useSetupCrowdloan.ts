// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CrowdloanJson } from '@koniverse/extension-koni-base/background/types';
import { subscribeCrowdloan } from '@koniverse/extension-koni-ui/messaging';
import { store } from '@koniverse/extension-koni-ui/stores';
import { useEffect } from 'react';

function updateCrowdloan (crowdloan: CrowdloanJson): void {
  store.dispatch({ type: 'crowdloan/update', payload: crowdloan });
}

export default function useSetupCrowdloan (): void {
  useEffect((): void => {
    console.log('--- Setup redux: crowdloan');
    subscribeCrowdloan(null, updateCrowdloan)
      .then(updateCrowdloan)
      .catch(console.error);
  }, []);
}
