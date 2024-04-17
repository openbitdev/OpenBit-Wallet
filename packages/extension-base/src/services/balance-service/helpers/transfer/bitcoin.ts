// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

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
  const utxos = await bitcoinApi.api.getUtxos(from);

  try {
    const amountValue = parseFloat(value);

    const determineUtxosArgs = {
      amount: amountValue,
      feeRate: bitcoinFee.feeRate,
      recipient: to,
      utxos
    };

    const { fee, inputs, outputs } = transferAll
      ? determineUtxosForSpendAll(determineUtxosArgs)
      : determineUtxosForSpend(determineUtxosArgs);

    const pair = keyring.getPair(from);
    const tx = new Psbt({ network });
    const transferAmount = new BigN(0);

    for (const input of inputs) {
      tx.addInput({
        hash: input.txid,
        index: input.vout,
        witnessUtxo: {
          script: pair.bitcoin.output,
          value: input.value
        }
      });

      transferAmount.plus(input.value);
    }

    for (const output of outputs) {
      tx.addOutput({
        address: output.address || from,
        value: output.value
      });

      if (output.address) {
        transferAmount.minus(output.value);
      }
    }

    transferAmount.minus(fee);

    console.log('Transfer Amount:', transferAmount.toString());

    return [tx, transferAmount.toString()];
  } catch (e) {
    const error = e as Error;

    throw new Error(`Failed to get Bitcoin transaction object: ${error.message}`);
  }
}
