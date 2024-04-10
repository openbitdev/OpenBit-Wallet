// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0

import { SWError } from '@subwallet/extension-base/background/errors/SWError';
import { BaseApiRequestStrategy } from '@subwallet/extension-base/strategy/api-request-strategy';
import { BaseApiRequestContext } from '@subwallet/extension-base/strategy/api-request-strategy/contexts/base';
import { ApiRequestContext } from '@subwallet/extension-base/strategy/api-request-strategy/types';
import { postRequest } from '@subwallet/extension-base/strategy/api-request-strategy/utils';
import { wait } from '@subwallet/extension-base/utils';

import { SUBSCAN_API_CHAIN_MAP } from './subscan-chain-map';
import { CrowdloanContributionsResponse, ExtrinsicItem, ExtrinsicsListResponse, IMultiChainBalance, RequestBlockRange, RewardHistoryListResponse, SubscanResponse, TransferItem, TransfersListResponse } from './types';

const QUERY_ROW = 100;

interface SubscanError {
  code: number;
  message: string;
}

export class SubscanService extends BaseApiRequestStrategy {
  private subscanChainMap: Record<string, string>;

  constructor (context: ApiRequestContext) {
    super(context);
    this.subscanChainMap = SUBSCAN_API_CHAIN_MAP;
  }

  override isRateLimited (e: Error): boolean {
    const error = JSON.parse(e.message) as SubscanError;

    return error.code === 20008;
  }

  private getApiUrl (chain: string, path: string) {
    const subscanChain = this.subscanChainMap[chain];

    if (!subscanChain) {
      throw new SWError('NOT_SUPPORTED', 'Chain is not supported');
    }

    return `https://${subscanChain}.api.subscan.io/${path}`;
  }

  public checkSupportedSubscanChain (chain: string): boolean {
    return !!this.subscanChainMap[chain];
  }

  public setSubscanChainMap (subscanChainMap: Record<string, string>) {
    this.subscanChainMap = subscanChainMap;
  }

  // Implement Subscan API
  public getMultiChainBalance (address: string): Promise<IMultiChainBalance[]> {
    return this.addRequest(async () => {
      const rs = await postRequest(this.getApiUrl('polkadot', 'api/scan/multiChain/account'), { address });

      if (rs.status !== 200) {
        throw new SWError('SubscanService.getMultiChainBalance', await rs.text());
      }

      const jsonData = (await rs.json()) as SubscanResponse<IMultiChainBalance[]>;

      return jsonData.data;
    }, 1);
  }

  public getCrowdloanContributions (relayChain: string, address: string, page = 0): Promise<CrowdloanContributionsResponse> {
    return this.addRequest<CrowdloanContributionsResponse>(async () => {
      const rs = await postRequest(this.getApiUrl(relayChain, 'api/scan/account/contributions'), {
        include_total: true,
        page,
        row: QUERY_ROW,
        who: address
      });

      if (rs.status !== 200) {
        throw new SWError('SubscanService.getCrowdloanContributions', await rs.text());
      }

      const jsonData = (await rs.json()) as SubscanResponse<CrowdloanContributionsResponse>;

      return jsonData.data;
    }, 2);
  }

  public getExtrinsicsList (chain: string, address: string, page = 0, blockRange?: RequestBlockRange): Promise<ExtrinsicsListResponse> {
    const _blockRange = (() => {
      if (!blockRange || !blockRange.to) {
        return null;
      }

      return `${blockRange.from || 0}-${blockRange.to}`;
    })();

    return this.addRequest<ExtrinsicsListResponse>(async () => {
      const rs = await postRequest(this.getApiUrl(chain, 'api/scan/extrinsics'), {
        page,
        row: QUERY_ROW,
        address,
        block_range: _blockRange
      });

      if (rs.status !== 200) {
        throw new SWError('SubscanService.getExtrinsicsList', await rs.text());
      }

      const jsonData = (await rs.json()) as SubscanResponse<ExtrinsicsListResponse>;

      return jsonData.data;
    }, 0);
  }

