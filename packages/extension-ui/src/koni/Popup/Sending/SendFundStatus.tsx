import React, {useCallback} from 'react';
import styled from 'styled-components';
import {ThemeProps} from "@polkadot/extension-ui/types";
import KoniHeader from "@polkadot/extension-ui/partials/KoniHeader";
import useTranslation from "@polkadot/extension-ui/hooks/useTranslation";
import successStatus from "@polkadot/extension-ui/assets/success-status.svg";
import failStatus from "@polkadot/extension-ui/assets/fail-status.svg";
import KoniButton from "@polkadot/extension-ui/components/KoniButton";

export interface Props extends ThemeProps {
  className?: string;
  isSuccess?: boolean;
}

function SendFundStatus({className, isSuccess = true}: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const _backToHome = useCallback(
    () => {},
    []
  )

  const _viewHistory = useCallback(
    () => {},
    []
  )
  return (
    <>
      <div className={className}>
        <KoniHeader
          showAdd
          showSearch
          showSettings
          showSubHeader
          subHeaderName={t<string>('Send fund')}
          showCancelButton
        />
        <div className='kn-send-fund-status-wrapper'>
          {isSuccess ?
            <div className='kn-send-fund-status'>
              <img className='kn-status-img' src={successStatus} alt="success"/>
              <div className='kn-stt-text'>{t<string>('Send Fund Successful')}</div>
              <div className='kn-stt-subtext'>{t<string>('Your request has been confirmed. You can track its progress on the Transaction History page.')}</div>
              <KoniButton
                className='kn-send-fund-stt-btn'
                data-export-button
                onClick={_backToHome}
              >
                {t<string>('Back To Home')}
              </KoniButton>

              <KoniButton
                className='kn-send-fund-stt-btn kn-view-history-btn'
                data-export-button
                onClick={_viewHistory}
              >
                {t<string>('View Transaction')}
              </KoniButton>
            </div>

            :
            <div className='kn-send-fund-status'>
              <img className='kn-status-img' src={failStatus} alt="fail"/>
              <div className='kn-stt-text'>{t<string>('Send Fund Fail')}</div>
              <div className='kn-stt-subtext'>{t<string>('Your request has been denied. You can track its progress on the Transaction History page.')}</div>
              <KoniButton
                className='kn-send-fund-stt-btn'
                data-export-button
                onClick={_backToHome}
              >
                {t<string>('Resend')}
              </KoniButton>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default React.memo(styled(SendFundStatus)(({ theme }: ThemeProps) => `
  .kn-send-fund-status-wrapper {
    margin: 0 45px;
  }

  .kn-send-fund-status {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .kn-status-img {
    width: 130px;
    margin-top: 10px;
    margin-bottom: 32px;
  }

  .kn-stt-text {
    font-size: 24px;
    line-height: 36px;
    color: ${theme.textColor};
    font-weight: 500;
  }

  .kn-stt-subtext {
    color: ${theme.textColor};
    margin-bottom: 30px;
    text-align: center;
  }

  .kn-send-fund-stt-btn {
    margin-bottom: 10px;

  }

  .kn-send-fund-stt-btn > .children {
    font-weight: 500;
  }

  .kn-view-history-btn {
    background-color: ${theme.buttonBackground2};
    color: ${theme.buttonTextColor3};
  }
`));
