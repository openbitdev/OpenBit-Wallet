// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

export const BTC_API_CHAIN_MAP: Record<string, string> = {
  mainnet: '',
  testnet: 'testnet'

};

/**
 
Map for token self-activation feature*/
export const BTC_BALANCE_CHAIN_MAP: Record<string, string> = {
  mainnet: '',
  testnet: 'testnet'
};

export const BTC_BALANCE_CHAIN_MAP_REVERSE = Object.fromEntries(Object.entries(BTC_BALANCE_CHAIN_MAP).map(([k, v]) => [v, k]));