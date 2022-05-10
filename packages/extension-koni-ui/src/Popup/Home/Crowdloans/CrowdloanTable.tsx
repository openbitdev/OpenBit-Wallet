// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table } from 'antd';
import BigN from 'bignumber.js';
import CN from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { AbstractColumnData, CrowdloanParaState } from '@polkadot/extension-base/background/KoniTypes';
import AntTableWrapper from '@polkadot/extension-koni-ui/components/AntTableWrapper';
import { CrowdloanItemType } from '@polkadot/extension-koni-ui/Popup/Home/types';
import { ThemeProps } from '@polkadot/extension-koni-ui/types';
import { recreateColumnTable } from '@polkadot/extension-koni-ui/util/recreateColumnTable';

interface Props extends ThemeProps{
  className?: string;
  items: CrowdloanItemType[]
}

type DataRecord = CrowdloanItemType

type ColumnData = AbstractColumnData<DataRecord>

const CrowdloanTable = (props: Props) => {
  const { className, items } = props;

  const [containerWidth, setContainerWidth] = useState<number>(1100);

  const handlerResize = () => {
    const container = document.querySelector('.home-tab-contents') as HTMLElement;

    setContainerWidth(container.offsetWidth);
  };

  useEffect(() => {
    handlerResize();
    window.addEventListener('resize', handlerResize);
  }, []);

  const totalContributed = useMemo(() => {
    let total = new BigN(0);

    items.forEach((i) => {
      const usd = i.contributeToUsd instanceof BigN ? i.contributeToUsd : new BigN(i.contributeToUsd);

      total = total.plus(usd);
    });

    return total;
  }, [items]);

  const columns = useMemo((): ColumnData[] => {
    const _columns: ColumnData[] = [
      {
        title: (
          <div>
            Crowdloans ${totalContributed.toFormat(2)}
          </div>
        ),
        dataIndex: 'network',
        render: (text, record) => {
          return (
            <div className={'chain-info-container'}>
              <img
                alt={`${record.networkKey}-logo`}
                className={'logo'}
                src={record.logo}
              />
              <div className='info-container'>
                <div className='chain-name'>
                  {record.networkDisplayName}
                </div>
                <div className='sub-chain-name'>
                  {record.networkDisplayName}
                </div>
              </div>
              {
                record.crowdloanUrl && (
                  <a
                    className='link'
                    href={record.crowdloanUrl}
                    rel='noreferrer'
                    target='_blank'
                  >
                    <FontAwesomeIcon
                      className={'icon'}
                      icon={faLink}
                    />
                    <span>View linked address</span>
                  </a>
                )
              }
            </div>
          );
        }
      },
      {
        title: 'Crowloan platform',
        dataIndex: 'groupDisplayName',
        align: 'center',
        render: (text) => {
          const _text = text as string;

          return (
            <span className={'group-chain-name'}>
              {_text}
            </span>
          );
        }
      },
      {
        title: 'Status',
        align: 'center',
        render: (text, record) => {
          return (
            <div className={'status-container'}>
              <div
                className={CN(
                  'status-button',
                  {
                    ongoing: record.paraState === CrowdloanParaState.ONGOING,
                    failed: record.paraState === CrowdloanParaState.FAILED,
                    complete: record.paraState === CrowdloanParaState.COMPLETED
                  }
                )}
              >
                {record.paraState || 'unknown'}
              </div>
            </div>
          );
        }
      },
      {
        title: 'Contributed',
        align: 'right',
        dataIndex: 'contributed',
        render: (text, record) => {
          const contribute = record.contribute instanceof BigN ? record.contribute.toFormat(2) : record.contribute;
          const toUsd = record.contributeToUsd instanceof BigN ? record.contributeToUsd.toFormat(2) : record.contributeToUsd;

          return (
            <div className={'contributed-container'}>
              <div className={'contributed-amount'}>
                {contribute} <span className={'contributed-symbol'}>{record.symbol}</span> Contributed
              </div>
              <div className={'contributed-conversion'}>
                ${toUsd}
              </div>
            </div>
          );
        }
      }
    ];

    return recreateColumnTable(_columns);
  }, [totalContributed]);

  const renderRowKey = useCallback((data: DataRecord) => {
    return `${data.networkDisplayName}_${data.networkDisplayName}`;
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

export default React.memo(styled(CrowdloanTable)(({ theme }: Props) => `
  margin-left: 20px;

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
      }

      .chain-sub-name{
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        color: ${theme.textColor2};
      }
    }

    .link{
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${theme.textColor2};

      .icon{
        color: ${theme.textSuccess};
        margin-right: 6px;
      }

      &:hover{
        color: ${theme.textSuccess};
      }
    }
  }

  .group-chain-name{
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 40px;
    text-align: center;
    color: ${theme.textColor};
  }

  .status-container{
    display: flex;
    justify-content: center;
    align-items: center;

    .status-button{
      border-width: 1px;
      border-style: solid;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      width: 100px;

      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 24px;
      text-align: center;
      letter-spacing: 0.02em;
      text-transform: uppercase;


      &.ongoing{
        border-color: ${theme.crowdloanActiveStatus};
        color: ${theme.crowdloanActiveStatus};
      }

      &.failed{
        border-color: ${theme.crowdloanFailStatus};
        color: ${theme.crowdloanFailStatus};
      }

      &.complete{
        border-color: ${theme.crowdloanWinnerStatus};
        color: ${theme.crowdloanWinnerStatus};
      }
    }
  }

  .contributed-container{

    .contributed-amount{
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 26px;
      text-align: right;
      color: ${theme.textColor};

      .contributed-symbol{
        text-transform: uppercase;
      }
    }

    .contributed-conversion{
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      text-align: right;
      color: ${theme.textColor2};
    }
  }
`));
