import type {ThemeProps} from '../types';
import React from 'react';
import styled from 'styled-components';
import KoniMenu from "@polkadot/extension-ui/components/KoniMenu";
import useGenesisHashOptions from "@polkadot/extension-ui/hooks/useGenesisHashOptions";
import check from "@polkadot/extension-ui/assets/check.svg";
import {getLogoByGenesisHash} from "@polkadot/extension-ui/util/koni/logoByGenesisHashMap";

interface Props extends ThemeProps {
  className?: string;
  reference: React.MutableRefObject<null>;
  onFilter?: (filter: string) => void;
  closeSetting?: () => void;
  currentNetwork?: string;
  selectNetwork: (genesisHash: string, networkPrefix: number, icon: String, networkName: string) => void;
  isNotHaveAccount?: boolean;
}

function KoniNetworkMenu ({ className, reference, currentNetwork, selectNetwork, isNotHaveAccount }: Props): React.ReactElement<Props> {
  let genesisOptions = useGenesisHashOptions();
  if (isNotHaveAccount) {
    genesisOptions = useGenesisHashOptions().slice(0, 1);
  }

  return (
    <KoniMenu
      className={className}
      reference={reference}
    >
      <div className='network-item-list-header'>
        Network
      </div>
      <div className='network-item-list'>
        {genesisOptions.map(({ text, value , networkPrefix, icon, networkName}): React.ReactNode => (
          <div key={value} className='network-item-container' onClick={() => {
            selectNetwork(value, networkPrefix, icon, networkName)
          }}>
            <img src={getLogoByGenesisHash(value)} alt="logo" className={'network-logo'} />

            <span className={value == currentNetwork ? 'koni-network-text__selected': 'koni-network-text'}>{text}</span>
            {value == currentNetwork
              ?
              (
                <img src={check} alt="check" className='checkIcon'/>
              ) : (
                <div className='uncheckedItem'/>
              )
            }
          </div>
        ))}
      </div>
    </KoniMenu>
  );
}

export default React.memo(styled(KoniNetworkMenu)(({ theme }: Props) => `
  margin-top: 60px;
  right: 15px;
  user-select: none;
  border-radius: 8px;

  .network-item-list-header {
    padding: 10px 0;
    width: 350px;
    display: flex;
    justify-content: center;
    font-size: 20px;
    line-height: 32px;
    font-weight: 700;
    border-bottom: 1px solid ${theme.inputBorderColor};
  }

  .network-item-list {
    max-height: 275px;
    overflow-y: auto;
    padding: 10px 10px 10px;
  }

  .network-item-container {
    padding: 5px 0;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
      .koni-network-text {
        color: ${theme.textColor};
      }
    }
  }

  .network-logo {
    min-width: 30px;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    overflow: hidden;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    border: 1px solid #fff;
    background: #fff;
    margin-right: 10px;
  }

  .koni-network-text {
    font-size: 16px;
    line-height: 26px;
    color: ${theme.textColor2};

    &__selected {
      color: ${theme.textColor}
    }
  }

  .checkIcon {
    margin-left: 4px;
  }

  .uncheckedItem {
    width: 14px;
    height: 100%;
    margin-left: 14px;
  }

  .check-radio-wrapper {
    position: relative;
    height: 100%;
    width: 16px;
    display: flex;
    align-items: center;
    margin-right: 11px;
  }

  .check-radio {
    width: 100%;
    height: 16px;
  }

  .check-dot {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: ${theme.checkDotColor};
    border-radius: 50%;
    top: 3px;
    left: 3px;
  }

`));
