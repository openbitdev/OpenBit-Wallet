// Copyright 2019-2022 @polkadot/extension-web-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {_FundStatus} from "@subwallet/chain-list/types";

export * from "@subwallet/extension-koni-ui/types/crowdloan";

export type CrowdloanFundInfo = {
  id: number | null,
  paraId: number | null,
  fundId: string | null,
  status: _FundStatus | null,
  metadata: any | null, // todo: will set type later
  relayChain: string | null,
  auctionIndex: number | null,
  firstPeriod: number | null,
  lastPeriod: number | null,
  startTime: string | null,
  endTime: string | null,
  chain: string | null
}
