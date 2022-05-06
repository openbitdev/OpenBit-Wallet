// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import CN from 'classnames';
import React from 'react';
import styled from 'styled-components';

import { TabHeaderItemType } from '@polkadot/extension-koni-ui/Popup/Home/types';
import { ThemeProps } from '@polkadot/extension-koni-ui/types';

interface Props extends ThemeProps{
  className?: string;
  item: TabHeaderItemType;
  isActivated: boolean;
  onSelect: (tabId: number) => void;
}

const TopHeaderItem = ({ className, isActivated, item, onSelect }: Props) => {
  const _onSelect = (tabId: number) => {
    return (e: React.MouseEvent<HTMLElement>) => {
      onSelect(tabId);
    };
  };

  return (
    <div
      className={CN('top-header-item', className, { activated: isActivated })}
      onClick={_onSelect(item.tabId)}
    >
      <div className='top-header-item__content-wrapper'>
        <div className='top-header-item__label'>{item.label}</div>
      </div>
    </div>
  );
};

export default styled(TopHeaderItem)(({ theme }: Props) => `
  display: flex;
  justify-content: center;
  cursor: pointer;
  &:last-child{
    .top-header-item__content-wrapper {
      margin-right: 0;
    }
  }

  .top-header-item__content-wrapper {
    display: flex;
    align-items: center;
    position: relative;
    margin-right: 30px;
  }

  .top-header-item__label {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    color: ${theme.textColor2};
  }

  &.activated {
    .top-header-item__label{
      color: #FFFFFF;
    }
  }
`);
