// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _ChainAsset, _ChainStatus } from '@subwallet/chain-list/types';
import { _isAssetFungibleToken, _isPureBitcoinChain, _isPureEvmChain } from '@subwallet/extension-base/services/chain-service/utils';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

interface _ChainAssetFilters {
  isActive?: boolean,
  isFungible?: boolean,
  isActiveChain?: boolean,
}

export default function useChainAssets ({ isActive = false, isActiveChain = false, isFungible = true }: _ChainAssetFilters = {}) {
  const { chainInfoMap, chainStateMap } = useSelector((state: RootState) => state.chainStore);
  const { assetRegistry, assetSettingMap } = useSelector((state: RootState) => state.assetRegistry);

  const getChainAssets = useCallback(() => {
    let assets: _ChainAsset[] = Object.values(assetRegistry);

    assets = assets.filter((asset) => {
      const chainInfo = chainInfoMap[asset.originChain];

      if (!chainInfo) {
        return false;
      }

      if (chainInfo.chainStatus !== _ChainStatus.ACTIVE) {
        return false;
      }

      return _isPureBitcoinChain(chainInfo) || _isPureEvmChain(chainInfo);
    });

    if (isFungible) {
      assets = assets.filter((asset) => _isAssetFungibleToken(asset));
    }

    if (isActiveChain) {
      assets = assets.filter((asset) => chainStateMap[asset.originChain]?.active);
    }

    if (isActive) {
      assets = assets.filter((asset) => assetSettingMap[asset.slug]?.visible);
    }

    return assets;
  }, [assetRegistry, assetSettingMap, chainInfoMap, chainStateMap, isActive, isActiveChain, isFungible]);

  const getChainAssetRegistry = useCallback(() => {
    return Object.fromEntries(getChainAssets().map((asset) => [asset.slug, asset]));
  }, [getChainAssets]);

  return { getChainAssets, getChainAssetRegistry };
}
