// Copyright 2019-2022 @subwallet/extension-base
// SPDX-License-Identifier: Apache-2.0
import { AssetRefMap, ChainAssetMap, ChainInfoMap } from '@subwallet/chain-list';
import { _SubstrateApi } from '@subwallet/extension-base/services/chain-service/types';
import { SubstrateChainHandler } from '@subwallet/extension-base/services/chain-service/handler/SubstrateChainHandler';
import { createXcmExtrinsic } from "@subwallet/extension-base/koni/api/xcm";
import { cryptoWaitReady } from '@polkadot/util-crypto';

jest.setTimeout(50000);

// ----- CONFIGURATION ----- //

// xcUSDC: Moonbeam -> AssetHub
// const srcChain = 'moonbeam';
// const sourceToken = 'moonbeam-LOCAL-xcUSDC';
// const destToken = 'statemint-LOCAL-USDC';
// const receiver = '5FThioXixb82PvPnkxuP4LrCn82qnj3HubDPvLBg53qhnoaA';
// const sendingValue = '0';
// RESULT: extrinsic 0x3501046a00017dadc06a974252e2a81cf01a760b2b7d0000000000000000000000000000000003010200a10f0100963ee35cef2a253ddea01eb63b75ba633f0eaf4e0c1ccf4a5f961ba9dbbeb60100

// xcUSDC: AssetHub -> Moonbeam
// const srcChain = 'statemint';
// const sourceToken = 'statemint-LOCAL-USDC';
// const destToken = 'moonbeam-LOCAL-xcUSDC';
// const receiver = '0x99a978b5D2E0F3f44d6395bE61c1E87CB2Ca0DEa';
// const sendingValue = '0';
// RESULT: extrinsic 0xcc041f0803010100511f030001030099a978b5d2e0f3f44d6395be61c1e87cb2ca0dea0304000002043205e51400000000000000

// xcUSDC: Interlay -> AssetHub
// const srcChain = 'interlay';
// const sourceToken = 'interlay-LOCAL-USDC.wh';
// const destToken = 'statemint-LOCAL-USDC';
// const receiver = '5FThioXixb82PvPnkxuP4LrCn82qnj3HubDPvLBg53qhnoaA';
// const sendingValue = '0';
// RESULT: extrinsic 0x0501045e0001080000000000000000000000000000000000000003010200a10f0100963ee35cef2a253ddea01eb63b75ba633f0eaf4e0c1ccf4a5f961ba9dbbeb60100

// xcUSDC: AssetHub -> Interlay
// const srcChain = 'statemint';
// const sourceToken = 'statemint-LOCAL-USDC';
// const destToken = 'interlay-LOCAL-USDC.wh';
// const receiver = 'wdBwwESfAKQD7uzwAH8wUzstWVYbTtpK6E3xMsGDE7sHQVgMN';
// const sendingValue = '0';
// RESULT: extrinsic 0xfc041f0803010100c11f0300010100c4cfbb248ba40a5c2be3e77c5d794c53f729dcb65845af64afc3ad45e90ee8240304000002043205e51400000000000000

// xcUSDC: Acala -> AssetHub
// const srcChain = 'acala';
// const sourceToken = 'acala-LOCAL-USDCet';
// const destToken = 'statemint-LOCAL-USDC';
// const receiver = '5FThioXixb82PvPnkxuP4LrCn82qnj3HubDPvLBg53qhnoaA';
// const sendingValue = '0';
// RESULT: extrinsic 0x45010436000207df96d1341a7d16ba1ad431e2c847d978bc2bce0000000000000000000000000000000003010200a10f0100963ee35cef2a253ddea01eb63b75ba633f0eaf4e0c1ccf4a5f961ba9dbbeb60100

// xcUSDC: AssetHub -> Acala
const srcChain = 'statemint';
const sourceToken = 'statemint-LOCAL-USDC';
const destToken = 'acala-LOCAL-USDCet';
const receiver = '22jsYV962Q5iAxTvjcS4aNcXp9F6Z6HXXPf39mJeKZHAknXT';
const sendingValue = '0';
// RESULT: extrinsic 0xfc041f0803010100411f03000101005294391d219a6696a2f7676a65b379a4f9dd8e88b722f0886485a635519d97410304000002043205e51400000000000000

let substrateChainHandler: SubstrateChainHandler;

beforeAll(async () => {
  await cryptoWaitReady();
  
  substrateChainHandler = new SubstrateChainHandler();
});

// ----- Test XCM transfer ----- //
test('test get Balances', async () => {
  const originTokenInfo = ChainAssetMap[sourceToken];
  const destinationTokenInfo = ChainAssetMap[destToken];
  const api = await substrateChainHandler.initApi(srcChain, ChainInfoMap[srcChain].providers[Object.keys(ChainInfoMap[srcChain].providers)[0]]);
  const substrateApi = await api.isReady;

  console.log("[i] start")
  const extrinsic = await createXcmExtrinsic({
    chainInfoMap: ChainInfoMap,
    destinationTokenInfo: destinationTokenInfo,
    originTokenInfo: originTokenInfo,
    recipient: receiver,
    sendingValue: sendingValue,
    substrateApi: substrateApi
  });
  console.log('[i] extrinsic', extrinsic.toHex());
  console.log("[i] done");
});







/*
TEST
xcUSDT: Moonbeam -> AssetHub
ori: 0x98891e5FD24Ef33A488A47101F65D212Ff6E650E
des: 5C7S9q57CTzdzf4VHguf8Zg9LPzSQARqx1XCPc58s1dkCH7w
amount: 2
tx: 


https://polkadot.js.org/apps/?rpc=wss%3A%2F%2F1rpc.io%2Fglmr#/chainstate
moonbeam có các metadata khác như PalletId, ... không hiểu sao lại lấy 3 thông tin này để tạo extrinsic
{
  "assetId": "311091173110107856861649819128533077277",
  "assetType": "ForeignAsset",
  "contractAddress": "0xFFFFFFfFea09FB06d082fd1275CD48b191cbCD1d"
}
*/
