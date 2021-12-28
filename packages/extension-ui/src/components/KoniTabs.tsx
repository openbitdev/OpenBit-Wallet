import React, { useState } from 'react';
import styled from 'styled-components';
import {ThemeProps} from "@polkadot/extension-ui/types";

interface Props extends ThemeProps {
  className?: string;
  onClickAssets?: () => void;
  onClickActivity?: () => void;
}


function KoniTabs({ className, onClickAssets, onClickActivity }: Props): React.ReactElement<Props> {
  const [active, setActive] = useState('assets');

  const _clickAssets = function () {
    if (onClickAssets) {
      onClickAssets();
    }
    setActive('assets')
  };

  const _clickActivity = function () {
    if (onClickActivity) {
      onClickActivity();
    }
    setActive('activity')
  }

  return (
    <>
      <div className={className}>
        <div className='koni-tabs'>
            <button className={`koni-tab ${active == 'assets'? 'active' : ''}`} onClick={_clickAssets}>
              Assets
            </button>
            <button className={`koni-tab ${active == 'activity'? 'active' : ''}`} onClick={_clickActivity}>
              Activity
            </button>
        </div>
      </div>
    </>
  )
}

export default styled(KoniTabs)(({theme}: Props) => `
  .koni-tabs {
    display: flex;
  }

  .koni-tab {
    font-size: 16px;
    line-height: 26px;
    padding: 5px 60px;
    cursor: pointer;
    opacity: 0.6;
    display: flex;
    justify-content: center;
    flex: 1;
    font-weight: 700;
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.05);
    background: ${theme.background};
    border: 0;
    outline: 0;
    border-bottom: 2px solid ${theme.tabContentBorderBottomColor};
    color: ${theme.textColor2}
  }

  .active {
    border-bottom-color: ${theme.buttonTextColor2};
    color: ${theme.buttonTextColor2};
    opacity: 1;
  }
`)
