// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import type { KeyringAddress } from '@subwallet/ui-keyring/types';

import { keyring } from '@subwallet/ui-keyring';

export function keyringGetAccounts () {
  const results = [...keyring.getAccounts()];

  if (results.length) {
    results.push(
      {
        address: 'bc1ptd969jhzfny2gwuh9qjrrdphj93avne5gfe64y4nvgnnl0sawsdqrgwjzy',
        meta: {
          name: 'ACCOUNT_DEV_RUNE',
          proxyId: 'ACCOUNT_PROXY_DEV_1',
          type: 'bitcoin-86'
        }
      } as unknown as KeyringAddress,
      {
        address: 'bc1pz5ahewgsduhskzun6449pgwevk5wqat9enqt9n9upqy5xkduf2qsyua5s9',
        meta: {
          name: 'ACCOUNT_DEV_INS_1',
          proxyId: 'ACCOUNT_PROXY_DEV_2',
          type: 'bitcoin-86'
        }
      } as unknown as KeyringAddress,
      {
        address: 'bc1psemwltnd4j7tryhwpm4fsyqual4dr9te8zvmv3zl7yvzx2x8rwnq3j2lx4',
        meta: {
          name: 'ACCOUNT_DEV_INS_2',
          proxyId: 'ACCOUNT_PROXY_DEV_3',
          type: 'bitcoin-86'
        }
      } as unknown as KeyringAddress
    );
  }

  return results;
}
