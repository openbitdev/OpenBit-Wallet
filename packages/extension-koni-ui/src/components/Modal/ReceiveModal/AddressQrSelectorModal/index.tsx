// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { GeneralEmptyList } from '@subwallet/extension-koni-ui/components';
import { AddressQrSelectorItem } from '@subwallet/extension-koni-ui/components/Modal/ReceiveModal/AddressQrSelectorModal/AddressQrSelectorItem';
import { useGetAccountProxyByProxyId, useTranslation } from '@subwallet/extension-koni-ui/hooks';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { getKeypairTypeByAddress } from '@subwallet/keyring';
import { KeypairType } from '@subwallet/keyring/types';
import { Icon, ModalContext, SwList, SwModal } from '@subwallet/react-ui';
import { SwListSectionRef } from '@subwallet/react-ui/es/sw-list';
import { CaretLeft, X } from 'phosphor-react';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import SimpleQrModal from '../SimpleQrModal';

type Props = ThemeProps & {
  modalId: string;
  accountProxyId: string | undefined;
  onBack?: VoidFunction;
}

type ItemInfo = {
  logoKey?: string;
  addressTypeName: string;
  address: string;
  order: number;
  type: KeypairType;
}

function getItemInfo (address: string): ItemInfo {
  const result: ItemInfo = {
    addressTypeName: 'Unknown',
    address,
    order: 99,
    type: 'sr25519'
  };

  const type = getKeypairTypeByAddress(address);

  result.type = type;

  if (type === 'ethereum') {
    result.logoKey = 'ethereum';
    result.addressTypeName = 'Ethereum';
    result.order = 7;
  }

  if (type === 'bitcoin-44') {
    result.logoKey = 'bitcoin';
    result.addressTypeName = 'Bitcoin (BIP44)';
    result.order = 1;
  }

  if (type === 'bitcoin-84') {
    result.logoKey = 'bitcoin';
    result.addressTypeName = 'Bitcoin';
    result.order = 2;
  }

  if (type === 'bitcoin-86') {
    result.logoKey = 'ordinal_rune';
    result.addressTypeName = 'Ordinal, Runes';
    result.order = 3;
  }

  if (type === 'bittest-44') {
    result.logoKey = 'bitcoinTestnet';
    result.addressTypeName = 'Bitcoin testnet';
    result.order = 4;
  }

  if (type === 'bittest-84') {
    result.logoKey = 'bitcoinTestnet';
    result.addressTypeName = 'Bitcoin testnet';
    result.order = 5;
  }

  if (type === 'bittest-86') {
    result.logoKey = 'bitcoinTestnet';
    result.addressTypeName = 'Bitcoin testnet (BIP86)';
    result.order = 6;
  }

  return result;
}

const renderEmpty = () => <GeneralEmptyList />;

function Component ({ accountProxyId, className = '', modalId, onBack }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { activeModal, checkActive, inactiveModal } = useContext(ModalContext);
  const accountProxy = useGetAccountProxyByProxyId(accountProxyId);
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(undefined);

  const isActive = checkActive(modalId);

  const sectionRef = useRef<SwListSectionRef>(null);

  const items = useMemo(() => {
    if (!accountProxy) {
      return [];
    }

    return accountProxy.accounts.map((a) => getItemInfo(a.address)).filter((i) => {
      return ['ethereum', 'bitcoin-84', 'bitcoin-86', 'bittest-84'].includes(i.type);
    }).sort((a, b) => a.order - b.order);
  }, [accountProxy]);

  const searchFunction = useCallback((item: ItemInfo, searchText: string) => {
    const searchTextLowerCase = searchText.toLowerCase();

    return (
      item.addressTypeName.toLowerCase().includes(searchTextLowerCase) ||
      item.address.toLowerCase().includes(searchTextLowerCase)
    );
  }, []);

  const receiveQrModalId = useMemo(() => {
    return modalId + '-receive-qr-modal-id';
  }, [modalId]);

  const onCancel = useCallback(() => {
    inactiveModal(modalId);
  }, [inactiveModal, modalId]);

  const onBackFromQrModal = useCallback(() => {
    inactiveModal(receiveQrModalId);
    activeModal(modalId);
  }, [activeModal, inactiveModal, modalId, receiveQrModalId]);

  const onClickQrBtn = useCallback((item: ItemInfo) => {
    return () => {
      inactiveModal(modalId);
      setSelectedAddress(item.address);
      activeModal(receiveQrModalId);
    };
  }, [activeModal, inactiveModal, modalId, receiveQrModalId]);

  const renderItem = useCallback((item: ItemInfo) => {
    return (
      <AddressQrSelectorItem
        address={item.address}
        addressTypeName={item.addressTypeName}
        className={'address-selector-item'}
        key={item.address}
        logoKey={item.logoKey}
        onClickQrBtn={onClickQrBtn(item)}
      />
    );
  }, [onClickQrBtn]);

  useEffect(() => {
    if (!isActive) {
      setTimeout(() => {
        sectionRef.current?.setSearchValue('');
      }, 100);
    }
  }, [isActive]);

  return (
    <>
      <SwModal
        className={`${className}`}
        closeIcon={onBack
          ? (
            <Icon
              customSize={'24px'}
              phosphorIcon={CaretLeft}
            />
          )
          : undefined}
        id={modalId}
        onCancel={onBack || onCancel}
        rightIconProps={onBack
          ? {
            icon: (
              <Icon
                customSize={'24px'}
                phosphorIcon={X}
              />
            ),
            onClick: onCancel
          }
          : undefined}
        title={t('Select address')}
      >
        <SwList.Section
          enableSearchInput={true}
          list={items}
          ref={sectionRef}
          renderItem={renderItem}
          renderWhenEmpty={renderEmpty}
          searchFunction={searchFunction}
          searchMinCharactersCount={1}
          searchPlaceholder={t<string>('Account type, address')}
        />
      </SwModal>

      <SimpleQrModal
        address={selectedAddress}
        id={receiveQrModalId}
        onBack={onBackFromQrModal}
      />
    </>
  );
}

export const AddressQrSelectorModal = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return ({
    '.ant-sw-modal-content': {
      minHeight: 474
    },

    '.ant-sw-list-search-input': {
      paddingBottom: token.paddingXS
    },

    '.ant-sw-modal-body': {
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: token.padding,
      marginBottom: 0,
      display: 'flex'
    },

    '.ant-sw-list-section': {
      flex: 1
    },

    '.ant-sw-list-section .ant-sw-list': {
      paddingBottom: 0
    },

    '.address-selector-item + .address-selector-item': {
      marginTop: token.marginXS
    }
  });
});

export default AddressQrSelectorModal;
