import type { ThemeProps } from '../types';
import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';
import { ActionContext } from '../components';
import KoniHeader from "@polkadot/extension-ui/partials/KoniHeader";
import KoniActionText from "@polkadot/extension-ui/components/KoniActionText";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

interface Props extends ThemeProps {
  className?: string;
  step: number;
  text: string;
  onBackClick: () => void;
}

function KoniHeaderWithSteps ({ className, step, text, onBackClick }: Props): React.ReactElement<Props> {
  const onAction = useContext(ActionContext);
  // const themeContext = useContext(ThemeContext as React.Context<Theme>);

  const _onCancel = useCallback(() => {
    onAction('/');
  }, [onAction]);

  return (
    <KoniHeader
      className={className}
      text={text}
    >
      <div className='koni-header-with-steps'>
        <div className='koni-header-with-steps-left-content'>
          {step == 2 && (
            <FontAwesomeIcon
              className='back-button-icon'
              icon={faArrowLeft}
              onClick={onBackClick}
            />
          )}
        </div>
        <div className='koni-header-with-steps-title'>{text}</div>
        <div className='steps'>
          <div>
            <span className='current'>{step}</span>
            <span className='total'>/2</span>
          </div>
          <KoniActionText
            className='koni-header-with-steps-cancel-btn'
            onClick={_onCancel}
            text='Cancel'
          />
        </div>
      </div>

    </KoniHeader>
  );
}

export default React.memo(styled(KoniHeaderWithSteps)(({ theme }: Props) => `

  .koni-header-with-steps {
    display: flex;
    align-items: center;
    padding: 7px 0;
  }

  .koni-header-with-steps-title {
    font-size: 20px;
    line-height: 30px;
    color: ${theme.textColor};
    font-weight: 500;
  }

  .koni-header-with-steps-left-content {
    align-items: center;
    display: flex;
    flex: 1;
    padding-left: 15px;
  }

  .back-button-icon {
    cursor: pointer;
    color: ${theme.textColor}
  }

  .current {
    font-size: ${theme.labelFontSize};
    line-height: ${theme.labelLineHeight};
    color: ${theme.textColor};
  }

  .steps {
    align-items: center;
    display: flex;
    justify-content: space-between;
    flex: 1;
    padding-left: 9px;
    padding-right: 15px;
  }

  .total {
    font-size: ${theme.labelFontSize};
    line-height: ${theme.labelLineHeight};
    color: ${theme.textColor2};
  }

  .koni-header-with-steps-cancel-btn {
    span {
      color: ${theme.textColor3};
      font-size: 15px;
      line-height: 24px;
    }
  }
`));
