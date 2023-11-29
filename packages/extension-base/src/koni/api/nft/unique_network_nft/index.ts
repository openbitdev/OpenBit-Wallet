// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NftCollection, NftItem } from '@subwallet/extension-base/background/KoniTypes';
import { UNIQUE_SCAN_ENDPOINT, QUARTZ_SCAN_ENDPOINT, OPAL_SCAN_ENDPOINT} from '@subwallet/extension-base/koni/api/nft/config';
import { BaseNftApi, HandleNftParams } from '@subwallet/extension-base/koni/api/nft/nft';
import fetch from 'cross-fetch';
import { encodeAddress, decodeAddress } from '@polkadot/util-crypto';

interface NftData {
  collection_id: string;
  collection_name: string;
  collection_description: string;
  collection_cover: string;
  token_id: string;
  token_name: string;
  image: Record<string, string>;
  attributes: Record<string, any>;
}

export class UniqueNftApi extends BaseNftApi {
  constructor (chain: string, addresses: string[]) {
    super(chain, undefined, addresses);
  }

  private handleProperties (nft: Record<string, any>) {
    const propertiesMap: Record<string, any> = {};
    const att_record = nft.attributes
    if (att_record) {
        for (const item in att_record) {
            if (att_record[item].name._.toLowerCase() === 'traits') {
                const traits: string[] = [];

                const trait_values = att_record[item].value;
                for (const trait in trait_values) {
                    traits.push(trait_values[trait]._);
                };
                    propertiesMap['traits'] = {
                        value: traits
                    };
                }
            else {
                propertiesMap[att_record[item].name._] = {
                    value: att_record[item].value._
                    };
            }
        }
    }

    return propertiesMap;
  }

  private static parseNftRequest (unique_address: string) {
    return {
      query: `
        query {
            tokens(
                limit: 99999
                offset: 0
                where: { owner: { _eq: "${unique_address}" }, burned: { _eq: "false" }}) 
            {
                data {
                    collection_id
                    collection_name
                    collection_description
                    collection_cover
                    token_id
                    token_name
                    image
                    attributes
                }
            }
        }
      `
    };
  }

  private async getNftByAccount (address: string) {
    let endpoint: string ='';
    let unique_address: string = '';

    // Use exactly endpoint for each network
    if (['unique_network'].includes(this.chain))
        {
            endpoint = UNIQUE_SCAN_ENDPOINT;
            unique_address = encodeAddress(decodeAddress(address), 7391);
            // Unique network prefix: 7391
        }
    else if (['quartz'].includes(this.chain))
        {
            endpoint = QUARTZ_SCAN_ENDPOINT;
            unique_address = encodeAddress(decodeAddress(address), 255);
            // Quartz prefix: 255
        }
    else if (['opal'].includes(this.chain))
        {
            endpoint = OPAL_SCAN_ENDPOINT;
            unique_address = address;
            // Opal address: Normal address
        }

    const resp = await fetch(endpoint, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(UniqueNftApi.parseNftRequest(unique_address))
    });
    
    const result = await resp.json() as Record<string, any>;
    return result?.data?.tokens?.data as NftData[];
  }

  public async handleNfts(params: HandleNftParams) {
    try {
      await Promise.all(this.addresses.map(async (address) => {
        const nfts = await this.getNftByAccount(address);

        if (nfts) {
          const collectionMap : Record <string, NftCollection> = {};
          for (const nft of nfts) {

            // Handle case rendering image on Quartz Network (Temporary solution)
            if (this.chain === 'quartz' && nft.collection_id.toString() === '141') {
              continue;
            }

            // Handle properties
            const propertiesMap = this.handleProperties(nft);

            // Update Nft information
            const parsedNft: NftItem = {
              id: nft.token_id.toString(),
              chain: this.chain,
              owner: address,
              name: nft.token_name,
              image: this.parseUrl(nft.image?.fullUrl),
              description: nft.collection_description,
              collectionId: nft.collection_id.toString(),
              properties: propertiesMap as Record<any, any>
            };
            params.updateItem(this.chain, parsedNft, address);

            // Update Collection information
            if (!collectionMap[nft.collection_id.toString()]) {
              const parsedCollection: NftCollection = {
                collectionId: nft.collection_id.toString(),
                chain: this.chain,
                collectionName: nft.collection_name,
                image: this.parseUrl(nft.collection_cover)
              };
              collectionMap[nft.collection_id.toString()] = parsedCollection;
              params.updateCollection(this.chain, parsedCollection);
            }
            
          }
        }
      }));
    } catch (e) {
      console.error(`Failed to fetch ${this.chain} nft`, e);
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
