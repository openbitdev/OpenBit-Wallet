import axios from 'axios';
import {AccountInfoItem, BalanceInfo, BalanceSubInfo, ChainInfo} from './types';
import BigN from 'bignumber.js';
import {isEmptyArray, notDef} from "@polkadot/extension-ui/util/koni/support";
import {getGenesis} from "@polkadot/extension-base/background/pDotApi";

// note: only use this object with sub.id APIs
export const supportedNetworks = [
  'polkadot',
  'kusama',
  'karura',
  'shiden',
  'khala',
  'bifrost',
  'statemine',
  'kilt',
  'altair',
  'basilisk',
  'calamari',
  'centrifuge',
  // 'hydra-dx',
  'sora',
  'edgeware',
  // 'equilibrium',
  // 'darwinia',
  'chainx',
  'nodle',
  'darwinia',
  'subsocial'
];

// note: only use this object with sub.id APIs
export const networkGenesisHashMap: Record<string, string> = {
  'polkadot': getGenesis('polkadot'),
  'kusama': getGenesis('kusama'),
  'karura': getGenesis('karura'),
  // 'shiden': '',
  // 'khala': '',
  'bifrost': getGenesis('bifrost'),
  // 'statemine': '',
  // 'kilt': getGenesis('kilt'),
  // 'altair': getGenesis('altair'),
  // 'basilisk': getGenesis('basilisk'),
  // 'calamari': getGenesis('calamari'),
  'centrifuge': getGenesis('centrifuge'),
  // 'sora': getGenesis('sora'),
  'edgeware': getGenesis('edgeware'),
  // 'chainx': getGenesis('chainx'),
  // 'nodle': getGenesis('nodle'),
  // 'darwinia': getGenesis('darwinia'),
  // 'subsocial': getGenesis('subsocial'),
}


// use it for getTokenPrice
export const overriddenChainNames: Record<string, string> = {
  'bifrost': 'bifrost-native-coin',
  'khala': 'pha',
  'calamari': 'calamari-network',
  'darwinia': 'darwinia-network-native-token'
}

export const BN_TEN = new BigN(10);

export function getIconUrl(icon: string): string {
  return `https://app.subsocial.network/subid/icons/${icon}`
}

export function getBalanceApiUrl(subUrl: string): string {
  return `https://app.subsocial.network/subid/api/v1/${subUrl}`
}

export const getChainBalanceInfo = async (account: string, network: string) => {
  try {
    const {data: info, status} = await axios.get(getBalanceApiUrl(`${account}/balances/${network}`))
    if (status !== 200) {
      console.warn(`Failed to get balances by account: ${account}`)
      return undefined
    }
    return {network, info} as AccountInfoItem
  } catch (err) {
    console.error(`Failed to get balances from ${network} by account: ${account}`, err)
    return undefined
  }
}

export const getChainsInfo = async () => {
  try {
    const res = await axios.get(getBalanceApiUrl('/chains/properties'))
    if (res.status !== 200) {
      console.warn('Failed to get chain info')
    }

    return res.data
  } catch (err) {
    console.error('Failed to get chain info', err)
    return undefined
  }
}

export const getTokenPrice = async (chains: string) => {
  try {
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${chains}`)
    if (res.status !== 200) {
      console.warn('Failed to get token price')
    }

    return res.data
  } catch (err) {
    console.error('Failed to get token price', err)
    return undefined
  }
}

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
  return new BigN(totalBalance).div(BN_TEN.pow(decimals))
}

const getTotalBalance = (balance: BigN, price: string) => (
  balance && price
    ? balance.multipliedBy(new BigN(price))
    : new BigN(0)
)

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
  }
}

export const parseBalancesInfo = (chainsInfo: ChainInfo, tokenPrices: any[], balanceInfo?: AccountInfoItem): BalanceInfo | null => {
  if (!balanceInfo) {
    return null;
  }

  const {network, info} = balanceInfo;

  const {tokenDecimals, tokenSymbol, icon: chainIcon, name: chainName} = chainsInfo[network];

  const decimals = tokenDecimals && !isEmptyArray(tokenDecimals) ? tokenDecimals[0] : 0;
  const symbol = tokenSymbol && !isEmptyArray(tokenSymbol) ? tokenSymbol[0] : '';

  if (!decimals) {
    return null;
  }

  const {accountId, totalBalance, reservedBalance, frozenFee, freeBalance, frozenMisc} = info[symbol];
  const transferableBalance = new BigN(freeBalance).minus(new BigN(frozenMisc)).toString();

  const accountData = [
    {key: 'free', label: 'Transferable', value: transferableBalance},
    {key: 'reserved', label: 'Reserved balance', value: reservedBalance},
    {key: 'locked', label: 'Locked balance', value: frozenMisc},
    {key: 'frozen', label: 'Frozen fee', value: frozenFee}
  ];

  const detailBalances: BalanceSubInfo[] = [];

  accountData.forEach(({key, label, value}) => {
    const {totalValue, balanceValue } = getBalances({
      totalBalance: value,
      decimals,
      symbol,
      tokenPrices,
      priceField: 'symbol',
      comparableValue: symbol,
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
        comparableValue: cSymbol,
      })

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
    comparableValue: symbol,
  })

  return {
    key: network,
    chainName,
    chainIcon,
    chainIconUrl: getIconUrl(chainIcon),
    address: accountId,
    symbol,
    totalValue,
    balanceValue,
    detailBalances,
    childrenBalances
  }
}
