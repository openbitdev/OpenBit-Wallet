import { Theme, ThemeProps } from '../../types';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import buyIconDark from '../../assets/buy-icon-dark.svg';
import buyIconLight from '../../assets/buy-icon-light.svg';
import sendIconDark from '../../assets/send-icon-dark.svg';
import sendIconLight from '../../assets/send-icon-light.svg';
import swapIconDark from '../../assets/swap-icon-dark.svg';
import swapIconLight from '../../assets/swap-icon-light.svg';
import { AccountContext, CurrentAccountContext, CurrentNetworkContext } from '../../components';
import useTranslation from '../../hooks/useTranslation';
import KoniHeader from '@polkadot/extension-ui/partials/KoniHeader';
import KoniTabs from '@polkadot/extension-ui/components/KoniTabs';
import BuyToken from '@polkadot/extension-ui/partials/BuyToken';
import KoniAddAccount from '@polkadot/extension-ui/Popup/Accounts/KoniAddAccount';
import { AccountInfoByNetwork, BalanceInfo } from '@polkadot/extension-ui/util/koni/types';
import { BalanceVal } from '@polkadot/extension-ui/components/koni/balance';
import useGenesisHashOptions from '@polkadot/extension-ui/hooks/useGenesisHashOptions';
import BigN from 'bignumber.js';
import { AccountJson, BackgroundWindow, CurrentNetworkInfo } from '@polkadot/extension-base/background/types';
import KoniLink from '@polkadot/extension-ui/components/KoniLink';
import NETWORKS from '@polkadot/extension-base/background/pDotApi/networks';
import { getLogoByGenesisHash } from '@polkadot/extension-ui/util/koni/logoByGenesisHashMap';
import reformatAddress from '@polkadot/extension-ui/util/koni/reformatAddress';
import { KeypairType } from '@polkadot/util-crypto/types';
import ChainBalancePlaceholderItem
  from '@polkadot/extension-ui/components/koni/chainBalance/ChainBalancePlaceholderItem';
import ChainBalanceItem from '@polkadot/extension-ui/components/koni/chainBalance/ChainBalanceItem';
import { getTokenPrice, parseBalancesInfo, priceParamByNetworkNameMap } from '@polkadot/extension-ui/util/koni';

const bWindow = chrome.extension.getBackgroundPage() as BackgroundWindow;
const {apisMap} = bWindow.pdotApi;

interface WrapperProps extends ThemeProps {
  className?: string;
}

interface Props extends ThemeProps {
  className?: string;
  currentAccount: AccountJson;
  network: CurrentNetworkInfo;
}


// function allSkippingErrors(promises: Promise<any>[]) {
//   return Promise.all(
//       promises.map((p: Promise<any>) => p.catch(error => null))
//   )
// }

function getShowedNetworks(genesisOptions: any[], networkName: string): string[] {
  if (!networkName) {
    return [];
  }

  if (networkName === 'all') {
    return genesisOptions.filter(i => (i.networkName) && (i.networkName !== 'all')).map(i => i.networkName);
  }

  return [networkName];
}

function getAccountInfoByNetwork(address: string, networkName: string, accountType?: KeypairType): AccountInfoByNetwork {
  const networkInfo = NETWORKS[networkName];

  return {
    key: networkName,
    networkName,
    networkDisplayName: networkInfo.chain,
    networkPrefix: networkInfo.ss58Format,
    networkLogo: getLogoByGenesisHash(networkInfo.genesisHash),
    networkIconTheme: networkInfo.icon || 'substrate',
    address: reformatAddress(address, networkInfo.ss58Format, accountType)
    // address: ''
  }
}

function getAccountInfoByNetworkMap(address: string, networkNames: string[], accountType?: KeypairType): Record<string, AccountInfoByNetwork> {
  const result: Record<string, AccountInfoByNetwork> = {};

  networkNames.forEach(n => {
    result[n] = getAccountInfoByNetwork(address, n, accountType);
  });

  return result;
}

function Wrapper({className, theme}: WrapperProps): React.ReactElement {
  const {hierarchy} = useContext(AccountContext);
  const {currentAccount} = useContext(CurrentAccountContext);
  const {network} = useContext(CurrentNetworkContext);

  if (!hierarchy.length) {
    return (<KoniAddAccount/>);
  }

  if(!currentAccount
    || (currentAccount.genesisHash
      && (currentAccount.genesisHash !== network.genesisHash))) {
    return (<></>);
  }

  return (<KoniAccountOverView
    className={className}
    currentAccount={currentAccount}
    network={network}
    theme={theme} />);
}

