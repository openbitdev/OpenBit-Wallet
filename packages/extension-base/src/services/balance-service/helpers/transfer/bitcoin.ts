// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { FeeData } from '@subwallet/extension-base/background/KoniTypes';
import { _BitcoinApi } from '@subwallet/extension-base/services/chain-service/types';
import { Transaction } from 'bitcoinjs-lib';

export async function getBitcoinTransactionObject (
  from: string,
  to: string,
  amount: string,
  transferAll: boolean,
  bitcoinApi: _BitcoinApi
): Promise<[Transaction, string]> {
  try {
    const amountValue = parseFloat(amount);
    const data = JSON.stringify({
      inputs: [
        {
          addresses: [from]
        }
      ],
      outputs: [
        {
          addresses: [to],
          value: amountValue
        }
      ]
    });

    console.log('Data:', data);

    const bitcoinApi = 'https://api.blockcypher.com/v1/btc/test3/txs/new';
    // const bitcoinApitest = 'https://blockstream.info/testnet/api/tx';

    console.log('Bitcoin API:', bitcoinApi);

    const response = await fetch(bitcoinApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    });

    console.log('Response136:', response);

    const transactionObject = await response.json();

    console.log('Response Data 140 :', transactionObject);

    // const transactionObject: Transaction1 = {
    //   block_height: responseData.tx.block_height,
    //   block_index: responseData.tx.block_index,
    //   hash: responseData.tx.hash,
    //   addresses: responseData.tx.addresses,
    //   total: responseData.tx.total,
    //   fees: responseData.tx.fees,
    //   size: responseData.tx.size,
    //   vsize: responseData.tx.vsize,
    //   preference: responseData.tx.preference,
    //   relayed_by: responseData.tx.relayed_by,
    //   received: responseData.tx.received,
    //   ver: responseData.tx.ver,
    //   double_spend: responseData.tx.double_spend,
    //   vin_sz: responseData.tx.vin_sz,
    //   vout_sz: responseData.tx.vout_sz,
    //   confirmations: responseData.tx.confirmations
    // };

    console.log('Transaction Object:', transactionObject);

    const transferAmount = transactionObject.tx.outputs.reduce((acc: number, output: any) => {
      return acc + output.value;
    }, 0).toString();

    console.log('Transfer Amount:', transferAmount);

    return [transactionObject, transferAmount];
  } catch (error) {
    throw new Error(`Failed to get Bitcoin transaction object: ${error}`);
  }
}

export async function getFeeEstimatesFromBlockcypherApi (network: 'main' | 'test3'): Promise<FeeData> {
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
