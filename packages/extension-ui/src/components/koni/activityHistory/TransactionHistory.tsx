import React from "react";
import {ThemeProps} from "@polkadot/extension-ui/types";
import styled from "styled-components";
import arrowSend from "@polkadot/extension-ui/assets/arrow-send.svg"
import arrowReceived from "@polkadot/extension-ui/assets/arrow-received.svg"
import useTranslation from "@polkadot/extension-ui/hooks/useTranslation";
import {BalanceVal} from "@polkadot/extension-ui/components/koni/balance";

interface Props extends ThemeProps {
  className?: string;
  isReceived?: boolean;
}

const toShortAddress = (_address: string, halfLength?: number) => {
  const address = (_address || '').toString();

  const addressLength = halfLength ? halfLength : 6;

  return address.length > 13 ? `${address.slice(0, addressLength)}…${address.slice(-addressLength)}` : address;
};

function TransactionHistory({className, isReceived}: Props): React.ReactElement<Props> {
  const {t} = useTranslation();
  return (
    <>
      <div className={className}>
        <div className='kn-history-item__main-area'>
          <div className='kn-history-item__main-area-part-1'>
            <div className={`kn-history-item__img-wrapper ${isReceived ? 'received-img-wrapper' : 'send-img-wrapper'}`}>
              {isReceived ?
                <img className='kn-history-item__img' src={arrowReceived} alt="received"/> :
                <img className='kn-history-item__img' src={arrowSend} alt="send"/>
              }
            </div>
            <div className='kn-history-item__meta-wrapper'>
              <div className='kn-history-item__address'>{toShortAddress('5GT8wUhrDkc6eSFWiycyjqHsPeFQ7bWgZNwUTCWD1QH1uMk7')}</div>
              <div className='kn-history-item__bottom-area'>
                <span className='kn-history-item__transaction-stt'>{isReceived ? t<string>('Received'): t<string>('Send')}</span>
                <span className='kn-history-item__transaction-date'>Dec 21</span>
              </div>
            </div>
          </div>
          <div className='kn-history-item__main-area-part-2'>
            <div className='kn-history-item__value'>
              <span>{isReceived ? '+' : '-'}</span>
              <BalanceVal value='13.29' startWithSymbol symbol={'$'}/>
            </div>

            <div className='kn-history-item__balance'>
              <BalanceVal value='1' symbol={'DOT'}/>
            </div>
          </div>
        </div>
        <div className='kn-history-item__separator' />
      </div>
    </>
  );
}

export default React.memo(styled(TransactionHistory)(({theme}: Props) => `
  .kn-history-item__main-area {
    display: flex;
    align-items: center;
    padding: 10px 0;
  }

  .kn-history-item__main-area-part-1 {
    display: flex;
    padding-left: 15px;
    align-items: center;
    flex: 1;
  }

  .kn-history-item__main-area-part-2 {
    padding-right: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .kn-history-item__img-wrapper {
    border: 2px solid;
    border-radius: 40%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 14px;
  }

  .received-img-wrapper {
    border-color: rgba(102, 225, 182, 0.3);
  }

  .send-img-wrapper {
    border-color: rgba(0, 75, 255, 0.3);
  }

  .kn-history-item__img {
    width: 20px;
  }

  .kn-history-item__address {
    font-size: 18px;
    line-height: 30px;
    font-weight: 500;
  }

  .kn-history-item__transaction-stt {
    font-size: 15px;
    line-height: 24px;
    color: ${theme.textColor2};
  }

  .kn-history-item__transaction-date {
    font-size: 15px;
    line-height: 24px;
    color: ${theme.textColor2};
    position: relative;
    padding-left: 17px;
  }

  .kn-history-item__transaction-date:before {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${theme.textColor2};
    top: 0;
    bottom: 0;
    left: 7px;
    margin: auto 0;
  }

  .kn-history-item__value, .kn-history-item__balance {
    text-align: right;
    font-size: 15px;
    line-height: 26px;
  }

  .kn-history-item__value {
    font-weight: 500;
    padding-bottom: 3px;
  }

  .kn-history-item__balance {
    color: ${theme.textColor2};
  }

  .kn-history-item__separator {
    padding-left: 15px;
    padding-right: 15px;

    &:before {
      content: '';
      height: 1px;
      display: block;
      background: ${theme.boxBorderColor};
    }
  }
`))
