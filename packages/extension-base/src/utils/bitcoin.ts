// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { BTC_DUST_AMOUNT } from '@subwallet/extension-base/constants';
import { BitcoinFeeInfo, BitcoinFeeRate, BitcoinTx, DetermineUtxosForSpendArgs, FeeOption, InsufficientFundsError, UtxoResponseItem } from '@subwallet/extension-base/types';
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
export function getSpendableAmount ({ feeRate,
  recipients,
  sender,
  utxos }: {
  utxos: UtxoResponseItem[];
  feeRate: number;
  recipients: string[];
  sender: string;
}) {
  const balance = utxos.map((utxo) => utxo.value).reduce((prevVal, curVal) => prevVal + curVal, 0);

  const size = getSizeInfo({
    inputLength: utxos.length,
    recipients,
    sender
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
export function filterUneconomicalUtxos ({ feeRate,
  recipients,
  sender,
  utxos }: {
  utxos: UtxoResponseItem[];
  feeRate: number;
  sender: string;
  recipients: string[];
}) {
  const { spendableAmount: fullSpendableAmount } = getSpendableAmount({
    utxos,
    feeRate,
    recipients,
    sender
  });

  const addressInfo = validateBitcoinAddress(sender) ? getBitcoinAddressInfo(sender) : null;
  const inputAddressTypeWithFallback = addressInfo ? addressInfo.type : BitcoinAddressType.p2wpkh;

  return utxos
    .filter((utxo) => utxo.value >= BTC_DUST_AMOUNT[inputAddressTypeWithFallback])
    .filter((utxo) => {
      // calculate spendableAmount without that utxo.
      const { spendableAmount } = getSpendableAmount({
        utxos: utxos.filter((u) => u.txid !== utxo.txid),
        feeRate,
        recipients,
        sender
      });

      // if spendable amount becomes bigger, do not use that utxo
      return spendableAmount.toNumber() < fullSpendableAmount.toNumber();
    });
}

// Source: https://github.com/leather-wallet/extension/blob/dev/src/app/common/transactions/bitcoin/utils.ts
export function getSizeInfo (payload: {
  inputLength: number;
  recipients: string[];
  sender: string;
}) {
  const { inputLength, recipients, sender } = payload;
  const senderInfo = validateBitcoinAddress(sender) ? getBitcoinAddressInfo(sender) : null;
  const inputAddressTypeWithFallback = senderInfo ? senderInfo.type : BitcoinAddressType.p2wpkh;
  const outputMap: Record<string, number> = {};

  for (const recipient of recipients) {
    const recipientInfo = validateBitcoinAddress(recipient) ? getBitcoinAddressInfo(recipient) : null;
    const outputAddressTypeWithFallback = recipientInfo ? recipientInfo.type : BitcoinAddressType.p2wpkh;
    const outputKey = outputAddressTypeWithFallback + '_output_count';

    if (outputMap[outputKey]) {
      outputMap[outputKey]++;
    } else {
      outputMap[outputKey] = 1;
    }
  }

  const txSizer = new BtcSizeFeeEstimator();

  return txSizer.calcTxSize({
    input_script: inputAddressTypeWithFallback,
    input_count: inputLength,
    ...outputMap
  });
}

// https://github.com/leather-wallet/extension/blob/dev/src/app/common/transactions/bitcoin/coinselect/local-coin-selection.ts
export function determineUtxosForSpendAll ({ feeRate,
  recipient,
  sender,
  utxos }: DetermineUtxosForSpendArgs) {
  if (!validateBitcoinAddress(recipient)) {
    throw new Error('Cannot calculate spend of invalid address type');
  }

  const recipients = [recipient];

  const filteredUtxos = filterUneconomicalUtxos({ utxos, feeRate, recipients, sender });

  const sizeInfo = getSizeInfo({
    sender,
    inputLength: filteredUtxos.length,
    recipients
  });

  const amount = filteredUtxos.reduce((acc, utxo) => acc + utxo.value, 0) - Math.ceil(sizeInfo.txVBytes * feeRate);

  if (amount <= 0) {
    throw new InsufficientFundsError();
  }

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
  sender,
  utxos }: DetermineUtxosForSpendArgs) {
  if (!validateBitcoinAddress(recipient)) {
    throw new Error('Cannot calculate spend of invalid address type');
  }

  const orderedUtxos = utxos.sort((a, b) => b.value - a.value);
  const recipients = [recipient, sender];
  const filteredUtxos = filterUneconomicalUtxos({
    utxos: orderedUtxos,
    feeRate,
    recipients,
    sender
  });

  const neededUtxos = [];
  let sum = new BigN(0);
  let sizeInfo = null;

  for (const utxo of filteredUtxos) {
    sizeInfo = getSizeInfo({
      inputLength: neededUtxos.length,
      sender,
      recipients: [recipient, sender]
    });

    const currentValue = new BigN(amount).plus(Math.ceil(sizeInfo.txVBytes * feeRate));

    if (sum.gte(currentValue)) {
      break;
    }

    sum = sum.plus(utxo.value);
    neededUtxos.push(utxo);

    // re calculate size info, some case array end
    sizeInfo = getSizeInfo({
      inputLength: neededUtxos.length,
      sender,
      recipients: [recipient, sender]
    });
  }

  if (!sizeInfo) {
    throw new InsufficientFundsError();
  }

  const fee = Math.ceil(sizeInfo.txVBytes * feeRate);

  const amountLeft = sum.minus(amount).minus(fee);

  if (amountLeft.lte(0)) {
    throw new InsufficientFundsError();
  }

  const outputs = [
    // outputs[0] = the desired amount going to recipient
    { value: amount, address: recipient },
    // outputs[1] = the remainder to be returned to a change address
    { value: amountLeft.toNumber(), address: sender }
  ];

  return {
    filteredUtxos,
    inputs: neededUtxos,
    outputs,
    size: sizeInfo.txVBytes,
    fee
  };
}

// https://github.com/leather-wallet/extension/blob/dev/src/app/query/bitcoin/address/utxos-by-address.hooks.ts
export function filterOutPendingTxsUtxos (address: string, bitcoinTx: BitcoinTx[], utxos: UtxoResponseItem[]): UtxoResponseItem[] {
  const pendingInputs = bitcoinTx.filter((tx) => !tx.status.confirmed).flatMap((tx) => tx.vin.map((input) => input));

  return utxos.filter(
    (utxo) =>
      !pendingInputs.find(
        (input) => input.prevout.scriptpubkey_address === address && input.txid === utxo.txid
      )
  );
}
