// Copyright 2019-2022 @subwallet/extension-koni-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BIT44_ACCOUNT_TYPE, BIT84_ACCOUNT_TYPE, BIT86_ACCOUNT_TYPE } from '@subwallet/extension-koni-ui/constants/account';
import useTranslation from '@subwallet/extension-koni-ui/hooks/common/useTranslation';
import { ThemeProps } from '@subwallet/extension-koni-ui/types';
import { KeypairType } from '@subwallet/keyring/types';
import { Icon, Logo, SettingItem } from '@subwallet/react-ui';
import CN from 'classnames';
import { CheckCircle } from 'phosphor-react';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

interface SelectAccountTypeProps extends ThemeProps {
  selectedItems: KeypairType[];
  setSelectedItems: React.Dispatch<React.SetStateAction<KeypairType[]>>;
  withLabel?: boolean;
  label?: string;
}

interface AccountTypeItem {
  label: string;
  key: KeypairType;
  icon: string;
  onClick: () => void;
}

const defaultLabel = 'Select account type';

const Component: React.FC<SelectAccountTypeProps> = (props: SelectAccountTypeProps) => {
  const { className, label, selectedItems, setSelectedItems, withLabel = false } = props;

  const { t } = useTranslation();

  const onClickItem = useCallback((key: KeypairType): (() => void) => {
    return () => {
      setSelectedItems((prevState) => {
        const result = [...prevState];
        const exists = result.find((i) => i === key);

        if (exists) {
          return result.filter((i) => i !== key);
        } else {
          result.push(key);

          return result;
        }
      });
    };
  }, [setSelectedItems]);

  const items = useMemo((): AccountTypeItem[] => ([
    {
      icon: 'ethereum',
      key: BIT44_ACCOUNT_TYPE,
      label: BIT44_ACCOUNT_TYPE,
      onClick: onClickItem(BIT44_ACCOUNT_TYPE)
    },
    {
      icon: 'ethereum',
      key: BIT84_ACCOUNT_TYPE,
      label: BIT84_ACCOUNT_TYPE,
      onClick: onClickItem(BIT84_ACCOUNT_TYPE)
    },
    {
      icon: 'ethereum',
      key: BIT86_ACCOUNT_TYPE,
      label: BIT86_ACCOUNT_TYPE,
      onClick: onClickItem(BIT86_ACCOUNT_TYPE)
    }
  ]), [onClickItem]);

  return (
    <div className={className}>
      {withLabel && (
        <div className='label'>
          {t(label || defaultLabel)}
        </div>
      )}
      <div className='items-container'>
        {items.map((item) => {
          const _selected = selectedItems.find((i) => i === item.key);

          return (
            <div
              key={item.key}
              onClick={item.onClick}
            >
              <SettingItem
                className={CN('setting-item', { selected: _selected })}
                leftItemIcon={(
                  <Logo
                    network={item.icon}
                    shape='circle'
                    size={28}
                  />
                )}
                name={item.label}
                rightItem={(
                  <Icon
                    className={'__selected-icon'}
                    iconColor='var(--icon-color)'
                    phosphorIcon={CheckCircle}
                    size='sm'
                    weight='fill'
                  />
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SelectAccountType = styled(Component)<SelectAccountTypeProps>(({ theme: { token } }: SelectAccountTypeProps) => {
  return {
    '.label': {
      marginBottom: token.margin,
      fontSize: token.fontSizeHeading6,
      lineHeight: token.lineHeightHeading6,
      color: token.colorTextDescription,
      textAlign: 'start'
    },

    '.items-container': {
      display: 'flex',
      flexDirection: 'column',
      gap: token.sizeXS
    },

    '.setting-item': {
      '--icon-color': token['gray-4'],
      textAlign: 'start',

      '&.selected': {
        '--icon-color': token.colorSecondary
      }
    },

    '.__selected-icon': {
      paddingRight: 8
    }
  };
});

export default SelectAccountType;
