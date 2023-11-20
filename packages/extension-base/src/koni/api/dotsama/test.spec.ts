import { SignedBalance } from '@equilab/api/genshiro/interfaces';
import { _AssetType, _ChainAsset, _ChainInfo } from '@subwallet/chain-list/types';
import { APIItemState, BalanceItem, TokenBalanceRaw } from '@subwallet/extension-base/background/KoniTypes';
import { ASTAR_REFRESH_BALANCE_INTERVAL, SUB_TOKEN_REFRESH_BALANCE_INTERVAL } from '@subwallet/extension-base/constants';
import { PalletNominationPoolsPoolMember } from '@subwallet/extension-base/koni/api/staking/bonding/utils';
import { getEVMBalance } from '@subwallet/extension-base/koni/api/tokens/evm/balance';
import { getERC20Contract } from '@subwallet/extension-base/koni/api/tokens/evm/web3';
import { getPSP22ContractPromise } from '@subwallet/extension-base/koni/api/tokens/wasm';
import { getDefaultWeightV2 } from '@subwallet/extension-base/koni/api/tokens/wasm/utils';
import { state } from '@subwallet/extension-base/koni/background/handlers';
import { _BALANCE_CHAIN_GROUP, _MANTA_ZK_CHAIN_GROUP, _PURE_EVM_CHAINS, _ZK_ASSET_PREFIX } from '@subwallet/extension-base/services/chain-service/constants';
import { _EvmApi, _SubstrateApi } from '@subwallet/extension-base/services/chain-service/types';
import { _checkSmartContractSupportByChain, _getChainNativeTokenSlug, _getContractAddressOfToken, _getTokenOnChainAssetId, _getTokenOnChainInfo, _isChainEvmCompatible, _isPureEvmChain, _isSubstrateRelayChain } from '@subwallet/extension-base/services/chain-service/utils';
import { categoryAddresses, sumBN } from '@subwallet/extension-base/utils';
import BigN from 'bignumber.js';
import { Contract } from 'web3-eth-contract';

import { ApiPromise } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract';
import { AccountInfo } from '@polkadot/types/interfaces';
import { BN, BN_ZERO } from '@polkadot/util';

describe('check get blance', () => {
    test('get balance', async () => {
        console.log('SignedBlanace', BN);
    });
});