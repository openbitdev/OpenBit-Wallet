// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Table } from 'antd';
import CN from 'classnames';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { AbstractColumnData, ChainRegistry, TransactionHistoryItemType } from '@polkadot/extension-base/background/KoniTypes';
import CircleIcon from '@polkadot/extension-koni-ui/assets/icon/circle.svg';
import AntTableWrapper from '@polkadot/extension-koni-ui/components/AntTableWrapper';
import TransactionBalanceVal from '@polkadot/extension-koni-ui/components/TableBalanceVal';
import { ThemeProps } from '@polkadot/extension-koni-ui/types';
import { getBalances, getScanExplorerTransactionHistoryUrl, isSupportScanExplorer } from '@polkadot/extension-koni-ui/util';
import { recreateColumnTable } from '@polkadot/extension-koni-ui/util/recreateColumnTable';

interface Props extends ThemeProps{
  className?: string;
  registryMap: Record<string, ChainRegistry>;
  items: TransactionHistoryItemType[];
}

type DataRecord = TransactionHistoryItemType

type ColumnData = AbstractColumnData<DataRecord>

const TransactionHistoryTable = (props: Props) => {
  const { className, items, registryMap } = props;

  const [containerWidth, setContainerWidth] = useState<number>(1100);

  const handlerResize = () => {
    const container = document.querySelector('.home-tab-contents') as HTMLElement;

    setContainerWidth(container.offsetWidth);
  };

  useEffect(() => {
    handlerResize();
    window.addEventListener('resize', handlerResize);
  }, []);

  const columns = useMemo(() => {
    const _columns: ColumnData[] = [
      {
        title: 'ID',
        sorter: true,
        dataIndex: 'extrinsicHash',
        render: (text, record) => {
          const _text = record.extrinsicHash;

          return (
            <div className={CN('transaction-hash')}>
              {_text.slice(0, 6)}
            </div>
          );
        }
      },
      {
        title: 'Close',
        dataIndex: 'time',
        sorter: true,
        render: (text, record) => {
          const timeClose = dayjs(record.time);
          const day = timeClose.format('DD/MM/YY');
          const time = timeClose.format('hh:mm:ss');

          return (
            <div className='transaction-time-container'>
              <div className='transaction-day'>
                {day}
              </div>
              <div className='transaction-time'>
                {time}
              </div>
            </div>
          );
        }
      },
      {
        title: 'Type',
        dataIndex: 'action',
        sorter: true,
        render: (text, record) => {
          return (
            <div
              className={CN(
                'transaction-action',
                {
                  'action-send': record.action === 'send',
                  'action-received': record.action === 'received'
                }
              )}
            >
              {record.action}
            </div>
          );
        }
      },
      {
        title: 'Amount',
        dataIndex: 'change',
        align: 'right',
        sorter: true,
        render: (text, record) => {
          const { networkKey } = record;
          const registry = registryMap[networkKey];
          const transactionValue = getBalances({
            balance: record.change,
            decimals: registry.chainDecimals[0],
            symbol: registry.chainTokens[0]
          });

          return (
            <div className='history-item__value'>
              <TransactionBalanceVal
                symbol={registry.chainTokens[0]}
                value={transactionValue.balanceValue}
              />
            </div>
          );
        }
      },
      {
        title: 'Fee',
        dataIndex: 'fee',
        align: 'right',
        sorter: true,
        render: (text, record) => {
          const { fee } = record;

          if (!fee) {
            return '--';
          }

          const { networkKey } = record;
          const registry = registryMap[networkKey];
          const transactionFee = getBalances({
            balance: fee,
            decimals: registry.chainDecimals[0],
            symbol: registry.chainTokens[0]
          });

          return (
            <div className='history-item__value'>
              <TransactionBalanceVal
                symbol={registry.chainTokens[0]}
                value={transactionFee.balanceValue}
              />
            </div>
          );
        }
      },
      {
        title: 'Status',
        dataIndex: 'status',
        align: 'right',
        sorter: true,
        render: (text, record) => {
          const { isSuccess } = record;

          return (
            <div className={'transaction-status-container'}>
              <div
                className={CN(
                  'transaction-status',
                  {
                    success: isSuccess,
                    fail: !isSuccess
                  }
                )}
              >
                {
                  isSuccess && (
                    <img
                      alt='icon-circle'
                      className={CN('success-icon')}
                      src={CircleIcon}
                    />
                  )
                }
                {isSuccess ? 'Filled' : 'Canceled'}
              </div>
            </div>
          );
        }
      }
    ];

    return recreateColumnTable(_columns);
  }, [registryMap]);

  const handlerOnRow = useCallback((data: DataRecord) => {
    const { extrinsicHash, networkKey } = data;
    const isSupport = isSupportScanExplorer(networkKey);

    const handlerOnClick = () => {
      if (isSupport) {
        const href = getScanExplorerTransactionHistoryUrl(networkKey, extrinsicHash);

        window.open(href, '__blank');
      }
    };

    return {
      onClick: handlerOnClick
    };
  }, []);

  const renderRowClassName = useCallback((data: DataRecord) => {
    const { networkKey } = data;
    const isSupport = isSupportScanExplorer(networkKey);

    return isSupport ? 'cursor-pointer' : '';
  }, []);

  return (
    <div className={CN(className)}>
      <AntTableWrapper>
        <Table
          columns={columns}
          dataSource={items}
          onRow={handlerOnRow}
          pagination={{
            pageSize: 10,
            hideOnSinglePage: true,
            defaultPageSize: 5,
            showSizeChanger: false
          }}
          rowClassName={renderRowClassName}
          style={{
            width: containerWidth - 40
          }}
        />
      </AntTableWrapper>
    </div>
  );
};

export default React.memo(styled(TransactionHistoryTable)(({ theme }: Props) => `
  margin-left: 20px;

  .transaction-hash{
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    text-transform: uppercase;
    color: ${theme.tableHeader};
  }

  .transaction-time-container{
    display: flex;
    justify-content: center;
    flex-direction: column;

    .transaction-day{
      color: ${theme.textColor};
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
    }

    .transaction-time{
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
    }
  }

  .transaction-action{
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
    text-transform: capitalize;

    &.action-send{
      color: ${theme.primary1};
    }

    &.action-received{
      color: ${theme.primary2};
    }
  }

  .transaction-status-container{
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .transaction-status{
      width: 95px;
      height: 40px;
      border-radius: 5px;
      display: flex;
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      line-height: 26px;
      justify-content: center;
      align-items: center;

      .success-icon{
        filter: ${theme.successFilter};
        width: 14px;
        margin-right: 6px;
      }

      &.fail{
        background: ${theme.transactionStatusFail};
        color: ${theme.textError};
      }

      &.success{
        background: ${theme.transactionStatusSuccess};
        color: ${theme.textSuccess};
      }
    }
  }
`));
