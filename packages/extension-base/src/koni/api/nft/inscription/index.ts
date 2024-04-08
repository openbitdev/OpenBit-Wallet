// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NftCollection, NftItem } from '@subwallet/extension-base/background/KoniTypes';
import { HIRO_API } from '@subwallet/extension-base/koni/api/nft/inscription/constants/api';
import { TEST_ADDRESS } from '@subwallet/extension-base/koni/api/nft/inscription/constants/test';
import { InscriptionResponseItem } from '@subwallet/extension-base/koni/api/nft/inscription/types/interface';
import { BaseNftApi, HandleNftParams } from '@subwallet/extension-base/koni/api/nft/nft';
import fetch from 'cross-fetch';

interface FetchedData {
  limit: number,
  offset: number,
  total: number,
  results: InscriptionResponseItem[]
}

const ORDINAL_COLLECTION_INFO: NftCollection = {
  chain: 'bitcoin',
  collectionId: 'INSCRIPTION',
  collectionName: 'Inscriptions'
};

const FAKE_ADDRESS = 'tb1q6c980jfrtdhpd23d2jmfdlt77et7zlw0jkwm5r'; // replace this address to your bitcoin address to see

export class InscriptionApi extends BaseNftApi {
  constructor (chain: string, addresses: string[]) {
    super(chain, undefined, addresses);
  }

  private createInscriptionInfoUrl (id: string) {
    return `https://ordinals.hiro.so/inscription/${id}`;
  }

  private createIframePreviewUrl (id: string) {
    return `https://ordinals.com/preview/${id}`;
  }

  private parseInsUrl (id: string, type: string) {
    if (type.startsWith('audio/') || type.startsWith('text/html') || type.startsWith('image/svg') || type.startsWith('video/') || type.startsWith('model/gltf')) {
      return this.createIframePreviewUrl(id);
    }

    if (type.startsWith('text/')) {
      return this.createInscriptionInfoUrl(id);
    }

    if (type.startsWith('image/')) {
      return `${HIRO_API.list_of_incriptions}/${id}/content`;
    }

    return undefined;
  }

  private async getBalances (address: string) {
    const pageSize = 50;
    let offset = 0;
    const ordinalsFullList: InscriptionResponseItem[] = []; // todo: replace type InscriptionResponseItem[]
    let url = HIRO_API.list_of_incriptions + `?address=${address}&limit=${pageSize}&offset=${offset}`;

    try {
      while (true) {
        const _response = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
        });
        const response = await _response.json() as FetchedData;
        const results = response.results;

        // check if response is a null array
        if (results.length !== 0) {
          ordinalsFullList.push(...results);
          offset += pageSize;
          url = HIRO_API.list_of_incriptions + `?address=${address}&limit=${pageSize}&offset=${offset}`;
        } else {
          break;
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return ordinalsFullList;
    } catch (error) {
      console.error(`Failed to get ${address} balances`, error);
      throw error;
    }
  }

  private async getOrdinalContent (id: string) {
    const url = HIRO_API.inscription_content.replace(':id', id);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      });

      return await response.json() as string;
    } catch (error) {
      return undefined;
    }
  }

  public async handleNfts (params: HandleNftParams) {
    try {
      const balances = await this.getBalances(TEST_ADDRESS.add1);

      console.log('balances', balances);

      if (balances.length > 0) {
        const collectionMap: Record <string, NftCollection> = {};

        for (const ins of balances) {
          if (ins.content_type.startsWith('text/plain')) {
            continue;
          }

          const content = await this.getOrdinalContent(ins.id);

          const parsedNft: NftItem = {
            id: ins.id,
            chain: this.chain,
            owner: FAKE_ADDRESS, // todo: ins.address
            name: `#${ins.number.toString()}`,
            image: this.parseInsUrl(ins.id, ins.content_type),
            description: content,
            collectionId: ORDINAL_COLLECTION_INFO.collectionId,
            rarity: ins.sat_rarity
            // sat_number
            // content_type
          };

          console.log('parsedNft', parsedNft);

          params.updateItem(this.chain, parsedNft, FAKE_ADDRESS); // todo: ins.address

          if (!collectionMap[ORDINAL_COLLECTION_INFO.collectionId]) {
            const parsedCollection: NftCollection = {
              collectionId: ORDINAL_COLLECTION_INFO.collectionId,
              chain: this.chain,
              collectionName: ORDINAL_COLLECTION_INFO.collectionName,
              image: ORDINAL_COLLECTION_INFO.image
            };

            collectionMap[ORDINAL_COLLECTION_INFO.collectionId] = parsedCollection;
            params.updateCollection(this.chain, parsedCollection);
            console.log('parsedCollection', parsedCollection);
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch ordinals', error);
    }
  }

  public async fetchNfts (params: HandleNftParams): Promise<number> {
    try {
      await this.handleNfts(params);
    } catch (e) {
      return 0;
    }

    return 1;
  }
}
