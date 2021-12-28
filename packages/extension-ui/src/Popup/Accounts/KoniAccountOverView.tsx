import type {Theme, ThemeProps} from '../../types';
import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import styled, {ThemeContext} from 'styled-components';
import buyIconDark from '../../assets/buy-icon-dark.svg'
import buyIconLight from '../../assets/buy-icon-light.svg'
import sendIconDark from '../../assets/send-icon-dark.svg'
import sendIconLight from '../../assets/send-icon-light.svg'
import swapIconDark from '../../assets/swap-icon-dark.svg'
import swapIconLight from '../../assets/swap-icon-light.svg'
import {AccountContext, CurrentAccountContext, CurrentNetworkContext, SettingsContext} from '../../components';
import useTranslation from '../../hooks/useTranslation';
import KoniHeader from "@polkadot/extension-ui/partials/KoniHeader";
import KoniTabs from "@polkadot/extension-ui/components/KoniTabs";
import BuyToken from "@polkadot/extension-ui/partials/BuyToken";
import KoniAddAccount from "@polkadot/extension-ui/Popup/Accounts/KoniAddAccount";
import ChainBalanceItem from "@polkadot/extension-ui/components/koni/chainBalance/ChainBalanceItem";
import {BalanceInfo} from "@polkadot/extension-ui/util/koni/types";
import {
  getChainBalanceInfo,
  getChainsInfo,
  getTokenPrice,
  overriddenChainNames,
  parseBalancesInfo, networkGenesisHashMap
} from "@polkadot/extension-ui/util/koni";
import {BalanceVal} from "@polkadot/extension-ui/components/koni/balance";
import useGenesisHashOptions from "@polkadot/extension-ui/hooks/useGenesisHashOptions";
import BigN from "bignumber.js";
import {AccountJson, AccountWithChildren} from "@polkadot/extension-base/background/types";
import {Chain} from "@polkadot/extension-chains/types";
import {SettingsStruct} from "@polkadot/ui-settings/types";
import {decodeAddress, encodeAddress} from "@polkadot/util-crypto";
import useMetadata from "@polkadot/extension-ui/hooks/useMetadata";
import KoniLoading from "@polkadot/extension-ui/components/KoniLoading";
import KoniLink from "@polkadot/extension-ui/components/KoniLink";

interface Recoded {
  formatted: string;
}

interface Props extends ThemeProps {
  className?: string;
}

function findSubstrateAccount (accounts: AccountJson[], publicKey: Uint8Array): AccountJson | null {
  const pkStr = publicKey.toString();

  return accounts.find(({ address }): boolean =>
    decodeAddress(address).toString() === pkStr
  ) || null;
}

function recodeAddress (address: string, accounts: AccountWithChildren[], chain: Chain | null, settings: SettingsStruct): Recoded {
  // decode and create a shortcut for the encoded address
  const publicKey = decodeAddress(address);
  // find our account using the actual publicKey, and then find the associated chain
  const account = findSubstrateAccount(accounts, publicKey);
  const prefix = chain ? chain.ss58Format : (settings.prefix === -1 ? 42 : settings.prefix);

  // always allow the actual settings to override the display
  return {
    formatted: account?.type === 'ethereum'
      ? address
      : encodeAddress(publicKey, prefix),
  };
}

function allSkippingErrors(promises: Promise<any>[]) {
  return Promise.all(
    promises.map((p: Promise<any>) => p.catch(error => null))
  )
}

