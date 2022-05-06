// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import CN from 'classnames';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import useTranslation from '@polkadot/extension-koni-ui/hooks/useTranslation';
import BarChart from '@polkadot/extension-koni-ui/Popup/Home/Chart/BarChart';
import LineChart from '@polkadot/extension-koni-ui/Popup/Home/Chart/LineChart';
import PieChart from '@polkadot/extension-koni-ui/Popup/Home/Chart/PieChart';
import { ThemeProps } from '@polkadot/extension-koni-ui/types';
import { CHART_TIME_ITEMS, CHART_TIME_KEYS } from '@polkadot/extension-koni-ui/util';
import { BalanceInfo } from '@polkadot/extension-koni-ui/util/types';

interface Props extends ThemeProps{
  className?: string;
  networkKeys: string[];
  networkBalanceMaps: Record<string, BalanceInfo>;
}

interface MenuItem {
  tabId: number,
  label: string,
  canActivate: boolean
}

const CHART_ID = 1;
const ALLOCATION_ID = 2;
const STATISTIC_ID = 3;

const MENU_ITEMS: MenuItem[] = [
  {
    tabId: CHART_ID,
    canActivate: true,
    label: 'Chart'
  },
  {
    tabId: ALLOCATION_ID,
    canActivate: true,
    label: 'Allocation'
  },
  {
    tabId: STATISTIC_ID,
    canActivate: true,
    label: 'Statistics'
  }
];

const ChartContainer = (props: Props) => {
  const { className, networkBalanceMaps, networkKeys } = props;
  const [selectedTab, setSelectedTab] = useState(CHART_ID);
  const [selectedTime, setSelectedTime] = useState(CHART_TIME_KEYS.T24H_ID);

  const { t } = useTranslation();

  const handlerChangeTab = useCallback((tabId: number) => {
    setSelectedTab(tabId);
  }, []);

  const handlerChangeTime = useCallback((timeId: number) => {
    setSelectedTime(timeId);
  }, []);

  return (
    <div className={CN(className)}>
      <div className={CN('chart-container')}>
        <div className={CN('chart-header-container')}>
          <div className={CN('tab-items-container')}>
            {
              MENU_ITEMS.map((item) => {
                return (
                  <div
                    className={CN(
                      'tab-item',
                      {
                        active: selectedTab === item.tabId
                      }
                    )}
                    key={item.tabId}
                    /* eslint-disable-next-line react/jsx-no-bind */
                    onClick={item.canActivate ? () => handlerChangeTab(item.tabId) : undefined}
                  >
                    {t(item.label)}
                  </div>
                );
              })
            }
          </div>
          {
            selectedTab === CHART_ID &&
            (
              <div className={CN('tab-items-container')}>
                {
                  CHART_TIME_ITEMS.map((item) => {
                    return (
                      <div
                        className={CN(
                          'tab-item',
                          {
                            active: selectedTime === item.timeId
                          }
                        )}
                        key={item.timeId}
                        /* eslint-disable-next-line react/jsx-no-bind */
                        onClick={() => handlerChangeTime(item.timeId)}
                      >
                        {t(item.label)}
                      </div>
                    );
                  })
                }
              </div>
            )
          }
        </div>
        <div className={CN('chart-content')}>
          {
            selectedTab === CHART_ID && (
              <LineChart selectedTime={selectedTime} />
            )
          }
          {
            selectedTab === ALLOCATION_ID && (
              <BarChart
                networkBalanceMaps={networkBalanceMaps}
                networkKeys={networkKeys}
              />
            )
          }
          {
            selectedTab === STATISTIC_ID && (
              <PieChart
                networkBalanceMaps={networkBalanceMaps}
                networkKeys={networkKeys}
              />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default React.memo(styled(ChartContainer)(({ theme }: Props) => `
  padding-bottom: 30px;
  background-color: #262c4a;

  .chart-container{
    padding: 20px 20px 0 20px;
    background-color: #020412;
    border-radius: 0 0 5px 5px;
  }

  .chart-content{
    padding-bottom: 20px;
  }

  .chart-header-container{
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tab-items-container{
      display: flex;
      justify-content: start;
      align-items: center;
      padding: 6px;
      background: ${theme.buttonBackground1};
      border-radius: 8px;
      margin-bottom: 10px;

      .tab-item{
        padding: 4px 12px;
        cursor: pointer;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
        color: ${theme.textColor2};
      }

      .tab-item.active{
        color: ${theme.textColor};
        background: ${theme.overlayBackground};
        box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.15);
        border-radius: 5px;
      }
    }
  }
`));
