// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type {
  AccountJson,
  AccountsContext,
  AccountsWithCurrentAddress,
  AuthorizeRequest, CurrentNetworkInfo,
  MetadataRequest,
  SigningRequest
} from '@polkadot/extension-base/background/types';
import type { SettingsStruct } from '@polkadot/ui-settings/types';
import React, { useCallback, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { PHISHING_PAGE_REDIRECT } from '@polkadot/extension-base/defaults';
import { canDerive } from '@polkadot/extension-base/utils';
import uiSettings from '@polkadot/ui-settings';
import { ErrorBoundary, Loading } from '../components';
import { AccountContext, ActionContext, AuthorizeReqContext,
  CurrentAccountContext, CurrentNetworkContext, MediaContext, MetadataReqContext, SettingsContext, SigningReqContext } from '../components/contexts';
import ToastProvider from '../components/koni/Toast/ToastProvider';
import {
  getAccountsWithCurrentAddress, saveCurrentAccountAddress,
  subscribeAuthorizeRequests,
  subscribeMetadataRequests,
  subscribeSigningRequests
} from '../messaging';
import { buildHierarchy } from '../util/buildHierarchy';
import AuthList from './KoniAuthManagement';
import Authorize from './KoniAuthorize';
import KoniSettings from './Settings'
import ImportLedger from './ImportLedger';
import Metadata from './KoniMetadata';
import PhishingDetected from './PhishingDetected';
import Signing from './KoniSigning';
import KoniAccountOverView from "@polkadot/extension-ui/Popup/Accounts/KoniAccountOverView";
import KoniForgetAccount from "@polkadot/extension-ui/Popup/KoniForgetAccount";
import KoniExportAccount from "@polkadot/extension-ui/Popup/KoniExportAccount";
import KoniImportSeed from "@polkadot/extension-ui/Popup/KoniImportSeed";
import KoniExportAll from "@polkadot/extension-ui/Popup/KoniExportAll";
import KoniCreateAccount from '@polkadot/extension-ui/Popup/KoniCreateAccount';
import KoniRestoreJson from "@polkadot/extension-ui/Popup/KoniRestoreJson";
import KoniWelcome from "@polkadot/extension-ui/Popup/KoniWelcome";
import KoniAddAccount from "@polkadot/extension-ui/Popup/Accounts/KoniAddAccount";
import useGenesisHashOptions from "@polkadot/extension-ui/hooks/useGenesisHashOptions";
import Derive from "@polkadot/extension-ui/Popup/KoniDerive";
import KoniImportQr from "@polkadot/extension-ui/Popup/KoniImportQr";
import {Api} from "@polkadot/extension-ui/koni/react-api";
import SendFund from "@polkadot/extension-ui/koni/Popup/Sending/SendFund";
import Queue from "@polkadot/extension-ui/koni/react-components/Status/Queue";
import StatusWrapper from "@polkadot/extension-ui/koni/react-components/StatusWrapper";
import Signer from "@polkadot/extension-ui/koni/Popup/Sending/Signer";

const startSettings = uiSettings.get();

// Request permission for video, based on access we can hide/show import
async function requestMediaAccess (cameraOn: boolean): Promise<boolean> {
  if (!cameraOn) {
    return false;
  }

  try {
    await navigator.mediaDevices.getUserMedia({ video: true });

    return true;
  } catch (error) {
    console.error('Permission for video declined', (error as Error).message);
  }

  return false;
}

function initAccountContext (accounts: AccountJson[]): AccountsContext {
  const hierarchy = buildHierarchy(accounts);
  const master = hierarchy.find(({ isExternal, type }) => !isExternal && canDerive(type));

  return {
    accounts,
    hierarchy,
    master
  };
}

export default function Popup (): React.ReactElement {
  const [accounts, setAccounts] = useState<null | AccountJson[]>(null);
  const [currentAccount, setCurrentAccount] = useState<null | AccountJson>(null);
  const [{networkPrefix, icon, genesisHash}, setNetwork] = useState<CurrentNetworkInfo>({networkPrefix: -1, icon: 'substrate', genesisHash: '' });
  const [accountCtx, setAccountCtx] = useState<AccountsContext>({ accounts: [], hierarchy: [] });
  const [authRequests, setAuthRequests] = useState<null | AuthorizeRequest[]>(null);
  const [cameraOn, setCameraOn] = useState(startSettings.camera === 'on');
  const [mediaAllowed, setMediaAllowed] = useState(false);
  const [metaRequests, setMetaRequests] = useState<null | MetadataRequest[]>(null);
  const [signRequests, setSignRequests] = useState<null | SigningRequest[]>(null);
  const [isWelcomeDone, setWelcomeDone] = useState(false);
  const [settingsCtx, setSettingsCtx] = useState<SettingsStruct>(startSettings);
  const genesisOptions = useGenesisHashOptions();

  const _onAction = useCallback(
    (to?: string): void => {
      setWelcomeDone(window.localStorage.getItem('welcome_read') === 'ok');

      if (to) {
        window.location.hash = to;
      }
    },
    []
  );

  const handleGetAccountsWithCurrentAddress = (data: AccountsWithCurrentAddress) => {
    const {accounts, currentAddress} = data;
    setAccounts(accounts);

    if (accounts && accounts.length) {
      let selectedAcc = accounts.find(acc => acc.address === currentAddress) || null;

      if (!selectedAcc) {
        selectedAcc = accounts[0];
        saveCurrentAccountAddress(selectedAcc.address).then(() => {
          setCurrentAccount(selectedAcc);
        }).catch(e => {
          console.error('There is a problem when set Current Account', e)
        })
      } else {
        setCurrentAccount(selectedAcc);
      }
    }
  }

  useEffect((): void => {
    Promise.all([
      // subscribeAccounts(setAccounts),
      getAccountsWithCurrentAddress(handleGetAccountsWithCurrentAddress),
      subscribeAuthorizeRequests(setAuthRequests),
      subscribeMetadataRequests(setMetaRequests),
      subscribeSigningRequests(setSignRequests)
    ]).catch(console.error);

    uiSettings.on('change', (settings): void => {
      setSettingsCtx(settings);
      setCameraOn(settings.camera === 'on');
    });

    _onAction();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect((): void => {
    setAccountCtx(initAccountContext(accounts || []));
  }, [accounts]);

  useEffect(():void => {
    let networkSelected;
    if (!currentAccount?.genesisHash) {
      networkSelected = genesisOptions[0];
    } else {
      networkSelected = genesisOptions.find(opt => opt.value == currentAccount?.genesisHash);
    }
    if (networkSelected) {
      setNetwork({
        networkPrefix: networkSelected.networkPrefix,
        icon: networkSelected.icon,
        genesisHash: networkSelected.value
      });
    }
  }, [currentAccount?.genesisHash]);

  useEffect((): void => {
    requestMediaAccess(cameraOn)
      .then(setMediaAllowed)
      .catch(console.error);
  }, [cameraOn]);

  function wrapWithErrorBoundary (component: React.ReactElement, trigger?: string): React.ReactElement {
    return <ErrorBoundary trigger={trigger}>{component}</ErrorBoundary>;
  }

  const Root = isWelcomeDone
    ? authRequests && authRequests.length
      ? wrapWithErrorBoundary(<Authorize />, 'authorize')
      : metaRequests && metaRequests.length
        ? wrapWithErrorBoundary(<Metadata />, 'metadata')
        : signRequests && signRequests.length
          ? wrapWithErrorBoundary(<Signing />, 'signing')
          : wrapWithErrorBoundary(<KoniAccountOverView />, 'accounts')
    : wrapWithErrorBoundary(<KoniWelcome />, 'welcome');

  console.log('load .... ', isWelcomeDone);

  return (
    <Loading>{accounts && authRequests && metaRequests && signRequests && (
      <ActionContext.Provider value={_onAction}><div id='tooltips' />
        <SettingsContext.Provider value={settingsCtx}>
          <AccountContext.Provider value={accountCtx}>
            <CurrentAccountContext.Provider value={{currentAccount, setCurrentAccount}}>
              <CurrentNetworkContext.Provider value={{network: {networkPrefix, icon, genesisHash}, setNetwork}}>
                <Queue><Api
                  isWelcomeDone={isWelcomeDone}
                  genesisHash={genesisHash}
                  currentAccountAddress={currentAccount?.address}>
                <AuthorizeReqContext.Provider value={authRequests}>
                  <MediaContext.Provider value={cameraOn && mediaAllowed}>
                    <MetadataReqContext.Provider value={metaRequests}>
                      <SigningReqContext.Provider value={signRequests}>
                        <ToastProvider>
                          <Switch>
                            <Route path='/auth-list'>{wrapWithErrorBoundary(<AuthList />, 'auth-list')}</Route>
                            <Route path='/account/add'>{wrapWithErrorBoundary(<KoniAddAccount />, 'account-add')}</Route>
                            <Route path='/account/create'>{wrapWithErrorBoundary(<KoniCreateAccount />, 'account-creation')}</Route>
                            <Route path='/account/settings'>{wrapWithErrorBoundary(<KoniSettings />, 'account-settings')}</Route>
                            <Route path='/account/forget/:address'>{wrapWithErrorBoundary(<KoniForgetAccount />, 'forget-address')}</Route>
                            <Route path='/account/export/:address'>{wrapWithErrorBoundary(<KoniExportAccount />, 'export-address')}</Route>
                            <Route path='/account/export-all'>{wrapWithErrorBoundary(<KoniExportAll />, 'export-all-address')}</Route>
                            <Route path='/account/import-ledger'>{wrapWithErrorBoundary(<ImportLedger />, 'import-ledger')}</Route>
                            <Route path='/account/import-qr'>{wrapWithErrorBoundary(<KoniImportQr />, 'import-qr')}</Route>
                            <Route path='/account/import-seed'>{wrapWithErrorBoundary(<KoniImportSeed />, 'import-seed')}</Route>
                            <Route path='/account/restore-json'>{wrapWithErrorBoundary(<KoniRestoreJson />, 'restore-json')}</Route>
                            <Route path='/account/derive/:address/locked'>{wrapWithErrorBoundary(<Derive isLocked />, 'derived-address-locked')}</Route>
                            <Route path='/account/derive/:address'>{wrapWithErrorBoundary(<Derive />, 'derive-address')}</Route>
                            <Route path='/account/send-fund'>{wrapWithErrorBoundary(<Signer><SendFund /></Signer>, 'send-fund')}</Route>
                            <Route path={`${PHISHING_PAGE_REDIRECT}/:website`}>{wrapWithErrorBoundary(<PhishingDetected />, 'phishing-page-redirect')}</Route>
                            <Route
                              exact
                              path='/'
                            >
                              {Root}
                            </Route>
                          </Switch>
                        </ToastProvider>
                      </SigningReqContext.Provider>
                    </MetadataReqContext.Provider>
                  </MediaContext.Provider>
                </AuthorizeReqContext.Provider>
                <StatusWrapper/>
                </Api></Queue>
              </CurrentNetworkContext.Provider>
            </CurrentAccountContext.Provider>
          </AccountContext.Provider>
        </SettingsContext.Provider>
      </ActionContext.Provider>
    )}</Loading>
  );
}
