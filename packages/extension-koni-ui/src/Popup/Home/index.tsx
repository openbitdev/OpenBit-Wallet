// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'antd';
import BigN from 'bignumber.js';
import CN from 'classnames';
import React, { ChangeEvent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { TFunction } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { ChainRegistry, CurrentAccountInfo, CurrentNetworkInfo, NftCollection as _NftCollection, NftItem as _NftItem, TransactionHistoryItemType } from '@polkadot/extension-base/background/KoniTypes';
import { AccountJson } from '@polkadot/extension-base/background/types';
import crowdloans from '@polkadot/extension-koni-ui/assets/home-tab-icon/crowdloans.svg';
import crowdloansActive from '@polkadot/extension-koni-ui/assets/home-tab-icon/crowdloans-active.svg';
import crypto from '@polkadot/extension-koni-ui/assets/home-tab-icon/crypto.svg';
import cryptoActive from '@polkadot/extension-koni-ui/assets/home-tab-icon/crypto-active.svg';
import nfts from '@polkadot/extension-koni-ui/assets/home-tab-icon/nfts.svg';
import nftsActive from '@polkadot/extension-koni-ui/assets/home-tab-icon/nfts-active.svg';
import staking from '@polkadot/extension-koni-ui/assets/home-tab-icon/staking.svg';
import stakingActive from '@polkadot/extension-koni-ui/assets/home-tab-icon/staking-active.svg';
import transfers from '@polkadot/extension-koni-ui/assets/home-tab-icon/transfers.svg';
import transfersActive from '@polkadot/extension-koni-ui/assets/home-tab-icon/transfers-active.svg';
import SearchIcon from '@polkadot/extension-koni-ui/assets/icon/search.svg';
import { AccountContext, AccountQrModal, SearchContext } from '@polkadot/extension-koni-ui/components';
import Tooltip from '@polkadot/extension-koni-ui/components/Tooltip';
import useAccountBalance from '@polkadot/extension-koni-ui/hooks/screen/home/useAccountBalance';
import useCrowdloanNetworks from '@polkadot/extension-koni-ui/hooks/screen/home/useCrowdloanNetworks';
import useFetchNft from '@polkadot/extension-koni-ui/hooks/screen/home/useFetchNft';
import useFetchStaking from '@polkadot/extension-koni-ui/hooks/screen/home/useFetchStaking';
import useShowedNetworks from '@polkadot/extension-koni-ui/hooks/screen/home/useShowedNetworks';
import useIsPopup from '@polkadot/extension-koni-ui/hooks/useIsPopup';
import useTranslation from '@polkadot/extension-koni-ui/hooks/useTranslation';
import { saveCurrentAccountAddress, triggerAccountsSubscription } from '@polkadot/extension-koni-ui/messaging';
import { Header } from '@polkadot/extension-koni-ui/partials';
import DetailHeaderFull from '@polkadot/extension-koni-ui/partials/Header/DetailHeaderFull';
import AddAccount from '@polkadot/extension-koni-ui/Popup/Accounts/AddAccount';
import ActionGroup from '@polkadot/extension-koni-ui/Popup/Home/ActionGroup/ActionGroup';
import ActionGroupFull from '@polkadot/extension-koni-ui/Popup/Home/ActionGroup/ActionGroupFull';
import NftContainer from '@polkadot/extension-koni-ui/Popup/Home/Nfts/render/NftContainer';
import StakingContainer from '@polkadot/extension-koni-ui/Popup/Home/Staking/StakingContainer';
import TabHeaders from '@polkadot/extension-koni-ui/Popup/Home/Tabs/TabHeaders';
import TopHeaders from '@polkadot/extension-koni-ui/Popup/Home/Tabs/TopHeaders';
import { TabHeaderItemType } from '@polkadot/extension-koni-ui/Popup/Home/types';
import { RootState } from '@polkadot/extension-koni-ui/stores';
import { ThemeProps } from '@polkadot/extension-koni-ui/types';
import { BN_ZERO, isAccountAll, NFT_DEFAULT_GRID_SIZE, NFT_GRID_HEIGHT_THRESHOLD, NFT_HEADER_HEIGHT, NFT_PER_ROW, NFT_PREVIEW_HEIGHT } from '@polkadot/extension-koni-ui/util';
import { SearchQueryOptional } from '@polkadot/extension-koni-ui/util/types';

// import swapIcon from '../../assets/swap-icon.svg';
import ChainBalances from './ChainBalances/ChainBalances';
import Crowdloans from './Crowdloans/Crowdloans';
import TransactionHistory from './TransactionHistory/TransactionHistory';

interface WrapperProps extends ThemeProps {
  className?: string;
}

interface Props {
  className?: string;
  currentAccount: AccountJson;
  network: CurrentNetworkInfo;
  chainRegistryMap: Record<string, ChainRegistry>;
  historyMap: Record<string, TransactionHistoryItemType[]>;
}

function getTabHeaderItems (address: string, t: TFunction): TabHeaderItemType[] {
  const result = [
    {
      tabId: 1,
      label: t('Crypto'),
      lightIcon: crypto,
      darkIcon: crypto,
      activatedLightIcon: cryptoActive,
      activatedDarkIcon: cryptoActive
    },
    {
      tabId: 2,
      label: t('NFTs'),
      lightIcon: nfts,
      darkIcon: nfts,
      activatedLightIcon: nftsActive,
      activatedDarkIcon: nftsActive
    },
    {
      tabId: 3,
      label: t('Crowdloans'),
      lightIcon: crowdloans,
      darkIcon: crowdloans,
      activatedLightIcon: crowdloansActive,
      activatedDarkIcon: crowdloansActive
    },
    {
      tabId: 4,
      label: t('Staking'),
      lightIcon: staking,
      darkIcon: staking,
      activatedLightIcon: stakingActive,
      activatedDarkIcon: stakingActive
    }
  ];

  if (!isAccountAll(address)) {
    result.push({
      tabId: 5,
      label: t('Transfers'),
      lightIcon: transfers,
      darkIcon: transfers,
      activatedLightIcon: transfersActive,
      activatedDarkIcon: transfersActive
    });
  }

  return result;
}

function Wrapper ({ className, theme }: WrapperProps): React.ReactElement {
  const { hierarchy } = useContext(AccountContext);
  const { chainRegistry: chainRegistryMap,
    currentAccount: { account: currentAccount },
    currentNetwork,
    transactionHistory: { historyMap } } = useSelector((state: RootState) => state);

  if (!hierarchy.length) {
    return (<AddAccount />);
  }

  if (!currentAccount) {
    return (<></>);
  }

  return (
    <Home
      chainRegistryMap={chainRegistryMap}
      className={className}
      currentAccount={currentAccount}
      historyMap={historyMap}
      network={currentNetwork}
    />
  );
}

let tooltipId = 0;

function Home ({ chainRegistryMap, className = '', currentAccount, historyMap, network }: Props): React.ReactElement {
  const { icon: iconTheme,
    networkKey,
    networkPrefix } = network;
  const { t } = useTranslation();
  const { address } = currentAccount;
  const [isShowBalanceDetail, setShowBalanceDetail] = useState<boolean>(false);
  const backupTabId = window.localStorage.getItem('homeActiveTab') || '1';
  const [activatedTab, setActivatedTab] = useState<number>(Number(backupTabId));
  const _setActiveTab = useCallback((tabId: number) => {
    window.localStorage.setItem('homeActiveTab', `${tabId}`);
    setActivatedTab(tabId);
    setShowBalanceDetail(false);
  }, []);
  const [isShowZeroBalances, setShowZeroBalances] = useState<boolean>(
    window.localStorage.getItem('show_zero_balances') === '1'
  );
  const [isQrModalOpen, setQrModalOpen] = useState<boolean>(false);
  const [selectedNetworkBalance, setSelectedNetworkBalance] = useState<BigN>(BN_ZERO);
  const [trigger] = useState(() => `home-balances-${++tooltipId}`);
  const [
    { iconTheme: qrModalIconTheme,
      networkKey: qrModalNetworkKey,
      networkPrefix: qrModalNetworkPrefix,
      showExportButton: qrModalShowExportButton }, setQrModalProps] = useState({
    networkPrefix,
    networkKey,
    iconTheme,
    showExportButton: true
  });
  const { accounts } = useContext(AccountContext);
  const { query, setQuery } = useContext(SearchContext);
  const { balanceStatus: { isShowBalance },
    networkMetadata: networkMetadataMap } = useSelector((state: RootState) => state);
  const showedNetworks = useShowedNetworks(networkKey, address, accounts);
  const crowdloanNetworks = useCrowdloanNetworks(networkKey);
  const isPopup = useIsPopup();

  const [nftPage, setNftPage] = useState(1);
  const [selectedNftNetwork, setSelectedNftNetwork] = useState(networkKey);

  const [chosenNftCollection, setChosenNftCollection] = useState<_NftCollection>();
  const [showNftCollectionDetail, setShowNftCollectionDetail] = useState<boolean>(false);

  const [chosenNftItem, setChosenNftItem] = useState<_NftItem>();
  const [showNftItemDetail, setShowNftItemDetail] = useState<boolean>(false);

  const [showTransferredCollection, setShowTransferredCollection] = useState(false);
  const [showForcedCollection, setShowForcedCollection] = useState(false);

  const parseNftGridSize = useCallback(() => {
    if (window.innerHeight > NFT_GRID_HEIGHT_THRESHOLD) {
      const nftContainerHeight = window.innerHeight - NFT_HEADER_HEIGHT;
      const rowCount = Math.floor(nftContainerHeight / NFT_PREVIEW_HEIGHT);

      return rowCount * NFT_PER_ROW;
    } else {
      return NFT_DEFAULT_GRID_SIZE;
    }
  }, []);
  const nftGridSize = parseNftGridSize();
  const { loading: loadingNft, nftList, totalCollection, totalItems } = useFetchNft(nftPage, selectedNftNetwork, nftGridSize);
  const { data: stakingData, loading: loadingStaking, priceMap: stakingPriceMap } = useFetchStaking(networkKey);

  const handleNftPage = useCallback((page: number) => {
    setNftPage(page);
  }, []);

  useEffect(() => {
    setSelectedNftNetwork(networkKey);
  }, [networkKey]);

  useEffect(() => {
    if (isAccountAll(address) && activatedTab === 5) {
      _setActiveTab(1);
    }
  }, [address, activatedTab, _setActiveTab]);

  const { crowdloanContributeMap,
    networkBalanceMaps,
    totalBalanceValue } = useAccountBalance(networkKey, showedNetworks, crowdloanNetworks);

  const _toggleZeroBalances = useCallback(() => {
    setShowZeroBalances((v) => {
      window.localStorage.setItem('show_zero_balances', v ? '0' : '1');

      return !v;
    });
  }, []);

  const _showQrModal = useCallback(() => {
    setQrModalProps({
      networkPrefix: networkPrefix,
      networkKey: networkKey,
      iconTheme: iconTheme,
      showExportButton: true
    });

    setQrModalOpen(true);
  }, [iconTheme, networkKey, networkPrefix]);

  const _closeQrModal = useCallback(() => {
    setQrModalOpen(false);
  }, []);

  const _isAccountAll = isAccountAll(address);

  const tabItems = useMemo<TabHeaderItemType[]>(() => {
    return getTabHeaderItems(address, t);
  }, [address, t]);

  const _toggleBalances = useCallback(() => {
    const accountInfo = {
      address: address,
      isShowBalance: !isShowBalance
    } as CurrentAccountInfo;

    saveCurrentAccountAddress(accountInfo, () => {
      triggerAccountsSubscription().catch((e) => {
        console.error('There is a problem when trigger Accounts Subscription', e);
      });
    }).catch((e) => {
      console.error('There is a problem when set Current Account', e);
    });
  }, [address, isShowBalance]);

  const _backToHome = useCallback(() => {
    setShowBalanceDetail(false);
    setQuery({ balance: '' });
  }, [setShowBalanceDetail, setQuery]);

  const onChangeAccount = useCallback((address: string) => {
    setShowBalanceDetail(false);
  }, []);

  const handlerChangeSearchQuery = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    let change: SearchQueryOptional = {};

    switch (activatedTab) {
      case 1:
        change = { balance: value };
        break;
      case 2:
        change = { nft: { collection: value } };
        break;
      default:
        break;
    }

    setQuery(change);
  }, [setQuery, activatedTab]);

  const _query = useMemo(() => {
    switch (activatedTab) {
      case 1:
        return query.balance;
      case 2:
        return query.nft.collection;
      default:
        return '';
    }
  }, [query, activatedTab]);

  return (
    <div className={`home-screen home ${className}`}>
      <Header
        changeAccountCallback={onChangeAccount}
        className={'home-header'}
        isContainDetailHeader={true}
        isShowZeroBalances={isShowZeroBalances}
        setShowBalanceDetail={setShowBalanceDetail}
        showAdd
        showSearch
        showSettings
        text={t<string>('Accounts')}
        toggleZeroBalances={_toggleZeroBalances}
      />
      <div className={CN('main-layout', { full: !isPopup })}>
        <div className={CN('main-container')}>
          {!isPopup && currentAccount &&
            <DetailHeaderFull
              currentAccount={currentAccount}
              formatted={currentAccount.address}
              isShowZeroBalances={isShowZeroBalances}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              toggleZeroBalances={_toggleZeroBalances}
            />
          }
          {
            isPopup
              ? (
                <ActionGroup
                  _isAccountAll={_isAccountAll}
                  _showQrModal={_showQrModal}
                  _toggleBalances={_toggleBalances}
                  isShowBalance={isShowBalance}
                  isShowBalanceDetail={isShowBalanceDetail}
                  selectedNetworkBalance={selectedNetworkBalance}
                  totalBalanceValue={totalBalanceValue}
                  trigger={trigger}
                />
              )
              : (
                <ActionGroupFull
                  _isAccountAll={_isAccountAll}
                  _showQrModal={_showQrModal}
                  _toggleBalances={_toggleBalances}
                  isShowBalance={isShowBalance}
                  isShowBalanceDetail={isShowBalanceDetail}
                  selectedNetworkBalance={selectedNetworkBalance}
                  totalBalanceValue={totalBalanceValue}
                />
              )
          }
          {
            !isPopup &&
            <TopHeaders
              activatedItem={activatedTab}
              className={'home-top-headers'}
              isShowZeroBalances={isShowZeroBalances}
              items={tabItems}
              onSelectItem={_setActiveTab}
              toggleZeroBalances={_toggleZeroBalances}
            />
          }
          {isShowBalanceDetail &&
            <div
              className='home__back-btn'
              onClick={_backToHome}
            >
              <FontAwesomeIcon
                className='home__back-icon'
                icon={faArrowLeft}
              />
              <span>{t<string>('Back to home')}</span>
            </div>
          }

          {
            !isPopup &&
            <Input
              className={CN('search-input')}
              onChange={handlerChangeSearchQuery}
              placeholder={t('Search Assets')}
              prefix={
                <img
                  alt='search-icon'
                  className={CN('search-icon')}
                  src={SearchIcon}
                />
              }
              value={_query}
            />
          }

          <div className={'home-tab-contents'}>
            {activatedTab === 1 && (
              <ChainBalances
                address={address}
                currentNetworkKey={networkKey}
                isShowBalanceDetail={isShowBalanceDetail}
                isShowZeroBalances={isShowZeroBalances}
                networkBalanceMaps={networkBalanceMaps}
                networkKeys={showedNetworks}
                networkMetadataMap={networkMetadataMap}
                setQrModalOpen={setQrModalOpen}
                setQrModalProps={setQrModalProps}
                setSelectedNetworkBalance={setSelectedNetworkBalance}
                setShowBalanceDetail={setShowBalanceDetail}
              />
            )}

            {activatedTab === 2 && (
              <NftContainer
                chosenCollection={chosenNftCollection}
                chosenItem={chosenNftItem}
                currentNetwork={networkKey}
                loading={loadingNft}
                nftGridSize={nftGridSize}
                nftList={nftList}
                page={nftPage}
                setChosenCollection={setChosenNftCollection}
                setChosenItem={setChosenNftItem}
                setPage={handleNftPage}
                setShowCollectionDetail={setShowNftCollectionDetail}
                setShowForcedCollection={setShowForcedCollection}
                setShowItemDetail={setShowNftItemDetail}
                setShowTransferredCollection={setShowTransferredCollection}
                showCollectionDetail={showNftCollectionDetail}
                showForcedCollection={showForcedCollection}
                showItemDetail={showNftItemDetail}
                showTransferredCollection={showTransferredCollection}
                totalCollection={totalCollection}
                totalItems={totalItems}
              />
            )}

            {activatedTab === 3 && (
              <Crowdloans
                crowdloanContributeMap={crowdloanContributeMap}
                networkKeys={crowdloanNetworks}
                networkMetadataMap={networkMetadataMap}
              />
            )}

            {activatedTab === 4 && (
              <StakingContainer
                data={stakingData}
                loading={loadingStaking}
                priceMap={stakingPriceMap}
              />
            )}

            {activatedTab === 5 && (
              <TransactionHistory
                historyMap={historyMap}
                networkKey={networkKey}
                registryMap={chainRegistryMap}
              />
            )}
          </div>

          {
            isPopup && (
              <TabHeaders
                activatedItem={activatedTab}
                className={'home-tab-headers'}
                items={tabItems}
                onSelectItem={_setActiveTab}
              />
            )
          }

          {isQrModalOpen && (
            <AccountQrModal
              accountName={currentAccount.name}
              address={address}
              className='home__account-qr-modal'
              closeModal={_closeQrModal}
              iconTheme={qrModalIconTheme}
              networkKey={qrModalNetworkKey}
              networkPrefix={qrModalNetworkPrefix}
              showExportButton={qrModalShowExportButton}
            />
          )}

          <Tooltip
            offset={{ top: 8 }}
            text={isShowBalance ? 'Hide balance' : 'Show balance'}
            trigger={trigger}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(styled(Wrapper)(({ theme }: WrapperProps) => `
  display: flex;
  flex-direction: column;
  height: 100%;

  .main-layout{
    height: 100%;
    overflow: hidden;
  }

  .main-layout.full{
    padding: 25px 0;
    background-color: rgb(38, 44, 74);
    display: flex;
    align-items: center;
    justify-content: center;
    .main-container{
      min-width: 1100px;
      margin-right: 375px;
      margin-left: 375px;
    }

    .home-tab-contents{
      margin-top: 20px;
    }
  }

  .main-container{
    display: flex;
    flex-direction: column;
    height: 100%;
    background: rgb(2, 4, 18);
  }

  .search-input{
    margin-left: 20px;
    background-color: ${theme.inputBackgroundColor};
    border-radius: 8px;
    border-color: ${theme.inputBackgroundColor};
    width: 370px;
    height: 48px;

    .search-icon{
      width: 20px;
      height: 24px;
      color: ${theme.textColor};
      filter: invert(92%) sepia(94%) saturate(25%) hue-rotate(251deg) brightness(106%) contrast(100%);
    }

    .ant-input-prefix{
      margin-right: 8px;
    }

    input{
      font-family: 'Lexend';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      background-color: ${theme.inputBackgroundColor};
      color: ${theme.textColor2};
    }
  }

  .search-input:hover {
    border-color: ${theme.inputBackgroundColor};
  }

  .ant-input-affix-wrapper-focused.search-input {
    box-shadow: none;
  }


  .home-tab-contents {
    flex: 1;
    overflow: auto;
  }

  .home-action-block {
    display: flex;
    padding: 20px 25px;
  }

  .account-total-balance {
    flex: 1;
    font-weight: 500;
    font-size: 32px;
    line-height: 44px;
  }

  .account-total-btn {
    width: fit-content;
    cursor: pointer;
  }

  .home-account-button-container {
    display: flex;
  }

  .action-button-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 24px;

    font-family: 'Lexend';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 26px;
    text-align: center;
    color: #7B8098;
  }

  .balance-title{
    font-family: 'Lexend';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
    color: #7B8098;
    display: flex;
    align-items: center;

    .eye-icon{
      width: 15px;
      margin-left: 4px;
    }
  }

  .balance-container{
    display: flex;
    flex-direction: column;

    .balance-detail-container{
      display: flex;
      align-items: center;

      .balance-detail__balance-content{
        display: flex;
        align-items: center;
      }
    }

    .change-container{
      display: flex;
      align-items: center;

      .hide-block{
        width: 120px;
        height: 32px;
        background-color: #1a2256;
        border-radius: 8px;
      }

      .change-detail__content{
        font-family: 'Lexend';
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 32px;
        color: #26A975;
      }

      .change-detail__content.negative{
        color: #B5131C;
      }

      .change-detail__time{
        margin-left: 12px;
        font-family: 'Lexend';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 26px;
        color: #7B8098;
      }
    }
  }

  .percentage{
    height: 40px;
    background: #26A975;
    border-radius: 8px;
    font-family: Lexend;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
    text-align: center;
    color: rgb(255, 255, 255);
    margin-left: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px 16px;
    .icon{
      margin-right: 8px;
      width: 16px;
    }
  }

  .percentage.negative{
    color: #B5131C;
  }

  .action-button-wrapper {
    opacity: 1;
    margin-right: 10px;
  }

  .action-button-container:last-child {
    margin-right: 0;
  }

  .action-button-wrapper:last-child {
    margin-right: 0;
  }

  .home__account-qr-modal .subwallet-modal {
    max-width: 460px;
  }

  .home__back-btn {
    color: ${theme.buttonTextColor2};
    font-size: 15px;
    line-height: 26px;
    font-weight: 500;
    margin-left: 25px;
    cursor: pointer;
    margin-bottom: 10px;
  }

  .home__back-icon {
    padding-right: 7px;
  }

`));
