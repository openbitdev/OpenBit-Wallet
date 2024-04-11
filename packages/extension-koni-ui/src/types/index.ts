// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NotificationType } from '@subwallet/extension-base/background/KoniTypes';
import { AccountJson } from '@subwallet/extension-base/background/types';
import { ButtonSchema } from '@subwallet/react-ui/es/button/button';
import { Icon as _PhosphorIcon, IconProps } from 'phosphor-react';
import React from 'react';

import { Theme as _Theme } from '../themes';
import {_ChainAsset} from '@subwallet/chain-list/types';

export type Theme = _Theme;
export type PhosphorIcon = _PhosphorIcon;

export type VoidFunction = () => void;
export type AlertDialogButtonProps = {
  text: string,
  onClick: VoidFunction,
  schema?: ButtonSchema,
  icon?: PhosphorIcon,
  iconWeight?: IconProps['weight']
}

export type AlertDialogProps = {
  title: string,
  type?: NotificationType,
  closable?: boolean,
  content: React.ReactNode,
  cancelButton?: AlertDialogButtonProps,
  okButton: AlertDialogButtonProps,
};

export type AccountType = 'ALL' | 'ETHEREUM' | 'SUBSTRATE' | 'BITCOIN_MAINNET' | 'BITCOIN_TESTNET' | 'UNSUPPORTED';

export interface ThemeProps {
  theme: _Theme;
  className?: string;
}

export interface Recoded {
  account: AccountJson | null;
  formatted: string | null;
  genesisHash?: string | null;
  originGenesisHash?: string | null;
  prefix?: number;
  isEthereum: boolean;
}

export interface Signed {
  data: Uint8Array;
  message: Uint8Array;
  signature: Uint8Array;
}

export interface SigData {
  signature: `0x${string}`;
}

export type ReceiveTokenItemType = _ChainAsset & {
  address: string;
};

export * from './account';
export * from './balance';
export * from './buy';
export * from './chain';
export * from './confirmation';
export * from './crowdloan';
export * from './form';
export * from './history';
export * from './hook';
export * from './ledger';
export * from './navigation';
export * from './staking';
export * from './transaction';
export * from './walletConnect';
export * from './earning';
