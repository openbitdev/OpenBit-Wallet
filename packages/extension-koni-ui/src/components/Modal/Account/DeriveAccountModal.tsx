// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountProxy } from '@subwallet/extension-base/background/types';
import { AccountProxyItem } from '@subwallet/extension-koni-ui/components';
import BackIcon from '@subwallet/extension-koni-ui/components/Icon/BackIcon';
import { CREATE_ACCOUNT_MODAL, DERIVE_ACCOUNT_MODAL } from '@subwallet/extension-koni-ui/constants/modal';
import useNotification from '@subwallet/extension-koni-ui/hooks/common/useNotification';
import useTranslation from '@subwallet/extension-koni-ui/hooks/common/useTranslation';
import useUnlockChecker from '@subwallet/extension-koni-ui/hooks/common/useUnlockChecker';
import useClickOutSide from '@subwallet/extension-koni-ui/hooks/dom/useClickOutSide';
import useSwitchModal from '@subwallet/extension-koni-ui/hooks/modal/useSwitchModal';
import { deriveAccountProxy } from '@subwallet/extension-koni-ui/messaging';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { searchAccountFunction } from '@subwallet/extension-koni-ui/utils/account/account';
import { renderModalSelector } from '@subwallet/extension-koni-ui/utils/common/dom';
import { ActivityIndicator, ModalContext, SwList, SwModal } from '@subwallet/react-ui';
import { SwListSectionRef } from '@subwallet/react-ui/es/sw-list';
import CN from 'classnames';
import React, { useCallback, useContext, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { GeneralEmptyList } from '../../EmptyList';

type Props = ThemeProps;

const modalId = DERIVE_ACCOUNT_MODAL;

const renderEmpty = () => <GeneralEmptyList />;

const renderLoaderIcon = (x: React.ReactNode): React.ReactNode => {
  return (
    <>
      {x}
      <div className='__loading-icon'>
        <ActivityIndicator />
      </div>
    </>
  );
};

const Component: React.FC<Props> = ({ className }: Props) => {
  const { t } = useTranslation();
  const notify = useNotification();
  const sectionRef = useRef<SwListSectionRef>(null);

  const { checkActive, inactiveModal } = useContext(ModalContext);
  const checkUnlock = useUnlockChecker();

  const { accountProxies } = useSelector((state: RootState) => state.accountState);

  const isActive = checkActive(modalId);

  const [selected, setSelected] = useState('');

  const filteredItems = useMemo(
    () => accountProxies
      .filter((ap) => ap.isMaster),
    [accountProxies]
  );

  const clearSearch = useCallback(() => {
    sectionRef.current?.setSearchValue('');
  }, []);

  const onCancel = useCallback(() => {
    inactiveModal(modalId);
    clearSearch();
  }, [clearSearch, inactiveModal]);

  useClickOutSide(isActive || !!selected, renderModalSelector(className), onCancel);

  const onSelectAccountProxy = useCallback((accountProxy: AccountProxy): () => void => {
    return () => {
      checkUnlock().then(() => {
        setSelected(accountProxy.proxyId);
        setTimeout(() => {
          deriveAccountProxy({
            proxyId: accountProxy.proxyId
          }).then(() => {
            inactiveModal(modalId);
            clearSearch();
          }).catch((e: Error) => {
            notify({
              message: e.message,
              type: 'error'
            });
          }).finally(() => {
            setSelected('');
          });
        }, 500);
      }).catch(() => {
        // User cancel unlock
      });
    };
  }, [checkUnlock, clearSearch, inactiveModal, notify]);

  const renderItem = useCallback((accountProxy: AccountProxy): React.ReactNode => {
    const disabled = !!selected;
    const isSelected = accountProxy.proxyId === selected;

    return (
      <div key={accountProxy.proxyId}>
        <AccountProxyItem
          accountProxy={accountProxy}
          className={CN('account-group-item', { '-disabled': disabled && !isSelected }) }
          onClick={disabled ? undefined : onSelectAccountProxy(accountProxy)}
          renderRightPart={isSelected ? renderLoaderIcon : undefined}
        />
      </div>
    );
  }, [onSelectAccountProxy, selected]);

  const onBack = useSwitchModal(modalId, CREATE_ACCOUNT_MODAL, clearSearch);

  return (
    <SwModal
      className={className}
      closeIcon={(<BackIcon />)}
      id={modalId}
      maskClosable={false}
      onCancel={selected ? undefined : onBack}
      title={t('Select account')}
    >
      <SwList.Section
        displayRow={true}
        enableSearchInput={true}
        list={filteredItems}
        ref={sectionRef}
        renderItem={renderItem}
        renderWhenEmpty={renderEmpty}
        rowGap='var(--row-gap)'
        searchFunction={searchAccountFunction}
        searchPlaceholder={t<string>('Account name')}
      />
    </SwModal>
  );
};

const DeriveAccountModal = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    '--row-gap': `${token.sizeXS}px`,

    '.ant-sw-modal-body': {
      padding: `${token.padding}px 0`,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    },

    '.account-group-item .__loading-icon': {
      minWidth: 40,
      display: 'flex',
      justifyContent: 'center'
    },

    '.disabled': {
      opacity: 0.4
    }
  };
});

export default DeriveAccountModal;
