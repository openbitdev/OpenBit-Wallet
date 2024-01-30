// Copyright 2019-2022 @subwallet/extension-web-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {RequestUnlockDotCheckCanMint} from "@subwallet/extension-base/types";
import {sendMessage} from "@subwallet/extension-koni-ui/messaging";

export * from "@subwallet/extension-koni-ui/messaging/campaigns/index";
export async function unlockDotCheckCanMint (request: RequestUnlockDotCheckCanMint): Promise<boolean> {
  return sendMessage('pri(campaign.unlockDot.canMint)', request);
}

