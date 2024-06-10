// Copyright 2019-2022 @subwallet/extension authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { OpenBitEvmProvider } from '@subwallet/extension-base/page/evm/OpenBitEvmProvider';
import { EvmProvider } from '@subwallet/extension-inject/types';

import Injected from './substrate/Injected';
import { sendMessage } from './message';
import { version } from './params';

// the enable function, called by the dapp to allow access
export async function enable (origin: string): Promise<Injected> {
  await sendMessage('pub(authorize.tabV2)', { origin });

  return new Injected(sendMessage);
}

export function initEvmProvider (): EvmProvider {
  return new OpenBitEvmProvider(sendMessage, version);
}

export * from './message';
export * from './bitcoin/OpenBitProvider';
