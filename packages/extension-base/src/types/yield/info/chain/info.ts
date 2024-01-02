// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { YieldPoolType } from '../base';

/**
 * @interface YieldAssetEarningStats
 * @prop {string} slug - Token's slug
 * @prop {number} [apr] - Token's apr
 * @prop {number} [apy] - Token's apy
 * @prop {number} [exchangeRate] - Token's exchangeRate
 * */
export interface YieldAssetEarningStats {
  /** Token's slug */
  slug: string;

  /** Token's apr */
  apr?: number;

  /** Token's apy */
  apy?: number;

  /**
   * @description Token's exchangeRate
   * @example input token amount = reward token amount * exchange rate
   * */
  exchangeRate?: number;
}

/**
 * @interface BaseYieldPoolMetadata
 * @prop {boolean} isAvailable - Is the pool available?
 * @prop {string} inputAsset - Input token (slug)
 * @prop {number} maxCandidatePerFarmer - Max candidates per farmer
 * @prop {number} maxWithdrawalRequestPerFarmer - Max withdrawal request per farmer
 * @prop {string} minJoinPool - Min amount to join pool
 * @prop {number} [farmerCount] - Total farmer
 * @prop {string} [tvl] - Total value staked in pool
 * @prop {number} [totalApy] - Total apy of earning assets
 * @prop {number} [totalApr] - Total apr of earning assets
 * @prop {boolean} allowCancelUnstaking - Allow canceling un-stake
 * */
export interface BaseYieldPoolMetadata {
  /* Common info */

  /** Input token (slug) */
  inputAsset: string; // slug

  /** Is the pool available? */
  isAvailable: boolean;

  /** Max candidate per farmer  */
  maxCandidatePerFarmer: number; // like maxValidatorPerNominator with native staking

  /** Max withdrawal request per farmer  */
  maxWithdrawalRequestPerFarmer: number; // like maxWithdrawalRequestPerValidator with native staking

  /** Min amount to join pool */
  minJoinPool: string;

  /** Total farmer */
  farmerCount?: number;

  /** Total value staked in pool */
  tvl?: string; // in token

  /** Total apy of earning assets */
  totalApy?: number;

  /** Total apr of earning assets */
  totalApr?: number;

  /* Common info */

  /* Special info */

  /** Allow to cancel un-stake */
  allowCancelUnstaking: boolean; // for native staking

  /* Special info */
}

/**
 * @interface NormalYieldPoolMetadata
 * @extends BaseYieldPoolMetadata
 * @prop {number} era - Current era of network
 * @prop {number} unstakingPeriod - Time to wait withdraw un-stake, in hour
 * @prop {number} [inflation] - Inflation rate
 * */
export interface NormalYieldPoolMetadata extends BaseYieldPoolMetadata {
  /* Special info */

  /** Current era of network */
  era: number; // also round for parachains

  /** Time to wait withdraw un-stake, in hour */
  unstakingPeriod: number; // for normal un-stake (not fast un-stake)

  /** Inflation rate */
  inflation?: number; // in %, annually

  /* Special info */
}

/**
 * @interface SpecialYieldPoolMetadata
 * @extends BaseYieldPoolMetadata
 * @prop {number} [era] - Current era of network
 * @prop {number} [unstakingPeriod] - Time to wait withdraw un-stake, in hour
 * @prop {number} [inflation] - Inflation rate
 * @prop {string[]} derivativeAssets - Array of derivative tokens (slug)
 * @prop {string[]} rewardAssets - Array of reward tokens (slug)
 * @prop {string[]} feeAssets - Array of fee tokens (slug)
 * @prop {string} [altInputAssets] - Alt input token (slug) - optional
 * */
export interface SpecialYieldPoolMetadata extends BaseYieldPoolMetadata {
  /* Special info */

  /** Info for asset earning */
  assetEarning: YieldAssetEarningStats[]; // TODO: Special for type

  /** Min amount for withdrawal request */
  minWithdrawal: string;

