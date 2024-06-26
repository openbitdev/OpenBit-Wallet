// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NftCollection, NftItem } from '@subwallet/extension-base/background/KoniTypes';
import { HIRO_API } from '@subwallet/extension-base/koni/api/nft/inscription/constants/api';
import { InscriptionResponseItem } from '@subwallet/extension-base/koni/api/nft/inscription/types/interface';
import { BaseNftApi, HandleNftParams } from '@subwallet/extension-base/koni/api/nft/nft';
import { Inscription } from '@subwallet/extension-base/services/chain-service/handler/bitcoin/strategy/BlockStream/types';
import { getAddressInscriptions, getInscriptionContent } from '@subwallet/extension-base/services/hiro-service/utils';
import fetch from 'cross-fetch';

// * Deprecated
interface FetchedData {
  limit: number,
  offset: number,
  total: number,
  results: InscriptionResponseItem[]
}

export const ORDINAL_COLLECTION_INFO: NftCollection = {
  chain: 'bitcoin',
  collectionId: 'INSCRIPTION',
  collectionName: 'Inscriptions'
};

export const ORDINAL_COLLECTION_INFO_TEST: NftCollection = {
  chain: 'bitcoinTestnet',
  collectionId: 'INSCRIPTION_TESTNET',
  collectionName: 'Inscriptions Testnet'
};

const checkTestnet = (chain: string) => {
  return chain === ORDINAL_COLLECTION_INFO_TEST.chain;
};

export class InscriptionApi extends BaseNftApi {
  private isTestnet: boolean;

  constructor (chain: string, addresses: string[]) {
    super(chain, undefined, addresses);
    this.isTestnet = checkTestnet(chain);
  }

  private createIframePreviewUrl (id: string) {
    return `https://ordinals.com/preview/${id}`;
  }

  get collectionInfo () {
    return this.isTestnet ? ORDINAL_COLLECTION_INFO_TEST : ORDINAL_COLLECTION_INFO;
  }

  private parseInsUrl (id: string, type: string) {
    if (type.startsWith('audio/') || type.startsWith('text/html') || type.startsWith('image/svg') || type.startsWith('model/gltf')) {
      return this.createIframePreviewUrl(id);
    }

    if (type.startsWith('video/')) {
      return `https://ordinals.com/content/${id}`;
    }

    if (type.startsWith('text/')) {
      return undefined;
    }

    if (type.startsWith('image/')) {
      return `${HIRO_API.list_of_incriptions}/${id}/content`;
      // return getPreviewUrl(id);
    }

    return undefined;
  }

  // @ts-ignore
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

  // @ts-ignore
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

  private handleProperties (inscription: Inscription) {
    const propertiesMap: Record<string, any> = {};
    const satRarity = inscription.sat_rarity;
    const satNumber = inscription.sat_ordinal;
    const contentType = inscription.content_type;

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

  public async updateTextInscription (inscriptions: Inscription[], params: HandleNftParams, collectionMap: Record <string, NftCollection>) {
    await Promise.all(inscriptions.map(async (ins) => {
      const content = await getInscriptionContent(this.isTestnet, ins.id);
      const propertiesMap = this.handleProperties(ins);

      const parsedNft: NftItem = {
        id: ins.id,
        chain: this.chain,
        owner: ins.address,
        name: `#${ins.number.toString()}`,
        image: this.parseInsUrl(ins.id, ins.content_type),
        description: content ? JSON.stringify(content) : undefined,
        collectionId: this.collectionInfo.collectionId,
        rarity: ins.sat_rarity,
        properties: propertiesMap
      };

      params.updateItem(this.chain, parsedNft, ins.address);

      if (!collectionMap[this.collectionInfo.collectionId]) {
        const parsedCollection: NftCollection = {
          collectionId: this.collectionInfo.collectionId,
          chain: this.chain,
          collectionName: this.collectionInfo.collectionName,
          image: this.collectionInfo.image
        };

        collectionMap[this.collectionInfo.collectionId] = parsedCollection;
        params.updateCollection(this.chain, parsedCollection);
      }
    }));
  }

  public async handleNfts (params: HandleNftParams) {
    try {
      await Promise.all(this.addresses.map(async (address) => {
        const offset = params.getOffset && await params.getOffset(address, this.collectionInfo.chain);
        const balances = await getAddressInscriptions(address, this.isTestnet, offset);

        if (balances.length > 0) {
          const collectionMap: Record <string, NftCollection> = {};
          const textIns: Inscription[] = [];

          for (const ins of balances) {
            let content;

            if (ins.content_type.startsWith('text/plain') || ins.content_type.startsWith('application/json')) {
              textIns.push(ins);
            }

            const propertiesMap = this.handleProperties(ins);

            const parsedNft: NftItem = {
              id: ins.id,
              chain: this.chain,
              owner: ins.address,
              name: `#${ins.number.toString()}`,
              image: this.parseInsUrl(ins.id, ins.content_type),
              description: content ? JSON.stringify(content) : undefined,
              collectionId: this.collectionInfo.collectionId,
              rarity: ins.sat_rarity,
              properties: propertiesMap
            };

            params.updateItem(this.chain, parsedNft, ins.address);

            if (!collectionMap[this.collectionInfo.collectionId]) {
              const parsedCollection: NftCollection = {
                collectionId: this.collectionInfo.collectionId,
                chain: this.chain,
                collectionName: this.collectionInfo.collectionName,
                image: this.collectionInfo.image
              };

              collectionMap[this.collectionInfo.collectionId] = parsedCollection;
              params.updateCollection(this.chain, parsedCollection);
            }
          }

          // handle all inscriptions has text content
          await this.updateTextInscription(textIns, params, collectionMap);
        }
      }));
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
