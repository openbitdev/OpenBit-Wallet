// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { GithubLogo, PaperPlaneTilt, XLogo } from '@phosphor-icons/react';
import { GithubLogoSVG } from '@subwallet/extension-koni-ui/components/Logo';
import { GITHUB_URL, TELEGRAM_URL, TWITTER_URL } from '@subwallet/extension-koni-ui/constants';
import { PhosphorIcon, ThemeProps } from '@subwallet/extension-koni-ui/types';
import { openInNewTab } from '@subwallet/extension-koni-ui/utils';
import { Button, Icon } from '@subwallet/react-ui';
import CN from 'classnames';
import React from 'react';
import styled from 'styled-components';

type Props = ThemeProps;

enum SocialType {
  TWITTER = 'twitter',
  DISCORD = 'discord',
  TELEGRAM = 'telegram',
  GITHUB = 'github',
}

interface SocialItem {
  icon: PhosphorIcon;
  type: SocialType;
  url: string;
}

const items: SocialItem[] = [
  {
    icon: XLogo,
    type: SocialType.TWITTER,
    url: TWITTER_URL
  },
  {
    icon: GithubLogo,
    type: SocialType.GITHUB,
    url: GITHUB_URL
  },
  {
    icon: PaperPlaneTilt,
    type: SocialType.TELEGRAM,
    url: TELEGRAM_URL
  }
];

const Component: React.FC<Props> = (props: Props) => {
  const { className } = props;

  return (
    <div className={CN(className, 'button-group')}>
      {
        items.map((item, index) => (
          item.type === SocialType.GITHUB
            ? (
              <Button
                className={CN(`type-${item.type}`)}
                icon={(
                  <Icon
                    customIcon={(
                      <GithubLogoSVG
                        height='1em'
                        width='1em'
                      />
                    )}
                    type='customIcon'
                    iconColor={'#fff'}
                  />

                )}
                key={item.type}
                onClick={openInNewTab(item.url)}
                shape='squircle'
                size={'sm'}
              />
            )
            : (
              <Button
                className={CN(`type-${item.type}`)}
                icon={(
                  <Icon
                    iconColor={'#fff'}
                    phosphorIcon={item.icon}
                    size={'md'}
                    weight={(item.type === SocialType.TELEGRAM) ? 'fill' : undefined}
                  />
                )}
                key={item.type}
                onClick={openInNewTab(item.url)}
                shape='squircle'
                size={'sm'}
              />
            )
        ))
      }
    </div>
  );
};

const SocialButtonGroup = styled(Component)<Props>(({ theme: { token } }: Props) => {
  return {
    '&.button-group': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: token.size
    },

    [`.type-${SocialType.TWITTER}`]: {
      backgroundColor: token.colorBgInput,

      '&:hover': {
        backgroundColor: token.colorWarning
      }
    },

    [`.type-${SocialType.GITHUB}`]: {
      backgroundColor: token.colorBgInput,

      '&:hover': {
        backgroundColor: token.colorWarning
      }
    },

    [`.type-${SocialType.TELEGRAM}`]: {
      backgroundColor: token.colorBgInput,

      '&:hover': {
        backgroundColor: token.colorWarning
      }
    }
  };
});

export default SocialButtonGroup;
