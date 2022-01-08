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


export const getAllCrowdloanContribution = async (targetChains, address) => {
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


    // Get all parachain paraIds
    let chainOrderAllParaIdsMap = []
    // noinspection JSUnresolvedVariable
    const records = await Promise.all(apis.map(api => api.query.paras.paraLifecycles.entries()))
    records.map(allParaIds => {
        chainOrderAllParaIdsMap.push(allParaIds.map(([key, _]) => key.args[0].toString()))
    })

    // Get all crowdloan contributions
    const hexAddress = await apis[0].createType('AccountId', address).toHex()
    let jobOrderChainOrderMap = []
    let jobOrderParaIdMap = []
    let jobs = []
    apis.map((api, i) => {
        chainOrderAllParaIdsMap[i].map(paraId => {
            jobs.push(api.derive.crowdloan.ownContributions(paraId, [hexAddress]))
            jobOrderChainOrderMap.push(i)
            jobOrderParaIdMap.push(paraId)
        })
    })
    const crowdloanContributions = await Promise.all(jobs)

    // Parsing crowdloan contribution
    let results = []
    crowdloanContributions.map((item, i) => {
        const currentChain = chainDict[jobOrderChainOrderMap[i]]
        const paraId = jobOrderParaIdMap[i]
        // noinspection JSUnresolvedVariable
        results.push({
            chainId: currentChain.chainId,
            paraId: paraId,
            token: currentChain.nativeToken,
            tokenDecimals: currentChain.tokenDecimals,
            contribution: toUnit(item[hexAddress], currentChain.tokenDecimals),
        })
    })

    apis.map(api => api.disconnect())
    return results
}


export const getAllCrowdloanStats = async (targetChains) => {
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

    // Get all parachain paraIds
    let chainOrderAllParaIdsMap = []
    // noinspection JSUnresolvedVariable
    const records = await Promise.all(apis.map(api => api.query.paras.paraLifecycles.entries()))
    records.map(allParaIds => {
        chainOrderAllParaIdsMap.push(allParaIds.map(([key, _]) => key.args[0].toString()))
    })

    // Get all crowdloan stats
    let jobs = []
    apis.map((api, i) => {
        // noinspection JSUnresolvedVariable
        jobs.push(api.query.crowdloan.funds.multi(chainOrderAllParaIdsMap[i]))
    })
    const crowdloanStats = await Promise.all(jobs)

    // Parsing crowdloan stats
    let results = []
    crowdloanStats.map((records, i) => {
        const currentChain = chainDict[i]
        records.map((record, j) => {
            const paraId = chainOrderAllParaIdsMap[i][j]
            record = record.toHuman()
            if (record !== null)
                // noinspection JSUnresolvedVariable
                results.push({
                    chainId: currentChain.chainId,
                    paraId: paraId,
                    token: currentChain.nativeToken,
                    tokenDecimals: currentChain.tokenDecimals,
                    raised: toUnit(record.raised.split(',').join(''), currentChain.tokenDecimals),
                    cap: toUnit(record.cap.split(',').join(''), currentChain.tokenDecimals),
                })
        })
    })

    apis.map(api => api.disconnect())
    return results
}
