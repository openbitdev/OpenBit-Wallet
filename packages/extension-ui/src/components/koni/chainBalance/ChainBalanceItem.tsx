import React, {useCallback, useRef, useState} from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import cloneIcon from "@polkadot/extension-ui/assets/clone.svg";
import receivedIcon from "@polkadot/extension-ui/assets/receive-icon.svg";
import {BalanceVal} from "@polkadot/extension-ui/components/koni/balance";
import ChainBalanceItemRow from "@polkadot/extension-ui/components/koni/chainBalance/ChainBalanceItemRow";
import styled from 'styled-components';
import {ThemeProps} from "@polkadot/extension-ui/types";
import useToast from "@polkadot/extension-ui/hooks/useToast";
import useTranslation from "@polkadot/extension-ui/hooks/useTranslation";
import {BalanceInfo} from "@polkadot/extension-ui/util/koni/types";
import BuyToken from "@polkadot/extension-ui/partials/BuyToken";

interface Props extends ThemeProps {
  className?: string;
  item: BalanceInfo;
}

function ChainBalanceItem({item, className}: Props): React.ReactElement<Props> {
  const [toggleDetail, setToggleDetail] = useState(false);
  const [isReceiveQrOpen, setReceiveQr] = useState(false);
  const { show } = useToast();
  const { t } = useTranslation();
  const receiveRef = useRef(null);

  const _onCopy = useCallback(
    (e) => {
      e.stopPropagation();
      show(t('Copied'))
    },
    [show, t]
  );

  const _onToggleDetail = useCallback(() => {
    setToggleDetail(toggleDetail => !toggleDetail);
  }, []);

  const _toggleQr = useCallback(
    (): void => setReceiveQr((isReceiveQrOpen) => !isReceiveQrOpen),
    []
  )

  const _closeModal = useCallback(
    (): void => setReceiveQr( false),
    []
  )

  const toShortAddress = (_address: string, halfLength?: number) => {
    const address = (_address || '').toString()

    const addressLength = halfLength ? halfLength : 7

    return address.length > 13 ? `${address.slice(0, addressLength)}…${address.slice(-addressLength)}` : address
  }

  return (
    <div className={`${className} ${toggleDetail ? '-show-detail': ''}`} onClick={_onToggleDetail}>
      <div className='kn-chain-balance-item__main-area'>
        <div className='kn-chain-balance-item__main-area-part-1'>
          <img src={item.chainIconUrl} alt={'Logo'} className='kn-chain-balance-item__logo'/>

          <div className='kn-chain-balance-item__meta-wrapper'>
            <div className='kn-chain-balance-item__chain-name'>{item.chainName}</div>
            <div className='kn-chain-balance-item__bottom-area'>
              <CopyToClipboard text={item.address}>
                <div className='kn-chain-balance-item__address' onClick={_onCopy}>
                  <span className='kn-chain-balance-item__address-text'>{toShortAddress(item.address)}</span>
                  <img src={cloneIcon} alt="copy" className='kn-chain-balance-item__copy'/>
                </div>
              </CopyToClipboard>
              <img src={receivedIcon} alt="receive" className='kn-chain-balance-item__receive' onClick={_toggleQr}/>
            </div>
          </div>
        </div>

        <div className='kn-chain-balance-item__main-area-part-2'>
          <div className="kn-chain-balance-item__balance">
            <BalanceVal value={item.balanceValue} symbol={item.symbol}/>
          </div>
          <div className="kn-chain-balance-item__value">
            <BalanceVal value={item.totalValue} symbol={'$'} startWithSymbol/>
          </div>
          <div className="kn-chain-balance-item__toggle"/>
        </div>
      </div>

      {toggleDetail && !!item.detailBalances.length && (
        <>
          <div className='kn-chain-balance-item__separator'/>
          <div className='kn-chain-balance-item__detail-area'>
            {item.detailBalances.map((d) => (
              <ChainBalanceItemRow item={d} key={d.key} />
            ))}
          </div>
        </>
      )}

      {toggleDetail && !!item.childrenBalances.length && (
        <>
          <div className='kn-chain-balance-item__separator'/>
          <div className='kn-chain-balance-item__detail-area'>
            {item.childrenBalances.map((c) => (
              <ChainBalanceItemRow item={c} key={c.key} />
            ))}
          </div>
        </>
      )}

      {isReceiveQrOpen && (
        <BuyToken className='' reference={receiveRef} closeModal={_closeModal}/>
      )}
    </div>
  )
}

export default React.memo(styled(ChainBalanceItem)(({theme}: Props) => `
  border: 2px solid ${theme.boxBorderColor};
  border-radius: 8px;
  color: ${theme.textColor2};
  font-weight: 500;

  & + & {
    margin-top: 10px;
  }

  .kn-chain-balance-item__main-area {
    display: flex;
    align-items: center;
    font-size: 15px;
  }

  .kn-chain-balance-item__main-area {
    display: flex;
    font-size: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .kn-chain-balance-item__detail-area,
  .kn-chain-balance-item__detail-area {
    font-size: 14px;
    padding-top: 8px;
    padding-bottom: 10px;
  }

  .kn-chain-balance-item__main-area-part-1 {
    flex: 1;
    display: flex;
    overflow: hidden;
    padding-left: 12px;
  }

  .kn-chain-balance-item__main-area-part-2 {
    position: relative;
    padding-right: 32px;
    text-align: right;
    cursor: pointer;
  }

  .kn-chain-balance-item__logo {
    min-width: 48px;
    height: 48px;
    border-radius: 100%;
    overflow: hidden;
    margin-right: 12px;
    background-color: #fff;
    border: 1px solid #fff;
  }

  .kn-chain-balance-item__chain-name {
    font-weight: 700;
    font-size: 18px;
  }

  .kn-chain-balance-item__bottom-area {
    display: flex;
    align-items: center;
  }

  .kn-chain-balance-item__address {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .kn-chain-balance-item__address-text {
    flex: 1;
    margin-right: 12px;
    font-family: ${theme.fontFamilyRegular};
  }

  .kn-chain-balance-item__copy {
    min-width: 20px;
    height: 20px;
  }

  .kn-chain-balance-item__receive {
    min-width: 16px;
    height: 16px;
    margin-left: 12px;
    cursor: pointer;
  }

  .kn-chain-balance-item__toggle {
    position: absolute;
    border-style: solid;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 4px;
    transform: rotate(45deg);
    top: 5px;
    right: 13px;
  }

  .kn-chain-balance-item__chain-name,
  .kn-balance-val__symbol,
  .kn-balance-val__prefix {
    color: ${theme.textColor};
  }

  .kn-chain-balance-item__separator {
    padding-left: 15px;
    padding-right: 15px;

    &:before {
      content: '';
      height: 1px;
      display: block;
      background: ${theme.boxBorderColor};
    }
  }

  &.-show-detail .kn-chain-balance-item__toggle {
    top: 9px;
    transform: rotate(-135deg);
  }
`));
