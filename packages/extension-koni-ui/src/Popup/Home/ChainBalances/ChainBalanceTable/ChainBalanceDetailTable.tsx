// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Table } from 'antd';
import BigN from 'bignumber.js';
import CN from 'classnames';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';

import cloneIcon from '@polkadot/extension-koni-ui/assets/clone.svg';
import InfoIcon from '@polkadot/extension-koni-ui/assets/icon/info.svg';
import receivedIcon from '@polkadot/extension-koni-ui/assets/receive-icon.svg';
import { SearchContext } from '@polkadot/extension-koni-ui/components';
import { BalanceVal } from '@polkadot/extension-koni-ui/components/balance';
import useToast from '@polkadot/extension-koni-ui/hooks/useToast';
import useTranslation from '@polkadot/extension-koni-ui/hooks/useTranslation';
import ChainBalanceItemRow from '@polkadot/extension-koni-ui/Popup/Home/ChainBalances/ChainBalanceItemRow';
import ChainBalanceDetailTableBalanceItem from '@polkadot/extension-koni-ui/Popup/Home/ChainBalances/ChainBalanceTable/ChainBalanceDetailTableBalanceItem';
import { getTotalConvertedBalanceValue } from '@polkadot/extension-koni-ui/Popup/Home/ChainBalances/utils';
import { ThemeProps } from '@polkadot/extension-koni-ui/types';
import { getLogoByNetworkKey, isAccountAll } from '@polkadot/extension-koni-ui/util';
import { AccountInfoByNetwork, BalanceInfo, BalanceSubInfo } from '@polkadot/extension-koni-ui/util/types';

interface Props extends ThemeProps {
  accountInfo: AccountInfoByNetwork;
  balanceInfo: BalanceInfo;
  containerWidth: number;
  className?: string;
  setQrModalOpen: (visible: boolean) => void;
  setQrModalProps: (props: {
    networkPrefix: number,
    networkKey: string,
    iconTheme: string,
    showExportButton: boolean
  }) => void;
}

interface DataRecord{
  symbol: string;
  balanceValue: BigN;
  convertedBalanceValue: BigN;
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
}

interface ColumnData {
  title?: string | React.ReactNode,
  render?: (text: string, record: DataRecord, index: number) => React.ReactNode,
  dataIndex?: string,
  align?: 'center' | 'left' | 'right',
  width?: number | string
}

const MAX_RAND = 100;
const MIN_RAND = 0;

const createRandomChange = () => {
  const negative = Math.random() > 0.5;
  const change = Math.random() * (MAX_RAND - MIN_RAND) + MIN_RAND;
  const percent = Math.random() * (MAX_RAND - MIN_RAND) + MIN_RAND;

  return {
    value: new BigN((negative ? -1 : 1) * change),
    percentage: new BigN((negative ? -1 : 1) * percent)
  };
};

