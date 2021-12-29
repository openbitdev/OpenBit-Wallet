import React, {useCallback, useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import {ThemeProps} from "@polkadot/extension-ui/types";
import KoniModal from "@polkadot/extension-ui/components/KoniModal";
import {AccountContext, CurrentAccountContext, SettingsContext} from "@polkadot/extension-ui/components";
import useMetadata from "@polkadot/extension-ui/hooks/useMetadata";
import {IconTheme} from "@polkadot/react-identicon/types";
import {AccountJson, AccountWithChildren} from "@polkadot/extension-base/background/types";
import {Chain} from "@polkadot/extension-chains/types";
import {SettingsStruct} from "@polkadot/ui-settings/types";
import {decodeAddress, encodeAddress} from "@polkadot/util-crypto";
import pencil from '../assets/pencil.svg';
import QRCode from "react-qr-code";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import KoniLink from "@polkadot/extension-ui/components/KoniLink";
import cloneLogo from '../assets/clone.svg';
import useToast from "@polkadot/extension-ui/hooks/useToast";
import useTranslation from "@polkadot/extension-ui/hooks/useTranslation";
import CopyToClipboard from "react-copy-to-clipboard";
import HeaderEditName from "@polkadot/extension-ui/partials/koni/HeaderEditName";
import {editAccount} from "@polkadot/extension-ui/messaging";
import Identicon from "@polkadot/extension-ui/koni/react-components/Identicon";


interface Props extends ThemeProps {
  className?: string;
  reference: React.MutableRefObject<null>;
  onFilter?: (filter: string) => void;
  closeModal?: () => void;
}

interface Recoded {
  formatted: string | null;
  prefix?: number;
}

interface EditState {
  isEditing: boolean;
  toggleActions: number;
}

function findSubstrateAccount(accounts: AccountJson[], publicKey: Uint8Array): AccountJson | null {
  const pkStr = publicKey.toString();

  return accounts.find(({address}): boolean =>
    decodeAddress(address).toString() === pkStr
  ) || null;
}

function recodeAddress(address: string, accounts: AccountWithChildren[], chain: Chain | null, settings: SettingsStruct): Recoded {
  // decode and create a shortcut for the encoded address
  const publicKey = decodeAddress(address);
  // find our account using the actual publicKey, and then find the associated chain
  const account = findSubstrateAccount(accounts, publicKey);
  const prefix = chain ? chain.ss58Format : (settings.prefix === -1 ? 42 : settings.prefix);

  // always allow the actual settings to override the display
  return {
    formatted: account?.type === 'ethereum'
      ? address
      : encodeAddress(publicKey, prefix),
    prefix
  };
}

const defaultRecoded = {formatted: null, prefix: 42};

function BuyToken({className, reference, closeModal}: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const {currentAccount} = useContext(CurrentAccountContext)
  const chain = useMetadata(currentAccount?.genesisHash, true);
  const settings = useContext(SettingsContext);
  const {accounts} = useContext(AccountContext);
  const [{formatted, prefix}, setRecoded] = useState<Recoded>(defaultRecoded);
  const { show } = useToast();
  const [editedName, setName] = useState<string | undefined | null>(currentAccount?.name);
  const [{isEditing}, setEditing] = useState<EditState>({ isEditing: false, toggleActions: 0 });

  const theme = (
    currentAccount?.type === 'ethereum'
      ? 'ethereum'
      : (chain?.icon || 'polkadot')
  ) as IconTheme;

  useEffect((): void => {
    if (!currentAccount?.address) {
      setRecoded(defaultRecoded);

      return;
    }

    setRecoded(
      (
        chain?.definition.chainType === 'ethereum' ||
        currentAccount?.type === 'ethereum'
      )
        ? {formatted: currentAccount?.address}
        : recodeAddress(currentAccount?.address, accounts, chain, settings));
  }, [accounts, currentAccount?.address, chain, settings]);

  const toShortAddress = (_address: string | null , halfLength?: number) => {
    const address = (_address || '').toString()

    const addressLength = halfLength ? halfLength : 7

    return address.length > 13 ? `${address.slice(0, addressLength)}…${address.slice(-addressLength)}` : address
  }

  const _toggleEdit = useCallback(
    (): void => {
      setEditing(({ toggleActions }) => ({ isEditing: !isEditing, toggleActions: ++toggleActions }));
    },
    [isEditing]
  );

  const _saveChanges = useCallback(
    (): void => {
      editedName && currentAccount &&
      editAccount(currentAccount.address, editedName)
        .catch(console.error);

      _toggleEdit();
    },
    [editedName, currentAccount?.address, _toggleEdit]
  );

  const _onCopy = useCallback(
    () => show(t('Copied')),
    [show, t]
  );

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
            prefix={prefix}
            value={formatted || currentAccount?.address}
            size={54}
          />
          <div className='koni-buy-token-name'>
            <div className='koni-buy-token-name__text'>
              {currentAccount?.name}
            </div>
            <div className='koni-buy-token-name__edit-btn' onClick={_toggleEdit}>
              <img src={pencil} alt="edit"/>
            </div>
            {isEditing && (
              <HeaderEditName address={currentAccount?.address} isFocused label={' '} onBlur={_saveChanges} onChange={setName} className='edit-name'/>
            )}
          </div>
          <div className='koni-buy-token-qr-code'>
            {formatted && (
              <QRCode value={formatted} size={140}/>
            )}
          </div>
          <CopyToClipboard text={(formatted && formatted) || ''}>
            <div className='koni-buy-token-address' onClick={_onCopy}>
              <div className='koni-buy-token-address__text'>
                {toShortAddress(formatted, 13)}
                <img src={cloneLogo} alt="clone" className='clone-logo'/>
              </div>
            </div>
          </CopyToClipboard>

          <a className='koni-buy-token-button' href='https://www.subscan.io/' target="_blank">
            <div className='koni-buy-token-button__text'>
              View Account on Subscan
            </div>
          </a>
          <KoniLink className='koni-buy-token-button' to={`/account/export/${currentAccount?.address}`}>
            <div className='koni-buy-token-button__text'>
              Export Account
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

  .koni-buy-token-name {
    margin-top: 3px;
    display: flex;
    align-items: center;
    position: relative;

    &__text {
      font-size: 18px;
      line-height: 30px;
      font-weight: 700;
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
      font-weight: 700;
      color: ${theme.buttonTextColor2};
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
