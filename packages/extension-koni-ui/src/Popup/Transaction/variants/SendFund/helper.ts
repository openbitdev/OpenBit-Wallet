// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _AssetRef, _ChainAsset, _ChainInfo, _MultiChainAsset } from '@subwallet/chain-list/types';
import { AssetSetting } from '@subwallet/extension-base/background/KoniTypes';
import { AccountJson } from '@subwallet/extension-base/background/types';
import { _getOriginChainOfAsset, _isAssetFungibleToken, _isChainEvmCompatible, _isMantaZkAsset } from '@subwallet/extension-base/services/chain-service/utils';
import { TokenItemType } from '@subwallet/extension-koni-ui/components';
import { ChainItemType } from '@subwallet/extension-koni-ui/types';
import { findAccountByAddress, findNetworkJsonByGenesisHash, isAccountAll } from '@subwallet/extension-koni-ui/utils';

import { isEthereumAddress } from '@polkadot/util-crypto';

function isAssetTypeValid (
  chainAsset: _ChainAsset,
  chainInfoMap: Record<string, _ChainInfo>,
  isAccountEthereum: boolean
) {
  return _isChainEvmCompatible(chainInfoMap[chainAsset.originChain]) === isAccountEthereum;
}

export function getTokenItems (
  address: string,
  accounts: AccountJson[],
  chainInfoMap: Record<string, _ChainInfo>,
  assetRegistry: Record<string, _ChainAsset>,
  assetSettingMap: Record<string, AssetSetting>,
  multiChainAssetMap: Record<string, _MultiChainAsset>,
  tokenGroupSlug?: string, // is ether a token slug or a multiChainAsset slug
  isZkModeEnabled?: boolean
): TokenItemType[] {
  const account = findAccountByAddress(accounts, address);

  if (!account) {
    return [];
  }

  const isLedger = !!account.isHardware;
  const validGen: string[] = account.availableGenesisHashes || [];
  const validLedgerNetwork = validGen.map((genesisHash) => findNetworkJsonByGenesisHash(chainInfoMap, genesisHash)?.slug);
  const isAccountEthereum = isEthereumAddress(address);
  const isSetTokenSlug = !!tokenGroupSlug && !!assetRegistry[tokenGroupSlug];
  const isSetMultiChainAssetSlug = !!tokenGroupSlug && !!multiChainAssetMap[tokenGroupSlug];

  if (tokenGroupSlug) {
    if (!(isSetTokenSlug || isSetMultiChainAssetSlug)) {
      return [];
    }

    const chainAsset = assetRegistry[tokenGroupSlug];
    const isValidLedger = isLedger ? (isAccountEthereum || validLedgerNetwork.includes(chainAsset?.originChain)) : true;

    if (isSetTokenSlug) {
      if (isAssetTypeValid(chainAsset, chainInfoMap, isAccountEthereum) && isValidLedger) {
        const { name, originChain, slug, symbol } = assetRegistry[tokenGroupSlug];

        return [
          {
            name,
            slug,
            symbol,
            originChain
          }
        ];
      } else {
        return [];
      }
    }
  }

  const items: TokenItemType[] = [];

  Object.values(assetRegistry).forEach((chainAsset) => {
    const isValidLedger = isLedger ? (isAccountEthereum || validLedgerNetwork.includes(chainAsset?.originChain)) : true;
    const isTokenFungible = _isAssetFungibleToken(chainAsset);

    if (!(isTokenFungible && isAssetTypeValid(chainAsset, chainInfoMap, isAccountEthereum) && isValidLedger)) {
      return;
    }

    if (!isZkModeEnabled && _isMantaZkAsset(chainAsset)) {
      return;
    }

    if (isSetMultiChainAssetSlug) {
      if (chainAsset.multiChainAsset === tokenGroupSlug) {
        items.push({
          name: chainAsset.name,
          slug: chainAsset.slug,
          symbol: chainAsset.symbol,
          originChain: chainAsset.originChain
        });
      }
    } else {
      items.push({
        name: chainAsset.name,
        slug: chainAsset.slug,
        symbol: chainAsset.symbol,
        originChain: chainAsset.originChain
      });
    }
  });

  return items;
}

export function getTokenAvailableDestinations (tokenSlug: string, xcmRefMap: Record<string, _AssetRef>, chainInfoMap: Record<string, _ChainInfo>): ChainItemType[] {
  if (!tokenSlug) {
    return [];
  }

  const result: ChainItemType[] = [];
  const originChain = chainInfoMap[_getOriginChainOfAsset(tokenSlug)];

  // Firstly, push the originChain of token
  result.push({
    name: originChain.name,
    slug: originChain.slug
  });

  Object.values(xcmRefMap).forEach((xcmRef) => {
    if (xcmRef.srcAsset === tokenSlug) {
      const destinationChain = chainInfoMap[xcmRef.destChain];

      result.push({
        name: destinationChain.name,
        slug: destinationChain.slug
      });
    }
  });

  return result;
}

const defaultFilterAccount = (account: AccountJson): boolean => !(isAccountAll(account.address) || account.isReadOnly);

export const filterAccountFunc = (
  chainInfoMap: Record<string, _ChainInfo>,
  assetRegistry: Record<string, _ChainAsset>,
  multiChainAssetMap: Record<string, _MultiChainAsset>,
  tokenGroupSlug?: string // is ether a token slug or a multiChainAsset slug
): (account: AccountJson) => boolean => {
  const isSetTokenSlug = !!tokenGroupSlug && !!assetRegistry[tokenGroupSlug];
  const isSetMultiChainAssetSlug = !!tokenGroupSlug && !!multiChainAssetMap[tokenGroupSlug];

  if (!tokenGroupSlug) {
    return defaultFilterAccount;
  }

  const chainAssets = Object.values(assetRegistry).filter((chainAsset) => {
    const isTokenFungible = _isAssetFungibleToken(chainAsset);

    if (isTokenFungible) {
      if (isSetTokenSlug) {
        return chainAsset.slug === tokenGroupSlug;
      }

      if (isSetMultiChainAssetSlug) {
        return chainAsset.multiChainAsset === tokenGroupSlug;
      }
    } else {
      return false;
    }

    return false;
  });

  return (account: AccountJson): boolean => {
    const isLedger = !!account.isHardware;
    const isAccountEthereum = isEthereumAddress(account.address);
    const validGen: string[] = account.availableGenesisHashes || [];
    const validLedgerNetwork = validGen.map((genesisHash) => findNetworkJsonByGenesisHash(chainInfoMap, genesisHash)?.slug) || [];

    if (!defaultFilterAccount(account)) {
      return false;
    }

    return chainAssets.some((chainAsset) => {
      const isValidLedger = isLedger ? (isAccountEthereum || validLedgerNetwork.includes(chainAsset?.originChain)) : true;

      return isAssetTypeValid(chainAsset, chainInfoMap, isAccountEthereum) && isValidLedger;
    });
  };
};
