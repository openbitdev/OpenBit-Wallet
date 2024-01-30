// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {AuthorizeRequest} from "@subwallet/extension-base/background/types";
import {sendMessage} from "@subwallet/extension-web-ui/messaging/base";

export * from "@subwallet/extension-koni-ui/messaging/confirmation/auth";

export async function subscribeAuthorizeRequestsV2 (cb: (accounts: AuthorizeRequest[]) => void): Promise<AuthorizeRequest[]> {
  return sendMessage('pri(authorize.requestsV2)', null, cb);
}
