// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import CN from 'classnames';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import ArrowClockwiseIcon from '@polkadot/extension-koni-ui/assets/icon/arrow-clockwise.svg';
import ChartLineUpIcon from '@polkadot/extension-koni-ui/assets/icon/chart-line-up.svg';
import ListIcon from '@polkadot/extension-koni-ui/assets/icon/list.svg';
import SquaresFourIcon from '@polkadot/extension-koni-ui/assets/icon/squares-four.svg';
import TopHeaderItem from '@polkadot/extension-koni-ui/Popup/Home/Tabs/TopHeaderItem';
import { TabHeaderItemType } from '@polkadot/extension-koni-ui/Popup/Home/types';
import { ThemeProps } from '@polkadot/extension-koni-ui/types';

interface Props extends ThemeProps {
  className?: string;
  items: TabHeaderItemType[];
  onSelectItem: (tabId: number) => void;
  activatedItem: number;
  isShowZeroBalances: boolean;
  toggleZeroBalances: () => void;
  showChart: boolean;
  setShowChart: (val: boolean) => void;
}

const TopHeaders = ({ activatedItem, className, isShowZeroBalances, items, onSelectItem, setShowChart, showChart, toggleZeroBalances }: Props) => {
  const toggleShowChart = useCallback(() => {
    setShowChart(!showChart);
  }, [setShowChart, showChart]);

  return (
    <div className={CN(className, { 'show-chart': showChart })}>
      <div className='nav-container'>
        {
          items.map((item) => (
            <TopHeaderItem
              isActivated={activatedItem === item.tabId}
              item={item}
              key={item.tabId}
              onSelect={onSelectItem}
            />
          ))
        }
      </div>
      <div className='action-container'>
        <div className='show-zero-container'>
          <input
            checked={isShowZeroBalances}
            onChange={toggleZeroBalances}
            type='checkbox'
          />
          <div className='text'>
            Show zero balances
          </div>
        </div>

        <div className={CN('action-button')}>
          <img
            alt='action'
            className='action-icon'
            src={ListIcon}
          />
        </div>
        <div className={CN('action-button active')}>
          <img
            alt='action'
            className='action-icon'
            src={SquaresFourIcon}
          />
        </div>
        <div
          className={CN('action-button', { active: showChart })}
          onClick={toggleShowChart}
        >
          <img
            alt='action'
            className='action-icon'
            src={ChartLineUpIcon}
          />
        </div>
        <div className={CN('action-button')}>
          <img
            alt='action'
            className='action-icon'
            src={ArrowClockwiseIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default styled(TopHeaders)(({ theme }: Props) => `
  display: flex;
  padding: 30px 20px 8px 20px;
  justify-content: space-between;
  background-color: ${theme.background};


  &.show-chart{
    border-radius: 5px 5px 0 0;
  }

  .nav-container{
    display: flex;
  }

  .action-container{
    display: flex;
    align-items: center;

    .show-zero-container{
      display: flex;
      align-items: center;

      .text{
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 26px;
        color: ${theme.textColor2};
        margin: 0px 12px;
      }
    }

    .action-button{
      display: flex;
      align-items: center;
      padding: 8px 14px;
      background: ${theme.layoutBackground};
      border: 1px solid transparent;
      box-sizing: border-box;
      box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      margin-right: 10px;
      cursor: pointer;

      &:last-child.action-button{
       margin-right: 0px;
      }

      .action-icon{
        width: 20px;
        filter: ${theme.textColorFilter2};
      }
    }

    .action-button.active{
      background: ${theme.layoutBackground};
      border: 1px solid ${theme.borderSuccess};
      box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.15);
      border-radius: 5px;

      .action-icon{
        filter: ${theme.successFilter};
      }
    }
  }
`);
