import React, {useCallback, useMemo, useState} from 'react';
import styled from 'styled-components';
import {ThemeProps} from "@polkadot/extension-ui/types";
import KoniModal from "@polkadot/extension-ui/components/KoniModal";
import {IconTheme} from "@polkadot/react-identicon/types";
import pencil from '../assets/pencil.svg';
import QRCode from "react-qr-code";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import KoniLink from "@polkadot/extension-ui/components/KoniLink";
import cloneLogo from '../assets/clone.svg';
import useToast from "@polkadot/extension-ui/hooks/useToast";
import useTranslation from "@polkadot/extension-ui/hooks/useTranslation";
import CopyToClipboard from "react-copy-to-clipboard";
import HeaderEditName from "@polkadot/extension-ui/partials/koni/HeaderEditName";
import {editAccount} from "@polkadot/extension-ui/messaging";
import Identicon from "@polkadot/extension-ui/koni/react-components/Identicon";
import {KeypairType} from "@polkadot/util-crypto/types";
import reformatAddress from "@polkadot/extension-ui/util/koni/reformatAddress";
import {getLogoByGenesisHash} from "@polkadot/extension-ui/util/koni/logoByGenesisHashMap";


interface Props extends ThemeProps {
  className?: string;
  reference: React.MutableRefObject<null>;
  closeModal?: () => void;
  accountType?: KeypairType;
  accountName: string | undefined | null;
  address: string;
  networkPrefix: number;
  networkName: string;
  iconTheme: string;
  genesisHash?: any;
}

interface EditState {
  isEditing: boolean;
  toggleActions: number;
}

const subscanByNetworkName: Record<string, string> = {
  'acala': 'https://acala.subscan.io',
  // 'altair': 'https://altair.subscan.io',
  'astar': 'https://astar.subscan.io',
  // 'basilisk': 'https://basilisk.subscan.io',
  'bifrost': 'https://bifrost.subscan.io',
  'calamari': 'https://calamari.subscan.io',
  'clover': 'https://clover.subscan.io',
  // 'genshiro': 'https://genshiro.subscan.io',
  'heiko': 'https://parallel-heiko.subscan.io',
  'hydradx': 'https://hydradx.subscan.io',
  'karura': 'https://karura.subscan.io',
  'khala': 'https://khala.subscan.io',
  'kilt': 'https://spiritnet.subscan.io',
  // 'kintsugi': 'https://kintsugi.subscan.io',
  'kusama': 'https://kusama.subscan.io',
  'moonbeam': 'https://moonbeam.subscan.io',
  'moonriver': 'https://moonriver.subscan.io',
  'parallel': 'https://parallel.subscan.io',
  // 'picasso': 'https://picasso.subscan.io',
  // 'pioneer': 'https://pioneer.subscan.io',
  'polkadot': 'https://polkadot.subscan.io',
  'quartz': 'https://quartz.subscan.io',
  'sakura': 'https://sakura.subscan.io',
  // 'shadow': 'https://shadow.subscan.io',
  'shiden': 'https://shiden.subscan.io',
  'statemine': 'https://statemine.subscan.io',
  // 'statemint': 'https://statemint.subscan.io',
  // 'subsocial': 'https://subsocial.subscan.io',
  // 'zeitgeist': 'https://zeitgeist.subscan.io',
};

function isSupportSubscan(networkName: string): boolean {
  return !!subscanByNetworkName[networkName];
}

function getSubscanUrl(networkName: string, address: string): string {
  return `${subscanByNetworkName[networkName]}/account/${address}`;
}

const toShortAddress = (_address: string | null , halfLength?: number) => {
  const address = (_address || '').toString()

  const addressLength = halfLength ? halfLength : 7

  return address.length > 13 ? `${address.slice(0, addressLength)}…${address.slice(-addressLength)}` : address
}

