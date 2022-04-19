// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BigN from 'bignumber.js';
import CN from 'classnames';
import React from 'react';

import buyIcon from '@polkadot/extension-koni-ui/assets/buy-icon.svg';
import donateIcon from '@polkadot/extension-koni-ui/assets/donate-icon.svg';
import CaretDown from '@polkadot/extension-koni-ui/assets/icon/caret-down.svg';
import CaretUp from '@polkadot/extension-koni-ui/assets/icon/caret-up.svg';
import EyeIcon from '@polkadot/extension-koni-ui/assets/icon/eye-dark.svg';
import EyeSlashIcon from '@polkadot/extension-koni-ui/assets/icon/eye-slash-dark.svg';
import sendIcon from '@polkadot/extension-koni-ui/assets/send-icon.svg';
import { Link } from '@polkadot/extension-koni-ui/components';
import { BalanceVal } from '@polkadot/extension-koni-ui/components/balance';
import useTranslation from '@polkadot/extension-koni-ui/hooks/useTranslation';
import ActionButton from '@polkadot/extension-koni-ui/Popup/Home/ActionButton';

type Props = {
  _isAccountAll: boolean,
  _showQrModal: () => void,
  isShowBalance: boolean,
  selectedNetworkBalance: BigN,
  totalBalanceValue: BigN,
  _toggleBalances: () => void,
  isShowBalanceDetail: boolean
}

const percentage = 8.58;
const change = 3857.42;

const ActionGroupFull = ({ _isAccountAll,
  _showQrModal,
  _toggleBalances,
  isShowBalance,
  isShowBalanceDetail,
  selectedNetworkBalance,
  totalBalanceValue }: Props
) => {
  const { t } = useTranslation();

  return (
    <div className={CN('home-action-block')}>
      <div className='account-total-balance'>
        <div className={'balance-title'}>
          Current Balance
          <img
            alt={'eye'}
            className={'eye-icon'}
            src={isShowBalance ? EyeIcon : EyeSlashIcon}
          />
        </div>
        <div
          className={'account-total-btn'}
          onClick={_toggleBalances}
        >
          <div className={'balance-container'}>
            <div className={'balance-detail-container'}>
              <div className={'balance-detail__balance-content'}>
                {
                  isShowBalance
                    ? (
                      <BalanceVal
                        startWithSymbol
                        symbol={'$'}
                        value={isShowBalanceDetail ? selectedNetworkBalance : totalBalanceValue}
                      />
                    )
                    : (
                      <span>*********</span>
                    )
                }
              </div>
              <div className={CN('percentage', { negative: percentage < 0 })}>
                <img
                  alt='differ'
                  className={'icon'}
                  src={percentage >= 0 ? CaretUp : CaretDown}
                />
                {percentage}%
              </div>
            </div>
            <div className='change-container'>
              {
                !isShowBalance
                  ? (
                    <div className='hide-block' />
                  )
                  : (
                    <>
                      <div className={CN('change-detail__content', { negative: change < 0 })}>
                        {change < 0 ? '-' : '+'}&nbsp;${new BigN(change).absoluteValue().toFormat()}
                      </div>
                      <div className='change-detail__time'>
                      24h
                      </div>
                    </>
                  )
              }
            </div>
          </div>
        </div>
      </div>
      {
        !_isAccountAll
          ? (
            <div className='home-account-button-container'>
              <div className={'action-button-container'}>
                <div className='action-button-wrapper'>
                  <ActionButton
                    iconSrc={buyIcon}
                    onClick={_showQrModal}
                  />
                </div>
                {t<string>('Receive')}
              </div>

              <div className={'action-button-container'}>
                <Link
                  className={'action-button-wrapper'}
                  to={'/account/send-fund'}
                >
                  <div className='action-button-wrapper'>
                    <ActionButton
                      iconSrc={sendIcon}
                    />
                  </div>
                </Link>
                {t<string>('Send')}
              </div>

              <div className={'action-button-container'}>
                <Link
                  className={'action-button-wrapper'}
                  to={'/account/donate'}
                >
                  <div className={'action-button-wrapper'}>
                    <ActionButton
                      iconSrc={donateIcon}
                    />
                  </div>
                </Link>
                {t<string>('Donate')}
              </div>
            </div>
          )
          : (
            <div className='home-account-button-container'>
              <div className={'action-button-container'}>
                <div className='action-button-wrapper'>
                  <ActionButton
                    iconSrc={buyIcon}
                    isDisabled
                  />
                </div>
                {t<string>('Receive')}
              </div>

              <div className={'action-button-container'}>
                <div className='action-button-wrapper'>
                  <ActionButton
                    iconSrc={sendIcon}
                    isDisabled
                  />
                </div>
                {t<string>('Send')}
              </div>

              <div className={'action-button-container'}>
                <div className='action-button-wrapper'>
                  <ActionButton
                    iconSrc={donateIcon}
                    isDisabled
                  />
                </div>
                {t<string>('Donate')}
              </div>
            </div>
          )
      }
    </div>
  );
};

export default ActionGroupFull;
