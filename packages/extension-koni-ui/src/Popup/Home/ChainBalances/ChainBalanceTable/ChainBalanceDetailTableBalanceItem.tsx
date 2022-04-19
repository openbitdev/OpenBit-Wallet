// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BigN from 'bignumber.js';
import CN from 'classnames';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import { BalanceVal } from '@polkadot/extension-koni-ui/components/balance';
import { ThemeProps } from '@polkadot/extension-koni-ui/types';
import { BalanceSubInfo } from '@polkadot/extension-koni-ui/util/types';

interface DataRecord{
  key: string;
  label: string;
  price: BigN;
  isCore: boolean;
  change: {
    value: BigN,
    percentage: BigN
  },
  detailBalances?: BalanceSubInfo[];
  networkLogo?: string;
  symbol: string;
  balanceValue: BigN;
  convertedBalanceValue: BigN;
}

interface Props extends ThemeProps {
  className?: string,
  toggleSelectedNetwork: (networkKey: string, isCore: boolean) => void,
  info: DataRecord,
  expandedRowKeys: string[],
}

const ChainBalanceDetailTableBalanceItem = (props: Props) => {
  const { className,
    expandedRowKeys,
    info,
    toggleSelectedNetwork } = props;

  const handlerOnClick = useCallback(() => {
    toggleSelectedNetwork(info.key, info.isCore);
  }, [toggleSelectedNetwork, info]);

  const isShowed = expandedRowKeys.includes(info.key);

  return (
    <div
      className={CN(className, 'chain-balance-table-item__main-area-part-2')}
      onClick={handlerOnClick}
    >
      <div>
        <div className='chain-balance-table-item__balance__upper'>
          <div className='chain-balance-table-item__balance-container'>
            <div className='chain-balance-table-item__balance'>
              <BalanceVal
                symbol={info.symbol}
                value={info.balanceValue}
              />
            </div>
          </div>
          {(!!info.detailBalances?.length) && (
            <div
              className={CN(
                'chain-balance-table-item__toggle',
                { show: isShowed }
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(styled(ChainBalanceDetailTableBalanceItem)(({ theme }: Props) => `
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
