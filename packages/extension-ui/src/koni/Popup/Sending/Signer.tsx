// Copyright 2017-2021 @polkadot/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0


import type {DefinitionRpcExt} from '@polkadot/types/types';

import React, {useCallback, useContext, useEffect, useMemo} from 'react';
import styled from 'styled-components';

import {ApiPromise} from '@polkadot/api';

import {assert, isFunction, loggerFormat} from '@polkadot/util';
import {
  QueueTx,
  QueueTxMessageSetStatus,
  QueueTxResult
} from "@polkadot/extension-ui/koni/react-components/Status/types";
import {useApi} from "@polkadot/extension-ui/koni/react-hooks";
import {StatusContext} from "@polkadot/extension-ui/koni/react-components";
import KoniModal from "@polkadot/extension-ui/components/KoniModal";
import AuthTransaction from "@polkadot/extension-ui/koni/Popup/Sending/AuthTransactionBK";
import {ThemeProps} from "@polkadot/extension-ui/types";
import useTranslation from "@polkadot/extension-ui/hooks/useTranslation";

export interface Props extends ThemeProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface ItemState {
  count: number;
  currentItem: QueueTx | null;
  isRpc: boolean;
  isVisible: boolean;
  requestAddress: string | null;
}

const NOOP = () => undefined;

const AVAIL_STATUS = ['queued', 'qr', 'signing'];

async function submitRpc(api: ApiPromise, {
  method,
  section
}: DefinitionRpcExt, values: unknown[]): Promise<QueueTxResult> {
  try {
    const rpc = api.rpc as Record<string, Record<string, (...params: unknown[]) => Promise<unknown>>>;

    assert(isFunction(rpc[section] && rpc[section][method]), `api.rpc.${section}.${method} does not exist`);

    const result = await rpc[section][method](...values);

    console.log('submitRpc: result ::', loggerFormat(result));

    return {
      result,
      status: 'sent'
    };
  } catch (error) {
    console.error(error);

    return {
      error: error as Error,
      status: 'error'
    };
  }
}

async function sendRpc(api: ApiPromise, queueSetTxStatus: QueueTxMessageSetStatus, {
  id,
  rpc,
  values = []
}: QueueTx): Promise<void> {
  if (rpc) {
    queueSetTxStatus(id, 'sending');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {error, result, status} = await submitRpc(api, rpc, values);

    queueSetTxStatus(id, status, result, error);
  }
}

function extractCurrent(txqueue: QueueTx[]): ItemState {
  const available = txqueue.filter(({status}) => AVAIL_STATUS.includes(status));
  const currentItem = available[0] || null;
  let isRpc = false;
  let isVisible = false;

  if (currentItem) {
    if (currentItem.status === 'queued' && !(currentItem.extrinsic || currentItem.payload)) {
      isRpc = true;
    } else if (currentItem.status !== 'signing') {
      isVisible = true;
    }
  }

  return {
    count: available.length,
    currentItem,
    isRpc,
    isVisible,
    requestAddress: (currentItem && currentItem.accountId) || null
  };
}

function Signer({children, className = ''}: Props): React.ReactElement<Props> {
  const {api} = useApi();
  const {t} = useTranslation();
  const {queueSetTxStatus, txqueue} = useContext(StatusContext);

  const {currentItem, isRpc, isVisible, requestAddress} = useMemo(
    () => extractCurrent(txqueue),
    [txqueue]
  );

  useEffect((): void => {
    isRpc && currentItem &&
    sendRpc(api, queueSetTxStatus, currentItem).catch(console.error);
  }, [api, isRpc, currentItem, queueSetTxStatus]);

  const _onCancel = useCallback(
    (): void => {
      if (currentItem) {
        const {id, signerCb = NOOP, txFailedCb = NOOP} = currentItem;

        queueSetTxStatus(id, 'cancelled');
        signerCb(id, null);
        txFailedCb(null);
      }
    },
    [currentItem, queueSetTxStatus]
  );

  return (
    <>
      {children}
      {currentItem && isVisible && (
      // {true && (
        <div className={className}>
          <KoniModal className={'kn-signer-modal'}>
            <div className="kn-l-header">
              <div className="kn-l-header__part-1" />
              <div className="kn-l-header__part-2">
                {t('Authorize Transaction')}
              </div>
              <div className="kn-l-header__part-3">
                <span className={'kn-l-close-btn'} onClick={_onCancel}>{t('Cancel')}</span>
              </div>
            </div>
            <div className="kn-l-body">
              <AuthTransaction
                currentItem={currentItem}
                requestAddress={requestAddress}
              />
            </div>
          </KoniModal>
        </div>
      )}
    </>
  );
}

export default React.memo(styled(Signer)(({ theme }: ThemeProps) => `
  .koni-modal {
    max-width: 460px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .kn-l-header {
    display: flex;
    align-items: center;
    height: 72px;
    box-shadow: ${theme.headerBoxShadow};
  }

  .kn-l-body {
    flex: 1;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .kn-l-header__part-1 {
    flex: 1;
  }

  .kn-l-header__part-2 {
    color: ${theme.textColor};
    font-size: 20px;
    font-weight: 500;
  }

  .kn-l-header__part-3 {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .kn-l-close-btn {
    padding-left: 16px;
    padding-right: 16px;
    height: 40px;
    display: flex;
    align-items: center;
    color: #04C1B7;
    font-weight: 500;
    cursor: pointer;
  }
`));
