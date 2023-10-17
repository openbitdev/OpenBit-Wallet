// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NominatorMetadata, StakingRewardItem, StakingStatus, YieldAssetBalance, YieldPoolInfo, YieldPoolType, YieldPositionInfo } from '@subwallet/extension-base/background/KoniTypes';
import { getYieldAvailableActionsByPosition, getYieldAvailableActionsByType, YieldAction } from '@subwallet/extension-base/koni/api/staking/bonding/utils';
import { _getAssetDecimals, _getAssetSymbol } from '@subwallet/extension-base/services/chain-service/utils';
import { StakingStatusUi } from '@subwallet/extension-koni-ui/constants';
import { useSelector, useTranslation } from '@subwallet/extension-koni-ui/hooks';
import { RootState } from '@subwallet/extension-koni-ui/stores';
import { PhosphorIcon, Theme, ThemeProps } from '@subwallet/extension-koni-ui/types';
import { Button, ButtonProps, Icon, Logo, Number, Typography, Web3Block } from '@subwallet/react-ui';
import { MinusCircle, PlusCircle, PlusMinus, Question, StopCircle, Wallet } from 'phosphor-react';
import React, { useCallback, useMemo } from 'react';
import styled, { useTheme } from 'styled-components';

import MetaInfo from '../MetaInfo/MetaInfo';
import EarningTypeTag from './EarningTypeTag';

interface Props extends ThemeProps {
  onClickCalculatorBtn: () => void;
  onClickCancelUnStakeBtn: () => void;
  onClickClaimBtn: () => void;
  onClickItem?: () => void;
  onClickInfoBtn: () => void;
  onClickStakeBtn: () => void;
  onClickUnStakeBtn: () => void;
  onClickWithdrawBtn: () => void;
  yieldPoolInfo: YieldPoolInfo;
  yieldPositionInfo: YieldPositionInfo;
  nominationPoolReward?: StakingRewardItem;
}

interface ButtonOptionProps {
  icon: PhosphorIcon;
  label?: string;
  tooltip?: string;
  key: string;
  onClick?: React.MouseEventHandler;
  disable: boolean;
  hidden: boolean;
  schema?: ButtonProps['schema'];
}

