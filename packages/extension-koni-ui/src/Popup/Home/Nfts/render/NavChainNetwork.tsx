// Copyright 2019-2022 @polkadot/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import CN from 'classnames';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import { ALL_ACCOUNT_KEY } from '@polkadot/extension-koni-base/constants';
import { ThemeProps } from '@polkadot/extension-koni-ui/types';
import { ChainInfoBrief } from '@polkadot/extension-koni-ui/util/types';

interface Props extends ThemeProps{
  className?: string;
  nftChains: ChainInfoBrief[],
  selectedNftNetwork: string,
  setSelectedNftNetwork: (val: string) => void
}

const NavChainNetwork = (props: Props) => {
  const { className, nftChains, selectedNftNetwork, setSelectedNftNetwork } = props;

  const handlerOnclick = useCallback((networkKey: string) => {
    setSelectedNftNetwork && setSelectedNftNetwork(networkKey);
  }, [setSelectedNftNetwork]);

  return (
    <div className={CN(className)}>
      <div className={'nft-network-container'}>
        <div
          className={CN(
            'network-item first',
            { active: ALL_ACCOUNT_KEY.toLocaleLowerCase() === selectedNftNetwork }
          )}
          /* eslint-disable-next-line react/jsx-no-bind */
          onClick={() => handlerOnclick(ALL_ACCOUNT_KEY.toLocaleLowerCase())}
        >
          <div className='network-name'>
            All
          </div>
        </div>
        <div className='network-items-container'>
          {nftChains.map((chain) => {
            return (
              <div
                className={CN(
                  'network-item',
                  { active: selectedNftNetwork === chain.networkKey }
                )}
                key={chain.key}
                /* eslint-disable-next-line react/jsx-no-bind */
                onClick={() => {
                  handlerOnclick(chain.networkKey);
                }}
              >
                <img
                  alt={chain.networkKey}
                  className='network-logo'
                  src={chain.networkLogo}
                />
                <div className='network-name'>
                  {chain.networkDisplayName}
                </div>
                <div className='collection-number'>
                  {chain.numberCollections}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(styled(NavChainNetwork)(({ theme }: Props) => `
  position: sticky;
  top: 0;
  background-color: #020412;
  z-index: 11;
  margin-bottom: 30px;

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

    .network-items-container{
      display: flex;
      align-items: center;
      justify-content: start;
      overflow: auto hidden;

      flex: none;
      -ms-overflow-style: none;  /* Internet Explorer 10+ */
      scrollbar-width: none;  /* Firefox */
    }

    .network-item{
      padding: 14px;
      white-space: nowrap;
      position: relative;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;

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

      .network-logo{
        height: 20px;
        width: 20px;
        margin-right: 6px;
      }

      .network-name{
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 26px;
        color: #FFFFFF;
      }

      .collection-number{
        font-family: 'Lexend';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 26px;
        color: ${theme.textColor2};
        margin-left: 8px;
      }
    }

    .network-item.active{
      :after{
        height: 2px;
        background-color: #004BFF;
      }

      .network-name{
        color: #42C59A;
      }
    }

    .network-item.first{
      position: sticky;
      left: 0;
      background-color: #020412;
      z-index: 14;
      :after{
        z-index: 20;
      }
    }
  }

  .nft-network-container::-webkit-scrollbar {
      display: none;  /* Safari and Chrome */
  }

`));