function BuyToken({
                    className, reference, closeModal,
                    accountType,
                    address,
                    accountName,
                    iconTheme,
                    networkPrefix,
                    networkName,
                    genesisHash
                  }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { show } = useToast();
  const [editedName, setName] = useState<string | undefined | null>(accountName);
  const [{isEditing}, setEditing] = useState<EditState>({ isEditing: false, toggleActions: 0 });

  const theme = (
    accountType === 'ethereum'
      ? 'ethereum'
      : (iconTheme || 'polkadot')
  ) as IconTheme;

  const _toggleEdit = useCallback(
    (): void => {
      setEditing(({ toggleActions }) => ({ isEditing: !isEditing, toggleActions: ++toggleActions }));
    },
    [isEditing]
  );

  const _saveChanges = useCallback(
    (): void => {
      editedName && editAccount(address, editedName)
        .catch(console.error);

      _toggleEdit();
    },
    [editedName, address, _toggleEdit]
  );

  const _onCopy = useCallback(
    () => show(t('Copied')),
    [show, t]
  );

  const formatted = useMemo(() => {
   return reformatAddress(address, networkPrefix, accountType);
  }, [address, networkPrefix, accountType]);

  const _isSupportSubscan = isSupportSubscan(networkName);

  const subscanUrl = _isSupportSubscan
    && getSubscanUrl(networkName, formatted) || '#';

  return (
    <KoniModal className={className} reference={reference}>
      <div className='buy-token-container'>
        <div className='buy-token-header'>
          <FontAwesomeIcon
            className='close-modal-btn__icon'
            icon={faTimes}
            onClick={closeModal}
          />
        </div>
        <div className='koni-buy-token-content'>
          <Identicon
            className='koni-buy-token-account-logo'
            iconTheme={theme}
            isExternal={false}
            prefix={networkPrefix}
            value={formatted}
            size={54}
          />
          <div className='koni-buy-token-name'>
            <div className='koni-buy-token-name__text'>
              {accountName}
            </div>
            <div className='koni-buy-token-name__edit-btn' onClick={_toggleEdit}>
              <img src={pencil} alt="edit"/>
            </div>
            {isEditing && (
              <HeaderEditName address={address} isFocused label={' '} onBlur={_saveChanges} onChange={setName} className='edit-name'/>
            )}
          </div>
          <div className='koni-buy-token-qr-code'>
            <QRCode value={formatted} size={140}/>
          </div>
          <CopyToClipboard text={formatted || ''}>
            <div className='koni-buy-token-address' onClick={_onCopy}>
              <div className='koni-buy-token-address__text'>
                {genesisHash && <img src={getLogoByGenesisHash(genesisHash)} alt="logo" className={'koni-network-logo'} />}
                {toShortAddress(formatted, 13)}
                <img src={cloneLogo} alt="clone" className='clone-logo'/>
              </div>
            </div>
          </CopyToClipboard>

          {_isSupportSubscan ? (
            <a className='koni-buy-token-button' href={subscanUrl} target="_blank">
              <div className='koni-buy-token-button__text'>
                {t<string>('View Account on Subscan')}
              </div>
            </a>
          ) : (
            <span className='koni-buy-token-button -disabled'>
              <div className='koni-buy-token-button__text'>
                {t<string>('View Account on Subscan')}
              </div>
            </span>
          )}

          <KoniLink className='koni-buy-token-button' to={`/account/export/${formatted}`}>
            <div className='koni-buy-token-button__text'>
              {t<string>('Export Private Key')}
            </div>
          </KoniLink>
        </div>
      </div>
    </KoniModal>
  );
}

export default styled(BuyToken)(({theme}: ThemeProps) => `
  .koni-modal {
    max-width: 460px;
  }

  .buy-token-container {
    position: relative;
  }
  .buy-token-header {
    position: absolute;
    top: -5px;
    right: -5px;
    cursor: pointer;
  }

  .close-modal-btn {
    cursor: pointer;

    &__icon {
      color: ${theme.textColor};
    }
  }

  .koni-buy-token-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .koni-buy-token-account-logo {
    margin-top: 11px;
    width: 54px;
    height: 54px;
  }

  .koni-network-logo {
    width: 24px;
    height: 24px;
    border: 1px solid #fff;
    border-radius: 50%;
    margin-right: 10px;
  }

  .koni-buy-token-name {
    margin-top: 3px;
    display: flex;
    align-items: center;
    position: relative;

    &__text {
      font-size: 18px;
      line-height: 30px;
      font-weight: 500;
      margin-right: 5px;
      max-width: 200px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    &__edit-btn {
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }

  .koni-buy-token-qr-code {
    margin: 20px 0;
    border: 2px solid #fff;
  }

  .koni-buy-token-address {
    border-radius: 8px;
    background-color: ${theme.backgroundAccountAddress};
    width: 100%;
    margin-bottom: 15px;
    cursor: pointer;

    &__text {
      font-size: 15px;
      line-height: 26px;
      color: ${theme.textColor2};
      max-width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding: 11px 43px 11px 43px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .clone-logo {
    padding-left: 10px;
  }

  .koni-buy-token-button {
    width: 320px;
    padding: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.buttonBackground1};
    border-radius: 8px;
    margin-bottom: 10px;
    cursor: pointer;
    text-decoration: none;

    &__text {
      font-size: 16px;
      line-height: 26px;
      font-weight: 500;
      color: ${theme.textColor3};
    }
  }

  .koni-buy-token-button.-disabled {
    cursor: not-allowed;

    .koni-buy-token-button__text {
      opacity: 0.5;
    }
  }

  .edit-name {
    position: absolute;
    flex: 1;
    left: calc(50% - 120px);
    top: -5px;
    width: 240px;
    display: flex;
    align-items: center;
    z-index: 1050;
    > div {
      margin-top: 0;
      width: 100%
    }

    input {
      height: 32px;
    }
  }
`);
