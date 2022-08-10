// Copyright 2019-2022 @subwallet/extension-koni-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ExternalRequestPromise, ExternalRequestPromiseStatus, ResponseNftTransferExternal, ResponseNftTransferLedger, ResponseNftTransferQr, ResponseTransferExternal, ResponseTransferLedger, ResponseTransferQr, TransferErrorCode, TransferStep } from '@subwallet/extension-base/background/KoniTypes';
import { LedgerState, QrState, Web3Transaction } from '@subwallet/extension-base/signers/types';
import LedgerSigner from '@subwallet/extension-base/signers/web3/LedgerSigner';
import QrSigner from '@subwallet/extension-base/signers/web3/QrSigner';
import { anyNumberToBN, parseTxAndSignature } from '@subwallet/extension-koni-base/utils/eth';
import Web3 from 'web3';
import { TransactionConfig, TransactionReceipt } from 'web3-core';

import { getERC20TransactionObject, getEVMTransactionObject } from '../transfer';

interface BaseProps {
  id: string;
  from: string;
  chainId: number;
  networkKey: string;
  web3ApiMap: Record<string, Web3>;
  setState: (promise: ExternalRequestPromise) => void;
  updateState: (promise: Partial<ExternalRequestPromise>) => void;
  callback: (data: ResponseTransferExternal) => void;
}

interface TransferExternalProps extends BaseProps{
  to: string;
  value: string;
  transferAll: boolean;
}

interface TransferNftExternalProps extends Omit<BaseProps, 'callback'>{
  rawTransaction: Record<string, any>;
  callback: (data: ResponseNftTransferExternal) => void;
  isSendingSelf: boolean;
}

interface HandlerTransferExternalProps extends BaseProps{
  transactionObject: TransactionConfig;
  changeValue: string;
}

interface HandlerCreateWeb3TransactionProps {
  web3Api: Web3;
  from: string;
  chainId: number;
  transactionObject: TransactionConfig;
}

// Share function

async function handlerCreateWeb3Transaction ({ chainId,
  from,
  transactionObject,
  web3Api }: HandlerCreateWeb3TransactionProps): Promise<Web3Transaction> {
  const nonce = await web3Api.eth.getTransactionCount(from);

  return {
    nonce: nonce,
    from: from,
    gasPrice: anyNumberToBN(transactionObject.gasPrice).toNumber(),
    gasLimit: anyNumberToBN(transactionObject.gas).toNumber(),
    to: transactionObject.to !== undefined ? transactionObject.to : '',
    value: anyNumberToBN(transactionObject.value).toNumber(),
    data: transactionObject.data ? transactionObject.data : '',
    chainId: chainId
  };
}

// Qr

interface HandlerTransferQrProps extends HandlerTransferExternalProps{
  callback: (data: ResponseTransferQr) => void;
}

