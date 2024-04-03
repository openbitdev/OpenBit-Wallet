// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { _ChainInfo } from '@subwallet/chain-list/types';
import { ExternalRequestPromise, ExternalRequestPromiseStatus, FeeData, FeeResult, HandleBasicTx, TransactionResponse } from '@subwallet/extension-base/background/KoniTypes';
import { getERC20Contract } from '@subwallet/extension-base/koni/api/tokens/evm/web3';
import { _BALANCE_PARSING_CHAIN_GROUP, EVM_REFORMAT_DECIMALS } from '@subwallet/extension-base/services/chain-service/constants';
import { _ERC721_ABI } from '@subwallet/extension-base/services/chain-service/helper';
import { _BitcoinApi, _EvmApi } from '@subwallet/extension-base/services/chain-service/types';
import { calculateGasFeeParams } from '@subwallet/extension-base/services/fee-service/utils';
import BigN from 'bignumber.js';
import { Transaction } from 'bitcoinjs-lib';
import { Input, Output } from 'bitcoinjs-lib/src/transaction';
import { TransactionConfig, TransactionReceipt } from 'web3-core';

import { hexToBn } from '@polkadot/util';

interface HandleTransferBalanceResultProps {
  callback: HandleBasicTx;
  changeValue: string;
  networkKey: string;
  receipt: TransactionReceipt;
  response: TransactionResponse;
  updateState?: (promise: Partial<ExternalRequestPromise>) => void;
}

export const handleTransferBalanceResult = ({ callback,
  changeValue,
  networkKey,
  receipt,
  response,
  updateState }: HandleTransferBalanceResultProps) => {
  response.status = true;
  let fee: string;

  if (_BALANCE_PARSING_CHAIN_GROUP.bobabeam.indexOf(networkKey) > -1) {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    fee = hexToBn(receipt.l1Fee || '0x0').add(hexToBn(receipt.l2BobaFee || '0x0')).toString();
  } else {
    fee = (receipt.gasUsed * receipt.effectiveGasPrice).toString();
  }

  response.txResult = {
    change: changeValue || '0',
    fee
  };
  updateState && updateState({ status: receipt.status ? ExternalRequestPromiseStatus.COMPLETED : ExternalRequestPromiseStatus.FAILED });
  callback(response);
};

export async function getEVMTransactionObject (
  chainInfo: _ChainInfo,
  from: string,
  to: string,
  value: string,
  transferAll: boolean,
  evmApiMap: Record<string, _EvmApi>
): Promise<[TransactionConfig, string]> {
  const networkKey = chainInfo.slug;
  const web3Api = evmApiMap[networkKey];

  const priority = await calculateGasFeeParams(web3Api, networkKey);

  const transactionObject = {
    to: to,
    value: value,
    from: from,
    gasPrice: priority.gasPrice,
    maxFeePerGas: priority.maxFeePerGas?.toString(),
    maxPriorityFeePerGas: priority.maxPriorityFeePerGas?.toString()
  } as TransactionConfig;

  const gasLimit = await web3Api.api.eth.estimateGas(transactionObject);

  transactionObject.gas = gasLimit;

  let estimateFee: BigN;

  if (priority.baseGasFee) {
    const maxFee = priority.maxFeePerGas;

    estimateFee = maxFee.multipliedBy(gasLimit);
  } else {
    estimateFee = new BigN(priority.gasPrice).multipliedBy(gasLimit);
  }

  transactionObject.value = transferAll ? new BigN(value).minus(estimateFee).toString() : value;

  if (EVM_REFORMAT_DECIMALS.acala.includes(networkKey)) {
    const numberReplace = 18 - 12;

    transactionObject.value = transactionObject.value.substring(0, transactionObject.value.length - 6) + new Array(numberReplace).fill('0').join('');
  }

  return [transactionObject, transactionObject.value.toString()];
}

