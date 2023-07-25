// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { BalanceItem } from '@subwallet/extension-base/background/KoniTypes';
import { _ChainAsset } from '@subwallet/chain-list/types';
import { CosmosApi } from '@subwallet/extension-base/services/chain-service/handler/CosmosApi';
import { _getCosmosTokenDenom } from '@subwallet/extension-base/services/chain-service/utils';

async function getCosmosBalance (netwo)

export function subscribeCosmosBalance (chain: string, addresses: string[], cosmosApiMap: Record<string, CosmosApi>, callback: (rs: BalanceItem) => void, tokenInfo: _ChainAsset) {
  const cosmosApi = cosmosApiMap[chain];

  await Promise.all(addresses.map(async (address) => {
    const coinInfo = await cosmosApi.api.getBalance(address, _getCosmosTokenDenom(tokenInfo));

    console.log('coinInfo', coinInfo);
  }));
}
