// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { IMPORT_SEED_MODAL } from '@subwallet/extension-koni-ui/constants';
import { useGoBackSelectAccount, useTranslation } from '@subwallet/extension-koni-ui/hooks';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { FileArrowDown } from 'phosphor-react';
import React from 'react';
import styled from 'styled-components';

import AccountTypeModal from './AccountTypeModal';

type Props = ThemeProps;

const modalId = IMPORT_SEED_MODAL;

const Component: React.FC<Props> = ({ className }: Props) => {
  const { t } = useTranslation();

  const onBack = useGoBackSelectAccount(modalId);

  return (
    <AccountTypeModal
      className={className}
      icon={FileArrowDown}
      id={modalId}
      label={t('Import account')}
      onBack={onBack}
      url={'/accounts/import-seed-phrase'}
    />
  );
};

const ImportSeedModal = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {};
});

export default ImportSeedModal;
