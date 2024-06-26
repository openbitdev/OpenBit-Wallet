// Copyright 2019-2022 @subwallet/extension-web-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _ChainAsset } from '@subwallet/chain-list/types';
import { AssetSettingUpdateReq } from '@subwallet/extension-base/background/KoniTypes';
import { _ValidateCustomAssetRequest, _ValidateCustomAssetResponse, _ValidateCustomBrc20Request, _ValidateCustomBrc20Response, _ValidateCustomRuneRequest, _ValidateCustomRuneResponse } from '@subwallet/extension-base/services/chain-service/types';

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

export async function validateCustomBrc20 (data: _ValidateCustomBrc20Request): Promise<_ValidateCustomBrc20Response> {
  return sendMessage('pri(chainService.validateCustomBrc20)', data);
}

export async function validateCustomToken (data: _ValidateCustomAssetRequest): Promise<_ValidateCustomAssetResponse> {
  return sendMessage('pri(chainService.validateCustomAsset)', data);
}

export async function validateCustomRune (data: _ValidateCustomRuneRequest): Promise<_ValidateCustomRuneResponse> {
  return sendMessage('pri(chainService.validateCustomRune)', data);
}

export async function resetDefaultNetwork (): Promise<boolean> {
  return sendMessage('pri(chainService.resetDefaultChains)', null);
}

export async function updateAssetSetting (data: AssetSettingUpdateReq): Promise<boolean> {
  return sendMessage('pri(assetSetting.update)', data);
}
