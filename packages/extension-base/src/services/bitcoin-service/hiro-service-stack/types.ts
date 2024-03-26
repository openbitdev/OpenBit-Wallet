// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

export interface HiroRequest<T> {
  id: number,
  retry: number, // retry < 1 not start, retry === 0 start, retry > 0 number of retry
  status: 'pending' | 'running',
  run: () => Promise<any>;
  resolve: (value: any) => T;
  reject: (error?: any) => void;
}

export interface HiroResponse<T = any> {
  code: number;
  message: string;
  data: T;
}



export interface AccountAsset {
  assetId: string;
  balance: string;
  locked: string;
  reserved: string;
}

export interface StxBalances {
  balance: string;
  total_sent: string;
  total_received: string;
  total_fees_sent: string;
  total_miner_rewards_received: string;
  lock_tx_id: string;
  locked: string;
  lock_height: number;
  burnchain_lock_height: number;
  burnchain_unlock_height: number;
}

export interface AccountSTXBalance {
  balance: string;
  total_sent: string;
  total_received: string;
  total_fees_sent: string;
  total_miner_rewards_received: string;
  lock_tx_id: string;
  locked: string;
  lock_height: number;
  burnchain_lock_height: number;
  burnchain_unlock_height: number;
}

export interface FungibleTokens {
  // Define schema for fungible tokens if needed
}

export interface NonFungibleTokens {
  // Define schema for non-fungible tokens if needed
}

export interface AccountBalance {
  stx: StxBalances;
  fungible_tokens: FungibleTokens;
  non_fungible_tokens: NonFungibleTokens;
}



export interface AccountTransaction {
  tx_id: string;
  nonce: number;
  fee_rate: string;
  sender_address: string;
  sponsored: boolean;
  post_condition_mode: string;
  post_conditions: any[]; 
  anchor_mode: string;
  is_unanchored: boolean;
  block_hash: string;
  parent_block_hash: string;
  block_height: number;
  burn_block_time: number;
  burn_block_time_iso: string;
  parent_burn_block_time: number;
  parent_burn_block_time_iso: string;
  canonical: boolean;
  tx_index: number;
  tx_status: string;
  tx_result: {
    hex: string;
    repr: string;
  };
  microblock_hash: string;
  microblock_sequence: number;
  microblock_canonical: boolean;
  event_count: number;
  events: {
    event_index: number;
    event_type: string;
    tx_id: string;
    asset: {
      asset_event_type: string;
      sender: string;
      recipient: string;
      amount: string;
      memo: string;
    };
  }[];
  execution_cost_read_count: number;
  execution_cost_read_length: number;
  execution_cost_runtime: number;
  execution_cost_write_count: number;
  execution_cost_write_length: number;
  tx_type: string;
  token_transfer: {
    recipient_address: string;
    amount: string;
    memo: string;
  };
}
