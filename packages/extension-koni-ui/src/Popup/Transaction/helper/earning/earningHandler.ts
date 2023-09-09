// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { YieldPoolType } from '@subwallet/extension-base/background/KoniTypes';
import { ALL_KEY } from '@subwallet/extension-koni-ui/constants';
import { fetchChainPool, fetchChainValidator } from '@subwallet/extension-koni-ui/Popup/Transaction/helper';

export function fetchEarningChainValidators (
  chain: string,
  yieldPoolType: string,
  unmount: boolean,
  setPoolLoading: (value: boolean) => void,
  setValidatorLoading: (value: boolean) => void,
  setForceFetchValidator: (value: boolean) => void
) {
  if (yieldPoolType === ALL_KEY) {
    fetchChainValidator(chain, unmount, setValidatorLoading, setForceFetchValidator);
    fetchChainPool(chain, unmount, setPoolLoading, setForceFetchValidator);
  } else if (yieldPoolType === YieldPoolType.NATIVE_STAKING) {
    fetchChainValidator(chain, unmount, setValidatorLoading, setForceFetchValidator);
  } else if (yieldPoolType === YieldPoolType.NOMINATION_POOL) {
    fetchChainPool(chain, unmount, setPoolLoading, setForceFetchValidator);
  }
}