  /** Array of derivative tokens (slug) */
  derivativeAssets?: string[];

  /** Array of reward tokens (slug) */
  rewardAssets: string[]; // slug

  /** Alt input token (slug) - optional */
  altInputAssets?: string; // TODO

  /**
   * Array of fee tokens (slug)
   * <p>
   * If the pool has more than one token, the mint step can use input token for fee instead native token
   * </p>
   *  */
  feeAssets: string[],

  /* Special info */
}

export type YieldPoolMetadata = NormalYieldPoolMetadata | SpecialYieldPoolMetadata;

/**
 * @interface AbstractYieldPoolInfo
 * @prop {string} slug - Pool's slug
 * @prop {string} chain - Pool's chain
 * @prop {string} type - Pool's type
 * @prop {string} group - Pool's group (by token)
 * @prop {string} description - Pool's description
 * @prop {string} name - Pool's name
 * @prop {string} [logo] - Pool's logo
 * @prop {YieldPoolMetadata} metadata - Pool's metadata
 * */
export interface AbstractYieldPoolInfo {
  /* Common info */

  /** Pool's slug */
  slug: string;

  /** Pool's chain */
  chain: string;

  /** Pool's type */
  type: YieldPoolType;

  /** Pool's group (by token) */
  group: string;

  /** Pool's description */
  description: string;

  /** Pool's name */
  name: string;

  /** Pool's short name */
  shortName: string;

  /** Pool's logo - optional */
  logo?: string;

  /* Common info */

  /* Special info */

  /** Pool's metadata */
  metadata: YieldPoolMetadata;

  /* Special info */
}

/**
 * @interface SpecialYieldPoolInfo
 * @extends AbstractYieldPoolInfo
 * @prop {SpecialYieldPoolMetadata} metadata - Pool's metadata
 * */
export interface SpecialYieldPoolInfo extends AbstractYieldPoolInfo {
  type: YieldPoolType.LIQUID_STAKING | YieldPoolType.LENDING;
  metadata: SpecialYieldPoolMetadata;
}

/**
 * @interface LiquidYieldPoolInfo
 * @extends SpecialYieldPoolInfo
 * @prop {YieldPoolType.LIQUID_STAKING} type - Pool's type
 * */
export interface LiquidYieldPoolInfo extends SpecialYieldPoolInfo {
  type: YieldPoolType.LIQUID_STAKING;
}

/**
 * @interface LendingYieldPoolInfo
 * @extends SpecialYieldPoolInfo
 * @prop {YieldPoolType.LENDING} type - Pool's type
 * */
export interface LendingYieldPoolInfo extends SpecialYieldPoolInfo {
  type: YieldPoolType.LENDING;
}

/**
 * @interface NominationYieldPoolInfo
 * @extends AbstractYieldPoolInfo
 * @prop {YieldPoolType.NOMINATION_POOL} type - Pool's type
 * @prop {NormalYieldPoolMetadata} metadata - Pool's metadata
 * */
export interface NominationYieldPoolInfo extends AbstractYieldPoolInfo {
  type: YieldPoolType.NOMINATION_POOL;
  metadata: NormalYieldPoolMetadata;
}

/**
 * @interface NativeYieldPoolInfo
 * @extends AbstractYieldPoolInfo
 * @prop {YieldPoolType.NATIVE_STAKING} type - Pool's type
 * @prop {NormalYieldPoolMetadata} metadata - Pool's metadata
 * */
export interface NativeYieldPoolInfo extends AbstractYieldPoolInfo {
  type: YieldPoolType.NATIVE_STAKING;
  metadata: NormalYieldPoolMetadata;
}

/**
 * Info of yield pool
 * */
export type YieldPoolInfo = NativeYieldPoolInfo | NominationYieldPoolInfo | LiquidYieldPoolInfo | LendingYieldPoolInfo;

/**
 * @interface YieldAssetExpectedEarning
 * Pool expected return
 * */
export interface YieldAssetExpectedEarning {
  apy?: number,
  rewardInToken?: number
}