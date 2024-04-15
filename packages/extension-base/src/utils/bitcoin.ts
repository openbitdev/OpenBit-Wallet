// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { BTC_DUST_AMOUNT } from '@subwallet/extension-base/constants';
import { BitcoinFeeInfo, BitcoinFeeRate, DetermineUtxosForSpendArgs, FeeOption, InsufficientFundsError, UtxoResponseItem } from '@subwallet/extension-base/types';
import { BitcoinAddressType } from '@subwallet/keyring/types';
import { BtcSizeFeeEstimator, getBitcoinAddressInfo, validateBitcoinAddress } from '@subwallet/keyring/utils';
import BigN from 'bignumber.js';

export const combineBitcoinFee = (feeInfo: BitcoinFeeInfo, feeOptions?: FeeOption, feeCustom?: BitcoinFeeRate): BitcoinFeeRate => {
  if (feeOptions && feeOptions !== 'custom') {
    return feeInfo.options?.[feeOptions];
  } else if (feeOptions === 'custom' && feeCustom) {
    return feeCustom;
  } else {
    return feeInfo.options?.[feeInfo.options.default];
  }
};

// https://github.com/leather-wallet/extension/blob/dev/src/app/common/transactions/bitcoin/utils.ts
export function getSpendableAmount ({ address,
  feeRate,
  utxos }: {
  utxos: UtxoResponseItem[];
  feeRate: number;
  address: string;
}) {
  const balance = utxos.map((utxo) => utxo.value).reduce((prevVal, curVal) => prevVal + curVal, 0);

  const size = getSizeInfo({
    inputLength: utxos.length,
    outputLength: 1,
    recipient: address
  });
  const fee = Math.ceil(size.txVBytes * feeRate);
  const bigNumberBalance = new BigN(balance);

  return {
    spendableAmount: BigN.max(0, bigNumberBalance.minus(fee)),
    fee
  };
}

// https://github.com/leather-wallet/extension/blob/dev/src/app/common/transactions/bitcoin/utils.ts
// Check if the spendable amount drops when adding a utxo. If it drops, don't use that utxo.
// Method might be not particularly efficient as it would
// go through the utxo array multiple times, but it's reliable.
export function filterUneconomicalUtxos ({ address,
  feeRate,
  utxos }: {
  utxos: UtxoResponseItem[];
  feeRate: number;
  address: string;
}) {
  const { spendableAmount: fullSpendableAmount } = getSpendableAmount({
    utxos,
    feeRate,
    address
  });

  const addressInfo = validateBitcoinAddress(address) ? getBitcoinAddressInfo(address) : null;
  const outputAddressTypeWithFallback = addressInfo ? addressInfo.type : 'p2wpkh';

  return utxos
    .filter((utxo) => utxo.value >= BTC_DUST_AMOUNT[outputAddressTypeWithFallback])
    .filter((utxo) => {
      // calculate spendableAmount without that utxo.
      const { spendableAmount } = getSpendableAmount({
        utxos: utxos.filter((u) => u.txid !== utxo.txid),
        feeRate,
        address
      });

      // if spendable amount becomes bigger, do not use that utxo
      return spendableAmount.toNumber() < fullSpendableAmount.toNumber();
    });
}

// https://github.com/leather-wallet/extension/blob/dev/src/app/common/transactions/bitcoin/utils.ts
export function getSizeInfo (payload: {
  inputLength: number;
  outputLength: number;
  recipient: string;
}) {
  const { inputLength, outputLength, recipient } = payload;
  const addressInfo = validateBitcoinAddress(recipient) ? getBitcoinAddressInfo(recipient) : null;
  const outputAddressTypeWithFallback = addressInfo ? addressInfo.type : BitcoinAddressType.p2wpkh;

  const txSizer = new BtcSizeFeeEstimator();

  return txSizer.calcTxSize({
    // Only p2wpkh is supported by the wallet
    input_script: 'p2wpkh',
    input_count: inputLength,
    // From the address of the recipient, we infer the output type
    [outputAddressTypeWithFallback + '_output_count']: outputLength
  });
}

// https://github.com/leather-wallet/extension/blob/dev/src/app/common/transactions/bitcoin/coinselect/local-coin-selection.ts
export function determineUtxosForSpendAll ({ amount,
  feeRate,
  recipient,
  utxos }: DetermineUtxosForSpendArgs) {
  if (!validateBitcoinAddress(recipient)) {
    throw new Error('Cannot calculate spend of invalid address type');
  }

  const filteredUtxos = filterUneconomicalUtxos({ utxos, feeRate, address: recipient });

  const sizeInfo = getSizeInfo({
    inputLength: filteredUtxos.length,
    outputLength: 1,
    recipient
  });

  // Fee has already been deducted from the amount with send all
  const outputs = [{ value: amount, address: recipient }];

  const fee = Math.ceil(sizeInfo.txVBytes * feeRate);

  return {
    inputs: filteredUtxos,
    outputs,
    size: sizeInfo.txVBytes,
    fee
  };
}

// https://github.com/leather-wallet/extension/blob/dev/src/app/common/transactions/bitcoin/coinselect/local-coin-selection.ts
export function determineUtxosForSpend ({ amount,
  feeRate,
  recipient,
  utxos }: DetermineUtxosForSpendArgs) {
  if (!validateBitcoinAddress(recipient)) {
    throw new Error('Cannot calculate spend of invalid address type');
  }

  const orderedUtxos = utxos.sort((a, b) => b.value - a.value);

  const filteredUtxos = filterUneconomicalUtxos({
    utxos: orderedUtxos,
    feeRate,
    address: recipient
  });

  const neededUtxos = [];
  let sum = new BigN(0);
  let sizeInfo = null;

  for (const utxo of filteredUtxos) {
    sizeInfo = getSizeInfo({
      inputLength: neededUtxos.length,
      outputLength: 2,
      recipient
    });

    const currentValue = new BigN(amount).plus(Math.ceil(sizeInfo.txVBytes * feeRate));

    if (sum.gte(currentValue)) {
      break;
    }

    sum = sum.plus(utxo.value);
    neededUtxos.push(utxo);
  }

  if (!sizeInfo) {
    throw new InsufficientFundsError();
  }

  const fee = Math.ceil(sizeInfo.txVBytes * feeRate);

  const outputs = [
    // outputs[0] = the desired amount going to recipient
    { value: amount, address: recipient },
    // outputs[1] = the remainder to be returned to a change address
    { value: sum.minus(amount).minus(fee).toNumber() }
  ];

  return {
    filteredUtxos,
    inputs: neededUtxos,
    outputs,
    size: sizeInfo.txVBytes,
    fee
  };
}