async function handleTransferQr ({ callback,
  chainId,
  changeValue,
  from,
  id,
  networkKey,
  setState,
  transactionObject,
  updateState,
  web3ApiMap }: HandlerTransferQrProps) {
  const web3Api = web3ApiMap[networkKey];
  const response: ResponseTransferQr = {
    step: TransferStep.READY,
    errors: [],
    extrinsicStatus: undefined,
    data: {}
  };

  const txObject = await handlerCreateWeb3Transaction({
    from: from,
    chainId: chainId,
    transactionObject: transactionObject,
    web3Api: web3Api
  });

  const qrCallback = ({ qrState }: {qrState: QrState}) => {
    // eslint-disable-next-line node/no-callback-literal
    callback({
      step: TransferStep.SIGNING,
      errors: [],
      extrinsicStatus: undefined,
      data: {},
      qrState: qrState,
      externalState: { externalId: qrState.qrId }
    });
  };

  const qrResolver = () => {
    // eslint-disable-next-line node/no-callback-literal
    callback({
      step: TransferStep.SIGNING,
      isBusy: true
    });
  };

  const signer = new QrSigner({
    callback: qrCallback,
    id,
    setState,
    resolver: qrResolver
  });

  const { signature } = await signer.signTransaction(txObject);

  try {
    const signed = parseTxAndSignature(txObject, signature);

    web3Api.eth.sendSignedTransaction(signed)
      .on('transactionHash', function (hash: string) {
        console.log('transactionHash', hash);
        response.step = TransferStep.READY;
        response.extrinsicHash = hash;
        response.isBusy = true;
        callback(response);
      })
      .on('receipt', function (receipt: TransactionReceipt) {
        response.step = receipt.status ? TransferStep.SUCCESS : TransferStep.ERROR;
        response.txResult = {
          change: changeValue || '0',
          fee: (receipt.gasUsed * receipt.effectiveGasPrice).toString()
        };
        response.isBusy = false;
        updateState({ status: receipt.status ? ExternalRequestPromiseStatus.COMPLETED : ExternalRequestPromiseStatus.FAILED });
        callback(response);
      }).catch((e) => {
        response.step = TransferStep.ERROR;
        response.isBusy = false;
        response.errors?.push({
          code: TransferErrorCode.TRANSFER_ERROR,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
          message: e.message
        });
        updateState({ status: ExternalRequestPromiseStatus.FAILED });
        callback(response);
      });
  } catch (error) {
    response.step = TransferStep.ERROR;
    response.errors?.push({
      code: TransferErrorCode.TRANSFER_ERROR,
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      message: error.message
    });
    response.isBusy = false;
    updateState({ status: ExternalRequestPromiseStatus.FAILED });
    callback(response);
  }
}

interface EVMTransferQrProps extends TransferExternalProps {
  callback: (data: ResponseTransferQr) => void;
}

export async function makeEVMTransferQr ({ callback,
  chainId,
  from,
  id,
  networkKey,
  setState,
  to,
  transferAll,
  updateState,
  value,
  web3ApiMap }: EVMTransferQrProps): Promise<void> {
  const [transactionObject, changeValue] = await getEVMTransactionObject(networkKey, to, value, transferAll, web3ApiMap);

  await handleTransferQr({
    transactionObject,
    changeValue,
    networkKey,
    web3ApiMap,
    callback,
    id,
    setState,
    chainId,
    updateState,
    from
  });
}

interface ERC20TransferQrProps extends TransferExternalProps{
  assetAddress: string;
  callback: (data: ResponseTransferQr) => void;
}

export async function makeERC20TransferQr ({ assetAddress,
  callback,
  chainId,
  from,
  id,
  networkKey,
  setState,
  to,
  transferAll,
  updateState,
  value,
  web3ApiMap }: ERC20TransferQrProps) {
  const [transactionObject, changeValue] = await getERC20TransactionObject(assetAddress, networkKey, from, to, value, transferAll, web3ApiMap);

  await handleTransferQr({
    callback,
    chainId,
    from,
    id,
    setState,
    web3ApiMap,
    changeValue,
    networkKey,
    transactionObject,
    updateState
  });
}

interface TransferNftQrProps extends TransferNftExternalProps {
  callback: (data: ResponseNftTransferQr) => void;
}

