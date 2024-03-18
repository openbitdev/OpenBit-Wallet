// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CREATE_ACCOUNT_MODAL, NEW_SEED_MODAL } from '@subwallet/extension-koni-ui/constants';
import { useTranslation } from '@subwallet/extension-koni-ui/hooks';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { ModalContext } from '@subwallet/react-ui';
import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';

import AccountTypeModal from './AccountTypeModal';

type Props = ThemeProps;

const modalId = NEW_SEED_MODAL;

const Component: React.FC<Props> = ({ className }: Props) => {
  const { t } = useTranslation();

  const { activeModal, inactiveModal } = useContext(ModalContext);

  const onBack = useCallback(() => {
    inactiveModal(modalId);
    activeModal(CREATE_ACCOUNT_MODAL);
  }, [activeModal, inactiveModal]);

  return (
    <AccountTypeModal
      className={className}
      id={modalId}
      label={t('Confirm')}
      onBack={onBack}
      url={'/accounts/new-seed-phrase'}
    />
  );
};

const NewSeedModal = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {};
});

export default NewSeedModal;
