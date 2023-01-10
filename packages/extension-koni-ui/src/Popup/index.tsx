// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AccountJson, AccountsContext, AuthorizeRequest, MetadataRequest, SigningRequest } from '@subwallet/extension-base/background/types';
import type { SettingsStruct } from '@polkadot/ui-settings/types';

import { AccountsWithCurrentAddress, ConfirmationsQueue, ConfirmationType, CurrentAccountInfo } from '@subwallet/extension-base/background/KoniTypes';
import { canDerive } from '@subwallet/extension-base/utils';
import { ALL_ACCOUNT_KEY } from '@subwallet/extension-koni-base/constants';
import ToastProvider from '@subwallet/extension-koni-ui/components/Toast/ToastProvider';
import { AccountContext, ActionContext, AuthorizeReqContext, ConfirmationsQueueContext, MediaContext, MetadataReqContext, SettingsContext, SigningReqContext } from '@subwallet/extension-koni-ui/contexts';
import { ExternalRequestContextProvider } from '@subwallet/extension-koni-ui/contexts/ExternalRequestContext';
import { QRContextProvider } from '@subwallet/extension-koni-ui/contexts/QrSignerContext';
import { ScannerContextProvider } from '@subwallet/extension-koni-ui/contexts/ScannerContext';
import { SigningContextProvider } from '@subwallet/extension-koni-ui/contexts/SigningContext';
import useSetupStore from '@subwallet/extension-koni-ui/hooks/store/useSetupStore';
import { saveCurrentAccountAddress, subscribeAccountsWithCurrentAddress, subscribeAuthorizeRequestsV2, subscribeConfirmations, subscribeMetadataRequests, subscribeSigningRequests } from '@subwallet/extension-koni-ui/messaging';
import { store } from '@subwallet/extension-koni-ui/stores';
import { updateCurrentAccount } from '@subwallet/extension-koni-ui/stores/updater';
import { buildHierarchy } from '@subwallet/extension-koni-ui/util/buildHierarchy';
import * as Bowser from 'bowser';
import React, { useCallback, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import uiSettings from '@polkadot/ui-settings';

import LoadingContainer from '../components/LoadingContainer';
import Rendering from './Rendering';
import { router } from './routes';

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

const VARIANTS = ['beam', 'marble', 'pixel', 'sunset', 'bauhaus', 'ring'];

function getRandomVariant (): string {
  const random = Math.floor(Math.random() * 6);

  return VARIANTS[random];
}

export default function Popup (): React.ReactElement {
  const [accounts, setAccounts] = useState<null | AccountJson[]>(null);
  const [accountCtx, setAccountCtx] = useState<AccountsContext>({
    accounts: [],
    hierarchy: []
  });
  const [authRequests, setAuthRequests] = useState<null | AuthorizeRequest[]>(null);
  const [cameraOn, setCameraOn] = useState(startSettings.camera === 'on');
  const [mediaAllowed, setMediaAllowed] = useState(false);
  const [metaRequests, setMetaRequests] = useState<null | MetadataRequest[]>(null);
  const [signRequests, setSignRequests] = useState<null | SigningRequest[]>(null);
  const [confirmations, setConfirmations] = useState<ConfirmationsQueue>({
    addNetworkRequest: {},
    addTokenRequest: {},
    switchNetworkRequest: {},
    evmSignatureRequest: {},
    evmSignatureRequestExternal: {},
    evmSendTransactionRequest: {},
    evmSendTransactionRequestExternal: {}
  });
  const [isWelcomeDone, setWelcomeDone] = useState(false);
  const [settingsCtx, setSettingsCtx] = useState<SettingsStruct>(startSettings);
  const browser = Bowser.getParser(window.navigator.userAgent);

  if (!window.localStorage.getItem('randomVariant') || !window.localStorage.getItem('randomNameForLogo')) {
    const randomVariant = getRandomVariant();

    window.localStorage.setItem('randomVariant', randomVariant);
    window.localStorage.setItem('randomNameForLogo', `${Date.now()}`);
  }

  if (!!browser.getBrowser() && !!browser.getBrowser().name && !!browser.getOS().name) {
    window.localStorage.setItem('browserInfo', browser.getBrowser().name as string);
    window.localStorage.setItem('osInfo', browser.getOS().name as string);
  }

  const _onAction = useCallback(
    (to?: string): void => {
      setWelcomeDone(window.localStorage.getItem('welcome_read') === 'ok');

      if (to) {
        window.location.hash = to;
      }
    },
    []
  );

  // @ts-ignore
  const handleGetAccountsWithCurrentAddress = (data: AccountsWithCurrentAddress) => {
    const { accounts, currentAddress, currentGenesisHash } = data;

    if (accounts && accounts.length === 0) {
      accounts.push({ address: currentAddress || ALL_ACCOUNT_KEY, genesisHash: currentGenesisHash });
    }

    setAccounts(accounts);

    if (accounts && accounts.length) {
      let selectedAcc = accounts.find((acc) => acc.address === currentAddress);

      if (!selectedAcc) {
        selectedAcc = accounts[0];
        selectedAcc.genesisHash = currentGenesisHash;

        const accountInfo = {
          address: selectedAcc.address,
          currentGenesisHash
        } as CurrentAccountInfo;

        saveCurrentAccountAddress(accountInfo, () => {
          updateCurrentAccount(selectedAcc as AccountJson);
        }).catch((e) => {
          console.error('There is a problem when set Current Account', e);
        });
      } else {
        selectedAcc.genesisHash = currentGenesisHash;
        updateCurrentAccount(selectedAcc);
      }
    }
  };

  const checkConfirmation = useCallback(
    (type?: ConfirmationType) => {
      if (type) {
        return confirmations[type] && Object.keys(confirmations[type]).length > 0;
      } else {
        return !!Object.values(confirmations).find((c) => (Object.keys(c).length > 0));
      }
    },
    [confirmations]
  );

  useEffect(() => {
    const handleConfirmations = (confirmations: ConfirmationsQueue) => {
      setConfirmations(confirmations);
    };

    subscribeConfirmations(handleConfirmations)
      .then(handleConfirmations)
      .catch(console.error);
  }, []);

  useEffect((): void => {
    setWelcomeDone(window.localStorage.getItem('welcome_read') === 'ok');
    const beforeNav = window.localStorage.getItem('popupNavigation');

    if (authRequests?.length || metaRequests?.length || signRequests?.length || checkConfirmation()) {
      window.location.hash = '/';
    } else if (beforeNav) {
      window.location.hash = beforeNav;
    }
  }, [authRequests, checkConfirmation, metaRequests, signRequests]);

  useEffect((): void => {
    Promise.all([
      // subscribeAccounts(setAccounts),
      subscribeAccountsWithCurrentAddress(handleGetAccountsWithCurrentAddress),
      subscribeAuthorizeRequestsV2(setAuthRequests),
      subscribeMetadataRequests(setMetaRequests),
      subscribeSigningRequests(setSignRequests)
    ]).catch(console.error);

    uiSettings.on('change', (settings): void => {
      setSettingsCtx(settings);
      setCameraOn(settings.camera === 'on');
    });
  }, []);

  useSetupStore();

  useEffect((): void => {
    setAccountCtx(initAccountContext(accounts || []));
  }, [accounts]);

  useEffect((): void => {
    requestMediaAccess(cameraOn)
      .then(setMediaAllowed)
      .catch(console.error);
  }, [cameraOn]);

  if (isWelcomeDone) {
    if (authRequests && authRequests.length) {
      router.navigate('/authorize');
    } else if (metaRequests && metaRequests.length) {
      router.navigate('/metadata');
    } else if (signRequests && signRequests.length) {
      router.navigate('/signing');
    } else if (checkConfirmation()) {
      router.navigate('/confirmation');
    } else {
      router.navigate('/');
    }
  } else {
    router.navigate('/welcome');
  }

  return (
    <LoadingContainer>{accounts && authRequests && metaRequests && signRequests && (
      <Provider store={store}>
        <ActionContext.Provider value={_onAction}>
          <div id='tooltips' />
          <SettingsContext.Provider value={settingsCtx}>
            <AccountContext.Provider value={accountCtx}>
              <AuthorizeReqContext.Provider value={authRequests}>
                <MediaContext.Provider value={cameraOn && mediaAllowed}>
                  <MetadataReqContext.Provider value={metaRequests}>
                    <SigningReqContext.Provider value={signRequests}>
                      <ConfirmationsQueueContext.Provider value={confirmations}>
                        <SigningContextProvider>
                          <ExternalRequestContextProvider>
                            <ScannerContextProvider>
                              <QRContextProvider>
                                <ToastProvider>
                                  <Rendering />
                                  <RouterProvider router={router}></RouterProvider>
                                </ToastProvider>
                              </QRContextProvider>
                            </ScannerContextProvider>
                          </ExternalRequestContextProvider>
                        </SigningContextProvider>
                      </ConfirmationsQueueContext.Provider>
                    </SigningReqContext.Provider>
                  </MetadataReqContext.Provider>
                </MediaContext.Provider>
              </AuthorizeReqContext.Provider>
            </AccountContext.Provider>
          </SettingsContext.Provider>
        </ActionContext.Provider>
      </Provider>
    )}</LoadingContainer>
  );
}
