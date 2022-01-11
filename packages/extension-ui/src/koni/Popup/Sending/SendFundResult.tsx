import React, {useCallback, useContext} from 'react';
import styled from 'styled-components';
import {ThemeProps} from '@polkadot/extension-ui/types';
import useTranslation from '@polkadot/extension-ui/hooks/useTranslation';
import successStatus from '@polkadot/extension-ui/assets/success-status.svg';
import failStatus from '@polkadot/extension-ui/assets/fail-status.svg';
import KoniButton from '@polkadot/extension-ui/components/KoniButton';
import {ActionContext} from '@polkadot/extension-ui/components';
import {TxResult} from '@polkadot/extension-ui/koni/Popup/Sending/types';
import {isSupportSubscan, subscanByNetworkName} from "@polkadot/extension-ui/util/koni";

export interface Props extends ThemeProps {
  className?: string;
  txResult: TxResult;
  networkName: string;
  onResend: () => void
}

function getErrorMessage(txError?: Error | null): string | null {
  if (!txError) {
    return null
  }

  if (txError.message) {
    return txError.message;
  }

  return null;
}

function getSubscanUrl(networkName: string, hash: string): string {
  return `${subscanByNetworkName[networkName]}/extrinsic/${hash}`;
}

function SendFundResult({className, networkName, txResult: {isTxSuccess, txError, extrinsicHash}, onResend}: Props): React.ReactElement<Props> {
  const {t} = useTranslation();
  const navigate = useContext(ActionContext);
  const _backToHome = useCallback(
    () => {
      navigate('/');
    },
    [navigate]
  );

  const viewTransactionBtn = (networkName: string, extrinsicHash: string) => {
    if (isSupportSubscan(networkName)) {
      return (
        <a href={getSubscanUrl(networkName, extrinsicHash)} target={'_blank'}
           className='kn-send-fund-stt-btn kn-view-history-btn'
        >
          {t<string>('View Transaction')}
        </a>
      )
    }

    return (
      <span className='kn-send-fund-stt-btn kn-view-history-btn -disabled'>
        {t<string>('View Transaction')}
      </span>
    )
  };

  const errorMessage = getErrorMessage(txError);

  return (
    <div className={`kn-send-fund-result-wrapper ${className}`}>
      {isTxSuccess ?
        <div className='kn-send-fund-result'>
          <img className='kn-status-img' src={successStatus} alt="success" />
          <div className='kn-stt-text'>{t<string>('Send Fund Successful')}</div>
          <div
            className='kn-stt-subtext'>{t<string>('Your request has been confirmed. You can track its progress on the Transaction History page.')}</div>
          <KoniButton
            className='kn-send-fund-stt-btn'
            onClick={_backToHome}
          >
            {t<string>('Back To Home')}
          </KoniButton>

          {extrinsicHash && viewTransactionBtn(networkName, extrinsicHash)}
        </div>
        :
        <div className='kn-send-fund-result'>
          <img className='kn-status-img' src={failStatus} alt="fail" />
          <div className='kn-stt-text'>{t<string>('Send Fund Fail')}</div>
          <div className='kn-stt-subtext'>
            {extrinsicHash
              ? (t<string>('There was a problem with your request. You can track its progress on the Transaction History page.'))
              : (t<string>('There was a problem with your request.'))
            }

            {errorMessage && (
              <div className={'kn-l-text-danger'}>{errorMessage}</div>
            )}
          </div>

          <KoniButton
            className='kn-send-fund-stt-btn'
            onClick={onResend}
          >
            {t<string>('Resend')}
          </KoniButton>

          {extrinsicHash && viewTransactionBtn(networkName, extrinsicHash)}
        </div>
      }
    </div>
  );
}

export default React.memo(styled(SendFundResult)(({theme}: ThemeProps) => `
  margin: 20px 45px 0;

  .kn-send-fund-result {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .kn-status-img {
    width: 120px;
    margin-top: 10px;
    margin-bottom: 32px;
  }

  .kn-stt-text {
    font-size: 20px;
    line-height: 36px;
    color: ${theme.textColor};
    font-weight: 500;
  }

  .kn-stt-subtext {
    color: ${theme.textColor};
    margin-bottom: 30px;
    text-align: center;
    font-size: 14px;
  }

  .kn-send-fund-stt-btn {
    margin-bottom: 10px;
  }

  .kn-l-text-danger {
    color: ${theme.iconDangerColor};
  }

  .kn-send-fund-stt-btn > .children {
    font-weight: 500;
  }

  .kn-view-history-btn {
    background-color: ${theme.buttonBackground2};
    color: ${theme.buttonTextColor3};
    cursor: pointer;
    display: flex;
    width: 100%;
    height: 48px;
    box-sizing: border-box;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    line-height: 26px;
    padding: 0 1rem;
    position: relative;
    text-align: center;
    text-decoration: none;
    align-items: center;
    justify-content: center;
    font-weight: 500;

    &.-disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`));
