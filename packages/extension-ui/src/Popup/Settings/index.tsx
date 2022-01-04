import type {ThemeProps} from '../../types';
import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import styled, {ThemeContext} from 'styled-components';
import {
  ActionContext,
  themes, ThemeSwitchContext
} from '../../components';
import useTranslation from '../../hooks/useTranslation';
import KoniHeader from "@polkadot/extension-ui/partials/KoniHeader";
import settings from "@polkadot/ui-settings";
import {faExpand, faList} from "@fortawesome/free-solid-svg-icons";
import {Theme} from "../../types";
import useIsPopup from "@polkadot/extension-ui/hooks/useIsPopup";
import getLanguageOptions from "@polkadot/extension-ui/util/getLanguageOptions";
import {setNotification, windowOpen} from "@polkadot/extension-ui/messaging";
import KoniDropdown from "@polkadot/extension-ui/components/KoniDropdown";
import MenuItem from "@polkadot/extension-ui/components/koni/MenuItem";
import Checkbox from "@polkadot/extension-ui/components/koni/Checkbox";
import KoniActionText from "@polkadot/extension-ui/components/KoniActionText";
import KoniMenuDivider from "@polkadot/extension-ui/components/KoniMenuDivider";
import HorizontalLabelToggle from "@polkadot/extension-ui/koni/react-components/HorizontalLabelToggle";

interface Props extends ThemeProps {
  className?: string;
}

// interface Option {
//   text: string;
//   value: string;
// }

// const prefixOptions = settings.availablePrefixes
//   .filter(({ value }) => value !== -1)
//   .map(({ text, value }): Option => ({ text, value: `${value}` }));

const notificationOptions = ['Extension', 'PopUp', 'Window']
  .map((item) => ({ text: item, value: item.toLowerCase() }));

function KoniSettings({className}: Props): React.ReactElement {
  const { t } = useTranslation();
  const [camera, setCamera] = useState(settings.camera === 'on');
  const [notification, updateNotification] = useState(settings.notification);
  const themeContext = useContext(ThemeContext as React.Context<Theme>);
  const setTheme = useContext(ThemeSwitchContext);
  const isPopup = useIsPopup();
  const languageOptions = useMemo(() => getLanguageOptions(), []);
  const onAction = useContext(ActionContext);

  useEffect(() => {
    settings.set({ camera: camera ? 'on' : 'off' });
  }, [camera]);

  const _onChangeNotification = useCallback(
    (value: string): void => {
      setNotification(value).catch(console.error);

      updateNotification(value);
      settings.set({ notification: value });
    },
    []
  );

  const _onChangeTheme = useCallback(
    (checked: boolean): void => setTheme(checked ? 'dark' : 'light'),
    [setTheme]
  );

  const _onWindowOpen = useCallback(
    () => windowOpen('/').catch(console.error),
    []
  );

  const _onChangeLang = useCallback(
    (value: string): void => {
      settings.set({ i18nLang: value });
    },
    []
  );

  const _goToAuthList = useCallback(
    () => {
      onAction('auth-list');
    }, [onAction]
  );


  return (
    <>
      <div className={className}>
        <KoniHeader
          showBackArrow
          showSubHeader
          subHeaderName='Setting'
        />
        <MenuItem
          className='setting'
          title='Theme'
        >
          <HorizontalLabelToggle
            checkedLabel={t<string>('Dark')}
            uncheckedLabel={t<string>('Light')}
            value={themeContext.id === themes.dark.id}
            className='kn-theme-setting'
            toggleFunc={_onChangeTheme}
          />
        </MenuItem>
        <MenuItem
          className='setting'
          title={t<string>('Language')}
        >
          <KoniDropdown
            className='dropdown'
            label=''
            onChange={_onChangeLang}
            options={languageOptions}
            value={settings.i18nLang}
          />
        </MenuItem>
        <MenuItem
          className='setting'
          title={t<string>('Notifications')}
        >
          <KoniDropdown
            className='dropdown'
            label=''
            onChange={_onChangeNotification}
            options={notificationOptions}
            value={notification}
          />
        </MenuItem>
        {/*</div>*/}

        <MenuItem
          className='setting'
          title={t<string>('External accounts and Access')}
        >
          <Checkbox
            checked={camera}
            className='checkbox camera'
            label={t<string>('Allow QR Camera Access')}
            onChange={setCamera}
          />
        </MenuItem>
        <KoniMenuDivider className='settings-menu-divider'/>
        <MenuItem className='setting'>
          <KoniActionText
            className='manage-website-access'
            icon={faList}
            onClick={_goToAuthList}
            text={t<string>('Manage Website Access')}
          />
        </MenuItem>
        {isPopup && (
          <MenuItem className='setting'>
            <KoniActionText
              className='openWindow'
              icon={faExpand}
              onClick={_onWindowOpen}
              text={t<string>('Open extension in new window')}
            />
          </MenuItem>
        )}
      </div>
    </>
  );
}

export default styled(KoniSettings)(({ theme }: Props) => `
  margin-top: -25px;
  padding-top: 25px;

  .kn-theme-setting {
    .kn-label {
      font-size: 18px;
      line-height: 30px;
    }
  }

  .menu-items-wrapper {
    display: flex;
    align-items: center;
  }

  .settings-menu-divider {
    padding-top: 0;
  }

  .manage-website-access, .openWindow {
    > span {
      font-size: 16px;
      line-height: 26px;
      color: ${theme.textColor2};
      font-family: ${theme.fontFamilyRegular};
    }
  }

  .checkbox {
    margin: 6px 0 14px 0;
  }

  // .setting {
  //   > span {
  //     font-size: 16px;
  //     line-height: 26px;
  //   }
  // }

  &::-webkit-scrollbar {
    display: none;
  }
`);
