// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BigN from 'bignumber.js';
import CN from 'classnames';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Loading } from '@polkadot/extension-koni-ui/components';
import { BalanceVal } from '@polkadot/extension-koni-ui/components/balance';
import { ThemeProps } from '@polkadot/extension-koni-ui/types';
import { AccountInfoByNetwork, BalanceInfo, BalanceSubInfo } from '@polkadot/extension-koni-ui/util/types';

interface Props extends ThemeProps{
  className?: string,
  handlerOnClick: (networkKey: string) => void,
  balanceInfo: BalanceInfo,
  childrenBalances: BalanceSubInfo[],
  info: AccountInfoByNetwork,
  expandedRowKeys: string[],
  renderTokenValue: (balanceInfo: BalanceInfo) => React.ReactNode,
  setSelectedNetworkBalance: (num: BigN) => void,
  isLoading: boolean,
}

const ChainBalanceTableBalanceItem = (props: Props) => {
  const { balanceInfo, childrenBalances, className, expandedRowKeys, handlerOnClick, info, isLoading, setSelectedNetworkBalance } = props;

  const _handlerOnClick = useCallback(() => {
    if (isLoading) {
      return;
    }

    handlerOnClick(info.networkKey);

    if (balanceInfo.childrenBalances.length > 0) {
      setSelectedNetworkBalance(balanceInfo.convertedBalanceValue);
    }
  }, [balanceInfo, handlerOnClick, info, isLoading, setSelectedNetworkBalance]);

  const isShowed = expandedRowKeys.includes(info.networkKey);

  return (
    <div
      className={CN(className, 'chain-balance-table-item__main-area-part-2')}
      onClick={_handlerOnClick}
    >
      {
        isLoading
          ? (
            <Loading />
          )
          : (
            <div>
              <div className='chain-balance-table-item__balance__upper'>
                <div className='chain-balance-table-item__balance-container'>
                  <div className='chain-balance-table-item__balance'>
                    <BalanceVal
                      symbol={balanceInfo.symbol}
                      value={balanceInfo.balanceValue}
                    />
                  </div>
                  {
                    childrenBalances.length > 0 && (
                      <div className='chain-balance-table-item__child-balance'>
                        + {childrenBalances.slice(0, 3).map((child) => child.symbol).join(', ')}{childrenBalances.length > 3 && ', and more'}
                      </div>
                    )
                  }
                </div>
                {(!!balanceInfo.detailBalances.length || !!childrenBalances.length) && (
                  <div
                    className={CN(
                      'chain-balance-table-item__toggle',
                      { show: isShowed }
                    )}
                  />
                )}
              </div>
            </div>
          )
      }
    </div>
  );
};

export default React.memo(styled(ChainBalanceTableBalanceItem)(({ theme }: Props) => `
  .chain-balance-table-item__balance-container{
    margin-right: 12px;
  }

  .chain-balance-table-item__balance__upper{
    display: flex;
    justify-content: end;
    align-items: end;
  }

  .chain-balance-table-item__toggle {
    border-style: solid;
    border-width: 0px 2px 2px 0px;
    display: inline-block;
    padding: 3.5px;
    transform: rotate(45deg);
    transition: all ease-in-out 0.3s;
    align-self: center;
  }

  .chain-balance-table-item__toggle.show {
    transform: rotate(-135deg);
  }

  .chain-balance-table-item__child-balance{
    white-space: nowrap;
  }

`));
