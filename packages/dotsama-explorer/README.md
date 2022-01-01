# Polkadot Explorer
**A library for querying info from DotSama chains through RPCs**

This library use community-defined chain RPCs. All chains metadata can be found in: `/src/endpoints/`
You can find chainId mappings in `/src/endpoints/manifest.json`
**Example**: Metadata of Acala which lives on Polkadot can be found at /endpoints/0/2000/manifest.json (0 is Polkadot chainId and 2000 is Acala paraId)

####  Usage
**Get balances**
```javascript
import {getBalances} from "./src/controllers/apis.js";

const targetChains = [
    {chainId: 2, paraId: 2000},
    {chainId: 2, paraId: 2},
]

await getBalances(targetChains, '0x00')

// Will output an array of balances:
// [
//     {
//         chainId: 2,
//         paraId: 2000,
//         token: 'KAR',
//         tokenDecimals: 12,
//         freeBalance: 999999,
//         reservedBalance: 0
//     },
//     {
//         chainId: 2,
//         paraId: 2,
//         token: 'KSM',
//         tokenDecimals: 12,
//         freeBalance: 999999,
//         reservedBalance: 0
//     }
// ]
```

**Subscribe to balances**
```javascript
import {subscribeBalances} from "./src/controllers/apis.js";

const targetChains = [
    {chainId: 2, paraId: 2000},
    {chainId: 2, paraId: 2},
]

const address = '0x00'

const unsubscribe = await subscribeBalances(
    targetChains,
    address,
    (balance) => {console.log(balance)} //callback function
)

// Will output all account balances once, then future balance changes as they happen:
// [
//     {
//         chainId: 2,
//         paraId: 2000,
//         token: 'KAR',
//         tokenDecimals: 12,
//         freeBalance: 999999,
//         reservedBalance: 0
//     },
//     {
//         chainId: 2,
//         paraId: 2,
//         token: 'KSM',
//         tokenDecimals: 12,
//         freeBalance: 999999,
//         reservedBalance: 0
//     }
// ]

// (later) Unsubscribe from future balances (stop the subscription and clear up any underlying RPC connections)
unsubscribe()
```
#### Note
- This library only return balances of native token of each chains (will support other assets in the future)
