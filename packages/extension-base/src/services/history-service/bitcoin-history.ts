// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _ChainInfo } from '@subwallet/chain-list/types';
import { ChainType, ExtrinsicStatus, ExtrinsicType, TransactionDirection, TransactionHistoryItem } from '@subwallet/extension-base/background/KoniTypes';
import {  TransferItemBitCoin } from '@subwallet/extension-base/services/bitcoin-service/btc-service/types';
import { isSameAddress } from '@subwallet/extension-base/utils';

export function parseBitcoinTransferData(address: string, transferItem: TransferItemBitCoin, chainInfo: _ChainInfo): TransactionHistoryItem {
  const chainType = ChainType.BITCOIN;
  const nativeDecimals = 8;
  const nativeSymbol = 'BTC';
  const sender = transferItem.vin.length > 0 ? transferItem.vin[0].prevout.scriptpubkey_address : '';
  const receiver = transferItem.vout.length > 0 ? transferItem.vout[0].scriptpubkey_address : '';

  return {
    address,
    origin: 'blockstream',
    time: transferItem.status.block_time * 1000,
    chainType,
    type: ExtrinsicType.TRANSFER_BALANCE ,
    extrinsicHash: transferItem.txid,
    chain: chainInfo.slug,
    direction: isSameAddress(address, sender) ? TransactionDirection.SEND : TransactionDirection.RECEIVED,
    fee: {
      value: transferItem.fee,
      decimals: nativeDecimals,
      symbol: nativeSymbol
    },
    from: sender,
    to: receiver,
   
    blockNumber: transferItem.status.block_height,
    blockHash: transferItem.status.block_hash,
    amount: {
      value: transferItem.vout.reduce((total, output) => total + output.value, 0).toString(),
      decimals: nativeDecimals,
      symbol: nativeSymbol
    },
    status: transferItem.status.confirmed ? ExtrinsicStatus.SUCCESS : ExtrinsicStatus.FAIL
  };
}