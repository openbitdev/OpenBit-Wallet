// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BigN from 'bignumber.js';
import CN from 'classnames';
import React from 'react';

import buyIcon from '@polkadot/extension-koni-ui/assets/buy-icon.svg';
import donateIcon from '@polkadot/extension-koni-ui/assets/donate-icon.svg';
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
  trigger: string,
  isShowBalanceDetail: boolean
}

const ActionGroup = ({ _isAccountAll,
  _showQrModal,
  _toggleBalances,
  isShowBalance,
  isShowBalanceDetail,
  selectedNetworkBalance,
  totalBalanceValue,
  trigger }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={CN('home-action-block')}>
      <div className='account-total-balance'>
        <div
          className={'account-total-btn'}
          data-for={trigger}
          data-tip={true}
          onClick={_toggleBalances}
        >
          {isShowBalance
            ? <BalanceVal
              startWithSymbol
              symbol={'$'}
              value={isShowBalanceDetail ? selectedNetworkBalance : totalBalanceValue}
            />
            : <span>*********</span>
          }
        </div>
      </div>
      {
        !_isAccountAll
          ? (
            <div className='home-account-button-container'>
              <div className='action-button-wrapper'>
                <ActionButton
                  iconSrc={buyIcon}
                  onClick={_showQrModal}
                  tooltipContent={t<string>('Receive')}
                />
              </div>

              <Link
                className={'action-button-wrapper'}
                to={'/account/send-fund'}
              >
                <ActionButton
                  iconSrc={sendIcon}
                  tooltipContent={t<string>('Send')}
                />
              </Link>

              <Link
                className={'action-button-wrapper'}
                to={'/account/donate'}
              >
                <ActionButton
                  iconSrc={donateIcon}
                  tooltipContent={t<string>('Donate')}
                />
              </Link>
            </div>
          )
          : (
            <div className='home-account-button-container'>
              <div className='action-button-wrapper'>
                <ActionButton
                  iconSrc={buyIcon}
                  isDisabled
                  tooltipContent={t<string>('Receive')}
                />
              </div>

              <div className='action-button-wrapper'>
                <ActionButton
                  iconSrc={sendIcon}
                  isDisabled
                  tooltipContent={t<string>('Send')}
                />
              </div>

              <div className='action-button-wrapper'>
                <ActionButton
                  iconSrc={donateIcon}
                  isDisabled
                  tooltipContent={t<string>('Donate')}
                />
              </div>
            </div>
          )
      }
    </div>
  );
};

export default ActionGroup;
