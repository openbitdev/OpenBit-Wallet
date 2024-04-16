// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BitcoinFeeDetail, TransactionFee } from '@subwallet/extension-base/types';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { BitcoinFeeOption } from '@subwallet/extension-koni-ui/types/fee';
import { Button, Field, Icon, ModalContext } from '@subwallet/react-ui';
import { PencilSimpleLine } from 'phosphor-react';
import React, { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { BitcoinFeeEditorModal } from './BitcoinFeeEditorModal';

type Props = ThemeProps & {
  feeDetail: BitcoinFeeDetail;
  onSelect: (transactionFee: TransactionFee) => void;
  isLoading?: boolean;
};

const modalId = 'BitcoinFeeSelectorId';

const Component = ({ className, feeDetail }: Props): React.ReactElement<Props> => {
  const { t } = useTranslation();
  const { activeModal } = useContext(ModalContext);
  const [selectedOption, setSelectedOption] = useState<BitcoinFeeOption>({ option: feeDetail.options.default });

  const onClickEdit = useCallback(() => {
    activeModal(modalId);
  }, [activeModal]);

  return (
    <>
      <Field
        className={className}
        content={(
          <div>
            ABCASCASC
          </div>
        )}
        label={'Transaction fee'}
        placeholder={t('Network name')}
        suffix={(
          <div>
            1.60

            <Button
              icon={
                <Icon
                  phosphorIcon={PencilSimpleLine}
                  size='sm'
                />
              }
              onClick={onClickEdit}
              size='xs'
              type='ghost'

            />
          </div>
        )}
        tooltipPlacement='topLeft'
      />

      <BitcoinFeeEditorModal
        feeDetailOptions={feeDetail.options}
        modalId={modalId}
        onSelectOption={setSelectedOption}
        selectedOption={selectedOption}
      />
    </>
  );
};

const BitcoinFeeSelector = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return ({

  });
});

export default BitcoinFeeSelector;
