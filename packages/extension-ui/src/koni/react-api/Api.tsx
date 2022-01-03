import React, { useEffect, useState } from 'react';
import { ApiProvider } from './ApiContext';
import { ApiProps, BackgroundWindow } from '@polkadot/extension-base/background/types';
import { initApi } from '@polkadot/extension-ui/messaging';
import { ApiInitStatus } from '@polkadot/extension-base/background/pDotApi';
import { formatBalance } from '@polkadot/util';
import { TokenUnit } from '@polkadot/extension-ui/koni/react-components/InputNumber';

interface Props {
  children: React.ReactNode;
  networkName: string;
  currentAccountAddress?: string;
}

const bWindow = chrome.extension.getBackgroundPage() as BackgroundWindow;
const {apisMap} = bWindow.pdotApi;


function setupDefaultFormatBalance(apiProps: ApiProps, networkName: string) {
  const {defaultFormatBalance} = apiProps;
  const {decimals, unit} = defaultFormatBalance;

  formatBalance.setDefaults({
    decimals,
    unit
  });

  TokenUnit.setAbbr(unit as string);
}

function Api({networkName, currentAccountAddress, children}: Props): React.ReactElement<Props> | null {
  const [value, setValue] = useState({isApiReady: false} as ApiProps);

  useEffect(() => {
    let isSync = true;

    (async () => {

      let apiInfo = apisMap[networkName];

      if (apiInfo) {
        if (apiInfo.isApiReady) {
          if (isSync) {
            setupDefaultFormatBalance(apiInfo, networkName);
            setValue(apiInfo);
          }
        } else {
          await apiInfo.isReady;
          if (isSync) {
            setupDefaultFormatBalance(apiInfo, networkName);
            setValue(apiInfo);
          }
        }

        return;
      }

      const apiInitiationStatus = await initApi(networkName);

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

      apiInfo = apisMap[networkName];

      if (isSync && apiInfo && apiInfo.isApiReady) {
        setupDefaultFormatBalance(apiInfo, networkName);
        setValue(apiInfo);

        return;
      }

      await apiInfo.isReady;

      if (isSync) {
        setupDefaultFormatBalance(apiInfo, networkName);
        setValue(apiInfo);
      }
    })();

    return () => {
      isSync = false;
    };
  }, [networkName, currentAccountAddress]);

  return (
    <ApiProvider value={value}>
      {children}
    </ApiProvider>
  );
}

// function compareProps(prevProps: Props, nextProps: Props) {
//   return (prevProps.genesisHash === nextProps.genesisHash)
//     && (prevProps.currentAccountAddress === nextProps.currentAccountAddress)
//     && (prevProps.isWelcomeDone === nextProps.isWelcomeDone);
// }

export default React.memo(Api);