export async function getBitcoinTransactionObject (
  from: string,
  to: string,
  amount: string,
  transferAll: boolean,
  bitcoinApi: Record<string, _BitcoinApi> // Change type to string
): Promise<[Transaction, string]> { // Change return type to [Transaction, string]
  try {
    const requestBody = {
      inputs: [{ addresses: [from] }],
      outputs: [{ addresses: [to], value: parseInt(amount) }]
    };
    console.log('requestBody', requestBody)
    const bitcoinApi = 'https://api.blockcypher.com/v1/btc/test/txs';
    console.log('bitcoinApi', requestBody)

    const response = await fetch(bitcoinApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

     console.log('responseresponse', response.json())
    if (response.ok) {
      const responseData = await response.json();
      // Create Transaction object
      const transactionObject = buildBitcoinTransaction(responseData);
      const transferAmount = responseData.outputs[0].value.toString();

      return [transactionObject, transferAmount];
    } else {
      throw new Error('Failed to get Bitcoin transaction object: Unexpected response from API');
    }
  } catch (error) {
    throw new Error('Failed to get Bitcoin transaction object: ' );
  }
}

function buildBitcoinTransaction (responseData: any): Transaction {
  // Assuming responseData contains necessary transaction information
  // Build the Transaction object here based on the responseData
  const transaction = new Transaction();

  // Assuming responseData has properties corresponding to Transaction fields
  transaction.version = responseData.version;
  transaction.locktime = responseData.locktime;

  // Map input and output data to Input and Output objects
  responseData.vin.forEach((inputData: any) => {
    const input: Input = {
      hash: Buffer.from(inputData.txid, 'hex'), // Assuming txid is provided in hexadecimal format
      index: inputData.vout,
      script: Buffer.from(inputData.scriptSig.hex, 'hex'), // Assuming scriptSig.hex is provided in hexadecimal format
      sequence: inputData.sequence,
      witness: [] // Initialize empty witness array
      // value: inputData.value // Add value property to Input object
    };

    transaction.ins.push(input);
  });

  responseData.vout.forEach((outputData: any) => {
    const output: Output = {
      script: Buffer.from(outputData.scriptPubKey.hex, 'hex'), // Assuming scriptPubKey.hex is provided in hexadecimal format
      value: outputData.value
    };

    transaction.outs.push(output);
  });

  return transaction;
}

export async function getFeeEstimatesFromBlockcypherApi(network: 'main' | 'test3'): Promise<FeeData> {
  try {
    const url = `https://api.blockcypher.com/v1/btc/${network}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch fee estimates from Blockcypher API');
    }

    const responseData = await response.json();
    const { high_fee_per_kb, low_fee_per_kb, medium_fee_per_kb } = responseData;

    const feeData: FeeData = {
      symbol: '', 
      decimals: 0,
      value: '', 
      tooHigh: false,
      slow: low_fee_per_kb / 1000,
      medium: medium_fee_per_kb / 1000,
      fast: high_fee_per_kb / 1000
    };

    return feeData;
  } catch (error) {
    throw new Error('Failed to get fee estimates from Blockcypher API: ');
  }
}


export async function getERC20TransactionObject (
  assetAddress: string,
  chainInfo: _ChainInfo,
  from: string,
  to: string,
  value: string,
  transferAll: boolean,
  evmApiMap: Record<string, _EvmApi>
): Promise<[TransactionConfig, string]> {
  const networkKey = chainInfo.slug;
  const evmApi = evmApiMap[networkKey];
  const erc20Contract = getERC20Contract(networkKey, assetAddress, evmApiMap);

  let freeAmount = new BigN(0);
  let transferValue = value;

  if (transferAll) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    const bal = await erc20Contract.methods.balanceOf(from).call() as string;

    freeAmount = new BigN(bal || '0');
    transferValue = freeAmount.toFixed(0) || '0';
  }

  function generateTransferData (to: string, transferValue: string): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    return erc20Contract.methods.transfer(to, transferValue).encodeABI() as string;
  }

  const transferData = generateTransferData(to, transferValue);
  const [gasLimit, priority] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    erc20Contract.methods.transfer(to, transferValue).estimateGas({ from }) as number,
    calculateGasFeeParams(evmApi, networkKey)
  ]);

  const transactionObject = {
    gas: gasLimit,
    from,
    value: '0',
    to: assetAddress,
    data: transferData,
    gasPrice: priority.gasPrice,
    maxFeePerGas: priority.maxFeePerGas?.toString(),
    maxPriorityFeePerGas: priority.maxPriorityFeePerGas?.toString()
  } as TransactionConfig;

  if (transferAll) {
    transferValue = freeAmount.toFixed(0);
    transactionObject.data = generateTransferData(to, transferValue);
  }

  return [transactionObject, transferValue];
}

export async function getERC721Transaction (
  web3Api: _EvmApi,
  chain: string,
  contractAddress: string,
  senderAddress: string,
  recipientAddress: string,
  tokenId: string): Promise<TransactionConfig> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const contract = new web3Api.api.eth.Contract(_ERC721_ABI, contractAddress);

  const [gasLimit, priority] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    contract.methods.safeTransferFrom(senderAddress, recipientAddress, tokenId).estimateGas({ from: senderAddress }) as number,
    calculateGasFeeParams(web3Api, chain)
  ]);

  return {
    from: senderAddress,
    gasPrice: priority.gasPrice,
    maxFeePerGas: priority.maxFeePerGas?.toString(),
    maxPriorityFeePerGas: priority.maxPriorityFeePerGas?.toString(),
    gas: gasLimit,
    to: contractAddress,
    value: '0x00',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    data: contract.methods.safeTransferFrom(senderAddress, recipientAddress, tokenId).encodeABI()
  };
}