function KoniAccountOverView({className, currentAccount, network}: Props): React.ReactElement {
  const {t} = useTranslation();
  const {address} = currentAccount;
  const [activatedTab, setActivatedTab] = useState(1);
  // map of the loaded network balances
  const {networkPrefix, networkName, icon: networkIcon} = network;
  const buyRef = useRef(null);
  const themeContext = useContext(ThemeContext as React.Context<Theme>);
  const theme = themeContext.id;
  const genesisOptions = useGenesisHashOptions();
  const [chainBalanceMaps, setChainBalanceMaps] = useState<Record<string, BalanceInfo>>({});
  const [isBuyTokenScreenOpen, setBuyTokenScreenOpen] = useState(false);
  const [{buyTokenScreenNetworkPrefix, buyTokenScreenNetworkName, buyTokenScreenIconTheme}, setBuyTokenScreenProps]
      = useState({
    buyTokenScreenNetworkPrefix: networkPrefix,
    buyTokenScreenNetworkName: networkName,
    buyTokenScreenIconTheme: networkIcon
  });
  const [tokenPrices, setTokenPrices] = useState<any[]>([]);
  const [totalValue, setTotalValue] = useState<BigN>(new BigN(0));

  const showedNetworks: string[] = useMemo(() => {
    return getShowedNetworks(genesisOptions, networkName);
  }, [networkName, genesisOptions]);

  const accountInfoByNetworkMap = useMemo(() => {
    return getAccountInfoByNetworkMap(address, showedNetworks, currentAccount?.type);
  }, [showedNetworks, genesisOptions, address]);

  useEffect(() => {
    if (!genesisOptions || !genesisOptions.length) {
      return;
    }

    const priceParams: string[] = [];
    const allNetworks = getShowedNetworks(genesisOptions, 'all');

    allNetworks.forEach(networkName => {
      if (priceParamByNetworkNameMap[networkName]) {
        priceParams.push(priceParamByNetworkNameMap[networkName]);
      }
    });

    getTokenPrice(priceParams.toString()).then(res => {
      if (res) {
        // res.push({'symbol': 'unit', current_price: '1'});

        setTokenPrices(res);
      } else {
        setTokenPrices([]);
      }
    })

  }, [genesisOptions]);

  useEffect(() => {
      if (!tokenPrices || !tokenPrices.length) {
        return;
      }

      const unsubMap: Record<string, any> = {};
      const syncMap: Record<string, boolean> = {};

      showedNetworks.forEach(networkName => {
        syncMap[networkName] = true;
      });

      showedNetworks.forEach(async networkName => {
        const apiInfo = apisMap[networkName];

        if (!apiInfo.isApiReady) {
          await apiInfo.isReady;
        }

        const {api} = apiInfo;

        unsubMap[networkName] = await api.query.system.account(address, ({data: balance, nonce: nonce, registry}) => {
          if (syncMap[networkName]) {
            setChainBalanceMaps(chainBalanceMaps => ({
              ...chainBalanceMaps,
              [networkName]: parseBalancesInfo(tokenPrices, {
                network: networkName,
                tokenDecimals: registry.chainDecimals,
                tokenSymbol: registry.chainTokens,
                info: {
                  [registry.chainTokens[0]]: {
                    totalBalance: balance.free.toString(),
                    freeBalance: balance.free.toString(),
                    frozenFee: balance.feeFrozen.toString(),
                    reservedBalance: balance.reserved.toString(),
                    frozenMisc: balance.miscFrozen.toString(),
                  }
                }
              })
            }));
          }
        });
      });

      return () => {
        Object.keys(unsubMap).forEach(networkName => {
          unsubMap[networkName]();
        });

        Object.keys(syncMap).forEach(networkName => {
          syncMap[networkName] = false;
        });

        setChainBalanceMaps({});
      }
    },
    [tokenPrices, networkName, address]);

  useEffect(() => {
    let totalValue = new BigN(0);

    Object.keys(chainBalanceMaps).forEach(networkName => {
      totalValue = totalValue.plus(chainBalanceMaps[networkName].totalValue);
    });

    setTotalValue(totalValue);
  }, [chainBalanceMaps]);

  const renderChainBalanceItem = (network: string) => {
    const info = accountInfoByNetworkMap[network];

    if (chainBalanceMaps[network]) {
      return (
        <ChainBalanceItem
          accountInfo={info} key={info.key}
          balanceInfo={chainBalanceMaps[network]}
          setBuyTokenScreenProps={setBuyTokenScreenProps}
          setBuyTokenScreenOpen={setBuyTokenScreenOpen}
        />
      );
    } else {
      return (
        <ChainBalancePlaceholderItem
          accountInfo={info} key={info.key}
          setBuyTokenScreenProps={setBuyTokenScreenProps}
          setBuyTokenScreenOpen={setBuyTokenScreenOpen}
        />
      );
    }
  };

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
  );

  const _closeModal = useCallback(
      (): void => setBuyTokenScreenOpen(false),
      []
  );

  return (
      <>
        <div className={className}>
          <KoniHeader
              showAdd
              showSearch
              showSettings
              text={t<string>('Accounts')}
              isContainDetailHeader={true}
          />
          <div className={'kl-l-body'}>
            <div className='overview-wrapper'>
              <div className='account-balance'>
                  <span className='account-balance__money'>
                    <BalanceVal value={totalValue} symbol={'$'} startWithSymbol/>
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
                    address={address}
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
                    {showedNetworks && (
                        <div className='kn-l-chains-container'>
                          <div className="kn-l-chains-container__body">
                            {showedNetworks.map((item) => renderChainBalanceItem(item))}
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
        </div>
      </>
  );
}

export default React.memo(styled(Wrapper)(({theme}: WrapperProps) => `
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
    max-height: 100%;
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
