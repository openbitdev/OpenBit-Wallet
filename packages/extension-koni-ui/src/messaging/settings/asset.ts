// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _ChainAsset } from '@subwallet/chain-list/types';
import { AssetSettingUpdateReq } from '@subwallet/extension-base/background/KoniTypes';
import { _ValidateCustomAssetRequest, _ValidateCustomAssetResponse, _ValidateCustomRuneRequest, _ValidateCustomRuneResponse } from '@subwallet/extension-base/services/chain-service/types';

import { sendMessage } from '../base';

export async function getSupportedContractTypes (): Promise<string[]> {
  return sendMessage('pri(chainService.getSupportedContractTypes)', null);
}

export async function upsertCustomToken (data: _ChainAsset): Promise<boolean> {
  return sendMessage('pri(chainService.upsertCustomAsset)', data);
}

export async function deleteCustomAssets (assetSlug: string): Promise<boolean> {
  return sendMessage('pri(chainService.deleteCustomAsset)', assetSlug);
}

export async function validateCustomRune (data: _ValidateCustomRuneRequest): Promise<_ValidateCustomRuneResponse> {
  return sendMessage('pri(chainService.validateCustomRune)', data);
}

export async function validateCustomToken (data: _ValidateCustomRuneRequest): Promise<_ValidateCustomRuneResponse> {
  return sendMessage('pri(chainService.validateCustomRune)', data);
}

export async function resetDefaultNetwork (): Promise<boolean> {
  return sendMessage('pri(chainService.resetDefaultChains)', null);
}

export async function updateAssetSetting (data: AssetSettingUpdateReq): Promise<boolean> {
  return sendMessage('pri(assetSetting.update)', data);
}
