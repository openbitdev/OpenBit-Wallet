// Copyright 2019-2022 @subwallet/extension-koni authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { APIItemState, BalanceChildItem, BalanceItem } from '@subwallet/extension-base/background/KoniTypes';
import { moonbeamBaseChains } from '@subwallet/extension-koni-base/api/dotsama/api-helper';
// import { getRegistry } from '@subwallet/extension-koni-base/api/dotsama/registry';
import BN from 'bn.js';

import { AccountInfo } from '@polkadot/types/interfaces';

import BaseBalanceHandler from './BaseBalanceHandler';

export default class DotsamaBalanceHandler extends BaseBalanceHandler {
  public override getBalance (): void {
    console.log('');
  }

  override async subscribeAccountBalance (addresses: string[], callback: (rs: BalanceItem) => void) {
    const balanceItem: BalanceItem = {
      state: APIItemState.PENDING,
      free: '0',
      reserved: '0',
      miscFrozen: '0',
      feeFrozen: '0',
      children: undefined
    };

    const subscribers: (() => void)[] = [];

    if (this.network.options.extra?.balance?.hasAccountBalance) {
      const unsub = await this.network.dotsamaApi?.api.query.system.account.multi(addresses, (balances: AccountInfo[]) => {
        let [free, reserved, miscFrozen, feeFrozen, freeKton, reservedKton] = [new BN(0), new BN(0), new BN(0), new BN(0), new BN(0), new BN(0)];

        balances.reduce((summary, item: AccountInfo) => {
          summary.free = summary.free.add(item.data?.free?.toBn() || new BN(0));
          summary.reserved = summary.reserved.add(item.data?.reserved?.toBn() || new BN(0));
          summary.miscFrozen = summary.miscFrozen.add(item.data?.miscFrozen?.toBn() || new BN(0));
          summary.feeFrozen = summary.feeFrozen.add(item.data?.feeFrozen?.toBn() || new BN(0));
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
          // summary.freeKton = summary.freeKton.add(item.data?.freeKton?.toBn() || new BN(0));
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
          // summary.reservedKton = summary.reservedKton.add(item.data?.reservedKton?.toBn() || new BN(0));

          return summary;
        }, { free, reserved, miscFrozen, feeFrozen, freeKton, reservedKton });

        balances.forEach((balance: AccountInfo) => {
          free = free.add(balance.data?.free?.toBn() || new BN(0));
          reserved = reserved.add(balance.data?.reserved?.toBn() || new BN(0));
          miscFrozen = miscFrozen.add(balance.data?.miscFrozen?.toBn() || new BN(0));
          feeFrozen = feeFrozen.add(balance.data?.feeFrozen?.toBn() || new BN(0));
        });

        balanceItem.state = APIItemState.READY;
        balanceItem.free = free.toString();
        balanceItem.reserved = reserved.toString();
        balanceItem.miscFrozen = miscFrozen.toString();
        balanceItem.feeFrozen = feeFrozen.toString();

        callback(balanceItem);
      });

      unsub && subscribers.push(unsub);
    }

    // if (['crab', 'pangolin'].includes(this.network.key)) {
    //   const { chainDecimals, chainTokens } = await getRegistry(networkKey, networkAPI.api);

    //   unsub = await networkAPI.api.query.system.account.multi(addresses, (balances: AccountInfo[]) => {
    //     let [free, reserved, freeKton, reservedKton] = [new BN(0), new BN(0), new BN(0), new BN(0)];

    //     balances.forEach((balance: AccountInfo) => {
    //       free = free.add(balance.data?.free?.toBn() || new BN(0));
    //       reserved = reserved.add(balance.data?.reserved?.toBn() || new BN(0));
    //       // @ts-ignore
    //       // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    //       freeKton = freeKton.add(balance.data?.freeKton?.toBn() || new BN(0));
    //       // @ts-ignore
    //       // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    //       reservedKton = reservedKton.add(balance.data?.reservedKton?.toBn() || new BN(0));
    //     });

    //     balanceItem.state = APIItemState.READY;
    //     balanceItem.free = free.toString();
    //     balanceItem.reserved = reserved.toString();
    //     balanceItem.miscFrozen = '0';
    //     balanceItem.feeFrozen = '0';

    //     if (chainTokens.length > 1) {
    //       balanceItem.children = {
    //         [chainTokens[1]]: {
    //           reserved: reservedKton.toString(),
    //           free: freeKton.toString(),
    //           frozen: '0',
    //           decimals: chainDecimals[1]
    //         }
    //       };
    //     }

    //     callback(networkKey, balanceItem);
    //   });
    // }

    function mainCallback (item = {}) {
      Object.assign(balanceItem, item);
      callback(balanceItem);
    }

    function subCallback (children: Record<string, BalanceChildItem>) {
      if (!Object.keys(children).length) {
        return;
      }

      balanceItem.children = { ...balanceItem.children, ...children };
      callback(balanceItem);
    }

    let unsub2: () => void;

    try {
      if (['bifrost', 'acala', 'karura', 'acala_testnet'].includes(networkKey)) {
        unsub2 = await subscribeTokensBalance(addresses, networkKey, networkAPI.api, mainCallback, subCallback);
      } else if (['kintsugi', 'interlay', 'kintsugi_test'].includes(networkKey)) {
        unsub2 = await subscribeTokensBalance(addresses, networkKey, networkAPI.api, mainCallback, subCallback, true);
      } else if (['statemine', 'astar', 'shiden'].indexOf(networkKey) > -1) {
        unsub2 = await subscribeAssetsBalance(addresses, networkKey, networkAPI.api, subCallback);
      } else if (['genshiro_testnet', 'genshiro', 'equilibrium_parachain'].includes(networkKey)) {
        unsub2 = await subscribeGenshiroTokenBalance(addresses, networkKey, networkAPI.api, mainCallback, subCallback, true);
      } else if (moonbeamBaseChains.includes(networkKey) || networkAPI.isEthereum) {
        unsub2 = subscribeERC20Interval(addresses, networkKey, networkAPI.api, web3ApiMap, subCallback);
      }
    } catch (err) {
      console.warn(err);
    }
  }
}