const Component: React.FC<Props> = (props: Props) => {
  const { className,
    nominationPoolReward,
    onClickCalculatorBtn,
    onClickCancelUnStakeBtn,
    onClickClaimBtn,
    onClickInfoBtn,
    onClickItem,
    onClickStakeBtn,
    onClickUnStakeBtn,
    onClickWithdrawBtn,
    yieldPoolInfo,
    yieldPositionInfo } = props;

  const { t } = useTranslation();
  const { token } = useTheme() as Theme;
  const { chain, description, name, type } = yieldPoolInfo;

  const nominatorMetadata = useMemo((): NominatorMetadata | undefined => {
    if (![YieldPoolType.NOMINATION_POOL, YieldPoolType.NATIVE_STAKING].includes(yieldPoolInfo.type)) {
      return;
    }

    return yieldPositionInfo.metadata as NominatorMetadata;
  }, [yieldPoolInfo.type, yieldPositionInfo.metadata]);

  const yieldPositionInfoBalance = useMemo((): YieldAssetBalance => {
    if (!yieldPoolInfo.derivativeAssets) {
      return yieldPositionInfo.balance[0];
    }

    const derivativeTokenBalance = yieldPositionInfo.balance[0].totalBalance;
    const inputTokenSlug = yieldPoolInfo.inputAssets[0];
    // @ts-ignore
    const exchangeRate = yieldPoolInfo?.stats?.assetEarning[0]?.exchangeRate || 1;
    const inputTokenBalance = Math.floor(parseInt(derivativeTokenBalance) * exchangeRate);

    return {
      activeBalance: inputTokenBalance.toString(),
      slug: inputTokenSlug,
      totalBalance: inputTokenBalance.toString()
    };
  }, [yieldPoolInfo.derivativeAssets, yieldPoolInfo.inputAssets, yieldPoolInfo?.stats?.assetEarning, yieldPositionInfo.balance]);

  const assetRegistry = useSelector((state: RootState) => state.assetRegistry.assetRegistry);
  const inputTokenInfo = useMemo(() => assetRegistry[yieldPositionInfoBalance.slug], [assetRegistry, yieldPositionInfoBalance]);

  const getStakingStatus = useMemo(() => {
    if (!nominatorMetadata) {
      return StakingStatusUi.active;
    }

    if (nominatorMetadata.status === StakingStatus.EARNING_REWARD) {
      return StakingStatusUi.active;
    }

    if (nominatorMetadata.status === StakingStatus.PARTIALLY_EARNING) {
      return StakingStatusUi.partialEarning;
    }

    if (nominatorMetadata.status === StakingStatus.WAITING) {
      return StakingStatusUi.waiting;
    }

    return StakingStatusUi.inactive;
  }, [nominatorMetadata]);

  const onClickButton = useCallback((callback: VoidFunction): React.MouseEventHandler => {
    return (event) => {
      event.stopPropagation();
      callback();
    };
  }, []);

  const availableActionsByMetadata = useMemo(() => {
    return getYieldAvailableActionsByPosition(yieldPositionInfo, yieldPoolInfo, nominationPoolReward?.unclaimedReward);
  }, [nominationPoolReward?.unclaimedReward, yieldPoolInfo, yieldPositionInfo]);

  const buttons = useMemo((): ButtonOptionProps[] => {
    const result: ButtonOptionProps[] = [];

    // Calculator
    result.push({
      disable: false,
      icon: PlusMinus,
      onClick: onClickButton(onClickCalculatorBtn),
      key: 'calculator',
      hidden: false,
      schema: 'secondary',
      tooltip: t('Earning calculator')
    });

    // Info
    result.push({
      disable: false,
      icon: Question,
      onClick: onClickButton(onClickInfoBtn),
      key: 'info',
      hidden: false,
      schema: 'secondary',
      tooltip: t('FAQs')
    });

    const actionListByChain = getYieldAvailableActionsByType(yieldPoolInfo);

    actionListByChain.forEach((item) => {
      const temp: ButtonOptionProps = {
        disable: !availableActionsByMetadata.includes(item),
        key: item,
        hidden: false
      } as ButtonOptionProps;

      switch (item) {
        case YieldAction.STAKE:
          temp.icon = PlusCircle;
          temp.label = t('Stake now');
          temp.onClick = onClickButton(onClickStakeBtn);
          break;
        case YieldAction.CLAIM_REWARD:
          temp.icon = Wallet;
          temp.onClick = onClickButton(onClickClaimBtn);
          temp.label = t('Claim rewards');
          break;
        case YieldAction.WITHDRAW:
        case YieldAction.WITHDRAW_EARNING:
          temp.icon = StopCircle;
          temp.onClick = onClickButton(onClickWithdrawBtn);
          temp.label = t('Withdraw');
          temp.schema = 'secondary';
          break;
        case YieldAction.UNSTAKE:
          temp.icon = MinusCircle;
          temp.onClick = onClickButton(onClickUnStakeBtn);
          temp.label = t('Unstake');
          temp.schema = 'secondary';
          break;
        case YieldAction.CANCEL_UNSTAKE:
          temp.icon = MinusCircle;
          temp.onClick = onClickButton(onClickCancelUnStakeBtn);
          temp.label = t('Cancel unstake');
          temp.schema = 'secondary';
          break;
        case YieldAction.START_EARNING:
          temp.icon = PlusCircle;
          temp.onClick = onClickButton(onClickStakeBtn);
          temp.label = t('Earn now');
          break;
      }

      result.push(temp);
    });

    return result;
  }, [availableActionsByMetadata, onClickButton, onClickCalculatorBtn, onClickCancelUnStakeBtn, onClickInfoBtn, onClickStakeBtn, onClickUnStakeBtn, onClickWithdrawBtn, onClickClaimBtn, t, yieldPoolInfo]);

  const derivativeTokenState = useMemo(() => {
    if (!yieldPoolInfo.derivativeAssets) {
      return;
    }

    const derivativeTokenSlug = yieldPoolInfo.derivativeAssets[0];

    const derivativeTokenInfo = assetRegistry[derivativeTokenSlug];

    return {
      symbol: _getAssetSymbol(derivativeTokenInfo),
      decimals: _getAssetDecimals(derivativeTokenInfo),
      amount: yieldPositionInfo.balance[0].totalBalance
    };
  }, [assetRegistry, yieldPoolInfo.derivativeAssets, yieldPositionInfo.balance]);

  return (
    <Web3Block
      className={className}
      leftItem={(
        <Logo
          network={chain}
          size={64}
        />
      )}
      middleItem={(
        <>
          <>
            <div className={'earning-item-name-wrapper'}>
              <div className={'earning-item-name'}>{name}</div>
              <EarningTypeTag type={type} />
            </div>

            <div className={'earning-item-description'}>{description}</div>
          </>

          <div className='earning-item-footer'>
            {buttons.map((item) => {
              return (
                <Button
                  className='earning-action'
                  disabled={item.disable}
                  icon={(
                    <Icon
                      className={'earning-item-stake-btn'}
                      phosphorIcon={item.icon}
                      size='sm'
                      weight='fill'
                    />
                  )}
                  key={item.key}
                  onClick={item.onClick}
                  schema={item.schema}
                  shape='circle'
                  size='xs'
                  tooltip={item.tooltip}
                >
                  {item.label}
                </Button>
              );
            })}
          </div>
        </>
      )}
      onClick={onClickItem}
      rightItem={(
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <MetaInfo>
            <MetaInfo.Status
              className={'earning-status-item'}
              statusIcon={getStakingStatus.icon}
              statusName={t(getStakingStatus.name)}
              valueColorSchema={getStakingStatus.schema}
            />
          </MetaInfo>
          <Number
            decimal={inputTokenInfo ? inputTokenInfo.decimals || 0 : 0}
            decimalOpacity={0.4}
            size={30}
            suffix={inputTokenInfo ? inputTokenInfo.symbol : ''}
            unitOpacity={0.4}
            value={yieldPositionInfoBalance.totalBalance} // TODO
          />

          {/* TODO: move to a useCallBack */}
          {
            derivativeTokenState && <div style={{ display: 'flex', alignItems: 'center', gap: token.paddingXXS }}>
              <Typography.Text style={{ color: token.colorTextLight4 }}>{t('Equivalent to:')}</Typography.Text>
              <Number
                decimal={derivativeTokenState.decimals}
                decimalColor={token.colorSuccess}
                intColor={token.colorSuccess}
                suffix={derivativeTokenState.symbol}
                unitColor={token.colorSuccess}
                value={derivativeTokenState.amount}
              />
            </div>
          }

          {
            yieldPoolInfo.type === YieldPoolType.NOMINATION_POOL && nominationPoolReward && <div style={{ display: 'flex', alignItems: 'center', gap: token.paddingXXS }}>
              <Typography.Text style={{ color: token.colorTextLight4 }}>{t('Unclaimed rewards:')}</Typography.Text>
              <Number
                decimal={_getAssetDecimals(inputTokenInfo)}
                decimalColor={token.colorSuccess}
                intColor={token.colorSuccess}
                suffix={_getAssetSymbol(inputTokenInfo)}
                unitColor={token.colorSuccess}
                value={nominationPoolReward?.unclaimedReward || '0'}
              />
            </div>
          }
        </div>
      )}
    />
  );
};

