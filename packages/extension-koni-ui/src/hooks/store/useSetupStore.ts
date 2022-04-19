// Copyright 2019-2022 @koniverse/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import useSetupBalance from '@koniverse/extension-koni-ui/hooks/store/useSetupBalance';
import useSetupChainRegistry from '@koniverse/extension-koni-ui/hooks/store/useSetupChainRegistry';
import useSetupCrowdloan from '@koniverse/extension-koni-ui/hooks/store/useSetupCrowdloan';
import useSetupNetworkMetadata from '@koniverse/extension-koni-ui/hooks/store/useSetupNetworkMetadata';
import useSetupNft from '@koniverse/extension-koni-ui/hooks/store/useSetupNft';
import useSetupNftCollection from '@koniverse/extension-koni-ui/hooks/store/useSetupNftCollection';
import useSetupNftTransfer from '@koniverse/extension-koni-ui/hooks/store/useSetupNftTransfer';
import useSetupPrice from '@koniverse/extension-koni-ui/hooks/store/useSetupPrice';
import useSetupStaking from '@koniverse/extension-koni-ui/hooks/store/useSetupStaking';
import useSetupStakingReward from '@koniverse/extension-koni-ui/hooks/store/useSetupStakingReward';
import useSetupTransactionHistory from '@koniverse/extension-koni-ui/hooks/store/useSetupTransactionHistory';

export default function useSetupStore (): void {
  useSetupNetworkMetadata();
  useSetupChainRegistry();
  useSetupPrice();
  useSetupBalance();
  useSetupCrowdloan();
  useSetupNft();
  useSetupNftCollection();
  useSetupStaking();
  useSetupStakingReward();
  useSetupTransactionHistory();
  useSetupNftTransfer();
}