function KoniAccountOverView({className}: Props): React.ReactElement {
  const {t} = useTranslation();
  const [isBuyTokenScreenOpen, setBuyTokenScreenOpen] = useState(false);
  const [isAssetsTabOpen, setAssetsTab] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const {network: {genesisHash, networkPrefix}} = useContext(CurrentNetworkContext)
  const {hierarchy} = useContext(AccountContext);
  const {currentAccount} = useContext(CurrentAccountContext);
  const buyRef = useRef(null);
  const themeContext = useContext(ThemeContext as React.Context<Theme>);
  const theme = themeContext.id;
  const genesisOptions = useGenesisHashOptions();
  const [chainBalances, setChainBalances] = useState<BalanceInfo[]>([]);
  const { accounts } = useContext(AccountContext);
  const chain = useMetadata(currentAccount?.genesisHash, true);
  const settings = useContext(SettingsContext);


  useEffect(() => {
    let isSync = true;

    (async () => {
      let selectedNetWork = genesisOptions.find(opt => opt.value == genesisHash);
      let networkName = Object.keys(networkGenesisHashMap).find(key => !!networkGenesisHashMap[key] && (networkGenesisHashMap[key] === genesisHash));
      let chains: any[] = [];
      let mockAddress: string = '';
      if (isSync) {
        setLoading(true);
      }
      if (currentAccount?.address) {
        mockAddress = recodeAddress(currentAccount.address, accounts, chain, settings).formatted ? recodeAddress(currentAccount?.address, accounts, chain, settings).formatted : '';
      }

      if (networkName) {
        chains.push(networkName);
      } else if (networkPrefix === -1) {
        // chains.push('polkadot', 'kusama', 'karura', 'bifrost', 'centrifuge', 'edgeware');
        chains.push('polkadot', 'kusama', 'karura');
      } else {
        const mockChains: BalanceInfo[] = [
          {
            key: selectedNetWork ? selectedNetWork.text : '',
            chainName: selectedNetWork? selectedNetWork.text : '',
            chainIcon: 'mock.svg',
            chainIconUrl: 'https://app.subsocial.network/subid/icons/polkadot.svg',
            address: mockAddress,
            childrenBalances: [],
            symbol: '',
            totalValue: new BigN(0),
            balanceValue: new BigN(0),
            detailBalances: [
              {
                key: 'free',
                label: 'Transferable',
                symbol: '',
                totalValue: new BigN(0),
                balanceValue: new BigN(0),
              },
              {
                key: 'reserved',
                label: 'Transferable',
                symbol: '',
                totalValue: new BigN(0),
                balanceValue: new BigN(0),
              },
              {
                key: 'locked',
                label: 'Reserved balance',
                symbol: '',
                totalValue: new BigN(0),
                balanceValue: new BigN(0),
              },
              {
                key: 'frozen',
                label: 'Frozen fee',
                symbol: '',
                totalValue: new BigN(0),
                balanceValue: new BigN(0),
              }
            ]
          }
        ];
        if (isSync) {
          setChainBalances(mockChains);
          setLoading(false);
        }
        return;
      }
      const [chainsInfo, tokenPrice] = await allSkippingErrors([
        getChainsInfo(),
        getTokenPrice(chains.map((c) => overriddenChainNames[c] || c).join(','))
      ]);

      if (!chainsInfo || !tokenPrice) {
        return;
      }

      const address = currentAccount?.address;

      if (!address) {
        if (isSync) {
          setChainBalances([]);
          setLoading(false);
        }

        return;
      }

      const chainBalances: BalanceInfo[] = [];

      const chainBalanceApis: Promise<any>[] = chains.map(c => getChainBalanceInfo(address, c));
      const chainBalanceInfoItems = await allSkippingErrors(chainBalanceApis);

      chainBalanceInfoItems.forEach(item => {
        if (!item) {
          return;
        }

        const chainBalance = parseBalancesInfo(chainsInfo, tokenPrice, item);
        if (chainBalance) {
          chainBalances.push(chainBalance);
        }
      });

      if (isSync) {
        setChainBalances(chainBalances);
        setLoading(false);
      }
    })();

    return () => {
      isSync = false;
    }
  }, [currentAccount?.address, chain, genesisHash]);


  const _toggleBuy = useCallback(
    (): void => setBuyTokenScreenOpen((isBuyTokenScreenOpen) => !isBuyTokenScreenOpen),
    []
  )

  const _closeModal = useCallback(
    (): void => setBuyTokenScreenOpen( false),
    []
  )

  const _clickAssets = useCallback(
    (): void => setAssetsTab(true),
    []
  );

  const _clickActivity = useCallback(
    (): void => setAssetsTab(false),
    []
  );
  return (
    <>
      {(hierarchy.length === 0)
        ? <KoniAddAccount />
        : (
          <>
            <KoniHeader
              showAdd
              showSearch
              showSettings
              text={t<string>('Accounts')}
              isContainDetailHeader={true}
            />
            { chainBalances[0] && !isLoading ? (
                <div className={className}>
                  <div className='overview-wrapper'>
                    <div className='account-balance'>
                      <img src={chainBalances[0].chainIconUrl} className='overview-logo'/>
                      <span className='account-balance__token'>
                        <BalanceVal value={chainBalances[0].balanceValue} symbol={chainBalances[0].symbol}/>
                      </span>
                      <span className='account-balance__money'>
                        <BalanceVal value={chainBalances[0].totalValue} symbol={'$'} startWithSymbol/>
                      </span>
                    </div>
                    <div className='account-buttons-wrapper'>
                      <div className='account-button-container'>
                        <div className='account-button' onClick={_toggleBuy}>
                          {theme == 'dark' ?
                            (
                              <img src={buyIconDark} alt="buy"/>
                            ) : (
                              <img src={buyIconLight} alt="buy"/>
                            )
                          }

                        </div>
                        <span className='account-button-container__text'>Receive</span>
                      </div>

                      <KoniLink to={'/account/send-fund'} className={'account-button-container'}>
                          <div className='account-button'>
                            {theme == 'dark' ?
                              (
                                <img src={sendIconDark} alt="send"/>
                              ) : (
                                <img src={sendIconLight} alt="send"/>
                              )
                            }
                          </div>
                          <span className='account-button-container__text'>Send</span>
                      </KoniLink>

                      <div className='account-button-container'>
                        <div className='account-button'>
                          {theme == 'dark' ?
                            (
                              <img src={swapIconDark} alt="swap"/>
                            ) : (
                              <img src={swapIconLight} alt="swap"/>
                            )
                          }

                        </div>
                        <span className='account-button-container__text'>Swap</span>
                      </div>
                    </div>
                  </div>
                  <KoniTabs onClickAssets={_clickAssets} onClickActivity={_clickActivity}/>

                  {isBuyTokenScreenOpen && (
                    <BuyToken className='' reference={buyRef} closeModal={_closeModal}/>
                  )}

                  {isAssetsTabOpen ? (
                    <>
                      {chainBalances && !!chainBalances.length && (
                        <>
                          <div className='kn-chain-balance-item__separator'/>
                          <div className='kn-chain-balance-item__detail-area'>
                            {chainBalances.map((item) => (
                              <ChainBalanceItem item={item} key={item.key} />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <div className='overview-tab-activity'>Activity History</div>
                    </>
                  )}

                </div>
              ) : <KoniLoading />
            }
          </>
        )
      }
    </>
  );
}
export default React.memo(styled(KoniAccountOverView)(({theme}: Props) => `
  height: calc(100vh - 2px);
  overflow-y: auto;
  margin-top: -25px;
  padding-top: 10px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .overview-wrapper {
    display: flex;
    align-items: center;
    margin: 20px 20px 10px 20px;
    flex-direction: column;
  }

  .account-balance {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 4px;

    &__token {
      font-size: 24px;
      line-height: 36px;
      font-weight: 700;
    }
  }

    .account-balance__money {
      font-size: 15px;
      line-height: 26px;

      color: ${theme.textColor2};

      .kn-balance-val__symbol,
      .kn-balance-val__prefix,
      .kn-balance-val__postfix {
        font-family: ${theme.fontFamilyRegular};
      }
    }

  .account-buttons-wrapper {
    display: flex;
    align-items: center;
    margin-top: 21px;
  }

  .overview-logo {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  .account-button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 25px;
    margin-left: 25px;

    &__text {
      margin-top: 4px;
      font-size: 15px;
      line-height: 24px;
      color: ${theme.textColor2};
    }
  }

  .account-button {
    width: 52px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 40%;
    background-color: ${theme.buttonBackground1};
    cursor: pointer;
  }

  .kn-chain-balance-item__detail-area, .overview-tab-activity {
    padding: 20px 15px;
  }

`));
