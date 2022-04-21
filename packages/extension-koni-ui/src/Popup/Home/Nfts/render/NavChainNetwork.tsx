// Copyright 2019-2022 @polkadot/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import CN from 'classnames';
import React from 'react';
import styled from 'styled-components';

import { ThemeProps } from '@polkadot/extension-koni-ui/types';
import { ChainInfoBrief } from '@polkadot/extension-koni-ui/util/types';

interface Props extends ThemeProps{
  className?: string;
  nftChains: ChainInfoBrief[],
  selectedNftNetwork: string,
  setSelectedNftNetwork: (val: string) => void
}

const NavChainNetwork = (props: Props) => {
  const { className, nftChains } = props;

  return (
    <div className={CN(className)}>
      <div className={'nft-network-container'}>
        <div className='network-item-container first'>
          <div className='network-item'>
            All
          </div>
        </div>
        {nftChains.map((chain) => {
          return (
            <div className='network-item-container' key={chain.key}>
              <div className='network-item active'>
                {chain.networkDisplayName}
              </div>
            </div>
          );
        })}
        {nftChains.map((chain) => {
          return (
            <div className='network-item' key={chain.key}>
              {chain.networkDisplayName}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(styled(NavChainNetwork)(({ theme }: Props) => `
  position: sticky;
  top: 0;
  background-color: #020412;
  z-index: 11;

  .nft-network-container{
    display: flex;
    align-items: center;
    justify-content: start;
    overflow-y: hidden;
    overflow-x: auto;
    :before{
      background-color: #343849;
      height: 1px;
      position: absolute;
      content: '';
      width: 100%;
      bottom: 0;
      left: 0;
      z-index: 12;
    }

    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */

    .network-item{
      padding: 8px 12px;
      white-space: nowrap;
      position: relative;

      :after{
        background-color: #343849;
        height: 1px;
        position: absolute;
        content: '';
        width: 100%;
        bottom: 0;
        left: 0;
        z-index: 13;
      }
    }

    .network-item.active{
      :after{
        background-color: #fff;
      }
    }

    .network-item.first{
      position: sticky;
      left: 0;
      background-color: #020412;
      z-index: 11;
      :after{
        z-index: 20;
      }
    }
  }

  .nft-network-container::-webkit-scrollbar {
      display: none;  /* Safari and Chrome */
  }

`));
