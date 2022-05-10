// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Table } from 'antd';
import BigN from 'bignumber.js';
import CN from 'classnames';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';

import { AbstractColumnData } from '@polkadot/extension-base/background/KoniTypes';
import cloneIcon from '@polkadot/extension-koni-ui/assets/clone.svg';
import InfoIcon from '@polkadot/extension-koni-ui/assets/icon/info.svg';
import receivedIcon from '@polkadot/extension-koni-ui/assets/receive-icon.svg';
import { Loading, SearchContext } from '@polkadot/extension-koni-ui/components';
import AntTableWrapper from '@polkadot/extension-koni-ui/components/AntTableWrapper';
import { BalanceVal } from '@polkadot/extension-koni-ui/components/balance';
import useToast from '@polkadot/extension-koni-ui/hooks/useToast';
import useTranslation from '@polkadot/extension-koni-ui/hooks/useTranslation';
import ChainBalanceItemRow from '@polkadot/extension-koni-ui/Popup/Home/ChainBalances/ChainBalanceItemRow';
import ChainBalanceTableBalanceItem from '@polkadot/extension-koni-ui/Popup/Home/ChainBalances/ChainBalanceTable/ChainBalanceTableBalanceItem';
import { getTotalConvertedBalanceValue } from '@polkadot/extension-koni-ui/Popup/Home/ChainBalances/utils';
import { ThemeProps } from '@polkadot/extension-koni-ui/types';
import { isAccountAll } from '@polkadot/extension-koni-ui/util';
import { recreateColumnTable } from '@polkadot/extension-koni-ui/util/recreateColumnTable';
import { AccountInfoByNetwork, BalanceInfo } from '@polkadot/extension-koni-ui/util/types';

interface Props extends ThemeProps {
  className?: string,
  networkKeys: string[],
  isShowZeroBalances: boolean,
  containerWidth: number,
  currentNetworkKey: string,
  accountInfoByNetworkMap: Record<string, AccountInfoByNetwork>,
  networkBalanceMaps: Record<string, BalanceInfo>,
  setQrModalOpen: (visible: boolean) => void;
  setQrModalProps: (props: {
    networkPrefix: number,
    networkKey: string,
    iconTheme: string,
    showExportButton: boolean
  }) => void;
  isAllowToShow: (
    isShowZeroBalances: boolean,
    currentNetworkKey: string,
    networkKey: string,
    balanceInfo?: BalanceInfo
  ) => boolean,
  showBalanceDetail: (networkKey: string) => void,
  setSelectedNetworkBalance?: (networkBalance: BigN) => void;
}

interface DataRecord {
  info: AccountInfoByNetwork,
  balanceInfo?: BalanceInfo,
  change: {
    value: BigN,
    percentage: BigN
  }
}

type ColumnData = AbstractColumnData<DataRecord>

const MAX_RAND = 100;
const MIN_RAND = 0;

