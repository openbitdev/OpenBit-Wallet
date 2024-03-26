// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0
export const HIRO_API_CHAIN_MAP: Record<string, string> = {
  mainnet:'mainnet',
  testnet:'testnet',
  
};

/**
 * Map for token self-activation feature
 */
export const HIRO_BALANCE_CHAIN_MAP: Record<string, string> = {
  mainnet:'mainnet',
  testnet:'testnet',
};

export const HIRO_BALANCE_CHAIN_MAP_REVERSE = Object.fromEntries(Object.entries(HIRO_BALANCE_CHAIN_MAP).map(([k, v]) => [v, k]));