const ChainBalanceDetailTable = ({ accountInfo,
  balanceInfo,
  className,
  containerWidth,
  setQrModalOpen,
  setQrModalProps }: Props): React.ReactElement<Props> => {
  const { show } = useToast();
  const { query } = useContext(SearchContext);
  const { t } = useTranslation();
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  const _onCopy = useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    show(t('Copied'));
  }, [show, t]);

  const _openQr = useCallback((networkPrefix: number, networkKey: string, networkIconTheme: string) => {
    setQrModalProps({
      networkPrefix: networkPrefix,
      networkKey: networkKey,
      iconTheme: networkIconTheme,
      showExportButton: false
    });
    setQrModalOpen(true);
  }, [setQrModalOpen, setQrModalProps]);

  const toggleSelectedNetwork = useCallback((networkKey: string, isCore: boolean) => {
    if (!isCore) {
      return;
    }

    const _expandedRowKeys = [...expandedRowKeys];

    if (_expandedRowKeys.includes(networkKey)) {
      const index = _expandedRowKeys.indexOf(networkKey);

      _expandedRowKeys.splice(index, 1);
    } else {
      _expandedRowKeys.push(networkKey);
    }

    setExpandedRowKeys(_expandedRowKeys);
  }, [expandedRowKeys]);

  const _columns: ColumnData[] = [
    {
      title: 'Chain',
      dataIndex: 'chain',
      width: 42,
      align: 'left',
      render: (text: string, record: DataRecord) => {
        const { address, formattedAddress, networkIconTheme, networkKey, networkPrefix } = accountInfo;
        const { isCore, key, label, networkLogo } = record;
        const _isAccountAll = isAccountAll(address);

        const handlerOpenQr = () => {
          _openQr(networkPrefix, networkKey, networkIconTheme);
        };

        return (
          <div className='chain-balance-table-item__main-area-part-1'>
            <img
              alt={'Logo'}
              className='chain-balance-table-item__logo'
              src={networkLogo || getLogoByNetworkKey(key.toLowerCase(), accountInfo.networkKey)}
            />

            <div className='chain-balance-table-item__meta-wrapper'>
              <div className='chain-balance-table-item__chain-name'>{label}</div>

              <div className='chain-balance-table-item__bottom-area'>
                {!_isAccountAll && isCore && (
                  <>
                    <CopyToClipboard text={formattedAddress}>
                      <div
                        className='chain-balance-table-item__address'
                        onClick={_onCopy}
                      >
                        <span className='chain-balance-table-item__address-text'>{formattedAddress}</span>
                        <img
                          alt='copy'
                          className='chain-balance-table-item__copy'
                          src={cloneIcon}
                        />
                      </div>
                    </CopyToClipboard>
                    <img
                      alt='receive'
                      className='chain-balance-table-item__receive'
                      /* eslint-disable-next-line react/jsx-no-bind */
                      onClick={handlerOpenQr}
                      src={receivedIcon}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        );
      }
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      align: 'right',
      render: (text: string, record: DataRecord) => {
        return (
          <ChainBalanceDetailTableBalanceItem
            expandedRowKeys={expandedRowKeys}
            info={record}
            toggleSelectedNetwork={toggleSelectedNetwork}
          />
        );
      }
    },
    {
      title: (
        <div className='price-header-title'>
          Price
          <img
            alt='info-icon'
            className={CN('icon')}
            src={InfoIcon}
          />
        </div>
      ),
      dataIndex: 'price',
      align: 'right',
      render: (text: string, record: DataRecord) => {
        const { price } = record;

        return (
          <div className='chain-balance-table-item__value'>
            <BalanceVal
              startWithSymbol
              symbol={'$'}
              value={price}
            />
          </div>
        );
      }
    },
    {
      title: 'Value',
      dataIndex: 'test',
      align: 'right',
      render: (text: string, record: DataRecord) => {
        const { isCore } = record;

        return (
          <div className='chain-balance-table-item__value'>
            <BalanceVal
              startWithSymbol
              symbol={'$'}
              value={isCore ? getTotalConvertedBalanceValue(balanceInfo) : record.convertedBalanceValue}
            />
          </div>
        );
      }
    },
    {
      title: 'Profit/loss',
      dataIndex: 'test',
      align: 'right',
      render: (text: string, record: DataRecord) => {
        const change = record.change;

        return (
          <div className='chain-balance-table-item__profit'>
            <div className='chain-balance-table-item__profit-value'>
              <span className='chain-balance-table-item__profit-signal'>
                {change.value.gt(0) ? '+' : '-'}
              </span>
              <BalanceVal
                startWithSymbol
                symbol={'$'}
                value={change.value.abs()}
              />
            </div>
            <div className={CN('chain-balance-table-item__profit-percentage', { negative: change.percentage.lt(0) })}>
              {change.percentage.lt(0) ? '-' : '+'}{change.percentage.absoluteValue().toFormat(2)}%
            </div>
          </div>
        );
      }
    }
  ];

  const dataSource = useMemo((): DataRecord[] => {
    const result: DataRecord[] = [];

    const mainToken: DataRecord = {
      balanceValue: balanceInfo.balanceValue,
      convertedBalanceValue: balanceInfo.convertedBalanceValue,
      symbol: balanceInfo.symbol,
      key: accountInfo.networkKey,
      isCore: true,
      label: accountInfo.networkDisplayName,
      price: balanceInfo.price,
      detailBalances: balanceInfo.detailBalances,
      networkLogo: accountInfo.networkLogo,
      change: createRandomChange()
    };

    result.push(mainToken);

    balanceInfo.childrenBalances.forEach((child) => {
      const data: DataRecord = {
        balanceValue: child.balanceValue,
        convertedBalanceValue: child.convertedBalanceValue,
        symbol: child.symbol,
        key: child.key,
        isCore: false,
        label: child.key,
        price: child.price,
        change: createRandomChange()
      };

      result.push(data);
    });

    return result.filter((info) => info.label.toLowerCase().includes(query.balance));
  }, [accountInfo, balanceInfo, query]);

  return (
    <div className={CN(className)}>
      <Table
        columns={_columns}
        dataSource={dataSource}
        expandable={{
          expandedRowRender: (record) => {
            const { detailBalances } = record;

            if (!detailBalances) {
              return (<></>);
            }

            return (
              <div>
                <div className='chain-balance-item__separator' />
                <div className='chain-balance-item__detail-area'>
                  {detailBalances.map((d) => (
                    <ChainBalanceItemRow
                      item={d}
                      key={d.key}
                    />
                  ))}
                </div>
              </div>
            );
          },
          showExpandColumn: false,
          expandedRowKeys: expandedRowKeys,
          rowExpandable: (record) => record.isCore
        }}
        pagination={false}
        /* eslint-disable-next-line react/jsx-no-bind */
        rowKey={(record) => record.key}
        style={{
          width: containerWidth - 40
        }}
      />
    </div>
  );
};

export default React.memo(styled(ChainBalanceDetailTable)(({ theme }: Props) => `
  margin-left: 20px;

  .ant-table{
    background-color: transparent;

    ant-table-content{
      position: relative;
    }

    .ant-table-cell{
      padding: 12px 8px;
      border-bottom: 1px solid ${theme.tableSeparator};
    }

    .ant-table-cell:first-child{
      padding: 12px 0;
    }

    .ant-table-placeholder:hover {
      td{
        background: transparent;
      }
    }

    .ant-table-tbody {
      .ant-table-cell-row-hover {
        background-color: transparent;
      }
    }

    .ant-empty{
      color: ${theme.textColor2};
    }

    .ant-empty-image{
      filter: ${theme.textColorFilter2};
    }

    .ant-table-row:hover{
      .ant-table-cell{
        background-color: transparent;
      }
    }

    .ant-table-expanded-row{
      .ant-table-cell{
        background-color: transparent;
        color: ${theme.textColor2};
      }
    }

    .ant-table-thead{
      position: sticky;
      top: 0;
      z-index: 1;

      .ant-table-cell{
        background: ${theme.tableHeader};
        box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
        border-bottom: 0;
        padding: 12px 8px;

        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 26px;
        color: ${theme.textColor};
      }

      .ant-table-cell::before{
        display: none;
      }

      .ant-table-cell:first-child{
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }

      .ant-table-cell:last-child{
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
      }
    }
  }

  .chain-balance-table-item__profit-signal{
    color: ${theme.textColor};
  }

  .price-header-title{
    display: flex;
    align-items: center;
    justify-content: end;

    .icon{
      width: 20px;
      margin-left: 4px;
    }
  }

  .logo{
    min-width: 42px;
    height: 42px;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 12px;
    background-color: ${theme.tableChainLogoBackground};
    border: 1px solid ${theme.tableChainLogoBackground};
  }

  .chain-balance-table-item__main-area {
    display: flex;
    align-items: center;
    font-size: 15px;
  }

  .chain-balance-table-item__main-area {
    display: flex;
    font-size: 15px;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .chain-balance-table-item__detail-area,
  .chain-balance-table-item__detail-area {
    font-size: 14px;
    padding-top: 8px;
    padding-bottom: 10px;
  }

  .chain-balance-table-item__main-area-part-1 {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  .chain-balance-table-item__main-area-part-2 {
    position: relative;
    text-align: right;
    cursor: pointer;
    min-width: 80px;
    display: flex;
    justify-content: end;
    align-items: center;
    color: ${theme.textColor2};

    .loading-img.loading-img {
      width: 32px;
      height: 32px;
      border-width: 4px;
      border-color: transparent;
      border-left-color: ${theme.textColor2};
      display: block;
    }
  }

  .chain-balance-table-item__logo {
    min-width: 42px;
    height: 42px;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 12px;
    background-color: ${theme.tableChainLogoBackground};
    border: 1px solid ${theme.tableChainLogoBackground};
  }

  .chain-balance-table-item__meta-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .chain-balance-table-item__chain-name {
    font-weight: 500;
    font-size: 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 250px;
  }

  .chain-balance-table-item__bottom-area {
    display: flex;
    align-items: center;
  }

  .chain-balance-table-item__address {
    display: flex;
    align-items: center;
    cursor: pointer;
    flex: 1 1 0%;
  }

  .chain-balance-table-item__address-text {
    flex: 1;
    margin-right: 6px;
    min-width: 450px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: ${theme.textColor2};
  }

  .chain-balance-table-item__copy {
    min-width: 20px;
    height: 20px;
  }

  .chain-balance-table-item__receive {
    min-width: 16px;
    height: 16px;
    margin-left: 12px;
    cursor: pointer;
  }

  .chain-balance-table-item__chain-name,
  .balance-val__symbol,
  .balance-val__prefix {
    color: ${theme.textColor};
  }

  .balance-val {
    font-weight: 500;
    color: ${theme.textColor2};
  }

  .chain-balance-table-item__value{
    display: flex;
    justify-content: end;
    align-items: center;
  }

  .loading-img.loading-img {
    width: 32px;
    height: 32px;
    border-width: 4px;
    border-color: transparent;
    border-left-color: ${theme.textColor2};
    display: block;
  }

  .chain-balance-table-item__profit{
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;
    color: ${theme.textColor2};
  }

  .chain-balance-table-item__profit-percentage{
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 21px;
    color: ${theme.textIncrease};
  }

  .chain-balance-table-item__profit-percentage.negative{
    color: ${theme.textDecrease};
  }
`));
