import React, {useEffect, useState} from 'react';
import {ApiProvider} from './ApiContext';
import {ApiProps, BackgroundWindow} from "@polkadot/extension-base/background/types";
import {initApi} from "@polkadot/extension-ui/messaging";
import {ApiInitStatus} from "@polkadot/extension-base/background/pDotApi";
import {formatBalance} from '@polkadot/util';
import {TokenUnit} from "@polkadot/extension-ui/koni/react-components/InputNumber";

interface Props {
  children: React.ReactNode;
  genesisHash: string;
  currentAccountAddress?: string;
  isWelcomeDone: boolean
}

const bWindow = chrome.extension.getBackgroundPage() as BackgroundWindow;
const {apisMap} = bWindow.pdotApi;


function setupDefaultFormatBalance (apiProps: ApiProps, genesisHash: string) {
  const {defaultFormatBalance} = apiProps;
  const {decimals, unit} = defaultFormatBalance;

  formatBalance.setDefaults({
    decimals,
    unit
  });

  TokenUnit.setAbbr(unit as string);
}

function Api({genesisHash, currentAccountAddress, children}: Props): React.ReactElement<Props> | null {
  const [value, setValue] = useState({isApiReady: false} as ApiProps);

  useEffect(() => {
    let isSync = true;

    (async () => {

      let apiInfo = apisMap[genesisHash];

      if (apiInfo) {
        if (apiInfo.isApiReady) {
          if (isSync) {
            setupDefaultFormatBalance(apiInfo, genesisHash);
            setValue(apiInfo);
          }
        } else {
          await apiInfo.isReady;
          if (isSync) {
            setupDefaultFormatBalance(apiInfo, genesisHash);
            setValue(apiInfo);
          }
        }

        return;
      }

      const apiInitiationStatus = await initApi(genesisHash);

      if ([
        ApiInitStatus.NOT_SUPPORT.valueOf()
        // , ApiInitStatus.ALREADY_EXIST.valueOf()
      ].includes(apiInitiationStatus.valueOf())) {
        if (isSync) {
          setValue({isApiReady: false, isNotSupport: true} as ApiProps);
        }

        return;
      }

      if (isSync) {
        setValue({isApiReady: false} as ApiProps);
      }

      apiInfo = apisMap[genesisHash];

      if (isSync && apiInfo && apiInfo.isApiReady) {
        setupDefaultFormatBalance(apiInfo, genesisHash);
        setValue(apiInfo);

        return;
      }

      await apiInfo.isReady;

      if (isSync) {
        setupDefaultFormatBalance(apiInfo, genesisHash);
        setValue(apiInfo);
      }
    })()

    return () => {
      isSync = false;
    }
  }, [genesisHash, currentAccountAddress]);

  return (
    <ApiProvider value={value}>
      {children}
    </ApiProvider>
  );
}

function compareProps(prevProps: Props, nextProps: Props) {
  return (prevProps.genesisHash === nextProps.genesisHash)
    && (prevProps.currentAccountAddress === nextProps.currentAccountAddress)
    && (prevProps.isWelcomeDone === nextProps.isWelcomeDone);
}

export default React.memo(Api, compareProps);
