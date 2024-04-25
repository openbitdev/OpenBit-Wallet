// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import type { KeyringAddress } from '@subwallet/ui-keyring/types';

import { KeypairType } from '@subwallet/keyring/types';
import { keyring } from '@subwallet/ui-keyring';
import { SubjectInfo } from '@subwallet/ui-keyring/observable/types';

export const MockAccountProxyMap = {
  ACCOUNT_DEV_BTC: {
    json: {
      address: 'bc1qm34lsc65zpw79lxes69zkqmk6ee3ewf0j77s3h',
      meta: {
        name: 'ACCOUNT_DEV_BTC',
        proxyId: 'ACCOUNT_PROXY_DEV_BTC',
        type: 'bitcoin-84',
        isMock: true
      }
    },
    option: {
      key: null,
      name: 'bc1qm34lsc65zpw79lxes69zkqmk6ee3ewf0j77s3h',
      value: null
    },
    type: 'bitcoin-84' as KeypairType
  },
  ACCOUNT_DEV_RUNE: {
    json: {
      address: 'bc1ptd30xrw4jvp3qg0pf0j6skdgcrtg7fu53w5tg24qfcfgjen0ltfs4gf944',
      meta: {
        name: 'ACCOUNT_DEV_RUNE',
        proxyId: 'ACCOUNT_PROXY_DEV_RUNE',
        type: 'bitcoin-86',
        isMock: true
      }
    },
    option: {
      key: null,
      name: 'bc1ptd30xrw4jvp3qg0pf0j6skdgcrtg7fu53w5tg24qfcfgjen0ltfs4gf944',
      value: null
    },
    type: 'bitcoin-86' as KeypairType
  },
  ACCOUNT_DEV_INS_1: {
    json: {
      address: 'bc1pz5ahewgsduhskzun6449pgwevk5wqat9enqt9n9upqy5xkduf2qsyua5s9',
      meta: {
        name: 'ACCOUNT_DEV_INS_1',
        proxyId: 'ACCOUNT_PROXY_INS_1',
        type: 'bitcoin-86',
        isMock: true
      }
    },
    option: {
      key: null,
      name: 'bc1pz5ahewgsduhskzun6449pgwevk5wqat9enqt9n9upqy5xkduf2qsyua5s9',
      value: null
    },
    type: 'bitcoin-86' as KeypairType
  },
  ACCOUNT_DEV_INS_2: {
    json: {
      address: 'bc1psemwltnd4j7tryhwpm4fsyqual4dr9te8zvmv3zl7yvzx2x8rwnq3j2lx4',
      meta: {
        name: 'ACCOUNT_DEV_INS_2',
        proxyId: 'ACCOUNT_PROXY_INS_2',
        type: 'bitcoin-86',
        isMock: true
      }
    },
    option: {
      key: null,
      name: 'bc1psemwltnd4j7tryhwpm4fsyqual4dr9te8zvmv3zl7yvzx2x8rwnq3j2lx4',
      value: null
    },
    type: 'bitcoin-86' as KeypairType
  }
};

export function updateSubjectInfoWithMockAccount (subjectInfo: SubjectInfo) {
  // subjectInfo[MockAccountProxyMap.ACCOUNT_DEV_BTC.json.address] = MockAccountProxyMap.ACCOUNT_DEV_BTC;
  // subjectInfo[MockAccountProxyMap.ACCOUNT_DEV_RUNE.json.address] = MockAccountProxyMap.ACCOUNT_DEV_RUNE;
  // subjectInfo[MockAccountProxyMap.ACCOUNT_DEV_INS_1.json.address] = MockAccountProxyMap.ACCOUNT_DEV_INS_1;
  subjectInfo[MockAccountProxyMap.ACCOUNT_DEV_INS_2.json.address] = MockAccountProxyMap.ACCOUNT_DEV_INS_2;
}

export function keyringGetAccounts () {
  const results = [...keyring.getAccounts()];

  if (results.length) {
    results.push(
      // MockAccountProxyMap.ACCOUNT_DEV_BTC.json as unknown as KeyringAddress,
      // MockAccountProxyMap.ACCOUNT_DEV_RUNE.json as unknown as KeyringAddress,
      // MockAccountProxyMap.ACCOUNT_DEV_INS_1.json as unknown as KeyringAddress,
      MockAccountProxyMap.ACCOUNT_DEV_INS_2.json as unknown as KeyringAddress
    );
  }

  return results;
}
