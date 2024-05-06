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
  },
  ACCOUNT_DEV_BITLAYER: {
    json: {
      address: '0xfb23db59cda36714d8dda0d96a95b82bfdfb2c9d',
      meta: {
        name: 'ACCOUNT_DEV_BITLAYER',
        proxyId: 'ACCOUNT_PROXY_BITLAYER',
        type: 'ethereum',
        isMock: true
      }
    },
    option: {
      key: null,
      name: '0x00D63557A0476D4dE12956BC9E8EC328b7CaC197',
      value: null
    },
    type: 'ethereum' as KeypairType
  },
  ACCOUNT_DEV_BEVM_MAINNET: {
    json: {
      address: '0xB5136FEba197f5fF4B765E5b50c74db717796dcD',
      meta: {
        name: 'ACCOUNT_DEV_BEVM_MAINNET',
        proxyId: 'ACCOUNT_PROXY_BEVM_MAINNET',
        type: 'ethereum',
        isMock: true
      }
    },
    option: {
      key: null,
      name: '0xB5136FEba197f5fF4B765E5b50c74db717796dcD',
      value: null
    },
    type: 'ethereum' as KeypairType
  },
  ACCOUNT_DEV_BOB: {
    json: {
      address: '0xe5bc234A484A912A61Aa74501960cFc202e773dA',
      meta: {
        name: 'ACCOUNT_DEV_BOB',
        proxyId: 'ACCOUNT_PROXY_BOB',
        type: 'ethereum',
        isMock: true
      }
    },
    option: {
      key: null,
      name: '0xe5bc234A484A912A61Aa74501960cFc202e773dA',
      value: null
    },
    type: 'ethereum' as KeypairType
  },
  ACCOUNT_DEV_B2: {
    json: {
      address: '0x5c18ad1e3118654d9149148a5438eb681178fe77',
      meta: {
        name: 'ACCOUNT_DEV_B2',
        proxyId: 'ACCOUNT_PROXY_B2',
        type: 'ethereum',
        isMock: true
      }
    },
    option: {
      key: null,
      name: '0x5c18ad1e3118654d9149148a5438eb681178fe77',
      value: null
    },
    type: 'ethereum' as KeypairType
  },
  ACCOUNT_DEV_BOTANIX_TESTNET: {
    json: {
      address: '0x0Ea320990B44236A0cEd0ecC0Fd2b2df33071e78',
      meta: {
        name: 'ACCOUNT_DEV_BOTANIX_TESTNET',
        proxyId: 'ACCOUNT_PROXY_BOTANIX_TESTNET',
        type: 'ethereum',
        isMock: true
      }
    },
    option: {
      key: null,
      name: '0x0Ea320990B44236A0cEd0ecC0Fd2b2df33071e78',
      value: null
    },
    type: 'ethereum' as KeypairType
  },
  ACCOUNT_DEV_MERLIN: {
    json: {
      address: '0x9B83A0534Bc6dfC9E036184C7f56e7aC8cD99ea5',
      meta: {
        name: 'ACCOUNT_DEV_MERLIN',
        proxyId: 'ACCOUNT_PROXY_MERLIN',
        type: 'ethereum',
        isMock: true
      }
    },
    option: {
      key: null,
      name: '0x9B83A0534Bc6dfC9E036184C7f56e7aC8cD99ea5',
      value: null
    },
    type: 'ethereum' as KeypairType
  }
};

export function updateSubjectInfoWithMockAccount (subjectInfo: SubjectInfo) {
  // subjectInfo[MockAccountProxyMap.ACCOUNT_DEV_BTC.json.address] = MockAccountProxyMap.ACCOUNT_DEV_BTC;
  // subjectInfo[MockAccountProxyMap.ACCOUNT_DEV_RUNE.json.address] = MockAccountProxyMap.ACCOUNT_DEV_RUNE;
  // subjectInfo[MockAccountProxyMap.ACCOUNT_DEV_INS_1.json.address] = MockAccountProxyMap.ACCOUNT_DEV_INS_1;
  // subjectInfo[MockAccountProxyMap.ACCOUNT_DEV_INS_2.json.address] = MockAccountProxyMap.ACCOUNT_DEV_INS_2;
  subjectInfo[MockAccountProxyMap.ACCOUNT_DEV_BITLAYER.json.address] = MockAccountProxyMap.ACCOUNT_DEV_BITLAYER;
  subjectInfo[MockAccountProxyMap.ACCOUNT_DEV_BEVM_MAINNET.json.address] = MockAccountProxyMap.ACCOUNT_DEV_BEVM_MAINNET;
  subjectInfo[MockAccountProxyMap.ACCOUNT_DEV_BOB.json.address] = MockAccountProxyMap.ACCOUNT_DEV_BOB;
  subjectInfo[MockAccountProxyMap.ACCOUNT_DEV_B2.json.address] = MockAccountProxyMap.ACCOUNT_DEV_B2;
  subjectInfo[MockAccountProxyMap.ACCOUNT_DEV_BOTANIX_TESTNET.json.address] = MockAccountProxyMap.ACCOUNT_DEV_BOTANIX_TESTNET;
  subjectInfo[MockAccountProxyMap.ACCOUNT_DEV_MERLIN.json.address] = MockAccountProxyMap.ACCOUNT_DEV_MERLIN;
}

export function keyringGetAccounts () {
  const results = [...keyring.getAccounts()];

  if (results.length) {
    results.push(
      // MockAccountProxyMap.ACCOUNT_DEV_BTC.json as unknown as KeyringAddress,
      // MockAccountProxyMap.ACCOUNT_DEV_RUNE.json as unknown as KeyringAddress,
      // MockAccountProxyMap.ACCOUNT_DEV_INS_1.json as unknown as KeyringAddress,
      // MockAccountProxyMap.ACCOUNT_DEV_INS_2.json as unknown as KeyringAddress
      MockAccountProxyMap.ACCOUNT_DEV_BITLAYER.json as unknown as KeyringAddress,
      MockAccountProxyMap.ACCOUNT_DEV_BEVM_MAINNET.json as unknown as KeyringAddress,
      MockAccountProxyMap.ACCOUNT_DEV_BOB.json as unknown as KeyringAddress,
      MockAccountProxyMap.ACCOUNT_DEV_B2.json as unknown as KeyringAddress,
      MockAccountProxyMap.ACCOUNT_DEV_BOTANIX_TESTNET.json as unknown as KeyringAddress,
      MockAccountProxyMap.ACCOUNT_DEV_MERLIN.json as unknown as KeyringAddress
    );
  }

  return results;
}
