import React, { useEffect, useState } from 'react';
import { ThemeProps } from '@polkadot/extension-ui/types';
import styled from 'styled-components';
import { TransactionHistoryItem } from '@polkadot/extension-base/background/types';
import TransactionHistoryItemEl from './TransactionHistoryItem';
import { useApi } from '@polkadot/extension-ui/koni/react-hooks';
import transactionHistoryComingSoon from '../../../assets/transaction-history-coming-soon.png';
import { ApiPromise } from '@polkadot/api';
import { getTransactionHistory } from '@polkadot/extension-ui/messaging';
import { isSupportSubscan, subscanByNetworkName } from '@polkadot/extension-ui/util/koni';

interface Props extends ThemeProps {
  className?: string;
  networkName: string;
  address: string;
}

interface ContentProp extends ThemeProps {
  className?: string;
  api: ApiPromise;
  networkName: string;
  items: TransactionHistoryItem[];
}

function getSubscanUrl(networkName: string, hash: string): string {
  return `${subscanByNetworkName[networkName]}/extrinsic/${hash}`;
}

function Wrapper({className, theme, networkName, address}: Props): React.ReactElement<Props> {
  const {isApiReady, api} = useApi();
  const [items, setItems] = useState<TransactionHistoryItem[]>([]);

  useEffect(() => {
    let isSync = true;

    (async () => {
      getTransactionHistory(address, networkName, (items) => {
        if (isSync) {
          setItems(items)
        }
      }).catch(e => console.log('Error when get Transaction History', e));
    })();

    return () => {
      isSync = false;
    };
  }, [networkName, address]);

  return (
    <div className={`-wrapper ${className}`}>
      {isApiReady && items && items.length ? (<TransactionHistory
          theme={theme}
          items={items}
          networkName={networkName}
          api={api}/>)
      : (
        <div className='transaction-history-not-ready'>
          <img src={transactionHistoryComingSoon} alt="Empty"/>
        </div>
        )
      }
    </div>
  );
}


function TransactionHistory({className, items, networkName, api}: ContentProp): React.ReactElement<ContentProp> {
  const _isSupportSubscan = isSupportSubscan(networkName);

  const renderChainBalanceItem = (item: TransactionHistoryItem, isSupportSubscan: boolean) => {
    const {extrinsicHash} = item;

    if (isSupportSubscan) {
      return (
	      <a href={getSubscanUrl(networkName, extrinsicHash)} target={'_blank'} key={extrinsicHash} className={'transaction-item-wrapper'}>
          <TransactionHistoryItemEl
            itemValue={item}
            registry={api.registry}
          />
        </a>
      )
    }

    return (
      <div key={extrinsicHash}>
        <TransactionHistoryItemEl
          itemValue={item}
          isSupportSubscan={false}
          registry={api.registry}
        />
      </div>
    )
  };
  return (
    <>
        {items.map(item => renderChainBalanceItem(item, _isSupportSubscan))}
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
