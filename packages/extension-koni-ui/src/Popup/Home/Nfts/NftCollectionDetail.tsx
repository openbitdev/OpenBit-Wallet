// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NftItem } from '@subwallet/extension-base/background/KoniTypes';
import { OrdinalRemarkData } from '@subwallet/extension-base/types';
import { EmptyList, Layout, PageWrapper } from '@subwallet/extension-koni-ui/components';
import { SHOW_3D_MODELS_CHAIN } from '@subwallet/extension-koni-ui/constants';
import { DataContext } from '@subwallet/extension-koni-ui/contexts/DataContext';
import { useGetNftByAccount, useNavigateOnChangeAccount } from '@subwallet/extension-koni-ui/hooks';
import useTranslation from '@subwallet/extension-koni-ui/hooks/common/useTranslation';
import { loadMoreInscription } from '@subwallet/extension-koni-ui/messaging';
import { InscriptionGalleryWrapper } from '@subwallet/extension-koni-ui/Popup/Home/Nfts/component/InscriptionGalleryWrapper';
import { NftGalleryWrapper } from '@subwallet/extension-koni-ui/Popup/Home/Nfts/component/NftGalleryWrapper';
import { getTotalCollectionItems, INftCollectionDetail, INftItemDetail } from '@subwallet/extension-koni-ui/Popup/Home/Nfts/utils';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { Input, SwList } from '@subwallet/react-ui';
import CN from 'classnames';
import { Image } from 'phosphor-react';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type Props = ThemeProps;
type SearchInputProps = {
  initValue?: string;
  placeholder: string;
  onChange: (value: string) => void;
};

const SearchInput = ({ initValue = '', onChange, placeholder }: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState<string>(initValue);

  const _onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);

  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      onChange(searchValue);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [onChange, searchValue]);

  return (
    <Input.Search
      onChange={_onChange}
      placeholder={placeholder}
      value={searchValue}
    />
  );
};

