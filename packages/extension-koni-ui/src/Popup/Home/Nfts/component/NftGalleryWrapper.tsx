// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NftItem } from '@subwallet/extension-base/background/KoniTypes';
import { isValidJson } from '@subwallet/extension-koni-ui/Popup/Home/Nfts';
import { Theme, ThemeProps } from '@subwallet/extension-koni-ui/types';
import { ActivityIndicator, NftItem as NftItem_ } from '@subwallet/react-ui';
import React, { useCallback, useMemo } from 'react';
// @ts-ignore
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import styled, { useTheme } from 'styled-components';

interface Props extends ThemeProps {
  title: string;
  nftItem?: NftItem;
  image: string | undefined;
  fallbackImage?: string | undefined;
  itemCount?: number;
  handleOnClick?: (params?: any) => void;
  routingParams?: any;
  have3dViewer?: boolean;
}

function Component ({ className = '', fallbackImage, handleOnClick, image, itemCount, nftItem, routingParams, title }: Props): React.ReactElement<Props> {
  const { extendToken } = useTheme() as Theme;

  const onClick = useCallback(() => {
    handleOnClick && handleOnClick(routingParams);
  }, [handleOnClick, routingParams]);

  const getCollectionImage = useCallback(() => {
    if (image) {
      return image;
    } else if (fallbackImage) {
      return fallbackImage;
    }

    return extendToken.defaultImagePlaceholder;
  }, [extendToken.defaultImagePlaceholder, fallbackImage, image]);

  const loadingPlaceholder = useCallback(() => {
    return (
      <div className={'nft_gallery_wrapper__loading'}>
        <ActivityIndicator
          existIcon={true}
          prefixCls={''}
        />
      </div>
    );
  }, []);

  const getContentType = useMemo(() => {
    let contentType = '';

    if (nftItem?.properties) {
      Object.entries(nftItem.properties).forEach(([attName, attValueObj]) => {
        const { value: attValue } = attValueObj as Record<string, string>;

        if (attName === 'content_type') {
          contentType = attValue;
        }
      });
    }

    return contentType;
  }, [nftItem?.properties]);

  const checkContentType = useCallback((type: string): boolean => getContentType.includes(type), [getContentType]);

  const isAudioInscriptions = useMemo(() => checkContentType('audio'), [checkContentType]);

  const isTextHTMLInscriptions = useMemo(() => checkContentType('text/html'), [checkContentType]);

  const isSVGInscriptions = useMemo(() => checkContentType('image/svg'), [checkContentType]);
  const isVideoInscriptions = useMemo(() => checkContentType('video'), [checkContentType]);
  const isImageCommonInscriptions = useMemo(() => checkContentType('image'), [checkContentType]);
  const isAppJsonInscriptions = useMemo(() => checkContentType('application/json'), [checkContentType]);

  const renderAppJsonContent = useCallback(() => {
    const ordinalNftDescription = nftItem?.description && isValidJson(nftItem.description)
      ? JSON.parse(nftItem.description) as Record<string, unknown>
      : undefined;

    if (!ordinalNftDescription) {
      return null;
    }

    return (
      <div className='nft-container'>
        {Object.entries(ordinalNftDescription).map(([key, value]) => (
          <div
            className={'__nft-item'}
            key={key}
          >{key}: <div className={'__nft-item-value'}>{String(value)}</div></div>
        ))}
      </div>
    );
  }, [nftItem?.description]);

  const getCollectionImageNode = useCallback(() => {
    if (isTextHTMLInscriptions || isSVGInscriptions) {
      return (
        <LazyLoadComponent>
          <div className={'-nft-text-html-wrapper'}>
            <iframe
              className={'-nft-text-html'}
              src={getCollectionImage()}
              title={'HTML Inscription Content'}
            />
          </div>
        </LazyLoadComponent>
      );
    }

    if (isImageCommonInscriptions) {
      return (
        <LazyLoadImage
          delayTime={10000}
          height={'100%'}
          placeholder={loadingPlaceholder()}
          src={getCollectionImage()}
          width={'100%'}
        />
      );
    }

    if (isVideoInscriptions) {
      return (
        <LazyLoadComponent>
          <video
            autoPlay
            height={'100%'}
            loop={true}
            muted
            width={'100%'}
          >
            <source
              src={getCollectionImage()}
              type={getContentType}
            />
          </video>
        </LazyLoadComponent>
      );
    }

    if (isAudioInscriptions) {
      return (
        <LazyLoadComponent>
          <div className={'nft_gallery_wrapper__audio'}>
            <audio controls>
              <source
                src={getCollectionImage()}
                type={getContentType}
              />
            </audio>
          </div>
        </LazyLoadComponent>
      );
    }

    if (isAppJsonInscriptions) {
      return (
        <LazyLoadComponent>
          {renderAppJsonContent()};
        </LazyLoadComponent>
      );
    }

    return (
      <LazyLoadImage
        src={extendToken.defaultImagePlaceholder}
        visibleByDefault={true}
      />
    );
  }, [extendToken.defaultImagePlaceholder, getCollectionImage, getContentType, isAppJsonInscriptions, isAudioInscriptions, isImageCommonInscriptions, isSVGInscriptions, isTextHTMLInscriptions, isVideoInscriptions, loadingPlaceholder, renderAppJsonContent]);

  return (
    <NftItem_
      className={`nft_gallery_wrapper ${className}`}
      count={itemCount}
      customImageNode={getCollectionImageNode()}
      onClick={onClick}
      title={title}
    />
  );
}

export const NftGalleryWrapper = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return ({
    color: token.colorTextLight1,
    fontSize: token.fontSizeLG,

    '.__image-wrapper': {
      overflow: 'hidden'
    },

    '.nft_gallery_wrapper__audio': {
      display: 'flex',
      alignItems: 'center',
      padding: token.padding,
      height: '100%'
    },

    '.-nft-text-html': {
      width: 171,
      height: 171,
      border: 'none',
      overflow: 'hidden'
    },

    '.nft-container': {
      width: 171,
      height: 171,
      backgroundColor: token.colorTextTertiary,
      padding: token.paddingXS,
      gap: 4,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    },
    '.__nft-item': {
      fontSize: token.fontSizeXS,
      lineHeight: token.lineHeightXS,
      color: token.colorTextDark1,
      justifyContent: 'space-between',
      display: 'flex',
      gap: 2,

    },
    '.__nft-item-value': {
      color: token.colorTextDark4,
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },

    '.nft_gallery_wrapper__loading': {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
});