export async function handleTransferNftQr ({ callback,
  chainId,
  from,
  id,
  isSendingSelf,
  networkKey,
  rawTransaction,
  setState,
  updateState,
  web3ApiMap }: TransferNftQrProps) {
  const web3Api = web3ApiMap[networkKey];
  const response: ResponseNftTransferQr = {
    isSendingSelf: isSendingSelf
  };

  const txObject: Web3Transaction = await handlerCreateWeb3Transaction({
    chainId: chainId,
    transactionObject: rawTransaction,
    from: from,
    web3Api: web3Api
  });

  const qrCallback = ({ qrState }: {qrState: QrState}) => {
    // eslint-disable-next-line node/no-callback-literal
    callback({
      isSendingSelf: isSendingSelf,
      qrState: qrState,
      externalState: { externalId: qrState.qrId }
    });
  };

  const qrResolver = () => {
    // eslint-disable-next-line node/no-callback-literal
    callback({
      isSendingSelf: isSendingSelf,
      isBusy: true
    });
  };

  const signer = new QrSigner({
    callback: qrCallback,
    id,
    setState,
    resolver: qrResolver
  });

  const { signature } = await signer.signTransaction(txObject);

  try {
    const signed = parseTxAndSignature(txObject, signature);

    web3Api.eth.sendSignedTransaction(signed)
      .on('transactionHash', function (hash: string) {
        console.log('transactionHash', hash);
        response.callHash = signed;
        response.isBusy = true;
        callback(response);
      })
      .on('receipt', function (receipt: TransactionReceipt) {
        response.status = receipt.status;
        response.isBusy = true;
        response.transactionHash = receipt.transactionHash;
        updateState({ status: receipt.status ? ExternalRequestPromiseStatus.COMPLETED : ExternalRequestPromiseStatus.FAILED });
        callback(response);
      }).catch((e) => {
        console.log('Error on transfer nft', (e as Error).message);
        response.txError = true;
        response.status = false;
        updateState({ status: ExternalRequestPromiseStatus.FAILED });
        callback(response);
      });
  } catch (error) {
    response.txError = true;
    response.isBusy = false;
    console.log('Error on transfer nft', (error as Error).message);
    callback(response);
  }
}

// Ledger

interface HandlerTransferLedgerProps extends HandlerTransferExternalProps{
  callback: (data: ResponseTransferLedger) => void;
}

async function handleTransferLedger ({ callback,
  chainId,
  changeValue,
  from,
  id,
  networkKey,
  setState,
  transactionObject,
  updateState,
  web3ApiMap }: HandlerTransferLedgerProps) {
  const web3Api = web3ApiMap[networkKey];
  const response: ResponseTransferLedger = {
    step: TransferStep.READY,
    errors: [],
    extrinsicStatus: undefined,
    data: {}
  };

  const txObject = await handlerCreateWeb3Transaction({
    from: from,
    chainId: chainId,
    transactionObject: transactionObject,
    web3Api: web3Api
  });

  const ledgerCallback = ({ ledgerState }: {ledgerState: LedgerState}) => {
    // eslint-disable-next-line node/no-callback-literal
    callback({
      step: TransferStep.SIGNING,
      errors: [],
      extrinsicStatus: undefined,
      data: {},
      ledgerState: ledgerState,
      externalState: { externalId: ledgerState.ledgerId }
    });
  };

  const signer = new LedgerSigner({
    callback: ledgerCallback,
    id,
    setState
  });

  const { signature } = await signer.signTransaction(txObject);

  try {
    const signed = parseTxAndSignature(txObject, signature);

    web3Api.eth.sendSignedTransaction(signed)
      .on('transactionHash', function (hash: string) {
        console.log('transactionHash', hash);
        response.step = TransferStep.READY;
        response.extrinsicHash = hash;
        callback(response);
      })
      .on('receipt', function (receipt: TransactionReceipt) {
        response.step = receipt.status ? TransferStep.SUCCESS : TransferStep.ERROR;
        response.txResult = {
          change: changeValue || '0',
          fee: (receipt.gasUsed * receipt.effectiveGasPrice).toString()
        };
        updateState({ status: receipt.status ? ExternalRequestPromiseStatus.COMPLETED : ExternalRequestPromiseStatus.FAILED });
        callback(response);
      }).catch((e) => {
        response.step = TransferStep.ERROR;
        response.errors?.push({
          code: TransferErrorCode.TRANSFER_ERROR,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
          message: e.message
        });
        updateState({ status: ExternalRequestPromiseStatus.FAILED });
        callback(response);
      });
  } catch (error) {
    response.step = TransferStep.ERROR;
    response.errors?.push({
      code: TransferErrorCode.TRANSFER_ERROR,
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      message: error.message
    });
    updateState({ status: ExternalRequestPromiseStatus.FAILED });
    callback(response);
  }
}