const ChainBalanceTable = ({ accountInfoByNetworkMap,
  className,
  containerWidth,
  currentNetworkKey,
  isAllowToShow,
  isShowZeroBalances,
  networkBalanceMaps,
  networkKeys,
  setQrModalOpen,
  setQrModalProps,
  setSelectedNetworkBalance,
  showBalanceDetail }: Props): React.ReactElement<Props> => {
  const { show } = useToast();
  const { t } = useTranslation();
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);
  const { query } = useContext(SearchContext);

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

  const toggleSelectedNetwork = useCallback((networkKey: string) => {
    const _expandedRowKeys = [...expandedRowKeys];

    if (_expandedRowKeys.includes(networkKey)) {
      const index = _expandedRowKeys.indexOf(networkKey);

      _expandedRowKeys.splice(index, 1);
    } else {
      _expandedRowKeys.push(networkKey);
    }

    setExpandedRowKeys(_expandedRowKeys);
  }, [expandedRowKeys]);

  const selectNetworkDetail = useCallback((networkKey: string) => {
    showBalanceDetail(networkKey);
    setExpandedRowKeys([]);
  }, [showBalanceDetail]);

  const renderRowKey = useCallback((data: DataRecord) => {
    return `${data.info.networkKey}`;
  }, []);

  const _columns = useMemo((): ColumnData[] => {
    const rawColumns: ColumnData[] = [
      {
        title: 'Chain',
        dataIndex: 'chain',
        width: 42,
        render: (text, record: DataRecord) => {
          const accountInfo = record.info;
          const { address, formattedAddress, networkIconTheme, networkKey, networkPrefix } = accountInfo;
          const _isAccountAll = isAccountAll(address);

          const handlerOpenQr = () => {
            _openQr(networkPrefix, networkKey, networkIconTheme);
          };

          return (
            <div className='chain-balance-table-item__main-area-part-1'>
              <img
                alt={'Logo'}
                className='chain-balance-table-item__logo'
                src={accountInfo.networkLogo}
              />

              <div className='chain-balance-table-item__meta-wrapper'>
                <div className='chain-balance-table-item__chain-name'>{accountInfo.networkDisplayName}</div>

                <div className='chain-balance-table-item__bottom-area'>
                  {!_isAccountAll && (
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

                  {_isAccountAll && (
                    <div className='chain-balance-table-item__address'>
                      <span className='chain-balance-table-item__address-text'>
                        {accountInfo.networkDisplayName}
                      </span>
                    </div>
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
        render: (text, record: DataRecord) => {
          const balanceInfo = record.balanceInfo;
          const isLoading = !balanceInfo;
          const childrenBalances = balanceInfo && balanceInfo.childrenBalances;
          const hasChildren = childrenBalances && childrenBalances.length > 0;
          const rowKey = renderRowKey(record);

          return (
            <ChainBalanceTableBalanceItem
              balanceInfo={balanceInfo}
              childrenBalances={childrenBalances}
              expandedRowKeys={expandedRowKeys}
              handlerOnClick={!hasChildren ? toggleSelectedNetwork : selectNetworkDetail}
              isLoading={isLoading}
              rowKey={rowKey}
              setSelectedNetworkBalance={setSelectedNetworkBalance}
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
        render: (text, record: DataRecord) => {
          const balanceInfo = record.balanceInfo;
          const isLoading = !balanceInfo;

          return (
            <div className='chain-balance-table-item__value'>
              {
                isLoading
                  ? (
                    <Loading />
                  )
                  : (
                    <BalanceVal
                      startWithSymbol
                      symbol={'$'}
                      value={balanceInfo.price}
                    />
                  )
              }
            </div>
          );
        }
      },
      {
        title: 'Value',
        dataIndex: 'test',
        align: 'right',
        render: (text, record: DataRecord) => {
          const balanceInfo = record.balanceInfo;
          const isLoading = !balanceInfo;

          return (
            <div className='chain-balance-table-item__value'>
              {
                isLoading
                  ? (
                    <Loading />
                  )
                  : (
                    <BalanceVal
                      startWithSymbol
                      symbol={'$'}
                      value={getTotalConvertedBalanceValue(balanceInfo)}
                    />
                  )
              }
            </div>
          );
        }
      },
      {
        title: 'Profit/loss',
        dataIndex: 'test',
        align: 'right',
        render: (text, record: DataRecord) => {
          const change = record.change;
          const isLoading = !record.balanceInfo;

          return (
            <div className='chain-balance-table-item__profit'>
              {
                isLoading
                  ? (
                    <Loading />
                  )
                  : (
                    <>
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
                    </>
                  )
              }
            </div>
          );
        }
      }
    ];

    return recreateColumnTable(rawColumns);
  }, [_onCopy, _openQr, expandedRowKeys, renderRowKey, selectNetworkDetail, setSelectedNetworkBalance, toggleSelectedNetwork]);

  const dataSource = useMemo((): DataRecord[] => {
    return networkKeys.filter((networkKey) => {
      const balanceInfo = networkBalanceMaps[networkKey];

      return isAllowToShow(
        isShowZeroBalances,
        currentNetworkKey,
        networkKey,
        balanceInfo
      );
    }).map((networkKey) => {
      const info = accountInfoByNetworkMap[networkKey];
      const balanceInfo = networkBalanceMaps[networkKey];
      const negative = Math.random() > 0.5;
      const change = Math.random() * (MAX_RAND - MIN_RAND) + MIN_RAND;
      const percent = Math.random() * (MAX_RAND - MIN_RAND) + MIN_RAND;

      return {
        info: info,
        balanceInfo: balanceInfo,
        change: {
          value: new BigN((negative ? -1 : 1) * change),
          percentage: new BigN((negative ? -1 : 1) * percent)
        }
      };
    }).filter((info) => {
      return info.info.networkDisplayName.toLowerCase().includes(query.balance);
    });
  }, [query, networkKeys, networkBalanceMaps, isAllowToShow, isShowZeroBalances, currentNetworkKey, accountInfoByNetworkMap]);

  return (
    <div className={CN(className)}>
      <AntTableWrapper>
        <Table
          columns={_columns}
          dataSource={dataSource}
          expandable={{
            expandedRowRender: (record) => {
              const { balanceInfo } = record;

              if (!balanceInfo) {
                return (<></>);
              }

              return (
                <div>
                  <div className='chain-balance-item__separator' />
                  <div className='chain-balance-item__detail-area'>
                    {balanceInfo.detailBalances.map((d) => (
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
            expandedRowKeys: expandedRowKeys
          }}
          pagination={false}
          rowKey={renderRowKey}
          style={{
            width: containerWidth - 40
          }}
        />
      </AntTableWrapper>
    </div>
  );
};

export default React.memo(styled(ChainBalanceTable)(({ theme }: Props) => `
  margin-left: 20px;

  .ant-table-cell:first-child{
    padding: 12px 0;
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

  .chain-balance-table-item__profit-signal{
    color: ${theme.textColor};
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
    color: ${theme.textSuccess};
  }

  .chain-balance-table-item__profit-percentage.negative{
    color: ${theme.textError};
  }
`));
