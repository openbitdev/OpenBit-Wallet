// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import CN from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
// @ts-ignore
import LazyLoad from 'react-lazyload';
import styled from 'styled-components';

import logo from '@polkadot/extension-koni-ui/assets/sub-wallet-logo.svg';
import Spinner from '@polkadot/extension-koni-ui/components/Spinner';
import useIsPopup from '@polkadot/extension-koni-ui/hooks/useIsPopup';
import { _NftCollection } from '@polkadot/extension-koni-ui/Popup/Home/Nfts/types';
import { ThemeProps } from '@polkadot/extension-koni-ui/types';

interface Props {
  className?: string;
  data: _NftCollection;
  onClick: (data: _NftCollection) => void;
}

function NftCollectionPreview ({ className, data, onClick }: Props): React.ReactElement<Props> {
  const [loading, setLoading] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  const isPopup = useIsPopup();

  const handleOnLoad = useCallback(() => {
    setLoading(false);
  }, []);

  const handlerOnError = useCallback(() => {
    if (imgRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      imgRef.current.src = logo;
    }

    setLoading(false);
  }, [imgRef]);

  const handleOnClick = useCallback(() => {
    onClick(data);
  }, [data, onClick]);

  useEffect(() => {
    setLoading(true);
  }, [data.image]);

  return (
    <div className={className}>
      <div
        className={CN('nft-preview', { full: !isPopup })}
        onClick={handleOnClick}
        style={{ height: isPopup ? 164 : 310 }}
      >
        <div className={'img-container'}>
          {
            loading &&
            <Spinner className={'img-spinner'} />
          }
          <LazyLoad
            scrollContainer={'.home-tab-contents'}
          >
            <img
              alt={'collection-thumbnail'}
              className={'collection-thumbnail'}
              onError={handlerOnError}
              onLoad={handleOnLoad}
              ref={imgRef}
              src={data.image ? data?.image : logo}
              style={{ borderRadius: '5px 5px 0 0', opacity: loading ? '0.3' : '1' }}
            />
          </LazyLoad>
        </div>

        <div className={'collection-title'}>
          <div
            className={'collection-name'}
            title={data.collectionName ? data.collectionName : data?.collectionId}
          >
            {/* show only first 10 characters */}
            {data.collectionName ? data.collectionName : data?.collectionId}
          </div>
          {/* @ts-ignore */}
          <div className={'collection-item-count'}>{data?.nftItems.length}</div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(styled(NftCollectionPreview)(({ theme }: ThemeProps) => `
  .img-container {
    position: relative;
  }

  .img-spinner {
    position: absolute;
  }

  .nft-preview {
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
    width: 124px;
    &:hover {
      cursor: pointer;
    }

    .collection-thumbnail {
      display: block;
      height: 124px;
      width: 124px;
      object-fit: contain;
    }

    .collection-name {
      // width: 70%;
      text-transform: capitalize;
      font-size: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .collection-title {
      height: 40px;
      padding-left: 10px;
      padding-right: 10px;
      display: flex;
      align-items: center;
      background-color: ${theme.popupBackground};
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.13);
      border-radius: 0 0 5px 5px;
    }

    .collection-item-count {
      font-size: 14px;
      margin-left: 5px;
      font-weight: normal;
      color: ${theme.iconNeutralColor};
    }
  }

  .nft-preview.full{
    width: 230px;

    .collection-thumbnail {
      height: 230px;
      width: 230px;
    }

    .img-container{
      height: 230px;
    }

    .collection-title {
      height: 80px;
      padding-left: 20px;
      padding-right: 20px;
      flex-direction: column;
      align-items: start;
      justify-content: center;
    }

    .collection-name{
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 32px;
      color: #FFFFFF;
      width: 100%;
    }

    .collection-item-count{
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      line-height: 26px;
    }
  }
`));