const HorizontalEarningItem = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return ({
    backgroundColor: token.colorBgSecondary,
    borderRadius: token.borderRadiusLG,
    padding: `${token.paddingXL}px ${token.paddingMD}px ${token.padding}px`,

    '.earning-item-name-wrapper': {
      display: 'flex',
      alignItems: 'center',
      gap: token.paddingSM,
      paddingBottom: token.paddingXS
    },

    '.earning-item-name': {
      fontSize: token.fontSizeHeading4,
      lineHeight: token.lineHeightHeading4,
      fontWeight: 600,
      color: token.colorTextLight1
    },

    '.earning-item-description': {
      fontSize: token.fontSizeSM,
      lineHeight: token.lineHeightSM,
      fontWeight: 500,
      color: token.colorTextLight4
    },

    '.earning-item-reward': {
      display: 'flex',
      alignItems: 'flex-end',
      gap: token.paddingSM
    },

    '.earning-item-total-value-staked': {
      fontSize: token.fontSize,
      lineHeight: token.lineHeight,
      color: token.colorTextLight4
    },

    '.earning-item-reward-sub-text': {
      fontSize: token.fontSizeLG,
      lineHeight: token.lineHeightLG,
      color: token.colorTextLight4,
      paddingBottom: 6
    },

    '.earning-item-icon-btn': {
      border: `2px solid ${token.colorBgBorder}`,
      borderRadius: '50%'
    },

    '.earning-item-footer': {
      display: 'flex',
      gap: token.padding,
      paddingTop: token.paddingLG,
      paddingBottom: token.paddingXS
    },

    '.earning-item-stake-btn': {
      width: token.sizeMD,
      height: token.sizeMD
    },

    '& > .ant-web3-block-left-item': {
      alignItems: 'flex-start'
    },

    '& > .ant-web3-block-right-item': {
      marginRight: 0,
      alignItems: 'flex-start'
    },

    '.earning-status-item': {
      display: 'block'
    },

    '.earning-action': {
      '&.ant-btn-default.-schema-secondary': {
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: token.colorBgBorder,

        '&:hover:not(:disabled)': {
          borderColor: token['gray-2']
        }
      }
    }
  });
});

export default HorizontalEarningItem;