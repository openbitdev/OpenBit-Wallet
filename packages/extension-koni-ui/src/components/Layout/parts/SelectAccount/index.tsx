// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountGroup } from '@subwallet/extension-base/background/types';
import { AccountGroupBriefInfo, AccountGroupSelectorAllItem, AccountGroupSelectorItem, AddressQrSelectorModal } from '@subwallet/extension-koni-ui/components';
import { SELECT_ACCOUNT_MODAL } from '@subwallet/extension-koni-ui/constants';
import { useDefaultNavigate, useGetCurrentAuth, useGetCurrentTab, useGoBackSelectAccount, useIsPopup, useTranslation } from '@subwallet/extension-koni-ui/hooks';
import { saveCurrentAccountGroup } from '@subwallet/extension-koni-ui/messaging';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import { Theme } from '@subwallet/extension-koni-ui/themes';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { groupFuncSortByName, isAccountAll, searchAccountGroupFunction } from '@subwallet/extension-koni-ui/utils';
import { BackgroundIcon, ModalContext, SelectModal, Tooltip } from '@subwallet/react-ui';
import CN from 'classnames';
import { Plug, Plugs, PlugsConnected } from 'phosphor-react';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { GeneralEmptyList } from '../../../EmptyList';
import { ConnectWebsiteModal } from '../ConnectWebsiteModal';
import SelectAccountFooter from '../SelectAccount/Footer';

type Props = ThemeProps

enum ConnectionStatement {
  NOT_CONNECTED='not-connected',
  CONNECTED='connected',
  PARTIAL_CONNECTED='partial-connected',
  DISCONNECTED='disconnected',
  BLOCKED='blocked'
}

const iconMap = {
  [ConnectionStatement.NOT_CONNECTED]: Plug,
  [ConnectionStatement.CONNECTED]: PlugsConnected,
  [ConnectionStatement.PARTIAL_CONNECTED]: PlugsConnected,
  [ConnectionStatement.DISCONNECTED]: Plugs,
  [ConnectionStatement.BLOCKED]: Plugs
};

const ConnectWebsiteId = 'connectWebsiteId';

const renderEmpty = () => <GeneralEmptyList />;

const modalId = SELECT_ACCOUNT_MODAL;
const addressQrSelectorModalId = 'address-qr-selector-modal-id';

