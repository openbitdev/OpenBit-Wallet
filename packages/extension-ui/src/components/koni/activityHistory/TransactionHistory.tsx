import React, {useState} from "react";
import {ThemeProps} from "@polkadot/extension-ui/types";
import styled from "styled-components";
import {TransactionHistoryItem} from "@polkadot/extension-base/background/types";
import BN from "bn.js";
import TransactionHistoryItemEl from "./TransactionHistoryItem";
import {useApi} from "@polkadot/extension-ui/koni/react-hooks";
import transactionHistoryComingSoon from '../../../assets/transaction-history-coming-soon.png';

interface Props extends ThemeProps {
  className?: string;
  address?: string;
  api?: any
}

function Wrapper({className, theme}: Props): React.ReactElement<Props> {
  const {isApiReady, api} = useApi();

  return (
    <div className={`-wrapper ${className}`}>
      {isApiReady ? (<TransactionHistory theme={theme} api={api}/>)
      : (
        <div className='transaction-history-not-ready'>
          <img src={transactionHistoryComingSoon} alt="coming-soon"/>
        </div>
        )
      }
    </div>
  );
}

function TransactionHistory({className, address, api}: Props): React.ReactElement<Props> {
  const mockApi: TransactionHistoryItem[] = [
    {
      time: 1641791009272,
      networkName: '',
      genesisHash: '',
      change: new BN(0),
      fee: new BN(0),
      isSuccess: true,
      action: 'send',
      extrinsicHash: '0xce13114c5b4df56d9c6cfefed59d6bd785c28264fb6a63d54b51d6c9ccf4464a'
    },
    {
      time: 1641791009272,
      networkName: '',
      genesisHash: '',
      change: new BN(0),
      fee: new BN(0),
      isSuccess: false,
      action: 'send',
      extrinsicHash: '0xce13114c5b4df56d9c6cfefed59d6bd785c28264fb6a63d54b51d6c9ccf4464a'
    },
    {
      time: 1641791009272,
      networkName: '',
      genesisHash: '',
      change: new BN(0),
      fee: new BN(0),
      isSuccess: true,
      action: 'received',
      extrinsicHash: '0xce13114c5b4df56d9c6cfefed59d6bd785c28264fb6a63d54b51d6c9ccf4464a'
    },
    {
      time: 1641791009272,
      networkName: '',
      genesisHash: '',
      change: new BN(0),
      fee: new BN(0),
      isSuccess: false,
      action: 'received',
      extrinsicHash: '0xce13114c5b4df56d9c6cfefed59d6bd785c28264fb6a63d54b51d6c9ccf4464a'
    },
    {
      time: 1641791009272,
      networkName: '',
      genesisHash: '',
      change: new BN(0),
      fee: new BN(0),
      isSuccess: false,
      action: 'received',
      extrinsicHash: '0xce13114c5b4df56d9c6cfefed59d6bd785c28264fb6a63d54b51d6c9ccf4464a'
    },
    {
      time: 1641791009272,
      networkName: '',
      genesisHash: '',
      change: new BN(0),
      fee: new BN(0),
      isSuccess: false,
      action: 'received',
      extrinsicHash: '0xce13114c5b4df56d9c6cfefed59d6bd785c28264fb6a63d54b51d6c9ccf4464a'
    },
    {
      time: 1641791009272,
      networkName: '',
      genesisHash: '',
      change: new BN(0),
      fee: new BN(0),
      isSuccess: false,
      action: 'received',
      extrinsicHash: '0xce13114c5b4df56d9c6cfefed59d6bd785c28264fb6a63d54b51d6c9ccf4464a'
    }
  ];
  const [isNotSupport, setIsNotSupport] = useState('false');

  const renderChainBalanceItem = (item: any) => {
    return (
      <TransactionHistoryItemEl
        isNotSupport={isNotSupport}
        itemValue={item}
        registry={api.registry}
      />
    )
  }
  return (
    <>
      <div className={className}>
        {mockApi.map(item => renderChainBalanceItem(item))}
      </div>
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
`)