  public async fetchAllPossibleExtrinsicItems (
    chain: string,
    address: string,
    cbAfterEachRequest?: (items: ExtrinsicItem[]) => void,
    limit = {
      page: 10,
      record: 1000
    }
  ): Promise<ExtrinsicItem[]> {
    let maxCount = 0;
    let currentCount = 0;
    const blockRange: RequestBlockRange = {
      from: null,
      to: null
    };
    const resultMap: Record<string, ExtrinsicItem> = {};

    const _getExtrinsicItems = async (page: number) => {
      const res = await this.getExtrinsicsList(chain, address, page, blockRange);

      if (!res || !res.count || !res.extrinsics || !res.extrinsics.length) {
        return;
      }

      if (res.count > maxCount) {
        maxCount = res.count;
      }

      cbAfterEachRequest?.(res.extrinsics);
      res.extrinsics.forEach((item) => {
        resultMap[item.extrinsic_hash] = item;
      });

      currentCount += res.extrinsics.length;

      if (page > limit.page || currentCount > limit.record) {
        return;
      }

      if (currentCount < maxCount) {
        await wait(100);

        if (page === 0) {
          blockRange.to = res.extrinsics[0].block_num;
        }

        await _getExtrinsicItems(++page);
      }
    };

    await _getExtrinsicItems(0);

    return Object.values(resultMap);
  }

  public getTransfersList (chain: string, address: string, page = 0, direction?: 'sent' | 'received', blockRange?: RequestBlockRange): Promise<TransfersListResponse> {
    return this.addRequest<TransfersListResponse>(async () => {
      const rs = await postRequest(this.getApiUrl(chain, 'api/v2/scan/transfers'), {
        page,
        row: QUERY_ROW,
        address,
        direction: direction || null,
        from_block: blockRange?.from || null,
        to_block: blockRange?.to || null
      });

      if (rs.status !== 200) {
        throw new SWError('SubscanService.getTransfersList', await rs.text());
      }

      const jsonData = (await rs.json()) as SubscanResponse<TransfersListResponse>;

      return jsonData.data;
    }, 0);
  }

  public async fetchAllPossibleTransferItems (
    chain: string,
    address: string,
    direction?: 'sent' | 'received',
    cbAfterEachRequest?: (items: TransferItem[]) => void,
    limit = {
      page: 10,
      record: 1000
    }
  ): Promise<Record<string, TransferItem[]>> {
    let maxCount = 0;
    let currentCount = 0;
    const blockRange: RequestBlockRange = {
      from: null,
      to: null
    };
    const resultMap: Record<string, TransferItem[]> = {};

    const _getTransferItems = async (page: number) => {
      const res = await this.getTransfersList(chain, address, page, direction, blockRange);

      if (!res || !res.count || !res.transfers || !res.transfers.length) {
        return;
      }

      if (res.count > maxCount) {
        maxCount = res.count;
      }

      cbAfterEachRequest?.(res.transfers);
      res.transfers.forEach((item) => {
        if (!resultMap[item.hash]) {
          resultMap[item.hash] = [item];
        } else {
          resultMap[item.hash].push(item);
        }
      });

      currentCount += res.transfers.length;

      if (page > limit.page || currentCount > limit.record) {
        return;
      }

      if (currentCount < maxCount) {
        await wait(100);

        if (page === 0) {
          blockRange.to = res.transfers[0].block_num;
        }

        await _getTransferItems(++page);
      }
    };

    await _getTransferItems(0);

    return resultMap;
  }

  public getRewardHistoryList (chain: string, address: string, page = 0): Promise<RewardHistoryListResponse> {
    return this.addRequest<RewardHistoryListResponse>(async () => {
      const rs = await postRequest(this.getApiUrl(chain, 'api/scan/account/reward_slash'), {
        page,
        category: 'Reward',
        row: 10,
        address
      });

      if (rs.status !== 200) {
        throw new SWError('SubscanService.getRewardHistoryList', await rs.text());
      }

      const jsonData = (await rs.json()) as SubscanResponse<RewardHistoryListResponse>;

      return jsonData.data;
    }, 2);
  }

  // Singleton
  private static _instance: SubscanService;

  public static getInstance () {
    if (!SubscanService._instance) {
      const context = new BaseApiRequestContext();

      SubscanService._instance = new SubscanService(context);
    }

    return SubscanService._instance;
  }
}
