// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { getTransferableBitcoinUtxos } from '@subwallet/extension-base/services/balance-service/helpers/balance/bitcoin';
import { _BitcoinApi } from '@subwallet/extension-base/services/chain-service/types';
import { BitcoinFeeInfo, BitcoinFeeRate, GetFeeFunction, TransactionFee } from '@subwallet/extension-base/types';
import { combineBitcoinFee, determineUtxosForSpend, determineUtxosForSpendAll, getId } from '@subwallet/extension-base/utils';
import { keyring } from '@subwallet/ui-keyring';
import BigN from 'bignumber.js';
import { Network, Psbt } from 'bitcoinjs-lib';

interface TransferBitcoinProps extends TransactionFee {
  bitcoinApi: _BitcoinApi;
  chain: string;
  from: string;
  getChainFee: GetFeeFunction;
  to: string;
  transferAll: boolean;
  value: string;
  network: Network
}

export async function getBitcoinTransactionObject ({ bitcoinApi,
  chain,
  feeCustom: _feeCustom,
  feeOption,
  from,
  getChainFee,
  network,
  to,
  transferAll,
  value }: TransferBitcoinProps): Promise<[Psbt, string]> {
  const id = getId();
  const feeCustom = _feeCustom as BitcoinFeeRate;
  const feeInfo = await getChainFee(id, chain, 'bitcoin') as BitcoinFeeInfo;
  const bitcoinFee = combineBitcoinFee(feeInfo, feeOption, feeCustom);
  const utxos = await getTransferableBitcoinUtxos(bitcoinApi, from);

  try {
    const amountValue = parseFloat(value);

    const determineUtxosArgs = {
      amount: amountValue,
      feeRate: bitcoinFee.feeRate,
      recipient: to,
      sender: from,
      utxos
    };

    const { fee, inputs, outputs } = transferAll
      ? determineUtxosForSpendAll(determineUtxosArgs)
      : determineUtxosForSpend(determineUtxosArgs);

    console.log(inputs, outputs);
    console.log(inputs, inputs.reduce((v, i) => v + i.value, 0));
    console.log(outputs, (outputs as Array<{value: number}>).reduce((v, i) => v + i.value, 0));
    console.log(fee, bitcoinFee);

    const pair = keyring.getPair(from);
    const tx = new Psbt({ network });
    let transferAmount = new BigN(0);

    for (const input of inputs) {
      if (pair.type === 'bitcoin-44' || pair.type === 'bittest-44') {
        const hex = await bitcoinApi.api.getTxHex(input.txid);

        tx.addInput({
          hash: input.txid,
          index: input.vout,
          nonWitnessUtxo: Buffer.from(hex, 'hex')
        });
      } else {
        tx.addInput({
          hash: input.txid,
          index: input.vout,
          witnessUtxo: {
            script: pair.bitcoin.output,
            value: input.value
          }
        });
      }
    }

    for (const output of outputs) {
      tx.addOutput({
        address: output.address || from,
        value: output.value
      });

      if (output.address === to) {
        transferAmount = transferAmount.plus(output.value);
      }
    }

    console.log(inputs, inputs.reduce((v, i) => v + i.value, 0));
    console.log(outputs, (outputs as Array<{value: number}>).reduce((v, i) => v + i.value, 0));
    console.log(fee, bitcoinFee);

    console.log('Transfer Amount:', transferAmount.toString());

    return [tx, transferAmount.toString()];
  } catch (e) {
    const error = e as Error;

    throw new Error(`Failed to get Bitcoin transaction object: ${error.message}`);
  }
}