interface EVMTransferLedgerProps extends TransferExternalProps {
  callback: (data: ResponseTransferLedger) => void;
}

export async function makeEVMTransferLedger ({ callback,
  chainId,
  from,
  id,
  networkKey,
  setState,
  to,
  transferAll,
  updateState,
  value,
  web3ApiMap }: EVMTransferLedgerProps): Promise<void> {
  const [transactionObject, changeValue] = await getEVMTransactionObject(networkKey, to, value, transferAll, web3ApiMap);

  await handleTransferLedger({
    transactionObject,
    changeValue,
    networkKey,
    web3ApiMap,
    callback,
    id,
    setState,
    chainId,
    updateState,
    from
  });
}

interface ERC20TransferLedgerProps extends TransferExternalProps{
  assetAddress: string;
  callback: (data: ResponseTransferLedger) => void;
}

export async function makeERC20TransferLedger ({ assetAddress,
  callback,
  chainId,
  from,
  id,
  networkKey,
  setState,
  to,
  transferAll,
  updateState,
  value,
  web3ApiMap }: ERC20TransferLedgerProps) {
  const [transactionObject, changeValue] = await getERC20TransactionObject(assetAddress, networkKey, from, to, value, transferAll, web3ApiMap);

  await handleTransferLedger({
    callback,
    chainId,
    from,
    id,
    setState,
    web3ApiMap,
    changeValue,
    networkKey,
    transactionObject,
    updateState
  });
}

interface TransferNftLedgerProps extends TransferNftExternalProps {
  callback: (data: ResponseNftTransferLedger) => void;
}

export async function handleTransferNftLedger ({ callback,
  chainId,
  from,
  id,
  isSendingSelf,
  networkKey,
  rawTransaction,
  setState,
  updateState,
  web3ApiMap }: TransferNftLedgerProps) {
  const web3Api = web3ApiMap[networkKey];
  const response: ResponseNftTransferLedger = {
    isSendingSelf: isSendingSelf
  };

  const txObject: Web3Transaction = await handlerCreateWeb3Transaction({
    chainId: chainId,
    transactionObject: rawTransaction,
    from: from,
    web3Api: web3Api
  });

  const ledgerCallback = ({ ledgerState }: {ledgerState: LedgerState}) => {
    // eslint-disable-next-line node/no-callback-literal
    callback({
      isSendingSelf: isSendingSelf,
      ledgerState: ledgerState,
      externalState: { externalId: ledgerState.ledgerId }
    });
  };

  const signer = new LedgerSigner({
    callback: ledgerCallback,
    id,
    setState
  });

  const { signature } = await signer.signTransaction(txObject);

  try {
    const signed = parseTxAndSignature(txObject, signature);

    web3Api.eth.sendSignedTransaction(signed)
      .on('transactionHash', function (hash: string) {
        console.log('transactionHash', hash);
        response.callHash = signed;
        callback(response);
      })
      .on('receipt', function (receipt: TransactionReceipt) {
        response.status = receipt.status;
        response.transactionHash = receipt.transactionHash;
        updateState({ status: receipt.status ? ExternalRequestPromiseStatus.COMPLETED : ExternalRequestPromiseStatus.FAILED });
        callback(response);
      }).catch((e) => {
        console.log('Error on transfer nft', (e as Error).message);
        response.txError = true;
        response.status = false;
        updateState({ status: ExternalRequestPromiseStatus.FAILED });
        callback(response);
      });
  } catch (error) {
    response.txError = true;
    console.log('Error on transfer nft', (error as Error).message);
    callback(response);
  }
}
