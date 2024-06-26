// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CREATE_ACCOUNT_MODAL, SELECT_ACCOUNT_MODAL } from '@subwallet/extension-koni-ui/constants';
import { useTranslation } from '@subwallet/extension-koni-ui/hooks';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { Button, Icon, ModalContext } from '@subwallet/react-ui';
import { FileArrowDown, PlusCircle } from 'phosphor-react';
import React, { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type Props = ThemeProps;

const Component: React.FC<Props> = ({ className }: Props) => {
  const { t } = useTranslation();
  const { activeModal, inactiveModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const openModal = useCallback((id: string) => {
    inactiveModal(SELECT_ACCOUNT_MODAL);
    activeModal(id);
  }, [activeModal, inactiveModal]);

  const openCreateAccount = useCallback(() => {
    openModal(CREATE_ACCOUNT_MODAL);
  }, [openModal]);

  const openImportAccount = useCallback(() => {
    navigate('/accounts/import-seed-phrase');
  }, [navigate]);

  return (
    <div className={className}>
      <Button
        block={true}
        icon={(
          <Icon
            phosphorIcon={PlusCircle}
            weight={'fill'}
          />
        )}
        onClick={openCreateAccount}
        schema='secondary'
      >
        {t('Create a new account')}
      </Button>
      <Button
        className='btn-min-width'
        icon={(
          <Icon
            phosphorIcon={FileArrowDown}
            weight={'fill'}
          />
        )}
        onClick={openImportAccount}
        schema='secondary'
        tooltip={t('Import account')}
      />
    </div>
  );
};

const SelectAccountFooter = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    display: 'flex',

    '.btn-min-width': {
      minWidth: token.controlHeightLG + token.sizeSM
    }
  };
});

export default SelectAccountFooter;
