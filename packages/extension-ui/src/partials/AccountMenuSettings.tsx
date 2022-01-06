// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type {ThemeProps} from '../types';

import {
  faCodeBranch,
  faCog,
  faFileExport,
  faFileUpload,
  faKey,
  faPlusCircle,
  faQrcode
} from '@fortawesome/free-solid-svg-icons';
import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';

import {AccountContext, MediaContext, Svg} from '../components';
import useTranslation from '../hooks/useTranslation';
// import {windowOpen} from '../messaging';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {useLedger} from "@polkadot/extension-ui/hooks/useLedger";
import MenuSettingItem from '../components/MenuSettingItem';
import KoniMenu from "@polkadot/extension-ui/components/KoniMenu";
import {AccountWithChildren} from "@polkadot/extension-base/background/types";
import getNetworkMap from "@polkadot/extension-ui/util/getNetworkMap";
import KoniAccountsTree from "@polkadot/extension-ui/Popup/Accounts/KoniAccountsTree";
import logo from "@polkadot/extension-ui/assets/sub-wallet-logo.svg";
import KoniInputFilter from "@polkadot/extension-ui/components/KoniInputFilter";
// import {faUsb} from "@fortawesome/free-brands-svg-icons";
import KoniLink from "@polkadot/extension-ui/components/KoniLink";

interface Props extends ThemeProps {
  className?: string;
  reference: React.MutableRefObject<null>;
  onFilter?: (filter: string) => void;
  closeSetting?: () => void;
}


const jsonPath = '/account/restore-json';
// const ledgerPath = '/account/import-ledger';

function AccountMenuSettings ({ className, reference, onFilter, closeSetting }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  // const { isLedgerCapable, isLedgerEnabled } = useLedger();
  const [filteredAccount, setFilteredAccount] = useState<AccountWithChildren[]>([]);
  const {hierarchy} = useContext(AccountContext);
  const { master } = useContext(AccountContext);
  const networkMap = useMemo(() => getNetworkMap(), [])
  const [filter, setFilter] = useState('');
  const mediaAllowed = useContext(MediaContext);

  useEffect(() => {
    setFilteredAccount(
      filter
        ? hierarchy.filter((account) =>
          account.name?.toLowerCase().includes(filter) ||
          (account.genesisHash && networkMap.get(account.genesisHash)?.toLowerCase().includes(filter))
        )
        : hierarchy
    );
  }, [filter, hierarchy, networkMap]);

  // const _onOpenLedgerConnect = useCallback(
  //   () => windowOpen(ledgerPath),
  //   []
  // );

  const _onChangeFilter = useCallback((filter: string) => {
    setFilter(filter);
    onFilter && onFilter(filter);
  }, [onFilter]);
  return (
    <KoniMenu
      className={className}
      reference={reference}
    >
      <div className='searchBarWrapper'>
        <div className='koniBranding'>
          <img
            className='logo'
            src={logo}
          />
          <span className='logoText'>Accounts</span>
        </div>
        <KoniInputFilter
          className='inputFilter'
          onChange={_onChangeFilter}
          placeholder={t<string>('Search by name or net...')}
          value={filter}
          withReset
        />
      </div>
      <div className='accountsContainer'>
        {filteredAccount.map((json, index): React.ReactNode => (
          <KoniAccountsTree
            closeSetting={closeSetting}
            {...json}
            key={`${index}:${json.address}`}
          />
        ))}
      </div>

      <div className='koni-menu-items-container'>
        <div className='koni-menu-items-wrapper'>
          <MenuSettingItem className='menuItem'>
            <KoniLink to={'/account/create'} className='menuItem__text'>
              <FontAwesomeIcon icon={faPlusCircle} />
              <span>{ t('Create new account')}</span>
            </KoniLink>
          </MenuSettingItem>
          {!!master && (
            <MenuSettingItem className='menuItem'>
              <KoniLink to={`/account/derive/${master.address}`} className='menuItem__text'>
                <FontAwesomeIcon icon={faCodeBranch} />
                <span>{t('Derive from an account')}</span>
              </KoniLink>
            </MenuSettingItem>
          )}
        </div>

        <div className='koni-menu-items-wrapper'>
          <MenuSettingItem className='menuItem'>
            <KoniLink to={'/account/export-all'} className='menuItem__text'>
              <FontAwesomeIcon icon={faFileExport} />
              <span>{t<string>('Export all accounts')}</span>
            </KoniLink>
          </MenuSettingItem>
          <MenuSettingItem className='menuItem'>
            <KoniLink to='/account/import-seed' className='menuItem__text'>
              <FontAwesomeIcon icon={faKey} />
              <span>{t<string>('Import account from pre-existing seed')}</span>
            </KoniLink>
          </MenuSettingItem>
          <MenuSettingItem className='menuItem'>
            <KoniLink to={jsonPath} className='menuItem__text'>
              <FontAwesomeIcon icon={faFileUpload} />
              <span>{t<string>('Restore account from backup JSON file')}</span>
            </KoniLink>
          </MenuSettingItem>
        </div>

        <div className='koni-menu-items-wrapper'>
          <MenuSettingItem className='menuItem'>
            <KoniLink className='menuItem__text'
              isDisabled={!mediaAllowed}
              title={!mediaAllowed
                ? t<string>('Camera access must be first enabled in the settings')
                : ''
              }
              to='/account/import-qr'
            >
              <FontAwesomeIcon icon={faQrcode} />
              <span>{t<string>('Attach external QR-signer account')}</span>
            </KoniLink>
          </MenuSettingItem>

          {/*<MenuSettingItem className='menuItem ledger'>*/}
          {/*  {isLedgerEnabled*/}
          {/*    ? (*/}
          {/*      <KoniLink*/}
          {/*        className='menuItem__text'*/}
          {/*        isDisabled={!isLedgerCapable}*/}
          {/*        title={ (!isLedgerCapable && t<string>('Ledger devices can only be connected with Chrome browser')) || ''}*/}
          {/*        to={ledgerPath}*/}
          {/*      >*/}
          {/*        <FontAwesomeIcon*/}
          {/*          icon={faUsb}*/}
          {/*          rotation={270}*/}
          {/*        />*/}
          {/*        <span>{ t<string>('Attach ledger account')}</span>*/}
          {/*      </KoniLink>*/}
          {/*    )*/}
          {/*    : (*/}
          {/*      <KoniLink onClick={_onOpenLedgerConnect} className='menuItem__text'>*/}
          {/*        <FontAwesomeIcon*/}
          {/*          icon={faUsb}*/}
          {/*          rotation={270}*/}
          {/*        />*/}
          {/*        <span>{ t<string>('Connect Ledger device')}</span>*/}
          {/*      </KoniLink>*/}
          {/*    )*/}
          {/*  }*/}
          {/*</MenuSettingItem>
          {/*<MenuSettingItem className='menuItem ledger'>*/}
          {/*  {isLedgerEnabled*/}
          {/*    ? (*/}
          {/*      <KoniLink*/}
          {/*        className='menuItem__text'*/}
          {/*        isDisabled={!isLedgerCapable}*/}
          {/*        title={ (!isLedgerCapable && t<string>('Ledger devices can only be connected with Chrome browser')) || ''}*/}
          {/*        to={ledgerPath}*/}
          {/*      >*/}
          {/*        <FontAwesomeIcon*/}
          {/*          icon={faUsb}*/}
          {/*          rotation={270}*/}
          {/*        />*/}
          {/*        <span>{ t<string>('Attach ledger account')}</span>*/}
          {/*      </KoniLink>*/}
          {/*    )*/}
          {/*    : (*/}
          {/*      <KoniLink onClick={_onOpenLedgerConnect} className='menuItem__text'>*/}
          {/*        <FontAwesomeIcon*/}
          {/*          icon={faUsb}*/}
          {/*          rotation={270}*/}
          {/*        />*/}
          {/*        <span>{ t<string>('Connect Ledger device')}</span>*/}
          {/*      </KoniLink>*/}
          {/*    )*/}
          {/*  }*/}
          {/*</MenuSettingItem>*/}
        </div>
      </div>
      <div className='koni-menu-items-container'>
        <MenuSettingItem className='menuItem'>
          <KoniLink to={'/account/settings'} className='menuItem__text'>
            <FontAwesomeIcon icon={faCog} />
            <span>{ t('Settings')}</span>
          </KoniLink>
        </MenuSettingItem>
      </div>
    </KoniMenu>
  );
}

