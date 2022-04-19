// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import QRCode from 'react-qr-code';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { AccountJson } from '@polkadot/extension-base/background/types';
import allAccountLogoDefault from '@polkadot/extension-koni-ui/assets/all-account-icon.svg';
import cloneLogo from '@polkadot/extension-koni-ui/assets/clone.svg';
import defaultAvatar from '@polkadot/extension-koni-ui/assets/default-avatar.svg';
import receivedIcon from '@polkadot/extension-koni-ui/assets/receive-icon.svg';
import { AccountContext } from '@polkadot/extension-koni-ui/components';
import Identicon from '@polkadot/extension-koni-ui/components/Identicon';
import useGenesisHashOptions from '@polkadot/extension-koni-ui/hooks/useGenesisHashOptions';
import useMetadata from '@polkadot/extension-koni-ui/hooks/useMetadata';
import useOutsideClick from '@polkadot/extension-koni-ui/hooks/useOutsideClick';
import useToast from '@polkadot/extension-koni-ui/hooks/useToast';
import useTranslation from '@polkadot/extension-koni-ui/hooks/useTranslation';
import { editAccount, tieAccount } from '@polkadot/extension-koni-ui/messaging';
import AccountAction from '@polkadot/extension-koni-ui/partials/AccountAction';
import HeaderEditName from '@polkadot/extension-koni-ui/partials/HeaderEditName';
import { RootState } from '@polkadot/extension-koni-ui/stores';
import { ThemeProps } from '@polkadot/extension-koni-ui/types';
import { accountAllRecoded, getGenesisOptionsByAddressType, isAccountAll } from '@polkadot/extension-koni-ui/util';
import reformatAddress from '@polkadot/extension-koni-ui/util/reformatAddress';
import { IconTheme } from '@polkadot/react-identicon/types';

interface Props extends ThemeProps {
  className?: string,
  currentAccount: AccountJson,
  toggleZeroBalances: () => void,
  formatted: string | null,
  isShowZeroBalances?: boolean,
}

interface EditState {
  isEditing: boolean;
  toggleActions: number;
}

