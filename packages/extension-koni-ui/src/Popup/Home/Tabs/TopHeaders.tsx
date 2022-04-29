// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import CN from 'classnames';
import React from 'react';
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
}

const TopHeaders = ({ activatedItem, className, isShowZeroBalances, items, onSelectItem, toggleZeroBalances }: Props) => {
  return (
    <div className={CN('top-headers ', className)}>
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
        <div className={CN('action-button')}>
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
  margin: 0 20px 8px 20px;
  justify-content: space-between;

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
        color: #7B8098;
        margin: 0px 12px;
      }
    }

    .action-button{
      display: flex;
      align-items: center;
      padding: 8px 14px;
      background: #262C4A;
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
        filter: invert(52%) sepia(9%) saturate(797%) hue-rotate(192deg) brightness(96%) contrast(87%);
      }
    }

    .action-button.active{
      background: #262C4A;
      border: 1px solid #42C59A;
      box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.15);
      border-radius: 5px;

      .action-icon{
        filter: invert(60%) sepia(92%) saturate(292%) hue-rotate(109deg) brightness(94%) contrast(83%);
      }
    }
  }
`);
