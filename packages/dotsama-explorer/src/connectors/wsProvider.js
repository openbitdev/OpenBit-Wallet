import {ApiPromise, WsProvider} from '@polkadot/api'
import {getChainMetadata} from "../controllers/apis.js";

export const wsProvider = async (endpoints) => {
    const wsProvider = new WsProvider(endpoints)
    return ApiPromise.create({provider: wsProvider})
}

// Return an array of apis with the order like the input
export const connectChains = async (targetChains) => {
    if (targetChains.length <= 0) {
        console.log('Must pass at least 1 chainId.')
        return null
    }
    let apiPromises = []

    targetChains.map((item) => {
        const chainMetadata = getChainMetadata({chainId: item.chainId, paraId: item.paraId})
        const apiPromise = wsProvider(chainMetadata.rpcs)
        apiPromises.push(apiPromise)
    })

    return await Promise.all(apiPromises)
}


