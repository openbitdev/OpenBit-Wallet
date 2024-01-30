// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {sendMessage} from "@subwallet/extension-web-ui/messaging/base";
import {CrowdloanContributionsResponse} from "@subwallet/extension-base/services/subscan-service/types";

export * from "@subwallet/extension-koni-ui/messaging/index";
export async function getCrowdloanContributions (relayChain: string, address: string, page?: number): Promise<CrowdloanContributionsResponse> {
  return sendMessage('pri(crowdloan.getCrowdloanContributions)', { relayChain,
    address,
    page });
}
