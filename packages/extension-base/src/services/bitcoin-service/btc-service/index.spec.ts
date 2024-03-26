

import { BTC_API_CHAIN_MAP } from '@subwallet/extension-base/services/bitcoin-service/btc-service/btc-chain-map';

import { BTCService } from './index';

jest.setTimeout(60000);

describe('SubscanService', () => {
  let btcService: BTCService;

  beforeAll(() => {
    btcService = new BTCService(BTC_API_CHAIN_MAP);
  });

  it('BTC service', async () => {
    const rs = await Promise.all([
        btcService.getAddressUTXO('testnet','tb1q8n62n0vst8t3x6zt9svfg0afyxanuzyhazqnwh'),
    ]);

    console.log(rs);
  });
});
