import React, { useCallback, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import cloneIcon from '@polkadot/extension-ui/assets/clone.svg';
import receivedIcon from '@polkadot/extension-ui/assets/receive-icon.svg';
import { BalanceVal } from '@polkadot/extension-ui/components/koni/balance';
import ChainBalanceItemRow from '@polkadot/extension-ui/components/koni/chainBalance/ChainBalanceItemRow';
import styled from 'styled-components';
import { ThemeProps } from '@polkadot/extension-ui/types';
import useToast from '@polkadot/extension-ui/hooks/useToast';
import useTranslation from '@polkadot/extension-ui/hooks/useTranslation';
import { AccountInfoByNetwork, BalanceInfo } from '@polkadot/extension-ui/util/koni/types';

interface Props extends ThemeProps {
  className?: string;
  accountInfo: AccountInfoByNetwork;
  balanceInfo: BalanceInfo;
  setBuyTokenScreenOpen: (visible: boolean) => void;
  setBuyTokenScreenProps: (props: { buyTokenScreenNetworkPrefix: number, buyTokenScreenNetworkName: string, buyTokenScreenIconTheme: string }) => void;
}

function ChainBalanceItem({accountInfo, balanceInfo, className, setBuyTokenScreenOpen, setBuyTokenScreenProps}: Props): React.ReactElement<Props> {
  const {networkName, address, networkPrefix, networkIconTheme} = accountInfo;
  const [toggleDetail, setToggleDetail] = useState(false);
  const {show} = useToast();
  const {t} = useTranslation();

  const _onCopy = useCallback(
    (e) => {
      e.stopPropagation();
      show(t('Copied'));
    },
    [show, t]
  );

  const _onToggleDetail = useCallback(() => {
    setToggleDetail(toggleDetail => !toggleDetail);
  }, []);

  const _openQr = useCallback(
    (e): void => {
      e.stopPropagation();
      setBuyTokenScreenProps({
        buyTokenScreenNetworkPrefix: networkPrefix,
        buyTokenScreenNetworkName: networkName,
        buyTokenScreenIconTheme: networkIconTheme
      });
      setBuyTokenScreenOpen(true);
    },
    [networkPrefix, networkName, networkIconTheme]
  );

  const toShortAddress = (_address: string, halfLength?: number) => {
    const address = (_address || '').toString();

    const addressLength = halfLength ? halfLength : 6;

    return address.length > 13 ? `${address.slice(0, addressLength)}…${address.slice(-addressLength)}` : address;
  };

  return (
    <div className={`${className} ${toggleDetail ? '-show-detail' : ''}`} onClick={_onToggleDetail}>
      <div className='kn-chain-balance-item__main-area'>
        <div className='kn-chain-balance-item__main-area-part-1'>
          <img src={accountInfo.networkLogo} alt={'Logo'} className='kn-chain-balance-item__logo' />

          <div className='kn-chain-balance-item__meta-wrapper'>
            <div className='kn-chain-balance-item__chain-name'>{accountInfo.networkDisplayName}</div>
            <div className='kn-chain-balance-item__bottom-area'>
              <CopyToClipboard text={address}>
                <div className='kn-chain-balance-item__address' onClick={_onCopy}>
                  <span className='kn-chain-balance-item__address-text'>{toShortAddress(address)}</span>
                  <img src={cloneIcon} alt="copy" className='kn-chain-balance-item__copy' />
                </div>
              </CopyToClipboard>
              <img src={receivedIcon} alt="receive" className='kn-chain-balance-item__receive' onClick={_openQr} />
            </div>
          </div>
        </div>

        <div className='kn-chain-balance-item__main-area-part-2'>
          <div className="kn-chain-balance-item__balance">
            <BalanceVal value={balanceInfo.balanceValue} symbol={balanceInfo.symbol} />
          </div>
          <div className="kn-chain-balance-item__value">
            <BalanceVal value={balanceInfo.totalValue} symbol={'$'} startWithSymbol />
          </div>
          <div className="kn-chain-balance-item__toggle" />
        </div>
      </div>

      {toggleDetail && !!balanceInfo.detailBalances.length && (
        <>
          <div className='kn-chain-balance-item__separator' />
          <div className='kn-chain-balance-item__detail-area'>
            {balanceInfo.detailBalances.map((d) => (
              <ChainBalanceItemRow item={d} key={d.key} />
            ))}
          </div>
        </>
      )}

      {toggleDetail && !!balanceInfo.childrenBalances.length && (
        <>
          <div className='kn-chain-balance-item__separator' />
          <div className='kn-chain-balance-item__detail-area'>
            {balanceInfo.childrenBalances.map((c) => (
              <ChainBalanceItemRow item={c} key={c.key} />
            ))}
          </div>
        </>
      )}
      <div className='kn-chain-balance-item__separator' />
    </div>
  );
}

export default React.memo(styled(ChainBalanceItem)(({theme}: Props) => `
  //border: 2px solid ${theme.boxBorderColor};
  border-radius: 8px;
  color: ${theme.textColor2};
  // font-weight: 500;

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
    padding-left: 15px;
  }

  .kn-chain-balance-item__main-area-part-2 {
    position: relative;
    padding-right: 38px;
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
    font-weight: 500;
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
    font-weight: 400;
    min-width: 112px;
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
    padding: 3.5px;
    transform: rotate(45deg);
    top: 7px;
    right: 15px;
  }

  .kn-chain-balance-item__chain-name,
  .kn-balance-val__symbol,
  .kn-balance-val__prefix {
    color: ${theme.textColor};
  }

  .kn-balance-val {
    font-weight: 500;
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
