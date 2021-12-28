import {QueueTx, QueueTxMessageSetStatus} from "@polkadot/extension-ui/koni/react-components/Status/types";
import React, {useCallback, useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {StatusContext} from "@polkadot/extension-ui/koni/react-components";
import {useTranslation} from "react-i18next";
import {useApi, useToggle} from "@polkadot/extension-ui/koni/react-hooks";
import {assert, BN_ZERO} from '@polkadot/util';
import type {SignerOptions} from '@polkadot/api/submittable/types';
import {AddressFlags, AddressProxy} from "@polkadot/extension-ui/koni/Popup/Sending/types";
import Transaction from "@polkadot/extension-ui/koni/Popup/Sending/parts/Transaction";
import Output from "@polkadot/extension-ui/koni/react-components/Output";
import Tip from "@polkadot/extension-ui/koni/Popup/Sending/parts/Tip";
import Address from "@polkadot/extension-ui/koni/Popup/Sending/parts/Address";
import {ApiPromise} from "@polkadot/api";
import {SubmittableExtrinsic} from "@polkadot/api/types";
import {cacheUnlock, extractExternal, handleTxResults} from "@polkadot/extension-ui/koni/Popup/Sending/util";
import {KeyringPair} from "@polkadot/keyring/types";
import {addressEq} from "@polkadot/util-crypto";
import {AccountSigner} from "@polkadot/extension-ui/koni/Popup/Sending/signers";
import {BackgroundWindow} from "@polkadot/extension-base/background/types";
import KoniButton from "@polkadot/extension-ui/components/KoniButton";
import {ThemeProps} from "@polkadot/extension-ui/types";

const bWindow = chrome.extension.getBackgroundPage() as BackgroundWindow;
const {keyring} = bWindow.pdotApi;

interface Props extends ThemeProps {
  className?: string;
  currentItem: QueueTx;
  requestAddress: string;
}

interface InnerTx {
  innerHash: string | null;
  innerTx: string | null;
}

const EMPTY_INNER: InnerTx = { innerHash: null, innerTx: null };

function unlockAccount ({ isUnlockCached, signAddress, signPassword }: AddressProxy): string | null {
  let publicKey;

  try {
    publicKey = keyring.decodeAddress(signAddress as string);
  } catch (error) {
    console.error(error);

    return 'unable to decode address';
  }

  const pair = keyring.getPair(publicKey);

  try {
    pair.decodePkcs8(signPassword);
    isUnlockCached && cacheUnlock(pair);
  } catch (error) {
    console.error(error);

    return (error as Error).message;
  }

  return null;
}

async function signAndSend (queueSetTxStatus: QueueTxMessageSetStatus, currentItem: QueueTx, tx: SubmittableExtrinsic<'promise'>, pairOrAddress: KeyringPair | string, options: Partial<SignerOptions>): Promise<void> {
  currentItem.txStartCb && currentItem.txStartCb();

  try {
    await tx.signAsync(pairOrAddress, options);

    console.info('sending', tx.toHex());

    queueSetTxStatus(currentItem.id, 'sending');

    const unsubscribe = await tx.send(handleTxResults('signAndSend', queueSetTxStatus, currentItem, (): void => {
      unsubscribe();
    }));
  } catch (error) {
    console.error('signAndSend: error:', error);
    queueSetTxStatus(currentItem.id, 'error', {}, error as Error);

    currentItem.txFailedCb && currentItem.txFailedCb(error as Error);
  }
}

async function wrapTx (api: ApiPromise, currentItem: QueueTx, { isMultiCall, multiRoot, proxyRoot, signAddress }: AddressProxy): Promise<SubmittableExtrinsic<'promise'>> {
  return currentItem.extrinsic as SubmittableExtrinsic<'promise'>;
}

async function extractParams (api: ApiPromise, address: string, options: Partial<SignerOptions>): Promise<['signing', string, Partial<SignerOptions>]> {
  const pair = keyring.getPair(address);

  assert(addressEq(address, pair.address), `Unable to retrieve keypair for ${address}`);

  return ['signing', address, { ...options, signer: new AccountSigner(api.registry, pair) }];
}

function tryExtract (address: string | null): AddressFlags {
  try {
    return extractExternal(address);
  } catch {
    return {} as AddressFlags;
  }
}


function AuthTransaction({ className, currentItem, requestAddress }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const { api } = useApi();
  const { queueSetTxStatus } = useContext(StatusContext);
  const [flags, setFlags] = useState(() => tryExtract(requestAddress));
  const [error, setError] = useState<Error | null>(null);
  const [isBusy, setBusy] = useState(false);
  const [isRenderError, toggleRenderError] = useToggle();
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [senderInfo, setSenderInfo] = useState<AddressProxy>(() => ({ isMultiCall: false, isUnlockCached: false, multiRoot: null, proxyRoot: null, signAddress: requestAddress, signPassword: '' }));
  const [{ innerHash }, setCallInfo] = useState<InnerTx>(EMPTY_INNER);
  const [tip, setTip] = useState(BN_ZERO);

  useEffect((): void => {
    setFlags(tryExtract(senderInfo.signAddress));
    setPasswordError(null);
  }, [senderInfo]);

  // when we are sending the hash only, get the wrapped call for display (proxies if required)
  useEffect((): void => {
    const method = currentItem.extrinsic && (currentItem.extrinsic).method;

    setCallInfo(
      method
        ? {
          innerHash: method.hash.toHex(),
          innerTx: null
        }
        : EMPTY_INNER
    );
  }, [api, currentItem, senderInfo]);

  const _unlock = useCallback(
    async (): Promise<boolean> => {
      let passwordError: string | null = null;

      if (senderInfo.signAddress) {
        if (flags.isUnlockable) {
          passwordError = unlockAccount(senderInfo);
        }
      }

      setPasswordError(passwordError);

      return !passwordError;
    },
    [flags, senderInfo, t]
  );

  const _onSend = useCallback(
    async (queueSetTxStatus: QueueTxMessageSetStatus, currentItem: QueueTx, senderInfo: AddressProxy): Promise<void> => {
      if (senderInfo.signAddress) {
        const [tx, [status, pairOrAddress, options]] = await Promise.all([
          wrapTx(api, currentItem, senderInfo),
          extractParams(api, senderInfo.signAddress, { nonce: -1, tip })
        ]);

        queueSetTxStatus(currentItem.id, status);

        await signAndSend(queueSetTxStatus, currentItem, tx, pairOrAddress, options);
      }
    },
    [api, tip]
  );

  const _doStart = useCallback(
    (): void => {
      setBusy(true);

      setTimeout((): void => {
        const errorHandler = (error: Error): void => {
          console.error(error);

          setBusy(false);
          setError(error);
        };

        _unlock()
          .then((isUnlocked): void => {
            if (isUnlocked) {
              _onSend(queueSetTxStatus, currentItem, senderInfo).catch(errorHandler)
            } else {
              setBusy(false);
            }
          })
          .catch((error): void => {
            errorHandler(error as Error);
          });
      }, 0);
    },
    [_onSend, _unlock, currentItem, queueSetTxStatus, senderInfo]
  );

  if (error) {
    console.log('error in Auth::', error);
  }

  return (
    <div className={className}>
      <div className={'kn-l-transaction-info-block'}>
        <Transaction
          accountId={senderInfo.signAddress}
          currentItem={currentItem}
          onError={toggleRenderError}
        />
      </div>

      <Address
        currentItem={currentItem}
        onChange={setSenderInfo}
        onEnter={_doStart}
        passwordError={passwordError}
        requestAddress={requestAddress}
      />

      <Tip className={'kn-l-tip-block'} onChange={setTip} />

      <Output
        isDisabled
        isTrimmed
        className={'kn-l-call-hash'}
        label={t<string>('Call hash')}
        value={innerHash}
        withCopy
      />

      <KoniButton
        className={'kn-l-submit-btn'}
        isBusy={isBusy}
        isDisabled={!senderInfo.signAddress || isRenderError}
        onClick={_doStart}
      >
        {t<string>('Sign and Submit')}
      </KoniButton>
    </div>
  );
}

export default React.memo(styled(AuthTransaction)(({ theme }: ThemeProps) => `
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  padding-top: 25px;

  .kn-l-transaction-info-block {
    margin-bottom: 20px;
  }

  .kn-l-tip-block {
    margin-top: 10px;
  }

  .kn-l-call-hash {
    margin-top: 20px;
  }

  .kn-l-submit-btn {
    margin-top: 20px;
  }
`));
