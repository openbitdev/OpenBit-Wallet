// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NftCollection, NftItem } from '@subwallet/extension-base/background/KoniTypes';
import { TEST_ADDRESS } from '@subwallet/extension-base/koni/api/nft/inscription/constants/accounts';
import { HIRO_API } from '@subwallet/extension-base/koni/api/nft/inscription/constants/api';
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
// tb1q9349hsyr78tv79lmmak3gwsmkqrplcv8jr30cy
// tb1qunkzxu23pwv3tdgtgssvvv2qa9s22rqs3hk9ee
// tb1qltwnv6wwqd8yhwekdlqtkppr9ngna3l9tvayg2
// tb1qgtfh3judtmdww3myvvv7m2u774f2dxk3eh8uxu
// tb1qv8przqc226ytdckcu9k3nchy6d6kup8trfg8v2
// bc1pswkmku02gqu9cg8heetr6lfxc5zusss4knqst7g2rf8teeqtr9lsdlv4ts
const FAKE_ADDRESS = 'tb1p5sgfjpdxa7y9as2m2ekc797h05ywf6reswhz2u30anhg390cwnuskhf3uq'; // replace this address to your bitcoin address to see

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
      return undefined;
    }

    if (type.startsWith('image/')) {
      return `${HIRO_API.list_of_incriptions}/${id}/content`;
      // return `https://ordinals.com/preview/${id}`;
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

      return await response.json() as Record<string, any>;
    } catch (error) {
      return undefined;
    }
  }

  private handleProperties (inscription: InscriptionResponseItem) {
    const propertiesMap: Record<string, any> = {};
    const satRarity = inscription.sat_rarity;
    const satNumber = inscription.sat_ordinal;
    const contentType = inscription.content_type;

    console.log('6666_contentType', contentType);

    propertiesMap.sat_rarity = {
      value: satRarity
    };

    propertiesMap.sat_number = {
      value: satNumber
    };

    propertiesMap.content_type = {
      value: contentType
    };

    return propertiesMap;
  }

  public async handleNfts (params: HandleNftParams) {
    try {
      const balances = await this.getBalances(TEST_ADDRESS.add4);

      console.log('balances', balances);

      if (balances.length > 0) {
        const collectionMap: Record <string, NftCollection> = {};

        for (const ins of balances) {
          let content;

          if (ins.content_type.startsWith('text/plain') || ins.content_type.startsWith('application/json')) {
            content = await this.getOrdinalContent(ins.id);
          }

          const propertiesMap = this.handleProperties(ins);

          const parsedNft: NftItem = {
            id: ins.id,
            chain: this.chain,
            owner: FAKE_ADDRESS, // todo: ins.address
            name: `#${ins.number.toString()}`,
            image: this.parseInsUrl(ins.id, ins.content_type),
            description: content ? JSON.stringify(content) : undefined,
            collectionId: ORDINAL_COLLECTION_INFO.collectionId,
            rarity: ins.sat_rarity,
            properties: propertiesMap
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
