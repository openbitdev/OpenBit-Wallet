import type {ThemeProps} from '../types';

import React, {useCallback, useContext, useState} from 'react';
import {RouteComponentProps, withRouter} from 'react-router';
import styled from 'styled-components';

import {AccountContext, ActionContext} from '../components';
import useTranslation from '../hooks/useTranslation';
import {forgetAccount} from '../messaging';
import KoniHeader from "@polkadot/extension-ui/partials/KoniHeader";
import KoniAccountInfo from "@polkadot/extension-ui/components/KoniAccountInfo";
import KoniWarning from "@polkadot/extension-ui/components/KoniWarning";
import KoniActionBar from "@polkadot/extension-ui/components/KoniActionBar";
import KoniActionText from "@polkadot/extension-ui/components/KoniActionText";
import KoniButton from "@polkadot/extension-ui/components/KoniButton";

interface Props extends RouteComponentProps<{ address: string }>, ThemeProps {
  className?: string;
}

function KoniForgetAccount ({ className, match: { params: { address } } }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const onAction = useContext(ActionContext);
  const [isBusy, setIsBusy] = useState(false);
  const { accounts } = useContext(AccountContext);
  const remainingAccount = accounts.filter(a => a.address !== address);

  const _goHome = useCallback(
    () => onAction('/'),
    [onAction]
  );

  const _onClick = useCallback(
    (): void => {
      setIsBusy(true);
      forgetAccount(address)
        .then(() => {
          if (remainingAccount && remainingAccount.length) {
            setIsBusy(false);
            onAction('/');
          } else {
            setIsBusy(false);
            onAction('/account/add');
          }

        })
        .catch((error: Error) => {
          setIsBusy(false);
          console.error(error);
        });
    },
    [address, onAction]
  );

  return (
    <>
      <KoniHeader
        showSubHeader
        subHeaderName='Forget Account'
      />
      <div className={className}>
        <KoniAccountInfo address={address}>
          <KoniWarning className='movedWarning'>
            {t<string>('You are about to remove the account. This means that you will not be able to access it via this extension anymore. If you wish to recover it, you would need to use the seed.')}
          </KoniWarning>
          <div className='actionArea'>
            <KoniButton
              className='forget-button'
              isBusy={isBusy}
              isDanger
              onClick={_onClick}
            >
              {t<string>('I Want To Forget This Account')}
            </KoniButton>
            <KoniActionBar className='withMarginTop'>
              <KoniActionText
                className='cancel-button'
                onClick={_goHome}
                text={t<string>('Cancel')}
              />
            </KoniActionBar>
          </div>
        </KoniAccountInfo>
      </div>
    </>
  );
}

export default withRouter(styled(KoniForgetAccount)(({ theme }: Props) => `
  margin: 0 15px;

  .actionArea {
    padding: 20px 47px 5px 47px;
  }

  .cancel-button {
    margin-top: 10px;
    margin: auto;
    > span {
      color: ${theme.textColor3};
      font-weight: 700;
      font-size: 16px;
      line-height: 26px;
    }
  }

  .movedWarning {
    margin-top: 8px;
  }

  .withMarginTop {
    margin-top: 12px;
  }

  .forget-button {
    margin-bottom: 8px;
  }
`));
