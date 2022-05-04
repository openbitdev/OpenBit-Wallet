// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BigN from 'bignumber.js';
import CN from 'classnames';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import buyIcon from '@polkadot/extension-koni-ui/assets/buy-icon.svg';
import donateIcon from '@polkadot/extension-koni-ui/assets/donate-icon.svg';
import sendIcon from '@polkadot/extension-koni-ui/assets/send-icon.svg';
import { Link } from '@polkadot/extension-koni-ui/components';
import { BalanceVal } from '@polkadot/extension-koni-ui/components/balance';
import useTranslation from '@polkadot/extension-koni-ui/hooks/useTranslation';
import { toggleBalancesVisibility } from '@polkadot/extension-koni-ui/messaging';
import ActionButton from '@polkadot/extension-koni-ui/Popup/Home/ActionButton';
import { RootState } from '@polkadot/extension-koni-ui/stores';

type Props = {
  _isAccountAll: boolean,
  _showQrModal: () => void,
  selectedNetworkBalance: BigN,
  totalBalanceValue: BigN,
  trigger: string,
  isShowBalanceDetail: boolean
}

const ActionGroup = ({ _isAccountAll,
  _showQrModal,
  isShowBalanceDetail,
  selectedNetworkBalance,
  totalBalanceValue,
  trigger }: Props) => {
  const { t } = useTranslation();

  const { settings: { isShowBalance } } = useSelector((state: RootState) => state);

  const _toggleBalances = useCallback(() => {
    toggleBalancesVisibility((value) => {
      console.log('Balances visible:', value.isShowBalance);
    }).catch((e) => {
      console.error('There is a problem when set Current Account', e);
    });
  }, []);

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
