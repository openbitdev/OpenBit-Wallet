// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NetWorkMetadataDef } from '@koniverse/extension-koni-base/background/types';
import { getAllNetworkMetadata } from '@koniverse/extension-koni-ui/messaging';
import { store } from '@koniverse/extension-koni-ui/stores';
import { useEffect } from 'react';

function updateNetworkMetadata (metadataDefs: NetWorkMetadataDef[]): void {
  store.dispatch({ type: 'networkMetadata/update', payload: metadataDefs });
}

export default function useSetupNetworkMetadata (): void {
  useEffect(() => {
    console.log('--- Setup redux: networkMetadata');
    getAllNetworkMetadata().then((metadataDefs) => {
      updateNetworkMetadata(metadataDefs);
    }).catch(console.error);
  }, []);
}