function Component ({ className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { activeModal, inactiveModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { goHome } = useDefaultNavigate();

  const { accountGroups: _accountGroups, currentAccountGroup, isAllAccount } = useSelector((state: RootState) => state.accountState);

  const [connected] = useState(0);
  const [canConnect] = useState(0);
  const [connectionState] = useState<ConnectionStatement>(ConnectionStatement.NOT_CONNECTED);
  const currentTab = useGetCurrentTab();
  const isCurrentTabFetched = !!currentTab;
  const currentAuth = useGetCurrentAuth();
  const isPopup = useIsPopup();
  const [selectedQrAccountGroupId, setSelectedQrAccountGroupId] = useState<string | undefined>();

  const accountGroups = useMemo((): AccountGroup[] => {
    const result = [..._accountGroups].sort(groupFuncSortByName);
    const all = result.find((ag) => isAccountAll(ag.groupId));

    if (all) {
      const index = result.indexOf(all);

      result.splice(index, 1);
      result.unshift(all);
    }

    if (!!currentAccountGroup?.groupId && (currentAccountGroup?.groupId !== (all && all.groupId))) {
      const currentAccountGroupIndex = result.findIndex((item) => {
        return item.groupId === currentAccountGroup?.groupId;
      });

      if (currentAccountGroupIndex > -1) {
        const _currentAccountGroup = result[currentAccountGroupIndex];

        result.splice(currentAccountGroupIndex, 1);
        result.splice(1, 0, _currentAccountGroup);
      }
    }

    return result;
  }, [_accountGroups, currentAccountGroup?.groupId]);

  const noAllAccountGroups = useMemo(() => {
    return accountGroups.filter(({ groupId }) => !isAccountAll(groupId));
  }, [accountGroups]);

  const showAllAccount = useMemo(() => {
    return noAllAccountGroups.length > 1;
  }, [noAllAccountGroups]);

  const _onSelect = useCallback((groupId: string) => {
    if (groupId) {
      const accountGroup = accountGroups.find((ag) => ag.groupId === groupId);

      if (accountGroup) {
        saveCurrentAccountGroup({ groupId }).then(() => {
          const pathName = location.pathname;
          const locationPaths = location.pathname.split('/');

          if (locationPaths) {
            if (locationPaths[1] === 'home') {
              if (locationPaths.length >= 3) {
                if (pathName.startsWith('/home/nfts')) {
                  navigate('/home/nfts/collections');
                } else if (pathName.startsWith('/home/tokens/detail')) {
                  navigate('/home/tokens');
                } else {
                  navigate(`/home/${locationPaths[2]}`);
                }
              }
            } else {
              goHome();
            }
          }
        }).catch((e) => {
          console.error('Failed to switch account', e);
        });
      } else {
        console.error('Failed to switch account');
      }
    }
  }, [accountGroups, location.pathname, navigate, goHome]);

  const onClickAccountGroupDetail = useCallback((groupId: string) => {
    return () => {
      inactiveModal(modalId);
      setTimeout(() => {
        navigate(`/accounts/detail/${groupId}`);
      }, 100);
    };
  }, [navigate, inactiveModal]);

  const onClickItemQrButton = useCallback((groupId: string) => {
    return () => {
      setSelectedQrAccountGroupId(groupId);
      activeModal(addressQrSelectorModalId);
    };
  }, [activeModal]);

  const onAddressQrSelectorModalBack = useGoBackSelectAccount(addressQrSelectorModalId);

  const renderItem = useCallback((item: AccountGroup, _selected: boolean): React.ReactNode => {
    if (isAccountAll(item.groupId)) {
      if (showAllAccount) {
        return (
          <AccountGroupSelectorAllItem
            className='all-account-selection'
            isSelected={_selected}
          />
        );
      } else {
        return null;
      }
    }

    return (
      <AccountGroupSelectorItem
        accountGroup={item}
        className={className}
        isSelected={_selected}
        onClickMoreButton={onClickAccountGroupDetail(item.groupId)}
        onClickQrButton={onClickItemQrButton(item.groupId)}
      />
    );
  }, [className, onClickAccountGroupDetail, onClickItemQrButton, showAllAccount]);

  const renderSelectedItem = useCallback((item: AccountGroup): React.ReactNode => {
    return (
      <div className='selected-account'>
        <AccountGroupBriefInfo accountGroup={item} />
      </div>
    );
  }, []);

  const visibleText = useMemo((): string => {
    switch (connectionState) {
      case ConnectionStatement.CONNECTED:
      // eslint-disable-next-line padding-line-between-statements, no-fallthrough
      case ConnectionStatement.PARTIAL_CONNECTED:
        if (isAllAccount) {
          return t('Connected {{connected}}/{{canConnect}}', { replace: { connected, canConnect } });
        } else {
          return t('Connected');
        }

      case ConnectionStatement.DISCONNECTED:
        return t('Disconnected');

      case ConnectionStatement.BLOCKED:
        return t('Blocked');

      case ConnectionStatement.NOT_CONNECTED:
      default:
        return t('Not connected');
    }
  }, [canConnect, connected, connectionState, isAllAccount, t]);

  const onOpenConnectWebsiteModal = useCallback(() => {
    if (isCurrentTabFetched) {
      activeModal(ConnectWebsiteId);
    }
  }, [activeModal, isCurrentTabFetched]);

  const onCloseConnectWebsiteModal = useCallback(() => {
    inactiveModal(ConnectWebsiteId);
  }, [inactiveModal]);

  return (
    <div className={CN(className, 'container')}>
      {isPopup && (
        <Tooltip
          placement={'bottomLeft'}
          title={visibleText}
        >
          <div
            className={CN('connect-icon', `-${connectionState}`)}
            onClick={onOpenConnectWebsiteModal}
          >
            <BackgroundIcon
              backgroundColor='var(--bg-color)'
              phosphorIcon={iconMap[connectionState]}
              shape='circle'
              size='sm'
              type='phosphor'
              weight={'fill'}
            />
          </div>
        </Tooltip>
      )}

      <SelectModal
        background={'default'}
        className={className}
        footer={<SelectAccountFooter />}
        id={modalId}
        ignoreScrollbarMethod='padding'
        inputWidth={'100%'}
        itemKey='groupId'
        items={accountGroups}
        onSelect={_onSelect}
        renderItem={renderItem}
        renderSelected={renderSelectedItem}
        renderWhenEmpty={renderEmpty}
        searchFunction={searchAccountGroupFunction}
        searchMinCharactersCount={2}
        searchPlaceholder={t<string>('Account name')}
        selected={currentAccountGroup?.groupId || ''}
        shape='round'
        size='small'
        title={t('Select account')}
      />

      <ConnectWebsiteModal
        authInfo={currentAuth}
        id={ConnectWebsiteId}
        isBlocked={connectionState === ConnectionStatement.BLOCKED}
        isNotConnected={connectionState === ConnectionStatement.NOT_CONNECTED}
        onCancel={onCloseConnectWebsiteModal}
        url={currentTab?.url || ''}
      />

      <AddressQrSelectorModal
        accountGroupId={selectedQrAccountGroupId}
        modalId={addressQrSelectorModalId}
        onBack={onAddressQrSelectorModalBack}
      />
    </div>
  );
}

const SelectAccount = styled(Component)<Props>(({ theme }) => {
  const { token } = theme as Theme;

  return ({
    '&.container': {
      paddingLeft: token.sizeSM,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'row',

      '.ant-select-modal-input-container.ant-select-modal-input-border-round::before': {
        display: 'none'
      },

      '.ant-select-modal-input-container.ant-select-modal-input-size-small .ant-select-modal-input-wrapper': {
        paddingLeft: 0
      },

      '.ant-select-modal-input-container:hover .account-name': {
        color: token.colorTextLight3
      }
    },

    '&.ant-sw-modal': {
      '.ant-sw-modal-body': {
        height: 370,
        marginBottom: 0
      },

      '.ant-sw-list-search-input': {
        paddingBottom: token.paddingXS
      },

      '.ant-sw-modal-footer': {
        marginTop: 0
      },

      '.ant-account-card': {
        padding: token.paddingSM
      },

      '.ant-web3-block .ant-web3-block-middle-item': {
        textAlign: 'initial'
      },

      '.all-account-selection': {
        cursor: 'pointer',
        borderRadius: token.borderRadiusLG,
        transition: `background ${token.motionDurationMid} ease-in-out`,

        '.account-item-name': {
          fontSize: token.fontSizeHeading5,
          lineHeight: token.lineHeightHeading5
        },

        '&:hover': {
          background: token.colorBgInput
        }
      },

      '.ant-account-card-name': {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        'white-space': 'nowrap',
        maxWidth: 120
      },

      '.ant-input-container .ant-input': {
        color: token.colorTextLight1
      }
    },

    '.all-account-item': {
      display: 'flex',
      padding: `${token.paddingSM + 2}px ${token.paddingSM}px`,
      cursor: 'pointer',
      backgroundColor: token.colorBgSecondary,
      borderRadius: token.borderRadiusLG,
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: token.sizeXS,

      '&:hover': {
        backgroundColor: token.colorBgInput
      },

      '.selected': {
        color: token['cyan-6']
      }
    },

    '.ant-select-modal-input-container': {
      overflow: 'hidden'
    },

    '.selected-account': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8
    },

    '.connect-icon': {
      color: token.colorTextBase,
      width: 40,
      height: 40,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',

      [`&.-${ConnectionStatement.DISCONNECTED}`]: {
        '--bg-color': token['gray-3']
      },

      [`&.-${ConnectionStatement.BLOCKED}`]: {
        '--bg-color': token.colorError
      },

      [`&.-${ConnectionStatement.NOT_CONNECTED}`]: {
        '--bg-color': token['gray-3']
      },

      [`&.-${ConnectionStatement.CONNECTED}`]: {
        '--bg-color': token['green-6']
      },

      [`&.-${ConnectionStatement.PARTIAL_CONNECTED}`]: {
        '--bg-color': token.colorWarning
      }
    }
  });
});

export default SelectAccount;