function DetailHeaderFull ({ className = '',
  currentAccount,
  formatted,
  isShowZeroBalances,
  toggleZeroBalances }: Props): React.ReactElement {
  const actionsRef = useRef(null);
  const { t } = useTranslation();
  const [{ isEditing }, setEditing] = useState<EditState>({ isEditing: false, toggleActions: 0 });
  const [isActionOpen, setShowAccountAction] = useState(false);
  const [formattedAddress, setFormattedAddress] = useState<string | null>(null);
  const { show } = useToast();
  const isAllAccount = isAccountAll(currentAccount.address);
  const allAccountLogo = useSelector((state: RootState) => state.allAccount.allAccountLogo);
  const { accounts } = useContext(AccountContext);
  const { isEthereum, networkPrefix } = useSelector((state: RootState) => state.currentNetwork);
  const [localGenesisHash, setLocalGenesisHash] = useState<string>('');
  const genesisOptions = getGenesisOptionsByAddressType(currentAccount?.address, accounts, useGenesisHashOptions());
  const chain = useMetadata(currentAccount?.genesisHash, true);

  const _toggleEdit = useCallback(
    (): void => {
      setEditing(({ toggleActions }) => ({ isEditing: !isEditing, toggleActions: ++toggleActions }));
      setShowAccountAction(false);
    },
    [isEditing]
  );

  const _toggleZeroBalances = useCallback(
    (): void => {
      toggleZeroBalances && toggleZeroBalances();
      setShowAccountAction(false);
    },
    [toggleZeroBalances]
  );

  useOutsideClick(actionsRef, (): void => {
    isActionOpen && setShowAccountAction(!isActionOpen);
  });

  const _onCopy = useCallback(
    () => show(t('Copied')),
    [show, t]
  );

  const _saveChanges = useCallback(
    (editedName: string): void => {
      currentAccount &&
      editAccount(currentAccount.address, editedName)
        .catch(console.error);

      _toggleEdit();
    },
    [currentAccount, _toggleEdit]
  );

  useEffect(() => {
    let isSync = true;

    if (isAllAccount) {
      let networkSelected;
      const accountAllNetworkGenesisHash = window.localStorage.getItem('accountAllNetworkGenesisHash');

      if (!accountAllNetworkGenesisHash) {
        networkSelected = genesisOptions[0];
      } else {
        networkSelected = genesisOptions.find((opt) => opt.value === accountAllNetworkGenesisHash);

        if (!networkSelected) {
          window.localStorage.setItem('accountAllNetworkGenesisHash', '');
          networkSelected = genesisOptions[0];
        }
      }

      if (networkSelected) {
        setLocalGenesisHash(networkSelected.value);
      }

      return;
    }

    (async () => {
      let networkSelected;

      if (!currentAccount || !currentAccount?.genesisHash) {
        networkSelected = genesisOptions[0];
      } else {
        networkSelected = genesisOptions.find((opt) => opt.value === currentAccount.genesisHash);

        if (!networkSelected) {
          await tieAccount(currentAccount.address, null);
          networkSelected = genesisOptions[0];
        }
      }

      if (isSync && networkSelected) {
        setLocalGenesisHash(networkSelected.value);
      }
    })().catch((e) => console.log('error is', e));

    return () => {
      isSync = false;
    };
  }, [currentAccount, currentAccount?.genesisHash, isAllAccount, genesisOptions]);

  const theme = (
    currentAccount?.type === 'ethereum'
      ? 'ethereum'
      : (chain?.icon || 'polkadot')
  ) as IconTheme;

  useEffect((): void => {
    if (!currentAccount) {
      return;
    }

    if (!currentAccount.address) {
      setFormattedAddress(null);

      return;
    }

    if (isAccountAll(currentAccount.address)) {
      setFormattedAddress(accountAllRecoded.formatted);

      return;
    }

    const formattedAddress = reformatAddress(currentAccount.address, networkPrefix, isEthereum);

    setFormattedAddress(formattedAddress);
  }, [currentAccount, currentAccount?.address, networkPrefix, isEthereum]);

  return (
    <div className={`detail-header ${className}`}>
      <div className='detail-header__part-1'>
        <div
          className='detail-header-connect-status-btn'
        >
          {!!currentAccount && !!currentAccount.address
            ? isAllAccount
              ? allAccountLogo
                ? <img
                  alt='all-account-icon'
                  className='header__all-account-icon avatar'
                  src={allAccountLogo}
                />
                : <img
                  alt='all-account-icon'
                  className='header__all-account-icon avatar'
                  src={allAccountLogoDefault}
                />
              : (
                <Identicon
                  className='identityIcon'
                  genesisHash={localGenesisHash}
                  iconTheme={theme}
                  prefix={networkPrefix}
                  showLogo
                  size={94}
                  value={formattedAddress || currentAccount?.address}
                />
              )
            : (
              <img
                alt='default-img'
                className='default-avatar avatar'
                src={defaultAvatar}
              />
            )
          }
        </div>
        <div className='detail-header-account-info'>
          {isAllAccount
            ? <div className='detail-header__all-account'>
              {t<string>('All Accounts')}
            </div>
            : <div className='detail-header-account-info-wrapper'>
              {
                isEditing && currentAccount
                  ? (
                    <HeaderEditName
                      className='kn-l-edit-name'
                      defaultValue={currentAccount.name}
                      isFocused
                      label={' '}
                      onBlur={_saveChanges}
                    />
                  )
                  : <span className='detail-header-account-info__name'>{currentAccount?.name}</span>
              }
              <div className={'detail-header-account-info__formatted-wrapper'}>
                <CopyToClipboard text={(formatted && formatted) || ''}>
                  <div
                    className='detail-header-account-info__formatted-wrapper'
                    onClick={_onCopy}
                  >
                    <span
                      className='detail-header-account-info__formatted'
                    >{formatted || currentAccount?.address}</span>
                    <img
                      alt='copy'
                      className='detail-header-account-info__copy-icon'
                      src={cloneLogo}
                    />
                  </div>
                </CopyToClipboard>
                <img
                  alt='receive'
                  className='chain-balance-item__receive'
                  src={receivedIcon}
                />
              </div>
            </div>
          }
        </div>
      </div>

      <div className='detail-header__part-2'>
        {
          formattedAddress && (
            <div className={'detail-header-qr'}>
              <QRCode
                size={126}
                value={formattedAddress}
              />
            </div>
          )
        }
      </div>

      {isActionOpen && (
        <AccountAction
          isShowZeroBalances={isShowZeroBalances}
          reference={actionsRef}
          toggleEdit={_toggleEdit}
          toggleZeroBalances={_toggleZeroBalances}
        />
      )}
    </div>
  );
}

export default styled(DetailHeaderFull)(({ theme }: Props) => `
  display: flex;
  align-items: start;
  height: 150px;
  padding-top: 20px;
  justify-content: space-between;

  .detail-header__part-1 {
    margin-left: 20px;
    display: flex;
  }

  .detail-header__part-2 {
    padding-right: 70px;
    line-height: 1;
  }

  .avatar{
    height: 94px;
    width: 94px;
  }

  .kn-l-edit-name{
    input{
      padding-top: 0;
      padding-bottom: 0;
      height: 44px;
    }
    *{
      margin:0;
    }
  }

  .detail-header-connect-status-btn {
    align-items: center;
    display: flex;
    justify-content: center;
    margin-right: 20px;
  }

  .detail-header-account-info {
    display: flex;
    align-items: baseline;
  }

  .detail-header-account-info__name {
    font-weight: 500;
    font-size: 32px;
    line-height: 44px;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 220px;
    overflow: hidden;
  }

  .detail-header__all-account {
    font-weight: 500;
    font-size: 32px;
    line-height: 44px;
  }

  .detail-header-account-info-wrapper {
    display: flex;
    flex-direction: column;
  }

  .detail-header-account-info__formatted-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: ${theme.textColor2};
  }

  .chain-balance-item__receive {
    min-width: 16px;
    height: 16px;
    margin-left: 12px;
    cursor: pointer;
  }

  .detail-header-account-info__formatted {
    margin-right: 8px;
    font-size: 14px;
    font-weight: 400;
    font-weight: 400;
  }

  .detail-header-qr {
    border: 2px solid white;
    width: 130px;
    height: 130px;
  }
`);
