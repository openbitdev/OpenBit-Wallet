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
  networkGenesisHashMap,
  overriddenChainNames,
  parseBalancesInfo
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
import LogosMap from "@polkadot/extension-ui/assets/logo";

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
  const [activatedTab, setActivatedTab] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const {network: {genesisHash, networkPrefix, networkName, icon: networkIcon}} = useContext(CurrentNetworkContext)
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
  const [isBuyTokenScreenOpen, setBuyTokenScreenOpen] = useState(false);
  const [{buyTokenScreenNetworkPrefix, buyTokenScreenNetworkName, buyTokenScreenIconTheme}, setBuyTokenScreenProps]
    = useState({
    buyTokenScreenNetworkPrefix: networkPrefix,
    buyTokenScreenNetworkName: networkName,
    buyTokenScreenIconTheme: networkIcon
  });

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
            networkName: selectedNetWork?.networkName || '',
            networkDisplayName: selectedNetWork?.text || '',
            networkLogo: LogosMap['default'],
            networkPrefix: selectedNetWork && selectedNetWork.networkPrefix != null ? selectedNetWork.networkPrefix : -1,
            networkIconTheme: 'substrate',
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
    (): void => {
      setBuyTokenScreenProps({
        buyTokenScreenNetworkPrefix: networkPrefix,
        buyTokenScreenNetworkName: networkName,
        buyTokenScreenIconTheme: networkIcon
      });
      setBuyTokenScreenOpen((isBuyTokenScreenOpen) => !isBuyTokenScreenOpen);
    },
    [networkPrefix, networkName, networkIcon]
  )

  const _closeModal = useCallback(
    (): void => setBuyTokenScreenOpen( false),
    []
  )

  return (
    <>
      {(hierarchy.length === 0)
        ? <KoniAddAccount />
        : (
          <div className={className}>
            <KoniHeader
              showAdd
              showSearch
              showSettings
              text={t<string>('Accounts')}
              isContainDetailHeader={true}
            />
            { chainBalances[0] && !isLoading ? (
                <div className={'kl-l-body'}>
                  <div className='overview-wrapper'>
                    <div className='account-balance'>
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
                      </div>
                    </div>
                  </div>

                  {isBuyTokenScreenOpen && currentAccount && (
                    <BuyToken
                      className=''
                      reference={buyRef}
                      closeModal={_closeModal}
                      address={currentAccount.address}
                      accountType={currentAccount.type}
                      accountName={currentAccount.name}
                      networkPrefix={buyTokenScreenNetworkPrefix}
                      networkName={buyTokenScreenNetworkName}
                      iconTheme={buyTokenScreenIconTheme}
                    />
                  )}

                  <KoniTabs activatedTab={activatedTab} onSelect={setActivatedTab}/>

                  <div className={'kn-l-tab-content-wrapper'}>
                    {activatedTab === 1 && (
                      <>
                        {chainBalances && !!chainBalances.length && (
                            <div className='kn-l-chains-container'>
                              <div className="kn-l-chains-container__body">
                                {chainBalances.map((item) => (
                                  <ChainBalanceItem
                                    item={item} key={item.key}
                                    setBuyTokenScreenProps={setBuyTokenScreenProps}
                                    setBuyTokenScreenOpen={setBuyTokenScreenOpen}
                                  />
                                ))}
                              </div>
                              <div className="kn-l-chains-container__footer">
                                <div>
                                  <div className="kn-l-chains-container__footer-row-1">
                                    Don't see your token?
                                  </div>
                                  <div className="kn-l-chains-container__footer-row-2">
                                    <div className="kn-l-chains-container-action">Refresh list</div>
                                    <span>&nbsp;or&nbsp;</span>
                                    <div className="kn-l-chains-container-action">import tokens</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                        )}
                      </>
                    )}
                    {activatedTab === 2 && (
                      <>
                        <div className='overview-tab-activity'>NFT</div>
                      </>
                    )}
                    {activatedTab === 3 && (
                      <>
                        <div className='overview-tab-activity'>Activity History</div>
                      </>
                    )}
                  </div>
                </div>
              ) : <KoniLoading />
            }
          </div>
        )
      }
    </>
  );
}
export default React.memo(styled(KoniAccountOverView)(({theme}: Props) => `
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  .kl-l-body {
    flex: 1;
    overflow: hidden;
    display: flex;
    margin-top: -25px;
    flex-direction: column;
  }

  .overview-wrapper {
    display: flex;
    align-items: center;
    margin: 22px 0 12px;
  }

  .account-balance {
    padding-left: 15px;
    padding-right: 10px;
    flex: 1;
  }

  .account-balance__money {
    font-size: 32px;
    font-weight: 700;
  }

  .account-buttons-wrapper {
    display: flex;
    align-items: center;
    padding-right: 10px;
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
    margin-right: 5px;
    margin-left: 5px;

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

  .kn-l-tab-content-wrapper {
    flex: 1;
    overflow: hidden;
  }

 .overview-tab-activity {
    padding: 20px 15px;
  }

  .kn-l-chains-container {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .kn-l-chains-container__body {
    overflow-y: auto;
  }

  .kn-l-chains-container__footer {
    height: 90px;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    color: ${theme.textColor2};
    display: none;
  }

  .kn-l-chains-container__footer-row-2 {
    display: flex;
  }

  .kn-l-chains-container__footer-row-2 {
    display: flex;
  }

  .kn-l-chains-container-action {
    color: #04C1B7;
    cursor: pointer;
  }
`));
