// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DEFAULT_MODEL_VIEWER_PROPS } from '@subwallet/extension-koni-ui/constants';
import { Theme, ThemeProps } from '@subwallet/extension-koni-ui/types';
import { ActivityIndicator, NftItem as NftItem_ } from '@subwallet/react-ui';
import React, { useCallback, useState } from 'react';
// @ts-ignore
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import styled, { useTheme } from 'styled-components';

interface Props extends ThemeProps {
  title: string;
  image: string | undefined;
  fallbackImage?: string | undefined;
  itemCount?: number;
  handleOnClick?: (params?: any) => void;
  routingParams?: any;
  have3dViewer?: boolean;
}

function Component ({ className = '', fallbackImage, handleOnClick, have3dViewer, image, itemCount, routingParams, title }: Props): React.ReactElement<Props> {
  const { extendToken } = useTheme() as Theme;

  const [showImage, setShowImage] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [showAudio, setShowAudio] = useState(false);
  const [showTextPlain, setShowTextPlain] = useState(false);
  const [show3dViewer, setShow3dViewer] = useState(false);

  const onClick = useCallback(() => {
    handleOnClick && handleOnClick(routingParams);
  }, [handleOnClick, routingParams]);

  const handleImageError = useCallback(() => {
    setShowImage(false);
    setShowVideo(true);
  }, []);

  const handleVideoError = useCallback(() => {
    setShowVideo(false);
    setShowTextPlain(true);
  }, []);

  const handleTextPlainError = useCallback(() => {
    setShowTextPlain(false);
    setShowAudio(true);
  }, []);

  const handleAudioError = useCallback(() => {
    setShowAudio(false);
    setShow3dViewer(true);
  }, []);

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

  const getCollectionImageNode = useCallback(() => {
    if (showImage) {
      return (
        <LazyLoadImage
          delayTime={10000}
          height={'100%'}
          onError={handleImageError}
          placeholder={loadingPlaceholder()}
          src={getCollectionImage()}
          width={'100%'}
        />
      );
    }

    if (showVideo) {
      return (
        <LazyLoadComponent>
          <video
            autoPlay
            height={'100%'}
            loop={true}
            muted
            onError={handleVideoError}
            width={'100%'}
          >
            <source
              src={getCollectionImage()}
              type='video/mp4'
            />
          </video>
        </LazyLoadComponent>
      );
    }

    if (showTextPlain) {
      return (
        <LazyLoadComponent>
          <iframe
            className={'__nft-text-content'}
            height={'171px'}
            onError={handleTextPlainError}
            src={getCollectionImage()}
            width={'171px'}
          ></iframe>
        </LazyLoadComponent>
      );
    }

    if (showAudio) {
      return (
        <LazyLoadComponent>
          <audio
            autoPlay={false}
            controls
            controlsList={'nodownload'}
            loop
            muted
            onError={handleAudioError}
            src={getCollectionImage()}
          />
        </LazyLoadComponent>
      );
    }

    if (have3dViewer && show3dViewer) {
      return (
        <LazyLoadComponent>
          {/* @ts-ignore */}
          <model-viewer
            alt={'model-viewer'}
            ar-status={'not-presenting'}
            auto-rotate={true}
            auto-rotate-delay={100}
            bounds={'tight'}
            disable-pan={true}
            disable-scroll={true}
            disable-tap={true}
            disable-zoom={true}
            environment-image={'neutral'}
            interaction-prompt={'none'}
            loading={'eager'}
            src={getCollectionImage()}
            style={{ width: '100%', height: '100%' }}
            touch-action={'none'}
            {...DEFAULT_MODEL_VIEWER_PROPS}
          />
        </LazyLoadComponent>
      );
    }

    return (
      <LazyLoadImage
        src={extendToken.defaultImagePlaceholder}
        visibleByDefault={true}
      />
    );
  }, [extendToken.defaultImagePlaceholder, getCollectionImage, handleAudioError, handleImageError, handleTextPlainError, handleVideoError, have3dViewer, loadingPlaceholder, show3dViewer, showAudio, showImage, showTextPlain, showVideo]);

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

    '.__nft-text-content': {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8
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