function Component ({ className = '' }: Props): React.ReactElement<Props> {
  const location = useLocation();
  const { collectionInfo } = location.state as INftCollectionDetail;
  const { nftItems } = useGetNftByAccount();

  const nftList = useMemo(() => {
    const result: NftItem[] = [];

    nftItems.forEach((nftItem) => {
      if (nftItem.collectionId === collectionInfo.collectionId && nftItem.chain === collectionInfo.chain) {
        result.push(nftItem);
      }
    });

    return result;
  }, [collectionInfo.chain, collectionInfo.collectionId, nftItems]);

  const balanceMap = useSelector((state: RootState) => state.balance.balanceMap);
  const currentAccountProxy = useSelector((state: RootState) => state.accountState.currentAccountProxy);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dataContext = useContext(DataContext);
  const [searchValue, setSearchValue] = useState<string>('');

  useNavigateOnChangeAccount('/home/nfts/collections');

  const searchNft = useCallback(
    (nftItem: NftItem) => {
      const searchTextLowerCase = searchValue.toLowerCase();

      return (
        nftItem.name?.toLowerCase().includes(searchTextLowerCase) ||
        nftItem.id.toLowerCase().includes(searchTextLowerCase)
      );
    },
    [searchValue]
  );

  // todo: `need optimize child router for nfts`
  const handleOnClickNft = useCallback((state: INftItemDetail) => {
    navigate('/home/nfts/item-detail', { state });
  }, [navigate]);

  const renderNft = useCallback((nftItem: NftItem) => {
    const routingParams = { collectionInfo, nftItem } as INftItemDetail;

    if (nftItem.description) {
      const ordinalNftItem = JSON.parse(nftItem.description) as OrdinalRemarkData;

      if ('p' in ordinalNftItem && 'op' in ordinalNftItem && 'tick' in ordinalNftItem && 'amt' in ordinalNftItem) {
        return (
          <InscriptionGalleryWrapper
            handleOnClick={handleOnClickNft}
            key={`${nftItem.chain}_${nftItem.collectionId}_${nftItem.id}`}
            name={nftItem.name as string}
            properties={ordinalNftItem}
            routingParams={routingParams}
          />
        );
      }
    }

    return (
      <NftGalleryWrapper
        fallbackImage={collectionInfo.image}
        handleOnClick={handleOnClickNft}
        have3dViewer={SHOW_3D_MODELS_CHAIN.includes(nftItem.chain)}
        image={nftItem.image}
        key={`${nftItem.chain}_${nftItem.collectionId}_${nftItem.id}`}
        routingParams={routingParams}
        title={nftItem.name || nftItem.id}
      />
    );
  }, [collectionInfo, handleOnClickNft]);

  const onBack = useCallback(() => {
    navigate('/home/nfts/collections');
  }, [navigate]);

  const emptyNft = useCallback(() => {
    return (
      <EmptyList
        emptyMessage={t('Your collectible will appear here!')}
        emptyTitle={t('No collectible')}
        phosphorIcon={Image}
      />
    );
  }, [t]);

  const onChangeSearchInput = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const totalItems = useMemo(() => {
    return getTotalCollectionItems(collectionInfo.collectionId, currentAccountProxy, balanceMap, nftList.length);
  }, [balanceMap, collectionInfo.collectionId, currentAccountProxy, nftList.length]);

  const hasMoreItems = useMemo(() => {
    if (searchValue.length >= 2) {
      return false;
    }

    return nftList.length < totalItems;
  }, [nftList.length, searchValue.length, totalItems]);

  const onLoadMoreItems = useCallback(() => {
    if (hasMoreItems) {
      loadMoreInscription().catch(console.log);
    }
  }, [hasMoreItems]);

  // note: memo to hot fix list scroll problem
  const listSection = useMemo(() => (
    <>
      <div className='ant-sw-list-wrapper'>
        <SwList
          displayGrid={true}
          enableSearchInput={true}
          gridGap={'14px'}
          hasMoreItems={hasMoreItems}
          list={nftList}
          loadMoreItems={onLoadMoreItems}
          minColumnWidth={'160px'}
          renderItem={renderNft}
          renderOnScroll={false}
          renderWhenEmpty={emptyNft}
          searchBy={searchNft}
          searchMinCharactersCount={2}
          searchPlaceholder={t<string>('Search collectible name or ID')}
          searchTerm={searchValue}
        />
      </div>
    </>
  ), [emptyNft, hasMoreItems, nftList, onLoadMoreItems, renderNft, searchNft, searchValue, t]);

  return (
    <PageWrapper
      className={`${className}`}
      resolve={dataContext.awaitStores(['nft', 'balance'])}
    >
      <Layout.Base
        onBack={onBack}
        showBackButton={true}
        showSubHeader={true}
        subHeaderBackground={'transparent'}
        subHeaderCenter={false}
        subHeaderPaddingVertical={true}
        title={(
          <div className={CN('header-content')}>
            <div className={CN('collection-name')}>
              {collectionInfo.collectionName || collectionInfo.collectionId}
            </div>
            <div className={CN('collection-count')}>
              &nbsp;({nftList.length})
            </div>
          </div>
        )}
      >
        <div className='ant-sw-list-section nft_item_list__container'>
          <div className='ant-sw-list-search-input'>
            <SearchInput
              onChange={onChangeSearchInput}
              placeholder={t<string>('Search collectible name or ID')}
            />
          </div>

          {listSection}
        </div>
      </Layout.Base>
    </PageWrapper>
  );
}

const NftCollectionDetail = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return ({
    color: token.colorTextLight1,
    fontSize: token.fontSizeLG,

    '.ant-sw-sub-header-container': {
      paddingBottom: token.paddingXS,
      paddingTop: token.paddingXS,
      minHeight: 56,
      marginBottom: token.marginXS
    },

    '.header-content': {
      color: token.colorTextBase,
      fontWeight: token.fontWeightStrong,
      fontSize: token.fontSizeHeading4,
      lineHeight: token.lineHeightHeading4,
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden'
    },

    '.ant-sw-list-section': {
      display: 'flex',
      overflow: 'hidden',
      flexDirection: 'column'
    },

    '.ant-sw-list-search-input': {
      padding: token.padding,
      paddingTop: 0
    },

    '.collection-name': {
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },

    '.ant-sw-list-wrapper': {
      flex: '1 1 100vh',
      overflow: 'hidden'
    },

    '.ant-sw-list': {
      overflow: 'auto',
      maxHeight: '100%',
      paddingLeft: token.padding,
      paddingRight: token.padding
    },

    '.nft_item_list__container': {
      flex: 1,
      height: '100%',

      '.ant-sw-list': {
        paddingBottom: 1,
        marginBottom: -1
      }
    },

    '&__inner': {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  });
});

export default NftCollectionDetail;
