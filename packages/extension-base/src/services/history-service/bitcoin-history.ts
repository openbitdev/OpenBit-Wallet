// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _ChainInfo } from '@subwallet/chain-list/types';
import { ChainType, ExtrinsicStatus, TransactionHistoryItem } from '@subwallet/extension-base/background/KoniTypes';
import {  TransferItem } from '@subwallet/extension-base/services/bitcoin-service/btc-service/types';





export function parseBitcoinTransferData(address: string, transferItem: TransferItem, chainInfo: _ChainInfo): TransactionHistoryItem {
  const chainType = chainInfo.substrateInfo ? ChainType.BITCOIN : ChainType.EVM;
  const nativeDecimals = chainType === ChainType.BITCOIN ? 8 : 18;
  const nativeSymbol = chainType === ChainType.BITCOIN ? 'BTC' : 'ETH';
  const sender = transferItem.vin.length > 0 ? transferItem.vin[0].prevout.scriptpubkey_address : '';
  const receiver = transferItem.vout.length > 0 ? transferItem.vout[0].scriptpubkey_address : '';

  return {
    address,
    chainType,
    fee: {
      value: transferItem.fee,
      decimals: nativeDecimals,
      symbol: nativeSymbol
    },
    from: sender,
    to: receiver,
    time: transferItem.status.block_time * 1000,
    blockNumber: transferItem.status.block_height,
    blockHash: transferItem.status.block_hash,
    amount: {
      value: transferItem.vout.reduce((total, output) => total + output.value, 0).toString(),
      decimals: nativeDecimals,
      symbol: nativeSymbol
    },
    status: transferItem.status.confirmed ?  ExtrinsicStatus.SUCCESS : ExtrinsicStatus.FAIL,

}
