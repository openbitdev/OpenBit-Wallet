// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { YieldPositionInfo } from '@subwallet/extension-base/types';
import { Layout } from '@subwallet/extension-koni-ui/components';
import { useTranslation } from '@subwallet/extension-koni-ui/hooks';
import { EarningEntryView, ThemeProps } from '@subwallet/extension-koni-ui/types';
import { ButtonProps, Icon } from '@subwallet/react-ui';
import CN from 'classnames';
import { Plus } from 'phosphor-react';
import React, { useMemo } from 'react';
import styled from 'styled-components';

type Props = ThemeProps & {
  earningPositions: YieldPositionInfo[];
  setEntryView: React.Dispatch<React.SetStateAction<EarningEntryView>>;
}

function Component ({ className, setEntryView }: Props) {
  const { t } = useTranslation();

  const subHeaderButtons: ButtonProps[] = useMemo(() => {
    return [
      {
        icon: (
          <Icon
            phosphorIcon={Plus}
            size='sm'
            type='phosphor'
          />
        ),
        onClick: () => {
          setEntryView(EarningEntryView.OPTIONS);
        }
      }
    ];
  }, [setEntryView]);

  return (
    <Layout.Base
      className={CN(className)}
      showSubHeader={true}
      subHeaderBackground={'transparent'}
      subHeaderCenter={false}
      subHeaderIcons={subHeaderButtons}
      subHeaderPaddingVertical={true}
      title={t<string>('Your earning positions')}
    >
      Content here
    </Layout.Base>
  );
}

const EarningPositions = styled(Component)<Props>(({ theme: { token } }: Props) => ({

}));

export default EarningPositions;
