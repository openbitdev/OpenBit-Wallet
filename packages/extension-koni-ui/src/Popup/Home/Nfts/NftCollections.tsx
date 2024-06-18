// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NftCollection, NftItem } from '@subwallet/extension-base/background/KoniTypes';
import { EmptyList, Layout, PageWrapper } from '@subwallet/extension-koni-ui/components';
import { DataContext } from '@subwallet/extension-koni-ui/contexts/DataContext';
import { useGetNftByAccount, useNotification, useSetCurrentPage, useTranslation } from '@subwallet/extension-koni-ui/hooks';
import { reloadCron } from '@subwallet/extension-koni-ui/messaging';
import { NftGalleryWrapper } from '@subwallet/extension-koni-ui/Popup/Home/Nfts/component/NftGalleryWrapper';
import { getTotalCollectionItems, INftCollectionDetail } from '@subwallet/extension-koni-ui/Popup/Home/Nfts/utils';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { ActivityIndicator, ButtonProps, Icon, SwList } from '@subwallet/react-ui';
import CN from 'classnames';
import { ArrowClockwise, Image } from 'phosphor-react';
import React, { useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type Props = ThemeProps

const reloadIcon = <Icon
  phosphorIcon={ArrowClockwise}
  size='sm'
  type='phosphor'
/>;

function Component ({ className = '' }: Props): React.ReactElement<Props> {
  useSetCurrentPage('/home/nfts/collections');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dataContext = useContext(DataContext);
  const { nftCollections, nftItems } = useGetNftByAccount();
  const [loading, setLoading] = React.useState<boolean>(false);
  const balanceMap = useSelector((state: RootState) => state.balance.balanceMap);
  const currentAccountProxy = useSelector((state: RootState) => state.accountState.currentAccountProxy);
  const notify = useNotification();

  const subHeaderButton: ButtonProps[] = [
    {
      icon: reloadIcon,
      disabled: loading,
      size: 'xs',
      onClick: () => {
        setLoading(true);
        notify({
          icon: <ActivityIndicator size={32} />,
          style: { top: 210 },
          direction: 'vertical',
          duration: 1.8,
          closable: false,
          message: t('Reloading')
        });

        reloadCron({ data: 'nft' })
          .then(() => {
            setLoading(false);
          })
          .catch(console.error);
      }
    }
  ];

  const searchCollection = useCallback((collection: NftCollection, searchText: string) => {
    const searchTextLowerCase = searchText.toLowerCase();

    return (
      collection.collectionName?.toLowerCase().includes(searchTextLowerCase) ||
      collection.collectionId.toLowerCase().includes(searchTextLowerCase)
    );
  }, []);

  const getNftsByCollection = useCallback((nftCollection: NftCollection) => {
    const nftList: NftItem[] = [];

    nftItems.forEach((nftItem) => {
      if (nftItem.collectionId === nftCollection.collectionId && nftItem.chain === nftCollection.chain) {
        nftList.push(nftItem);
      }
    });

    return nftList;
  }, [nftItems]);

  const handleOnClickCollection = useCallback((state: INftCollectionDetail) => {
    navigate('/home/nfts/collection-detail', { state });
  }, [navigate]);

  const renderNftCollection = useCallback((nftCollection: NftCollection) => {
    const nftList = getNftsByCollection(nftCollection);

    let fallbackImage: string | undefined;

    for (const nft of nftList) { // fallback to any nft image
      if (nft.image) {
        fallbackImage = nft.image;
        break;
      }
    }

    const state: INftCollectionDetail = { collectionInfo: nftCollection, nftList };

    return (
      <NftGalleryWrapper
        fallbackImage={fallbackImage}
        handleOnClick={handleOnClickCollection}
        image={nftCollection.image}
        itemCount={getTotalCollectionItems(nftCollection.collectionId, currentAccountProxy, balanceMap, nftList.length)}
        key={`${nftCollection.collectionId}_${nftCollection.chain}`}
        routingParams={state}
        title={nftCollection.collectionName || nftCollection.collectionId}
      />
    );
  }, [balanceMap, currentAccountProxy, getNftsByCollection, handleOnClickCollection]);

  const emptyNft = useCallback(() => {
    return (
      <EmptyList
        emptyMessage={t('Try adding one manually')}
        emptyTitle={t('No Collectible found')}
        phosphorIcon={Image}
      />
    );
  }, [t]);

  return (
    <PageWrapper
      className={`nft_container ${className}`}
      resolve={dataContext.awaitStores(['nft', 'balance'])}
    >
      <Layout.Base
        showSubHeader={true}
        subHeaderBackground={'transparent'}
        subHeaderCenter={false}
        subHeaderIcons={subHeaderButton}
        subHeaderPaddingVertical={true}
        title={t<string>('Your collections')}
      >
        <SwList.Section
          className={CN('nft_collection_list__container')}
          displayGrid={true}
          enableSearchInput={true}
          gridGap={'14px'}
          list={nftCollections}
          minColumnWidth={'160px'}
          renderItem={renderNftCollection}
          renderOnScroll={true}
          renderWhenEmpty={emptyNft}
          searchFunction={searchCollection}
          searchMinCharactersCount={2}
          searchPlaceholder={t<string>('Search collection name')}
        />
      </Layout.Base>
    </PageWrapper>
  );
}

const NftCollections = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return ({
    color: token.colorTextLight1,
    fontSize: token.fontSizeLG,

    '.ant-sw-sub-header-container': {
      paddingBottom: token.paddingXS,
      paddingTop: token.paddingXS,
      minHeight: 56,
      marginBottom: token.marginXS
    },

    '&__inner': {
      display: 'flex',
      flexDirection: 'column'
    },

    '.nft_collection_list__container': {
      height: '100%',
      flex: 1,

      '.ant-sw-list': {
        paddingBottom: 1,
        marginBottom: -1
      }
    }
  });
});

export default NftCollections;
