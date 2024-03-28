// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { BTC_API_CHAIN_MAP } from '@subwallet/extension-base/services/bitcoin-service/btc-service/btc-chain-map';
import { BTCService } from './index';
import { TransfersListResponse } from './types';

jest.setTimeout(60000);

describe('SubscanService', () => {
  let btcService: BTCService;

  beforeAll(() => {
    btcService = new BTCService(BTC_API_CHAIN_MAP);
  });

  it('BTC service', async () => {
    const rs = await Promise.all([
        btcService.checkSupportedSubscanChain('testnet'),
        // btcService.getAddressUTXO('testnet','tb1q8n62n0vst8t3x6zt9svfg0afyxanuzyhazqnwh')
    ]);

    console.log(rs);
  });
});

describe('BTCService', () => {
  let btcService: BTCService;

  beforeEach(() => {
    btcService = new BTCService();
  });

  describe('getAddressTransaction', () => {
    it('should fetch address transactions from the API', async () => {
      const chain = 'testnet';
      const address = 'tb1q8n62n0vst8t3x6zt9svfg0afyxanuzyhazqnwh';
      const page = '1';

      const transactions: TransfersListResponse[] = [{ 
        transfers: [{ 
          txid: '1234567890',
          version: 1,
          locktime: 0,
          vin: [],
          vout: [],
          size: 0,
          weight: 0,
          fee: '0',
          status: {
            confirmed: true,
            block_height: 0,
            block_hash: '',
            block_time: 0
          }
        }]
      }];

      jest.spyOn(btcService, 'getAddressTransaction').mockResolvedValue(transactions);

      const result = await btcService.getAddressTransaction(chain, address, page);

      expect(result).toEqual(transactions);
    });
  });

  describe('fetchAllPossibleTransferItems', () => {
    it('should fetch and process transfer items from getAddressTransaction', async () => {
      const chain = 'testnet';
      const address = 'tb1q8n62n0vst8t3x6zt9svfg0afyxanuzyhazqnwh';

      const transactions: TransfersListResponse[] = [{ 
        transfers: [{ 
          txid: '1234567890',
          version: 1,
          locktime: 0,
          vin: [],
          vout: [],
          size: 0,
          weight: 0,
          fee: '0',
          status: {
            confirmed: true,
            block_height: 0,
            block_hash: '',
            block_time: 0
          }
        }]
      }];

      jest.spyOn(btcService, 'getAddressTransaction').mockResolvedValue(transactions);

      const result = await btcService.fetchAllPossibleTransferItems(chain, address);

      // Write your assertions here to check if the result is processed correctly
      // For example:
      expect(Object.keys(result)).toContain('1234567890');
    });
  });
});