// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BigN from 'bignumber.js';
import CN from 'classnames';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import { ThemeProps } from '@polkadot/extension-koni-ui/types';

interface Props extends ThemeProps{
  className?: string;
  value: string | BigN;
  symbol?: string;
  startWithSymbol?: boolean;
  withComma?: boolean;
  withSymbol?: boolean;
}

interface RenderData {
  formatPrefix: string,
  isString: boolean,
  lastSymbol: string,
  postfixValue: string,
  prefix: string,
  symbolView: React.ReactNode
}

const TableBalanceVal = (props: Props) => {
  const { className, startWithSymbol, symbol, value, withComma, withSymbol } = props;

  const renderData = useMemo((): RenderData => {
    let [prefix, postfix] = value.toString().split('.');

    if (startWithSymbol) {
      postfix = postfix?.substring(0, 3);
    } else {
      postfix = postfix?.substring(0, 4);
    }

    const lastSymbol = postfix?.slice(-1);
    const isString = /^[KMB]/.test(lastSymbol);

    const postfixValue = postfix || '00';

    const symbolView = prefix && <span className='balance-val__symbol'>{symbol}{startWithSymbol && ' '}</span>;

    const formatPrefix = new Intl.NumberFormat().format(Number(prefix));

    return {
      formatPrefix: formatPrefix,
      isString: isString,
      lastSymbol: lastSymbol,
      postfixValue: postfixValue,
      prefix: prefix,
      symbolView: symbolView
    };
  }, [startWithSymbol, symbol, value]);

  const { formatPrefix, isString, lastSymbol, postfixValue, prefix, symbolView } = renderData;

  return (
    <div className={CN('balance-val', className)}>
      <div>
        {startWithSymbol && withSymbol && symbolView}
        <span className='balance-val__prefix'>{withComma ? formatPrefix.replace(/[. ]+/g, ',') : prefix}</span>
        .
        <span className='balance-val__postfix'>
          {isString ? postfixValue.slice(0, -1) : postfixValue}
        </span>
        {isString && lastSymbol}
      </div>
      <> {!startWithSymbol && withSymbol && symbolView}</>
    </div>
  );
};

TableBalanceVal.defaultProps = {
  startWithSymbol: false,
  withComma: true,
  withSymbol: true
};

export default React.memo(styled(TableBalanceVal)(({ theme }: Props) => `
  color: ${theme.textColor2};
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-align: right;


  .balance-val__prefix{
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    text-align: right;
    color: ${theme.textColor};
  }

  .balance-val__symbol{
    text-transform: uppercase;
  }
`));
