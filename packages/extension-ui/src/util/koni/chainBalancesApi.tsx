import axios from 'axios';
import { AccountInfoItem, BalanceInfo, BalanceSubInfo } from './types';
import BigN from 'bignumber.js';
import { isEmptyArray, notDef } from '@polkadot/extension-ui/util/koni/support';

export const priceParamByNetworkNameMap: Record<string, string> = {
  'acala': 'acala-token',
  // 'altair': 'altair',
  // 'astar': 'astar',
  // 'basilisk': 'basilisk',
  'bifrost': 'bifrost-native-coin',
  'calamari': 'calamari-network',
  'clover': 'clover',
  'genshiro': 'genshiro',
  // 'heiko': 'heiko',
  'hydradx': 'hydradx',
  'karura': 'karura',
  // 'khala': 'khala',
  'kilt': 'kilt-protocol',
  'kintsugi': 'kintsugi',
  'kusama': 'kusama',
  // 'moonbeam': 'moonbeam',
  'moonriver': 'moonriver',
  'parallel': 'par-stablecoin',
  // 'picasso': 'picasso',
  // 'pioneer': 'pioneer',
  'polkadot': 'polkadot',
  // 'quartz': 'quartz',
  'sakura': 'sakura',
  // 'shadow': 'shadow',
  'shiden': 'shiden',
  // 'statemine': 'statemine',
  // 'statemint': 'statemint',
  // 'subsocial': 'subsocial',
  // 'zeitgeist': 'zeitgeist',
};

export const BN_TEN = new BigN(10);

export const getTokenPrice = async (chains: string) => {
  try {
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${chains}`);
    if (res.status !== 200) {
      console.warn('Failed to get token price');
    }

    return res.data;
  } catch (err) {
    console.error('Failed to get token price', err);
    return undefined;
  }
};

type BalanceType = {
  totalBalance: string
  priceField: string
  comparableValue: string
  tokenPrices: any[]
  decimals: number
  symbol: string
  balanceClassName?: string
}

type BalanceWithDecimalsProps = {
  totalBalance: string
  decimals: number
}

const getBalanceWithDecimals = ({totalBalance, decimals}: BalanceWithDecimalsProps) => {
  return new BigN(totalBalance).div(BN_TEN.pow(decimals));
};

const getTotalBalance = (balance: BigN, price: string) => (
  balance && price
    ? balance.multipliedBy(new BigN(price))
    : new BigN(0)
);

const getBalances = ({
                       totalBalance,
                       decimals,
                       symbol,
                       tokenPrices,
                       priceField,
                       comparableValue
                     }: BalanceType) => {
  const stable = symbol.toLowerCase().includes('usd') ? 1 : 0;

  const balanceValue = getBalanceWithDecimals({totalBalance, decimals});

  const priceValue = (tokenPrices.find(x => x[priceField] === comparableValue.toLowerCase())?.current_price)?.toString() || stable;

  const totalValue = getTotalBalance(balanceValue, priceValue);

  return {
    balanceValue,
    totalValue
  };
};

export const parseBalancesInfo = (tokenPrices: any[], balanceInfo: AccountInfoItem): BalanceInfo => {
  const {info, tokenDecimals, tokenSymbol} = balanceInfo;

  const decimals = tokenDecimals && !isEmptyArray(tokenDecimals) ? tokenDecimals[0] : 0;
  const symbol = tokenSymbol && !isEmptyArray(tokenSymbol) ? tokenSymbol[0] : '';

  // todo: handle case that decimals is 0
  // if (!decimals) {
  //   return null;
  // }

  const {totalBalance, reservedBalance, frozenFee, freeBalance, frozenMisc} = info[symbol];
  const transferableBalance = new BigN(freeBalance).minus(new BigN(frozenMisc)).toString();

  const accountData = [
    {key: 'free', label: 'Transferable', value: transferableBalance},
    {key: 'reserved', label: 'Reserved balance', value: reservedBalance},
    {key: 'locked', label: 'Locked balance', value: frozenMisc},
    {key: 'frozen', label: 'Frozen fee', value: frozenFee}
  ];

  const detailBalances: BalanceSubInfo[] = [];

  accountData.forEach(({key, label, value}) => {
    const {totalValue, balanceValue} = getBalances({
      totalBalance: value,
      decimals,
      symbol,
      tokenPrices,
      priceField: 'symbol',
      comparableValue: symbol
    });

    detailBalances.push({
      key,
      label,
      symbol,
      totalValue,
      balanceValue
    });
  });

  const [, ...childrenBalanceSymbols] = tokenSymbol;
  const childrenBalances: BalanceSubInfo[] = [];

  childrenBalanceSymbols.forEach((cSymbol) => {
    // todo: need to find a way to get childrenBalance from APIs, then remove the if statement below
    if (true) {
      return;
    }

    if (notDef(cSymbol)) {
      return;
    }

    const infoBySymbol = info[cSymbol];

    if (infoBySymbol) {
      const {totalBalance} = infoBySymbol;

      const {balanceValue, totalValue} = getBalances({
        totalBalance,
        decimals,
        symbol: cSymbol,
        tokenPrices,
        priceField: 'symbol',
        comparableValue: cSymbol
      });

      childrenBalances.push({
        key: cSymbol,
        label: '',
        symbol: cSymbol,
        totalValue,
        balanceValue
      });
    }
  });

  const {totalValue, balanceValue} = getBalances({
    totalBalance,
    decimals,
    symbol,
    tokenPrices,
    priceField: 'symbol',
    comparableValue: symbol
  });

  return {
    symbol,
    totalValue,
    balanceValue,
    detailBalances,
    childrenBalances
  };
};
