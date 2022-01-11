import React, {useState} from "react";
import {ThemeProps} from "@polkadot/extension-ui/types";
import styled from "styled-components";
import arrowSend from "@polkadot/extension-ui/assets/arrow-send.svg"
import arrowSendError from "@polkadot/extension-ui/assets/arrow-send-error.svg"
import arrowReceived from "@polkadot/extension-ui/assets/arrow-received.svg"
import {TransactionHistoryItem} from "@polkadot/extension-base/background/types";
import {customFormatDate} from "@polkadot/extension-ui/util/koni/customFormatDate";
import {FormatBalance} from "@polkadot/extension-ui/koni/react-query";
import useTranslation from "@polkadot/extension-ui/hooks/useTranslation";
import Tooltip from "@polkadot/extension-ui/koni/react-components/Tooltip";
import {Registry} from "@polkadot/types/types";

interface Props extends ThemeProps {
  className?: string;
  item: TransactionHistoryItem;
  registry: Registry;
  isSupportSubscan: boolean;
}

const toShortAddress = (_address: string) => {
  const address = (_address || '').toString();

  return address.length > 13 ? `${address.slice(0, 6)}…${address.slice(-4)}` : address;
};

let tooltipId = 0;

function TransactionHistoryItemEl({className, item, registry, isSupportSubscan= true}: Props): React.ReactElement<Props> {
  const {t} = useTranslation();
  const [trigger] = useState(() => `transaction-history-item-${++tooltipId}`);
  return (
    <>
      <div className={className} data-for={trigger} data-tip={true}>
        <div className='kn-history-item__main-area'>
          <div className='kn-history-item__main-area-part-1'>
            <div className={`kn-history-item__img-wrapper ${item.action === 'received' ? 'received-img-wrapper' : item.isSuccess ? 'send-img-wrapper' : 'send-error-img-wrapper'} `}>
              {item.action === 'received' ?
                <img className='kn-history-item__img' src={arrowReceived} alt="received"/> :
                <>
                  {item.isSuccess ?
                    <img className='kn-history-item__img' src={arrowSend} alt="send"/> :
                    <img className='kn-history-item__img' src={arrowSendError} alt="send-error"/>
                  }

                </>

              }
            </div>
            <div className='kn-history-item__meta-wrapper'>
              <div className='kn-history-item__address'>{toShortAddress(item.extrinsicHash)}</div>
              <div className='kn-history-item__bottom-area'>
                <span className='kn-history-item__transaction-stt'>{item.action}</span>
                <span className='kn-history-item__transaction-date'>{customFormatDate(item.time, '#MMM# #DD#')}</span>
              </div>
            </div>
          </div>
          <div className='kn-history-item__main-area-part-2'>
            <div className='kn-history-item__value'>
              <span>{item.action === 'received' ? '+' : '-'}</span>
              <FormatBalance
                className={className}
                label={' '}
                registry={registry}
                value={item.change} />
            </div>

            {
              !!item.fee && (<div className='kn-history-item__balance'>
	              <span>{t<string>('Fee:')}</span>
	              <FormatBalance
		              className={className}
		              label={' '}
		              registry={registry}
		              value={item.fee} />
              </div>)
            }
          </div>
        </div>
        <div className='kn-history-item__separator' />
      </div>
      {!isSupportSubscan ?
        <Tooltip
          text={t<string>('You can\'t view this transaction because it isn\'t supported on Subscan')}
          trigger={trigger}
        /> :
        <></>
      }

    </>
  );
}

export default React.memo(styled(TransactionHistoryItemEl)(({theme}: Props) => `
  cursor: pointer;

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

  .send-error-img-wrapper {
    border-color: rgba(175, 17, 17, 0.3);
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
    text-transform: capitalize;
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
    display: flex;
    justify-content: flex-end;
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
