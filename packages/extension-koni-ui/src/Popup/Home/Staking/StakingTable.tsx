// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Table } from 'antd';
import BigN from 'bignumber.js';
import CN from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { AbstractColumnData } from '@polkadot/extension-base/background/KoniTypes';
import DownloadIcon from '@polkadot/extension-koni-ui/assets/icon/download.svg';
import UploadIcon from '@polkadot/extension-koni-ui/assets/icon/upload.svg';
import TransactionBalanceVal from '@polkadot/extension-koni-ui/components/TableBalanceVal';

import LogosMap from '../../../assets/logo';
import AntTableWrapper from '../../../components/AntTableWrapper';
import { StakingDataType } from '../../../hooks/screen/home/types';
import { ThemeProps } from '../../../types';
import { recreateColumnTable } from '../../../util/recreateColumnTable';

interface Props extends ThemeProps {
  className?: string;
  items: StakingDataType[];
  priceMap: Record<string, number>;
}

type DataRecord = StakingDataType

type ColumnData = AbstractColumnData<DataRecord>

const StakingTable = (props: Props) => {
  const { className, items, priceMap } = props;

  const [containerWidth, setContainerWidth] = useState<number>(1100);

  const handlerResize = () => {
    const container = document.querySelector('.home-tab-contents') as HTMLElement;

    setContainerWidth(container.offsetWidth);
  };

  useEffect(() => {
    handlerResize();
    window.addEventListener('resize', handlerResize);
  }, []);

  const columns = useMemo((): ColumnData[] => {
    const _columns: ColumnData[] = [
      {
        title: 'Asset',
        dataIndex: 'change',
        sorter: true,
        render: (text, record) => {
          const id = record.staking.chainId;
          const name = record.staking.chainId;
          const unit = record.staking.unit;
          const icon = LogosMap[id] || LogosMap.default;

          return (
            <div className={'chain-info-container'}>
              <img
                alt={`logo-${id}`}
                className={'logo'}
                src={icon}
              />
              <div className='info-container'>
                <div className='chain-name'>
                  {name}
                </div>
                <div className='chain-symbol'>
                  {unit}
                </div>
              </div>
            </div>
          );
        }
      },
      {
        title: 'Total rewards',
        dataIndex: 'reward',
        sorter: true,
        align: 'right',
        render: (text, record) => {
          const totalReward = record.reward.totalReward;

          if (totalReward === undefined) {
            return '--';
          }

          const value = new BigN(totalReward);
          const unit = record.staking.unit;

          return (
            <div>
              <TransactionBalanceVal
                symbol={unit}
                value={value}
              />
            </div>
          );
        }
      },
      {
        title: 'Staking balance',
        dataIndex: 'balance',
        sorter: true,
        align: 'right',
        render: (text, record) => {
          const balance = record.staking.balance;

          if (balance === undefined) {
            return '--';
          }

          const value = new BigN(balance);
          const unit = record.staking.unit;

          return (
            <div>
              <TransactionBalanceVal
                symbol={unit}
                value={value}
              />
            </div>
          );
        }
      },
      {
        title: 'Value',
        dataIndex: 'value',
        sorter: true,
        align: 'right',
        render: (text, record) => {
          const _balance = record.staking.balance;
          const id = record.staking.chainId;
          const price = priceMap[id] || 10;

          if (price === undefined || _balance === undefined) {
            return '--';
          }

          const balance = new BigN(_balance);
          const value = balance.multipliedBy(price);

          return (
            <div>
              <TransactionBalanceVal
                symbol={'USD'}
                value={value}
              />
            </div>
          );
        }
      },
      {
        title: 'Action',
        dataIndex: 'action',
        sorter: true,
        align: 'center',
        render: () => {
          return (
            <div className={'action-container'}>
              <img
                alt='download-icon'
                className={'icon staking'}
                src={DownloadIcon}
              />
              <img
                alt='upload-icon'
                className={'icon'}
                src={UploadIcon}
              />
            </div>
          );
        }
      }
    ];

    return recreateColumnTable(_columns);
  }, [priceMap]);

  const renderRowKey = useCallback((record: DataRecord) => {
    return record.staking.chainId;
  }, []);

  return (
    <div
      className={CN(className)}
      style={{ width: containerWidth - 40 }}
    >
      <AntTableWrapper>
        <Table
          columns={columns}
          dataSource={items}
          pagination={false}
          rowKey={renderRowKey}
        />
      </AntTableWrapper>
    </div>
  );
};

export default React.memo(styled(StakingTable)(({ theme }: Props) => `
  margin-left: 20px;

  .ant-table-cell:first-child{
    padding: 12px 0;
  }

  .chain-info-container{
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .logo{
      height: 40px;
      width: 40px;
      border-radius: 0px;
      border-radius: 50%;
    }

    .info-container{
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      margin: 0 8px;

      .chain-name{
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 26px;
        color: ${theme.textColor};
        text-transform: capitalize;
      }

      .chain-symbol{
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        color: ${theme.textColor2};
        text-transform: uppercase;
      }
    }
  }

  .action-container{
    display: flex;
    justify-content: center;
    align-items: center;

    .icon{
      width: 24px;
      height: 24px;
      cursor: pointer;
      filter: ${theme.textColorFilter2};
    }

    .icon.staking{
      filter: ${theme.successFilter};
    }

    .icon:first-child{
      margin-right: 30px;
    }
  }

`));
