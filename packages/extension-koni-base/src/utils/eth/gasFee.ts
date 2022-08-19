// Copyright 2019-2022 @subwallet/extension-koni-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Web3 from 'web3';
import { FeeHistoryResult } from 'web3-eth';

interface BlockInfo {
  number: number;
  baseFeePerGas: number;
  gasUsedRatio: number;
  priorityFeePerGas: number[];
}

interface Web3FeeEstimate {
  slow: number;
  average: number;
  fast: number;
  base: number;
}

const PercentRewards = [25, 50, 75];

const avg = (arr: number[]): number => {
  const sum = arr.reduce((a, v) => a + v);

  return Math.round(sum / arr.length);
};

const formatFeeHistory = (result: FeeHistoryResult) => {
  const historicalBlocks = result.reward.length;
  const oldestBlock = parseInt(result.oldestBlock.toString());
  let blockNum = oldestBlock;
  let index = 0;
  const blocks: BlockInfo[] = [];

  while (blockNum < oldestBlock + historicalBlocks) {
    blocks.push({
      number: blockNum,
      baseFeePerGas: Number(result.baseFeePerGas[index]),
      gasUsedRatio: Number(result.gasUsedRatio[index]),
      priorityFeePerGas: result.reward[index].map((x) => Number(x))
    });
    blockNum += 1;
    index += 1;
  }

  return blocks;
};

export const estimateGasFee = async (web3Api: Web3): Promise<Web3FeeEstimate> => {
  const latestBlockNumber = await web3Api.eth.getBlockNumber();
  const fees = await web3Api.eth.getFeeHistory(4, latestBlockNumber, PercentRewards);
  const latestBlock = await web3Api.eth.getBlock(latestBlockNumber);
  const blocks = formatFeeHistory(fees);

  const slow = avg(blocks.map((b) => b.priorityFeePerGas[0]));
  const average = avg(blocks.map((b) => b.priorityFeePerGas[1]));
  const fast = avg(blocks.map((b) => b.priorityFeePerGas[2]));

  const baseFeePerGas = latestBlock.baseFeePerGas || 0;

  return {
    slow: slow,
    average: average,
    fast: fast,
    base: baseFeePerGas
  };
};
