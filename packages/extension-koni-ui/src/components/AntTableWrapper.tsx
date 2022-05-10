// Copyright 2019-2022 @polkadot/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { FC } from 'react';
import styled from 'styled-components';

import { ThemeProps } from '@polkadot/extension-koni-ui/types';

interface Props extends ThemeProps {
  className?: string;
}

const AntTableWrapper: FC<Props> = (props) => {
  const { children, className } = props;

  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default React.memo(styled(AntTableWrapper)(({ theme }: Props) => `
  .text-right{
    text-align: right;
  }

  .cursor-pointer{
    cursor: pointer;
  }

  .text-center{
    text-align: center;
  }

  .text-left{
    text-align: left;
  }

  .ant-table{
    background-color: transparent;
    color: ${theme.textColor2};

    ant-table-content{
      position: relative;
    }

    .ant-table-cell{
      padding: 12px 8px;
      border-bottom: 1px solid ${theme.tableSeparator};
    }

    .ant-table-cell.text-left.ant-table-column-has-sorters, .ant-table-cell.text-center.ant-table-column-has-sorters{

      .ant-table-column-title{
        flex: none;
      }
    }

    .ant-table-cell.text-left.ant-table-column-has-sorters{

      .ant-table-column-sorters{
        justify-content: flex-start;
      }
    }

    .ant-table-cell.text-center.ant-table-column-has-sorters{

      .ant-table-column-sorters{
        justify-content: center;
      }
    }

    .ant-table-row:hover{
      .ant-table-cell{
        background-color: transparent;
      }
    }

    .ant-table-placeholder:hover {
      td{
        background: transparent;
      }
    }

    .ant-table-tbody {
      .ant-table-cell-row-hover, .ant-table-column-sort {
        background-color: transparent;
      }
    }

    .ant-empty{
      color: ${theme.textColor2};
    }

    .ant-empty-image{
      filter: ${theme.textColorFilter2};
    }

    .ant-table-expanded-row{
      .ant-table-cell{
        background-color: transparent;
        color: ${theme.textColor2};
      }
    }

    .ant-table-thead{
      position: sticky;
      top: 0;
      z-index: 1;

      .ant-table-cell{
        background: ${theme.primary1};
        box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.05);
        border-bottom: 0;
        padding: 12px 8px;

        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 26px;
        color: ${theme.textColor};
      }

      .ant-table-cell::before{
        display: none;
      }

      .ant-table-cell:first-child{
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }

      .ant-table-cell:last-child{
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
      }
    }
  }

  .ant-pagination{

    .ant-pagination-disabled{
      .ant-pagination-item-link{
        background-color: ${theme.background};
        border-color: ${theme.tableSeparator};
        color: ${theme.textColor2};

        &:hover{
          border-color: ${theme.tableSeparator};
          color: ${theme.textColor2};
        }
      }
    }

    .ant-pagination-item-link{
      background-color: ${theme.background};
      border-color: ${theme.tableSeparator};
      color: ${theme.textColor2};

      &:hover{
        border-color: ${theme.primary1};
        color: ${theme.primary1};
      }
    }

    .ant-pagination-item{
      background-color: ${theme.background};
      border-color: ${theme.tableSeparator};
      color: ${theme.textColor2};

      a{
        color: ${theme.textColor2};
      }

      &.ant-pagination-item-active, &.ant-pagination-item-active:hover{
        border-color: ${theme.borderSuccess};

        a{
          color: ${theme.textSuccess};
        }
      }

      &:hover{
        border-color: ${theme.primary1};

        a{
          color: ${theme.primary1};
        }
      }
    }

    .ant-pagination-item-ellipsis{
      color: ${theme.textColor2};
    }

    .ant-pagination-item-link-icon{
      color: ${theme.primary1};
    }

    .ant-pagination-options-size-changer, .ant-pagination-options-size-changer.ant-select-focused{
      .ant-select-selector{
        background-color: ${theme.background};
        border-color: ${theme.tableSeparator};
        color: ${theme.textColor2};
      }

      .ant-select-arrow{
        color: ${theme.textColor2};
      }
    }

    .ant-pagination-options-size-changer.ant-select-focused{
      .ant-select-selector{
        box-shadow: 0 0 0 2px ${theme.paginationSelectBoxShadow};
      }
    }
  }
`));
