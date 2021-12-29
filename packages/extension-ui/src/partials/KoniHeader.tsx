// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type {ThemeProps} from '../types';

import {faArrowLeft, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import styled, {ThemeContext} from 'styled-components';
import useTranslation from '../hooks/useTranslation';
import logo from '../assets/KoniverseLogo.svg';
import cloneLogo from '../assets/clone.svg';
import useOutsideClick from '../hooks/useOutsideClick';
import {
  AccountContext,
  CurrentAccountContext,
  CurrentNetworkContext,
  SettingsContext
} from "@polkadot/extension-ui/components";
import {IconTheme} from "@polkadot/react-identicon/types";
import useMetadata from "@polkadot/extension-ui/hooks/useMetadata";
import AccountMenuSettings from "@polkadot/extension-ui/partials/AccountMenuSettings";
import useGenesisHashOptions from "@polkadot/extension-ui/hooks/useGenesisHashOptions";
import {editAccount, showAccount, tieAccount, windowOpen} from "@polkadot/extension-ui/messaging";
import KoniNetworkMenu from "@polkadot/extension-ui/components/KoniNetworkMenu";
import CopyToClipboard from "react-copy-to-clipboard";
import useToast from "@polkadot/extension-ui/hooks/useToast";
import {decodeAddress, encodeAddress} from "@polkadot/util-crypto";
import KoniAccountAction from "@polkadot/extension-ui/partials/KoniAccountAction";
import {AccountJson, AccountWithChildren} from "@polkadot/extension-base/background/types";
import {Chain} from "@polkadot/extension-chains/types";
import {SettingsStruct} from "@polkadot/ui-settings/types";
import KoniLink from "@polkadot/extension-ui/components/KoniLink";
import defaultAvatar from "../assets/default-avatar.svg"
import moreButtonDark from "@polkadot/extension-ui/assets/dots-three-vertical-dark.svg";
import moreButtonLight from "@polkadot/extension-ui/assets/dots-three-vertical-light.svg";
import {Theme} from "../types";
import HeaderEditName from "@polkadot/extension-ui/partials/koni/HeaderEditName";
import Identicon from "@polkadot/extension-ui/koni/react-components/Identicon";
import ExpandLightIcon from '@polkadot/extension-ui/assets/icon/expand-light.svg';
import EyeDarkIcon from '@polkadot/extension-ui/assets/icon/eye-dark.svg';
import EyeLightIcon from '@polkadot/extension-ui/assets/icon/eye-light.svg';
import EyeSlashDarkIcon from '@polkadot/extension-ui/assets/icon/eye-slash-dark.svg';
import EyeSlashLightIcon from '@polkadot/extension-ui/assets/icon/eye-slash-light.svg';
import ExpandDarkIcon from '@polkadot/extension-ui/assets/icon/expand-dark.svg';
import useIsPopup from "@polkadot/extension-ui/hooks/useIsPopup";

interface Props extends ThemeProps {
  children?: React.ReactNode;
  className?: string;
  showAdd?: boolean;
  showBackArrow?: boolean;
  showSearch?: boolean;
  showSettings?: boolean;
  smallMargin?: boolean;
  text?: React.ReactNode;
  isContainDetailHeader: boolean;
  showSubHeader?: boolean;
  subHeaderName?: string;
  showCancelButton?: boolean;
  isWelcomeScreen?: boolean;
  isNotHaveAccount?: boolean;
}

interface Recoded {
  formatted: string | null;
  prefix?: number;
}

interface EditState {
  isEditing: boolean;
  toggleActions: number;
}

function findSubstrateAccount (accounts: AccountJson[], publicKey: Uint8Array): AccountJson | null {
  const pkStr = publicKey.toString();

  return accounts.find(({ address }): boolean =>
    decodeAddress(address).toString() === pkStr
  ) || null;
}


function recodeAddress (address: string, accounts: AccountWithChildren[], chain: Chain | null, settings: SettingsStruct): Recoded {
  // decode and create a shortcut for the encoded address
  const publicKey = decodeAddress(address);
  // find our account using the actual publicKey, and then find the associated chain
  const account = findSubstrateAccount(accounts, publicKey);
  const prefix = chain ? chain.ss58Format : (settings.prefix === -1 ? 42 : settings.prefix);

  // always allow the actual settings to override the display
  return {
    formatted: account?.type === 'ethereum'
      ? address
      : encodeAddress(publicKey, prefix),
    prefix
  };
}

const defaultRecoded = { formatted: null, prefix: 42 };

function KoniHeader({children, className = '', showBackArrow, showSubHeader, subHeaderName, showCancelButton, smallMargin = false, isContainDetailHeader, isWelcomeScreen, isNotHaveAccount}: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [isSettingsOpen, setShowSettings] = useState(false);
  const [isActionOpen, setShowAccountAction] = useState(false);
  const [isNetworkSelectOpen, setShowNetworkSelect] = useState(false);
  const {currentAccount} = useContext(CurrentAccountContext);
  const [editedName, setName] = useState<string | undefined | null>(currentAccount?.name);
  const [{isEditing}, setEditing] = useState<EditState>({ isEditing: false, toggleActions: 0 });
  const {network: {genesisHash}, setNetwork} = useContext(CurrentNetworkContext);
  const { accounts } = useContext(AccountContext);
  const genesisOptions = useGenesisHashOptions();
  const { show } = useToast();
  const chain = useMetadata(currentAccount?.genesisHash, true);
  const settings = useContext(SettingsContext);
  const [{ formatted, prefix }, setRecoded] = useState<Recoded>(defaultRecoded);
  const themeContext = useContext(ThemeContext as React.Context<Theme>);
  const popupTheme = themeContext.id;
  const setRef = useRef(null);
  const actionsRef = useRef(null);
  const netRef = useRef(null);
  const isPopup = useIsPopup();

  const _onWindowOpen = useCallback(
    () => windowOpen('/').catch(console.error),
    []
  );

  useEffect((): void => {
    if (!currentAccount) {
      return;
    }

    if (!currentAccount.address) {
      setRecoded(defaultRecoded);

      return;
    }

    setRecoded(
      (
        chain?.definition.chainType === 'ethereum' ||
        currentAccount?.type === 'ethereum'
      )
        ? { formatted: currentAccount?.address }
        : recodeAddress(currentAccount?.address, accounts, chain, settings));
  }, [accounts, currentAccount?.address, chain, settings]);

  const getNetworkName = useCallback(
    (genesisHash) => {
      let networkName = ''
      if (currentAccount) {
        genesisHash = genesisHash ? genesisHash : '';
        const currentNetwork = genesisOptions.find(opt => opt.value == genesisHash);
        networkName = currentNetwork ? currentNetwork.text : '';
      }
      return networkName
    }, [currentAccount?.genesisHash]
  )

  const ellipsisCenterStr = useCallback(
    (str: string | undefined) => {
      if (str && str.length > 35) {
        return str.substr(0, 5) + '...' + str.substr(str.length-4, str.length)
      }
      return str;
    },
    []
  )

  const _toggleEdit = useCallback(
    (): void => {
      setEditing(({ toggleActions }) => ({ isEditing: !isEditing, toggleActions: ++toggleActions }));
      setShowAccountAction(false);
    },
    [isEditing]
  );

  const _saveChanges = useCallback(
    (): void => {
      editedName && currentAccount &&
      editAccount(currentAccount.address, editedName)
        .catch(console.error);

      _toggleEdit();
    },
    [editedName, currentAccount?.address, _toggleEdit]
  );

  const theme = (
    currentAccount?.type === 'ethereum'
      ? 'ethereum'
      : (chain?.icon || 'polkadot')
  ) as IconTheme;

  const _onChangeGenesis = useCallback(
    (genesisHash: string, networkPrefix: number, icon: string): void => {

      if (currentAccount) {
        setNetwork({
          networkPrefix,
          icon,
          genesisHash
        });

        tieAccount(currentAccount.address, genesisHash || null)
          .catch(console.error);
      }
      setShowNetworkSelect(false);
    },
    [genesisHash, currentAccount]
  );

  useOutsideClick(setRef, (): void => {
    isSettingsOpen && setShowSettings(!isSettingsOpen);
  });

  useOutsideClick(actionsRef, (): void => {
    isActionOpen && setShowAccountAction(!isActionOpen);
  });

  useOutsideClick(netRef, (): void => {
    isNetworkSelectOpen && setShowNetworkSelect(!isNetworkSelectOpen);
  });

  const _toggleAccountAction = useCallback(
    (): void => setShowAccountAction((isActionOpen) => !isActionOpen),
    []
  );

  const _toggleSettings = useCallback(
    (): void => setShowSettings((isSettingsOpen) => !isSettingsOpen),
    []
  );

  const _toggleNetwork = useCallback(
    (): void => setShowNetworkSelect((isNetworkSelectOpen) => !isNetworkSelectOpen),
    []
  )

  const _onCopy = useCallback(
    () => show(t('Copied')),
    [show, t]
  );

  const _toggleVisibility = useCallback(
    () => currentAccount?.address && showAccount(currentAccount?.address, currentAccount?.isHidden || false).catch(console.error),
    [currentAccount?.address, currentAccount?.isHidden]
  );

  return (
    <div className={`${className} ${smallMargin ? 'smallMargin' : ''}`}>
      <div className='container'>
        <div className='top-container'>
          <div className='branding'>
            <img
              className='logo'
              src={logo}
            />
          </div>
          <div className='koni-header-right-content'>
            {isPopup && (<div className={'kn-l-expand-btn'} onClick={_onWindowOpen}>
                <img src={popupTheme === 'dark' ? ExpandLightIcon : ExpandDarkIcon}
                     alt="Expand Icon"
                     className='kn-l-expand-btn__icon'/>
              </div>)}
            <div className='network-select-item' onClick={_toggleNetwork}>
              <div className='network-selected-dot'/>
              <div className='network-select-item__text'>
                {getNetworkName(currentAccount?.genesisHash) || genesisOptions[0].text}
              </div>
              <FontAwesomeIcon icon={faChevronDown} className='network-select-item__icon' size='sm'/>
            </div>

            {!isWelcomeScreen && (
              <div className='setting-icon-wrapper' onClick={_toggleSettings}>
                {!!currentAccount ? (
                  <Identicon
                    className='identityIcon'
                    iconTheme={theme}
                    isExternal={false}
                    prefix={prefix}
                    value={formatted || currentAccount?.address}
                    size={44}
                  />
                ) : (
                  <img src={defaultAvatar} alt="default-img" className='default-avatar'/>
                )
                }
              </div>
            )}
          </div>

          {isNetworkSelectOpen && (
            <KoniNetworkMenu reference={netRef} currentNetwork={currentAccount?.genesisHash ? currentAccount?.genesisHash : ''}
                             selectNetwork={_onChangeGenesis}/>
          )}

          {isSettingsOpen && (
            <AccountMenuSettings reference={setRef} closeSetting={_toggleSettings} className='account-menu-setting'/>
          )}
        </div>
        {isWelcomeScreen && (<div className='only-top-container'/>)}
        {isContainDetailHeader && (
            <div className='kn-l-detail-header'>
              <div className='kn-l-detail-header__part-1'>
                <div className='kn-l-connect-status-btn' onClick={_toggleVisibility}>
                  {currentAccount?.isHidden ?
                    (
                      <img src={popupTheme === 'dark' ? EyeSlashDarkIcon : EyeSlashLightIcon}
                           alt="Connect Icon"
                           className='kn-l-connect-status-btn__icon'/>
                    ) : (
                      <img src={popupTheme === 'dark' ? EyeDarkIcon : EyeLightIcon}
                           alt="Connect Icon"
                           className='kn-l-connect-status-btn__icon'/>
                    )}
                </div>
              </div>

              <div className='kn-l-detail-header__part-2'>
                {!isEditing && (
                  <CopyToClipboard text={(formatted && formatted) || ''}>
                    <div className='kn-l-account-info' onClick={_onCopy}>
                      <span className='kn-l-account-info__name'>{currentAccount?.name}</span>
                      <div className='kn-l-account-info__formatted-wrapper'>
                        <span className='kn-l-account-info__formatted'>{ellipsisCenterStr(formatted || currentAccount?.address)}</span>
                        <img src={cloneLogo} alt="copy" className='kn-l-account-info__copy-icon'/>
                      </div>
                    </div>
                  </CopyToClipboard>
                )}
                {isEditing && (
                  <HeaderEditName address={currentAccount?.address} isFocused label={' '} onBlur={_saveChanges} onChange={setName} className='kn-l-edit-name'/>
                )}
              </div>

              <div className='kn-l-detail-header__part-3'>
                <div className='kn-l-more-button' onClick={_toggleAccountAction}>
                  {popupTheme == 'dark' ?
                    (
                      <img src={moreButtonDark} alt="more" className={'kn-l-more-button__icon'}/>
                    ) : (
                      <img src={moreButtonLight} alt="more" className={'kn-l-more-button__icon'}/>
                    )
                  }

                </div>
              </div>

              {isActionOpen && (
                <KoniAccountAction reference={actionsRef} toggleEdit={_toggleEdit}/>
              )}
            </div>
          )
        }

        {showSubHeader && (
          <div className='subheader-container'>
            <div className={'subheader-container__part-1'}>
              {showBackArrow && (
                  <KoniLink
                    className='backlink'
                    to='/'
                  >
                    <FontAwesomeIcon
                      className='arrowLeftIcon'
                      icon={faArrowLeft}
                    />
                  </KoniLink>
                )
              }
            </div>
            <div className={'subheader-container__part-2'}>
              <div className='subheader-container__text'>
                {subHeaderName}
              </div>
            </div>
            <div className={'subheader-container__part-3'}>
              {showCancelButton && (
                <KoniLink to='/' className='kn-l-cancel-btn'>
                  <span className='koni-subheader__cancel-button-text'>Cancel</span>
                </KoniLink>
                )
              }
            </div>
          </div>
          )
        }

        {children}
      </div>
    </div>
  );
}

export default React.memo(styled(KoniHeader)(({theme}: Props) => `
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  position: relative;
  margin-bottom: 25px;

  && {
    padding: 0 0 0;
  }

  .account-menu-setting {
    min-width: 390px;
  }

  .network-menu {
    min-width: 350px;
  }

  .text-overflow-center {
    margin-left: -100%;
    margin-right: -100%;
    text-align: center;
  }

  .container {
    background-color: ${theme.background};
    box-shadow: ${theme.headerBoxShadow};

    > .top-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding-top: 12px;
      padding-bottom: 6px;

    .branding {
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${theme.labelColor};
      font-family: ${theme.fontFamily};
      text-align: center;
      margin-left: 15px;

      .logo {
        height: 48px;
        width: 48px;
        margin-right:12px;
      }

      .logoText {
        color: ${theme.textColor};
        font-family: ${theme.fontFamily};
        font-size: 20px;
        line-height: 27px;
      }
    }
  }

  .only-top-container {
    padding-top: 6px;
  }

  .default-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    padding: 1px;
    border: 2px solid ${theme.checkDotColor};
  }

  .identityIcon {
    border: 2px solid ${theme.checkDotColor};
  }

  .subheader-container {
    display: flex;
    align-items: center;
    padding-bottom: 13px;
    margin: 7px 15px 0 15px;

    &__text {
      font-size: 20px;
      line-height: 30px;
      font-weight: 700;
      color: ${theme.textColor};
    }
  }

  .subheader-container__part-1 {
    flex: 1;
  }

  .subheader-container__part-2 {
  }

  .subheader-container__part-3 {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .kn-l-cancel-btn {
    color: #04C1B7;
  }

  .arrowLeftIcon {
    color: ${theme.labelColor};
    margin-right: 1rem;
  }

  .backlink {
    color: ${theme.labelColor};
    min-height: 30px;
    text-decoration: underline;
    width: min-content;

    &:visited {
      color: ${theme.labelColor};
    }
  }

  &.smallMargin {
    margin-bottom: 15px;
  }

  .setting-icon-wrapper {
    margin-left: 1rem;
    cursor: pointer;
  }

  .koni-subheader-btn {
    display: flex;
  }

  .koni-header-right-content {
    display: flex;
    align-items: center;
    margin-right: 15px;
  }

  .network-selected-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-left: 6px;
    background-color: ${theme.checkDotColor};
  }

  .network-select-item {
    display: flex;
    align-items: center;
    border: 2px solid ${theme.inputBorderColor};
    border-radius: 8px;
    min-height: 25px;
    width: 220px;
    padding: 2px 4px;
    cursor: pointer;
    position: relative;

    &__text {
      margin: 4px 8px;
      font-size: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 24px;
      color: ${theme.textColor2};
    }

    &__icon {
      margin-right: 4px;
      position: absolute;
      right: 8px;
      color: ${theme.textColor2};
    }
  }

  .kn-l-detail-header {
    display: flex;
    align-items: center;
    padding-bottom: 8px;
    padding-top: 6px;
  }

  .kn-l-detail-header__part-1 {
    padding-left: 10px;
  }

  .kn-l-detail-header__part-2 {
    flex: 1;
  }

  .kn-l-detail-header__part-3 {
    padding-right: 6px;
  }

  .kn-l-connect-status-btn {
    min-width: 40px;
    height: 40px;
    align-items: center;
    display: flex;
    justify-content: center;
    cursor: pointer;
  }

  .kn-l-connect-status-btn__icon {
    width: 22px;
  }

  .kn-l-account-info {
    display: flex;
    align-items: baseline;
  }

  .kn-l-account-info__name {
    font-size: 20px;
    font-weight: 700;
    margin-right: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 220px;
    overflow: hidden;
  }

  .kn-l-account-info__formatted-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: ${theme.textColor2};
  }

  .kn-l-account-info__formatted {
    margin-right: 8px;
    font-size: 15px;
  }

  .kn-l-account-info__copy-icon {

  }

  .kn-l-more-button {
    min-width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .kn-l-more-button__icon {
    width: 32px;
  }

  .kn-l-edit-name {
    > div {
      margin-top: 0;
    }

    input {
      margin-top: 0;
      height: 40px;
    }
  }

  .connect-status {
    &-text {
      font-family: ${theme.fontFamilyRegular};
      color: ${theme.textColor2};
    }
  }
  .account-info {
    &-formatted {
      font-family: ${theme.fontFamilyRegular};
      color: ${theme.textColor2};
    }
  }

  .kn-l-expand-btn {
    min-width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 2px;
    user-select: none;
    cursor: pointer;
  }

  .kn-l-expand-btn__icon {
    display: block;
    width: 24px;
    height: auto;
  }

  .more-button {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
      background-color: color: ${theme.accountHoverBackground};
    }
  }
`));
