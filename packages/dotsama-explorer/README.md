# Polkadot Explorer
**A library for querying info from DotSama chains through RPCs**

This library use community-defined chain RPCs. All chains metadata can be found in: `/src/endpoints/`<br/>
You can find chainId mappings in `/src/endpoints/manifest.json`<br/>
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

**Get all crowdloan contribution of an address in Polkadot and/or Kusama**
```javascript
import {getAllCrowdloanContribution} from "./src/controllers/apis.js";

// Only Polkadot, Kusama
const targetChains = [
    {chainId: 0, paraId: 0},
    {chainId: 2, paraId: 2},
]

await getAllCrowdloanContribution(targetChains, '0x00')

// Will output an array of crowdloan contribution like this:
// [
//     {
//         chainId: 0,
//         paraId: 2000,
//         token: 'DOT',
//         tokenDecimals: 10,
//         contribution: 999999,
//     },
//     {
//         chainId: 0,
//         paraId: 2002,
//         token: 'DOT',
//         tokenDecimals: 10,
//         contribution: 999999,
//     },
//     ....
//     {
//         chainId: 2,
//         paraId: 2000,
//         token: 'KSM',
//         tokenDecimals: 12,
//         contribution: 1111,
//     },
//     {
//         chainId: 2,
//         paraId: 2002,
//         token: 'KSM',
//         tokenDecimals: 12,
//         contribution: 1111,
//     }
//     ....
// ]
```

**Get all crowdloan statistics of parachains in Polkadot and/or Kusama**
```javascript
import {getAllCrowdloanStats} from "./src/controllers/apis.js";

// Only Polkadot, Kusama
const targetChains = [
    {chainId: 0, paraId: 0},
    {chainId: 2, paraId: 2},
]

await getAllCrowdloanStats(targetChains)

// Will output an array of crowdloan statistics like this:
// [
//     {
//         chainId: 0,
//         paraId: 2000,
//         token: 'DOT',
//         tokenDecimals: 10,
//         raised: 32515980.232357625,
//         cap: 50000000,
//     },
//     {
//         chainId: 0,
//         paraId: 2002,
//         token: 'DOT',
//         tokenDecimals: 10,
//         raised: 9752487.426803853,
//         cap: 50000000,
//     },
//     ....
//     {
//         chainId: 2,
//         paraId: 2000,
//         token: 'KSM',
//         tokenDecimals: 12,
//         raised: 501137.6619100505,
//         cap: 1500000,
//     },
//     {
//         chainId: 2,
//         paraId: 2024,
//         token: 'KSM',
//         tokenDecimals: 12,
//         raised: 47425.526242400854,
//         cap: 100000,
//     },
//     ....
// ]
```