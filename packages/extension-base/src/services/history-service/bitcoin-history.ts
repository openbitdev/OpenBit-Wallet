// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _ChainInfo } from '@subwallet/chain-list/types';
import { ChainType, ExtrinsicStatus, ExtrinsicType, TransactionDirection, TransactionHistoryItem } from '@subwallet/extension-base/background/KoniTypes';
import { BitcoinTransferItem } from '@subwallet/extension-base/services/chain-service/handler/bitcoin/strategy/BlockStream/types';

function isSender (address: string, transferItem: BitcoinTransferItem) {
  return transferItem.vin.some((i) => i.prevout.scriptpubkey_address === address);
}

export function parseBitcoinTransferData (address: string, transferItem: BitcoinTransferItem, chainInfo: _ChainInfo): TransactionHistoryItem {
  const chainType = ChainType.BITCOIN;
  const nativeDecimals = chainInfo.bitcoinInfo?.decimals || 8;
  const nativeSymbol = chainInfo.bitcoinInfo?.symbol || '';

  const isCurrentAddressSender = isSender(address, transferItem);

  const sender = isCurrentAddressSender ? address : transferItem.vin[0]?.prevout?.scriptpubkey_address || '';
  const receiver = isCurrentAddressSender ? transferItem.vout[0]?.scriptpubkey_address || '' : address;

  const amountValue = (() => {
    if (isCurrentAddressSender) {
      return (transferItem.vout.find((i) => i.scriptpubkey_address === receiver))?.value || '0';
    }

    return (transferItem.vout.find((i) => i.scriptpubkey_address === address))?.value || '0';
  })();

  return {
    address,
    origin: 'blockstream',
    time: transferItem.status.block_time * 1000,
    chainType,
    type: ExtrinsicType.TRANSFER_BALANCE,
    extrinsicHash: transferItem.txid,
    chain: chainInfo.slug,
    direction: address === sender ? TransactionDirection.SEND : TransactionDirection.RECEIVED,
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
      value: `${amountValue}`,
      decimals: nativeDecimals,
      symbol: nativeSymbol
    },
    status: transferItem.status.confirmed ? ExtrinsicStatus.SUCCESS : ExtrinsicStatus.FAIL
  };
}