export default React.memo(styled(AccountMenuSettings)(({ theme }: Props) => `
  margin-top: 50px;
  right: 5px;
  user-select: none;

  .accountsContainer {
    max-height: 148px;
    overflow-y: auto;
    scrollbar-width: none;
    padding: 0 15px;
    margin-bottom: 8px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .logoText {
    font-size: 20px;
    line-height: 32px;
    font-weight: 500;
    color: ${theme.textColor};
  }

  .koniBranding {
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${theme.labelColor};
      font-family: ${theme.fontFamily};
      text-align: center;
      margin-right: 15px;

      .logo {
        height: 32px;
        width: 32px;
        margin-right: 10px;
      }
  }

  .searchBarWrapper {
    padding: 12px 16px;
    display: flex;
    justify-content: space-between;
    border-bottom:2px solid ${theme.boxBorderColor};
  }

  .openWindow, .manageWebsiteAccess{
    span {
      color: ${theme.textColor};
      font-size: ${theme.fontSize};
      line-height: ${theme.lineHeight};
      text-decoration: none;
      vertical-align: middle;
    }

    ${Svg} {
      background: ${theme.textColor};
      height: 20px;
      top: 4px;
      width: 20px;
    }
  }

  > .setting {
    > .checkbox {
      color: ${theme.textColor};
      line-height: 20px;
      font-size: 15px;
      margin-bottom: 0;

      &.ledger {
        margin-top: 0.2rem;
      }

      label {
        color: ${theme.textColor};
      }
    }

    > .dropdown {
      background: ${theme.background};
      margin-bottom: 0;
      margin-top: 9px;
      margin-right: 0;
      width: 100%;
    }
  }

  .menuItem {
    padding: 0;

    .svg-inline--fa {
      color: ${theme.iconNeutralColor};
      margin-right: 0.3rem;
      width: 0.875em;
    }

    &__text {
      font-size: 15px;
      line-height: 30px;
      color: ${theme.textColor2};
      > span {
        font-weight: 400;
      }
    }
  }

  .menuItem:hover {
    .menuItem__text {
      color: ${theme.textColor};
    }

    .svg-inline--fa {
      color: ${theme.iconHoverColor};
    }
  }

  .koni-menu-items-container {
    padding: 0 15px;

    &:last-child {
      padding: 0 27px;
      margin: 8px 0
    }
  }

  .koni-menu-items-wrapper {
    border-radius: 8px;
    border: 2px solid ${theme.menuItemsBorder};
    padding: 8px 12px;
    margin-bottom: 8px;
  }

  .koni-menu-items-wrapper:last-child {
    margin-bottom: 0;
  }

  .inputFilter {
    width: 100%;
  }
`));
