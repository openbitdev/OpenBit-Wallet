// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

// Test for index.ts

import { HiroService } from '.';
import { HIRO_API_CHAIN_MAP } from './hiro-chain-map';


jest.setTimeout(60000);

describe('HiroService', () => {
  let hiroService: HiroService;

  beforeAll(() => {
      hiroService = new HiroService(HIRO_API_CHAIN_MAP);
  });

  it('Get balances', async () => {
    const rs = await Promise.all([
      hiroService.getAccountBalences('maintnet','SP3XNK26NKX83VWSB8GA29Q0VXZXCT079K8MW22K7')
    ]);
    console.log(rs);
  });
});
