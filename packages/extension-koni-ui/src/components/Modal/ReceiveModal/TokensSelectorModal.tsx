// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { GeneralEmptyList } from '@subwallet/extension-koni-ui/components';
import { RECEIVE_QR_MODAL, RECEIVE_TOKEN_SELECTOR_MODAL } from '@subwallet/extension-koni-ui/constants';
import { useSelector, useTranslation } from '@subwallet/extension-koni-ui/hooks';
import { ReceiveTokenItemType, ThemeProps } from '@subwallet/extension-koni-ui/types';
import { Logo, ModalContext, SwList, SwModal } from '@subwallet/react-ui';
import { SwListSectionRef } from '@subwallet/react-ui/es/sw-list';
import React, { useCallback, useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { TokenSelectionItem } from '../../TokenItem';

interface Props extends ThemeProps {
  onSelectItem?: (item: ReceiveTokenItemType) => void,
  items: ReceiveTokenItemType[]
}

const modalId = RECEIVE_TOKEN_SELECTOR_MODAL;

const renderEmpty = () => <GeneralEmptyList />;

function Component ({ className = '', items, onSelectItem }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { activeModal, checkActive, inactiveModal } = useContext(ModalContext);

  const { chainInfoMap } = useSelector((state) => state.chainStore);

  const isActive = checkActive(modalId);

  const sectionRef = useRef<SwListSectionRef>(null);

  const searchFunction = useCallback((item: ReceiveTokenItemType, searchText: string) => {
    const searchTextLowerCase = searchText.toLowerCase();
    const chainName = chainInfoMap[item.originChain]?.name?.toLowerCase();
    const symbol = item.symbol.toLowerCase();

    return (
      symbol.includes(searchTextLowerCase) ||
      chainName.includes(searchTextLowerCase)
    );
  }, [chainInfoMap]);

  const onCancel = useCallback(() => {
    inactiveModal(modalId);
  }, [inactiveModal]);

  const onClickQrBtn = useCallback((item: ReceiveTokenItemType) => {
    return () => {
      onSelectItem && onSelectItem(item);
      inactiveModal(modalId);
      activeModal(RECEIVE_QR_MODAL);
    };
  }, [activeModal, inactiveModal, onSelectItem]);

  useEffect(() => {
    if (!isActive) {
      setTimeout(() => {
        sectionRef.current?.setSearchValue('');
      }, 100);
    }
  }, [isActive]);

  const renderItem = useCallback((item: ReceiveTokenItemType) => {
    return (
      <TokenSelectionItem
        address={item.address}
        className={'token-selector-item'}
        item={item.isRune
          ? ({
            ...item,
            symbol: 'Runes'
          })
          : item}
        key={item.slug}
        leftItem={!item.isRune
          ? undefined
          : (
            <Logo
              isShowSubLogo
              network={'rune'}
              shape={'squircle'}
              size={40}
              subLogoShape={'circle'}
              subNetwork={item.originChain}
            />
          )}
        onClickQrBtn={onClickQrBtn(item)}
        onPressItem={onClickQrBtn(item)}
      />
    );
  }, [onClickQrBtn]);

  return (
    <SwModal
      className={`${className} chain-selector-modal`}
      id={modalId}
      onCancel={onCancel}
      title={t('Select token')}
    >
      <SwList.Section
        enableSearchInput={true}
        list={items}
        ref={sectionRef}
        renderItem={renderItem}
        renderWhenEmpty={renderEmpty}
        searchFunction={searchFunction}
        searchMinCharactersCount={2}
        searchPlaceholder={t<string>('Search token')}
      />
    </SwModal>
  );
}

export const TokensSelectorModal = styled(Component)<Props>(({ theme: { token } }: Props) => {
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

    '.token-selector-item + .token-selector-item': {
      marginTop: token.marginXS
    }
  });
});
