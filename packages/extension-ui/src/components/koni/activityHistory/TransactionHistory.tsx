import React, {useEffect, useState} from 'react';
import {ThemeProps} from '@polkadot/extension-ui/types';
import styled from 'styled-components';
import {BackgroundWindow, TransactionHistoryItem} from '@polkadot/extension-base/background/types';
import TransactionHistoryItemEl from './TransactionHistoryItem';
import transactionHistoryComingSoon from '../../../assets/transaction-history-coming-soon.png';
import {getTransactionHistoryByMultiNetworks} from '@polkadot/extension-ui/messaging';
import {isSupportSubscan, subscanByNetworkName} from '@polkadot/extension-ui/util/koni';
import {Registry} from "@polkadot/types/types";

const bWindow = chrome.extension.getBackgroundPage() as BackgroundWindow;
const {apisMap} = bWindow.pdotApi;

interface Props extends ThemeProps {
  className?: string;
  networkNames: string[];
  address: string;
}

interface ContentProp extends ThemeProps {
  className?: string;
  registryMap: Record<string, Registry>;
  items: TransactionHistoryItem[];
}

function getSubscanUrl(networkName: string, hash: string): string {
  return `${subscanByNetworkName[networkName]}/extrinsic/${hash}`;
}

function Wrapper({className, theme, networkNames, address}: Props): React.ReactElement<Props> {
  const [items, setItems] = useState<TransactionHistoryItem[]>([]);
  const [isApisReady, setApisReady] = useState<boolean>(false);
  const [registryMap, setRegistryMap] = useState<Record<string, Registry>>({});


  useEffect(() => {
      const syncMap: Record<string, boolean> = {};

      networkNames.forEach(networkName => {
        syncMap[networkName] = true;
      });

      networkNames.forEach(async networkName => {
        const apiInfo = apisMap[networkName];

        if (!apiInfo.isApiReady) {
          await apiInfo.isReady;
        }

        const {api} = apiInfo;

        if (syncMap[networkName]) {
            setRegistryMap(r => {
              return {
                ...r,
                [networkName]: api.registry
              }
            })
        }
      });

      return () => {
        Object.keys(syncMap).forEach(networkName => {
          syncMap[networkName] = false;
        });

        setRegistryMap({});
      }
    },
    [networkNames, address]);

  useEffect(() => {
    for(let i = 0; i < networkNames.length; i++) {
      const networkName = networkNames[i];

      if (!registryMap[networkName]) {
        setApisReady(false);
        return;
      }
    }

    setApisReady(true);
  }, [registryMap])

  useEffect(() => {
    if (!isApisReady) {
      return;
    }

    let isSync = true;

    (async () => {
      getTransactionHistoryByMultiNetworks(address, networkNames, (items) => {
        if (isSync) {
          setItems(items)
        }
      }).catch(e => console.log('Error when get Transaction History', e));
    })();

    return () => {
      isSync = false;
      setItems([]);
    };
  }, [isApisReady, networkNames, address]);

  return (
    <div className={`-wrapper ${className}`}>
      {isApisReady && items && items.length ? (<TransactionHistory
          theme={theme}
          items={items}
          registryMap={registryMap} />)
        : (
          <div className='transaction-history-not-ready'>
            <img src={transactionHistoryComingSoon} alt="Empty"/>
          </div>
        )
      }
    </div>
  );
}


function TransactionHistory({items, registryMap}: ContentProp): React.ReactElement<ContentProp> {
  console.log('registryMap', registryMap);
  console.log('items', items);

  const renderChainBalanceItem = (item: TransactionHistoryItem, registryMap: Record<string, Registry>) => {
    const {networkName} = item;
    console.log('networkName=======', networkName);

    const _isSupportSubscan = isSupportSubscan(networkName);
    const {extrinsicHash} = item;

    if (_isSupportSubscan) {
      return (
        <a href={getSubscanUrl(networkName, extrinsicHash)} target={'_blank'} key={extrinsicHash}
           className={'transaction-item-wrapper'}>
          <TransactionHistoryItemEl
            item={item}
            registry={registryMap[networkName]}
          />
        </a>
      )
    }

    return (
      <div key={extrinsicHash}>
        <TransactionHistoryItemEl
          item={item}
          isSupportSubscan={false}
          registry={registryMap[networkName]}
        />
      </div>
    )
  };
  return (
    <>
      {items.map(item => renderChainBalanceItem(item, registryMap))}
    </>
  );
}

export default styled(Wrapper)(({theme}: Props) => `
  height: 100%;
  overflow-y: auto;

  .transaction-history-not-ready {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .transaction-item-wrapper {
      color: inherit;
      display: block;
  }
`)
