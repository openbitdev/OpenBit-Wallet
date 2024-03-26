import { SWError } from '@subwallet/extension-base/background/errors/SWError';
import fetch from 'cross-fetch';
import { AccountAsset, AccountBalance , AccountSTXBalance, AccountTransaction, HiroRequest, HiroResponse } from '@subwallet/extension-base/services/bitcoin-service/hiro-service-stack/types';
import { HIRO_API_CHAIN_MAP } from './hiro-chain-map';


export class HiroService {
  private limitRate = 1; // limit per interval check
  private intervalCheck = 1000; // interval check in ms
  private maxRetry = 9; // interval check in ms
  private requestMap: Record<number, HiroRequest<any>> = {};
  private nextId = 0;
  private isRunning = false;
  private getId () {
    return this.nextId++;
  }

  private hiroChainMap: Record<string, string>;

  constructor (options?: {limitRate?: number, intervalCheck?: number, maxRetry?: number}) {
    this.hiroChainMap = HIRO_API_CHAIN_MAP;
    this.limitRate = options?.limitRate || this.limitRate;
    this.intervalCheck = options?.intervalCheck || this.intervalCheck;
    this.maxRetry = options?.maxRetry || this.maxRetry;
  }

  private getApiUrl (chain: string, path: string) {
    const hiroScanChain = this.hiroChainMap[chain];

    if (!hiroScanChain) {
      throw new SWError('NOT_SUPPORTED', 'Chain is not supported');
    }

    return `https://api.${hiroScanChain}.hiro.so/${path}`;
  }
  
  private getRequest(url: string) {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  private postRequest (url: string, body: any) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }

  public addRequest<T> (run: HiroRequest<T>['run']) {
    const newId = this.getId();

    return new Promise<T>((resolve, reject) => {
      this.requestMap[newId] = {
        id: newId,
        status: 'pending',
        retry: -1,
        run,
        resolve,
        reject
      };

      if (!this.isRunning) {
        this.process();
      }
    });
  }

  private process () {
    this.isRunning = true;
    const maxRetry = this.maxRetry;

    const interval = setInterval(() => {
      const remainingRequests = Object.values(this.requestMap);

      if (remainingRequests.length === 0) {
        this.isRunning = false;
        clearInterval(interval);

        return;
      }

      // Get first this.limit requests base on id
      const requests = remainingRequests
        .filter((request) => request.status !== 'running')
        .sort((a, b) => a.id - b.id)
        .slice(0, this.limitRate);

      // Start requests
      requests.forEach((request) => {
        request.status = 'running';
        request.run().then((rs) => {
          request.resolve(rs);
        }).catch((e) => {
          if (request.retry < maxRetry) {
            request.status = 'pending';
            request.retry++;
          } else {
            // Reject request
            request.reject(new SWError('MAX_RETRY', String(e)));
          }
        });
      });
    }, this.intervalCheck);
  }

  public checkSupportedSubscanChain (chain: string): boolean {
    return !!this.hiroChainMap[chain];
  }

  public setSubscanChainMap (hiroChainMap: Record<string, string>) {
    this.hiroChainMap = hiroChainMap;
  }
  
  public getAccountAssets(chain: string, principal: string): Promise<AccountAsset[]> {
    return this.addRequest(async () => {
      const url = `${this.getApiUrl(chain, `/extended/v1/address/${principal}/assets`)}`;
      const rs = await this.getRequest(url);
  
      if (rs.status !== 200) {
        throw new SWError('HiroScanService.getAccountAssets', await rs.text());
      }
  
      const jsonData = (await rs.json()) as HiroResponse<AccountAsset[]>;
  
      return jsonData.data;
    });
  }
  

  public getAccountBalences(chain: string, principal: string): Promise<AccountBalance[]> {
    return this.addRequest(async () => {
      const url = `${this.getApiUrl(chain, `/extended/v1/address/${principal}/balances`)}`;
      const rs = await this.getRequest(url);
  
      if (rs.status !== 200) {
        throw new SWError('HiroScanService.getAccountAssets', await rs.text());
      }

      const jsonData = (await rs.json()) as HiroResponse<AccountBalance[]>;
  
      return jsonData.data;

    });
  }
  public getAccountSTXBalences(chain: string, principal: string): Promise<AccountSTXBalance[]> {
    return this.addRequest(async () => {
      const url = `${this.getApiUrl(chain, `/extended/v1/address/${principal}/stx`)}`;
      const rs = await this.getRequest(url);
  
      if (rs.status !== 200) {
        throw new SWError('HiroScanService.getAccountAssets', await rs.text());
      }

      const jsonData = (await rs.json()) as HiroResponse<AccountSTXBalance[]>;
  
      return jsonData.data;

    });
  }

  public getTransaction(chain: string, tx_id: string): Promise<AccountTransaction[]> {
    return this.addRequest(async () => {
      const url = `${this.getApiUrl(chain, `/extended/v1/tx/${tx_id}`)}`;
      const rs = await this.getRequest(url);
  
      if (rs.status !== 200) {
        throw new SWError('HiroScanService.getAccountAssets', await rs.text());
      }
      const jsonData = (await rs.json()) as HiroResponse<AccountTransaction[]>;
      return jsonData.data;
    });
  }

  

}