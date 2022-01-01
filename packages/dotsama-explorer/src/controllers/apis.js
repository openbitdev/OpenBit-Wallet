import {isValidAddress, loadJSON, toUnit} from "../utils/utils.js"
import {connectChains} from "../connectors/wsProvider.js"

export const getChainMetadata = ({chainId, paraId}) => {
    const manifestPath = `../endpoints/${chainId}/${paraId}/manifest.json`
    return loadJSON(manifestPath)
}

export const getBalances = async (targetChains, address) => {
    if (!isValidAddress(address)) {
        console.log('Invalid address.')
        return null
    }

    if (targetChains.length <= 0) {
        console.log('Must pass at least 1 chain.')
        return null
    }

    let chainDict = {}
    targetChains.map((item, i) => {
        if (!("paraId" in item) || !("chainId" in item)) {
            console.log("Must include chainId")
            return null
        }
        const chainMetadata = getChainMetadata({chainId: item.chainId, paraId: item.paraId})
        chainDict[i] = {chainId: item.chainId, paraId: item.paraId, ...chainMetadata}
    })

    const apis = await connectChains(targetChains)
    const balances = await Promise.all(apis.map(api => api.query.system.account(address)))
    let results = []
    balances.map((item, i) => {
        const { nonce, data: balance } = item
        const currentChain = chainDict[i] // can do this because Promise doesnt change the order
        // noinspection JSUnresolvedVariable
        results.push({
            chainId: currentChain.chainId,
            paraId: currentChain.paraId,
            token: currentChain.nativeToken,
            tokenDecimals: currentChain.tokenDecimals,
            freeBalance: toUnit(balance.free, currentChain.tokenDecimals),
            reservedBalance: toUnit(balance.reserved, currentChain.tokenDecimals),
            nonce: nonce.toNumber()
        })
    })
    apis.map(api => api.disconnect())

    return results
}


// export const testSubscribe = async (targetChains, address, callback) => {
//     if (!isValidAddress(address)) {
//         console.log('Invalid address.')
//         return null
//     }
//
//     if (targetChains.length <= 0) {
//         console.log('Must pass at least 1 chainId.')
//         return null
//     }
//
//     let chainDict = {}
//     targetChains.map((item, i) => {
//         const chainMetadata = getChainMetadata({chainId: item.chainId, paraId: item.paraId})
//         chainDict[i] = {chainId: item.chainId, paraId: item.paraId, ...chainMetadata}
//     })
//
//     const apis = await connectChains(targetChains)
//
//     let unsubscribeCallbacks = []
//     apis.map(async (api, i) => {
//         const unsub = await api.query.timestamp.now((moment) => {
//             callback(moment)
//         });
//         unsubscribeCallbacks.push(unsub)
//     })
//
//     return () =>
//         unsubscribeCallbacks.map(unsubscribeCallback => unsubscribeCallback())
// }


export const subscribeBalances = async (targetChains, address, callback) => {
    if (!isValidAddress(address)) {
        console.log('Invalid address.')
        return null
    }

    if (targetChains.length <= 0) {
        console.log('Must pass at least 1 chainId.')
        return null
    }

    let chainDict = {}
    targetChains.map((item, i) => {
        const chainMetadata = getChainMetadata({chainId: item.chainId, paraId: item.paraId})
        chainDict[i] = {chainId: item.chainId, paraId: item.paraId, ...chainMetadata}
    })

    const apis = await connectChains(targetChains)

    let unsubscribeCallbacks = []
    apis.map(async (api, i) => {
        const currentChain = chainDict[i]
        const unsub = await api.query.system.account(address, ({data: balance, nonce: nonce}) => {
            // noinspection JSUnresolvedVariable
            callback({
                chainId: currentChain.chainId,
                paraId: currentChain.paraId,
                token: currentChain.nativeToken,
                tokenDecimals: currentChain.tokenDecimals,
                freeBalance: toUnit(balance.free, currentChain.tokenDecimals),
                reservedBalance: toUnit(balance.reserved, currentChain.tokenDecimals),
                nonce: nonce.toNumber()
            })
        })
        unsubscribeCallbacks.push(unsub)
    })

    return () =>
        unsubscribeCallbacks.map(unsubscribeCallback => unsubscribeCallback())
}
