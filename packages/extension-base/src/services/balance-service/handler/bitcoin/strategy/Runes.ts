// // Copyright 2019-2022 @subwallet/extension-base
// // SPDX-License-Identifier: Apache-2.0
//
// import { BitcoinAddressSummaryInfo } from '@subwallet/extension-base/services/bitcoin-service/types';
// import { BaseApiRequestStrategy } from '@subwallet/extension-base/strategy/api-request-strategy';
// import { BaseApiRequestContext } from '@subwallet/extension-base/strategy/api-request-strategy/contexts/base';
// import { getRequest } from '@subwallet/extension-base/strategy/api-request-strategy/utils';
//
// export class RunesRequestStrategy extends BaseApiRequestStrategy {
//   private readonly baseUrl: string;
//
//   constructor (url: string) {
//     const context = new BaseApiRequestContext();
//
//     super(context);
//
//     this.baseUrl = url;
//   }
//
//   isRateLimited (): boolean {
//     return false;
//   }
//
//   getUrl (path: string): string {
//     return `${this.baseUrl}/${path}`;
//   }
//
//   getAddressRunesInfo (address: string): Promise<AddressRunesInfo> {
//     return this.addRequest(async () => {
//       const rs = await getRequest(this.getUrl(`/address/${address}`));
//
//       // if (rs.status !== 200) {
//       //   throw new SWError('BTCScanService.getAddressSummaryInfo', await rs.text());
//       // }
//
//       return (await rs.json()) as BitcoinAddressSummaryInfo;
//     }, 0);
//   }
// }
