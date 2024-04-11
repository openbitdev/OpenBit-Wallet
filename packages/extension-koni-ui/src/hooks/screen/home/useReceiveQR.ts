// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _ChainAsset } from '@subwallet/chain-list/types';
import { AccountGroup } from '@subwallet/extension-base/background/types';
import { _getMultiChainAsset, _isAssetFungibleToken, _isNativeToken } from '@subwallet/extension-base/services/chain-service/utils';
import { AccountSelectorModalId } from '@subwallet/extension-koni-ui/components/Modal/AccountSelectorModal';
import { SUPPORT_CHAINS } from '@subwallet/extension-koni-ui/constants';
import { RECEIVE_QR_MODAL, RECEIVE_TOKEN_SELECTOR_MODAL } from '@subwallet/extension-koni-ui/constants/modal';
import { useChainAssets } from '@subwallet/extension-koni-ui/hooks/assets';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import { ReceiveTokenItemType } from '@subwallet/extension-koni-ui/types';
import { isAccountAll as checkIsAccountAll } from '@subwallet/extension-koni-ui/utils';
import { getKeypairTypeByAddress } from '@subwallet/keyring';
import { ModalContext } from '@subwallet/react-ui';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

type ReceiveSelectedResult = {
  selectedAccountGroupId?: string;
  selectedAccountGroupAddress?: string;
  selectedNetwork?: string;
};

function getTokenSelectorItem (asset: _ChainAsset, accountGroup: AccountGroup): ReceiveTokenItemType | null {
  if (!_isAssetFungibleToken(asset) || !SUPPORT_CHAINS.includes(asset.originChain)) {
    return null;
  }

  const targetAccount = accountGroup.accounts.find((a) => {
    const accountType = getKeypairTypeByAddress(a.address);

    if (accountType === 'ethereum' && asset.originChain === 'ethereum' && _isNativeToken(asset)) {
      return true;
    }

    if (accountType === 'bitcoin-84' && asset.originChain === 'bitcoin') {
      return true;
    }

    if (accountType === 'bittest-84' && asset.originChain === 'bitcoinTestnet') {
      return true;
    }

    return false;
  });

  if (!targetAccount) {
    return null;
  }

  return {
    ...asset,
    address: targetAccount.address
  };
}

export default function useReceiveQR (tokenGroupSlug?: string) {
  const { activeModal, inactiveModal } = useContext(ModalContext);
  const isAllAccount = useSelector((state: RootState) => state.accountState.isAllAccount);
  const accountGroups = useSelector((state: RootState) => state.accountState.accountGroups);
  const currentAccountGroup = useSelector((state: RootState) => state.accountState.currentAccountGroup);
  const assetRegistryMap = useChainAssets().chainAssetRegistry;
  const [tokenSelectorItems, setTokenSelectorItems] = useState<ReceiveTokenItemType[]>([]);
  const [{ selectedAccountGroupAddress, selectedAccountGroupId, selectedNetwork }, setReceiveSelectedResult] = useState<ReceiveSelectedResult>(
    { selectedAccountGroupId: isAllAccount ? undefined : currentAccountGroup?.groupId }
  );

  const accountSelectorItems = useMemo<AccountGroup[]>(() => {
    if (!isAllAccount) {
      return [];
    }

    return accountGroups.filter((ag) => !checkIsAccountAll(ag.groupId));
  }, [isAllAccount, accountGroups]);

  const getTokenSelectorItems = useCallback((accountGroup: AccountGroup) => {
    // if tokenGroupSlug is token slug
    if (tokenGroupSlug && assetRegistryMap[tokenGroupSlug]) {
      const tokenItem = getTokenSelectorItem(assetRegistryMap[tokenGroupSlug], accountGroup);

      if (tokenItem) {
        return [tokenItem];
      }

      return [];
    }

    const result: ReceiveTokenItemType[] = [];

    Object.values(assetRegistryMap).forEach((asset) => {
      if (tokenGroupSlug && (_getMultiChainAsset(asset) !== tokenGroupSlug)) {
        return;
      }

      const tokenItem = getTokenSelectorItem(asset, accountGroup);

      if (tokenItem) {
        result.push(tokenItem);
      }
    });

    return result;
  }, [tokenGroupSlug, assetRegistryMap]);

  const onOpenReceive = useCallback(() => {
    if (!currentAccountGroup) {
      return;
    }

    if (checkIsAccountAll(currentAccountGroup.groupId)) {
      activeModal(AccountSelectorModalId);
    } else {
      const _tokenSelectorItems = getTokenSelectorItems(currentAccountGroup);

      setTokenSelectorItems(_tokenSelectorItems);

      if (tokenGroupSlug) {
        if (_tokenSelectorItems.length === 1) {
          setReceiveSelectedResult((prev) => ({ ...prev, selectedNetwork: _tokenSelectorItems[0].originChain, selectedAccountGroupAddress: _tokenSelectorItems[0].address }));
          activeModal(RECEIVE_QR_MODAL);

          return;
        }
      }

      activeModal(RECEIVE_TOKEN_SELECTOR_MODAL);
    }
  }, [activeModal, currentAccountGroup, getTokenSelectorItems, tokenGroupSlug]);

  const onSelectAccountGroup = useCallback((accountGroup: AccountGroup) => {
    setReceiveSelectedResult({ selectedAccountGroupId: accountGroup.groupId });
    const _tokenSelectorItems = getTokenSelectorItems(accountGroup);

    setTokenSelectorItems(_tokenSelectorItems);

    if (tokenGroupSlug) {
      if (_tokenSelectorItems.length === 1) {
        setReceiveSelectedResult((prev) => ({ ...prev, selectedNetwork: _tokenSelectorItems[0].originChain, selectedAccountGroupAddress: _tokenSelectorItems[0].address }));
        activeModal(RECEIVE_QR_MODAL);
        inactiveModal(AccountSelectorModalId);

        return;
      }
    }

    activeModal(RECEIVE_TOKEN_SELECTOR_MODAL);
    inactiveModal(AccountSelectorModalId);
  }, [activeModal, getTokenSelectorItems, inactiveModal, tokenGroupSlug]);

  const onSelectToken = useCallback((item: ReceiveTokenItemType) => {
    setReceiveSelectedResult((prevState) => ({ ...prevState, selectedNetwork: item.originChain, selectedAccountGroupAddress: item.address }));
  }, []);

  useEffect(() => {
    setReceiveSelectedResult((prev) => ({
      ...prev,
      selectedAccountGroupId: currentAccountGroup?.groupId
    }));
  }, [currentAccountGroup?.groupId]);

  return {
    onOpenReceive,
    onSelectAccountGroup,
    onSelectToken,
    accountSelectorItems,
    tokenSelectorItems,
    selectedAccountGroupId,
    selectedAccountGroupAddress,
    selectedNetwork
  };
}
