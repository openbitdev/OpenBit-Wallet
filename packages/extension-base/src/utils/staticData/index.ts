// Copyright 2019-2022 @subwallet/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import buyServiceInfos from './buyServiceInfos';
import buyTokenConfigs from './buyTokenConfigs';
import chains from './chains';
import crowdloanFunds from './crowdloanFunds';
import marketingCampaigns from './marketingCampaigns';
import termAndCondition from './termAndCondition';

export enum StaticKey {
  BUY_SERVICE_INFOS = 'buy-service-infos',
  CHAINS = 'chains',
  MARKETING_CAMPAINGS = 'marketing-campaigns',
  CROWDLOAN_FUNDS = 'crowdloan-funds',
  TERM_AND_CONDITION = 'term-and-condition',
  BUY_TOKEN_CONFIGS = 'buy-token-configs'
}

export const staticData: Record<StaticKey, string> = {
  [StaticKey.CHAINS]: chains,
  [StaticKey.BUY_SERVICE_INFOS]: buyServiceInfos,
  [StaticKey.CROWDLOAN_FUNDS]: crowdloanFunds,
  [StaticKey.MARKETING_CAMPAINGS]: marketingCampaigns,
  [StaticKey.TERM_AND_CONDITION]: termAndCondition,
  [StaticKey.BUY_TOKEN_CONFIGS]: buyTokenConfigs
};
