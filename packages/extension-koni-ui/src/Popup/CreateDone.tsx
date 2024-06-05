// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DisclaimerModal } from '@subwallet/extension-koni-ui/components/Modal/TermsAndConditions/DisclaimerModal';
import { CONFIRM_DISCLAIMER, TERM_AND_CONDITION_DISCLAIMER_MODAL } from '@subwallet/extension-koni-ui/constants';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { Icon, ModalContext, PageIcon } from '@subwallet/react-ui';
import CN from 'classnames';
import { ArrowCircleRight, CheckCircle, X } from 'phosphor-react';
import React, { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';

import { Layout, SocialButtonGroup } from '../components';

type Props = ThemeProps;

const Component: React.FC<Props> = (props: Props) => {
  const { className } = props;
  const { activeModal } = useContext(ModalContext);
  const [isConfirmedDisclaimer, setIsConfirmedDisclaimer] = useLocalStorage(CONFIRM_DISCLAIMER, 'nonConfirmed');

  const { t } = useTranslation();

  const onClickGoHome = useCallback(() => {
    if (isConfirmedDisclaimer.includes('nonConfirmed')) {
      activeModal(TERM_AND_CONDITION_DISCLAIMER_MODAL);
    }
  }, [activeModal, isConfirmedDisclaimer]);
  const onAfterConfirmTermModal = useCallback(() => {
    setIsConfirmedDisclaimer('confirmed');
  }, [setIsConfirmedDisclaimer]);

  return (
    <Layout.WithSubHeaderOnly
      rightFooterButton={{
        children: t('Go to home'),
        onClick: onClickGoHome,
        icon: <Icon
          phosphorIcon={ArrowCircleRight}
          weight={'fill'}
        />
      }}
      showBackButton={true}
      subHeaderLeft={(
        <Icon
          phosphorIcon={X}
          size='md'
        />
      )}
      title={t('Successful')}
    >
      <div className={CN(className)}>
        <div className='page-icon'>
          <PageIcon
            color='var(--page-icon-color)'
            iconProps={{
              weight: 'fill',
              phosphorIcon: CheckCircle
            }}
          />
        </div>
        <div className='title'>
          {t('All done!')}
        </div>
        <div className='description'>
          {t('Follow along with product updates or reach out if you have any questions.')}
        </div>
        <SocialButtonGroup />
        <DisclaimerModal onOk={onAfterConfirmTermModal} />
      </div>
    </Layout.WithSubHeaderOnly>
  );
};

const CreateDone = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    textAlign: 'center',

    '.page-icon': {
      display: 'flex',
      justifyContent: 'center',
      marginTop: token.controlHeightLG,
      marginBottom: token.margin,
      '--page-icon-color': token.colorSuccess
    },

    '.title': {
      marginTop: token.margin,
      marginBottom: token.margin,
      fontWeight: token.fontWeightStrong,
      fontSize: token.fontSizeHeading3,
      lineHeight: token.lineHeightHeading3,
      color: token.colorTextLight2
    },

    '.description': {
      padding: `0 ${token.controlHeightLG - token.padding}px`,
      marginTop: token.margin,
      marginBottom: token.margin * 2,
      fontSize: token.fontSizeHeading5,
      lineHeight: token.lineHeightHeading5,
      color: token.colorTextLight3,
      textAlign: 'center'
    }
  };
});

export default CreateDone;
