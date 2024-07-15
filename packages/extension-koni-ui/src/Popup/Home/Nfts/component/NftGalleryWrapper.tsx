// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NftItem } from '@subwallet/extension-base/background/KoniTypes';
import { ContentType, determineContentType, getContentType, isValidJson } from '@subwallet/extension-koni-ui/Popup/Home/Nfts';
import { Theme, ThemeProps } from '@subwallet/extension-koni-ui/types';
import { ActivityIndicator, NftItem as NftItem_ } from '@subwallet/react-ui';
import React, { useCallback } from 'react';
// @ts-ignore
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import styled, { useTheme } from 'styled-components';

interface Props extends ThemeProps {
  title: string;
  nftItem?: NftItem;
  image: string | undefined;
  fallbackImage?: { image?: string; contentType?: ContentType } | undefined;
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
      return fallbackImage.image;
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

  const renderAppJsonContent = () => {
    const ordinalNftDescription = nftItem?.description && isValidJson(nftItem.description)
      ? JSON.parse(nftItem.description) as Record<string, unknown>
      : undefined;

    if (!ordinalNftDescription || Object.keys(ordinalNftDescription).length === 0) {
      return (
        <LazyLoadImage
          src={extendToken.defaultImagePlaceholder}
          visibleByDefault={true}
        />
      );
    }

    return (
      <div className='nft-container'>
        <pre>
          <code>
            {JSON.stringify(ordinalNftDescription, null, 2)}
          </code>
        </pre>
      </div>
    );
  };

  const getCollectionImageNode = () => {
    let contentType = determineContentType(getContentType(nftItem?.properties));
    const fallbackContentType = fallbackImage?.contentType;

    if (!contentType) {
      contentType = fallbackContentType;
    }

    switch (contentType) {
      case ContentType.TextHTML:
      case ContentType.ImageSVG:
      case ContentType.ImageGIF:
      case ContentType.ModelGltf:
        return (
          <LazyLoadComponent>
            <div className='-nft-text-html-wrapper'>
              <iframe
                className='-nft-text-html'
                src={getCollectionImage()}
                title='HTML Inscription Content'
              />
            </div>
          </LazyLoadComponent>
        );

      case ContentType.Image:
        return (
          <LazyLoadImage
            delayTime={10000}
            height='100%'
            placeholder={loadingPlaceholder()}
            src={getCollectionImage()}
            width='100%'
          />
        );

      case ContentType.Video:
        return (
          <LazyLoadComponent>
            <video
              autoPlay
              height='100%'
              loop={true}
              muted
              width='100%'
            >
              <source
                src={getCollectionImage()}
                type={getContentType(nftItem?.properties)}
              />
            </video>
          </LazyLoadComponent>
        );

      case ContentType.Audio:
        return (
          <LazyLoadComponent>
            <div className='nft_gallery_wrapper__audio'>
              <audio
                autoPlay={false}
                controls
                muted
              >
                <source
                  src={getCollectionImage()}
                  type={getContentType(nftItem?.properties)}
                />
              </audio>
            </div>
          </LazyLoadComponent>
        );

      case ContentType.AppJson:
        return (
          <LazyLoadComponent>
            {renderAppJsonContent()}
          </LazyLoadComponent>
        );

      default:
        return (
          <LazyLoadImage
            src={getCollectionImage()}
            visibleByDefault={true}
          />
        );
    }
  };

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
      gap: 2

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
