import React, { useContext } from 'react';
import styled from 'styled-components';
import {ThemeProps} from "@polkadot/extension-ui/types";
import KoniMenu from "@polkadot/extension-ui/components/KoniMenu";
import {CurrentAccountContext, CurrentNetworkContext} from "@polkadot/extension-ui/components";
import useTranslation from "@polkadot/extension-ui/hooks/useTranslation";
import KoniMenuDivider from "@polkadot/extension-ui/components/KoniMenuDivider";
import {canDerive} from "@polkadot/extension-base/utils";
import KoniLink from "@polkadot/extension-ui/components/KoniLink";
import check from "@polkadot/extension-ui/assets/check.svg";

interface Props extends ThemeProps {
  className?: string;
  reference: React.MutableRefObject<null>;
  toggleEdit?: () => void;
  isShowZeroBalances?: boolean;
  toggleZeroBalances?: () => void;
}

function KoniAccountAction({ className, reference, toggleEdit, isShowZeroBalances, toggleZeroBalances }: Props): React.ReactElement<Props>  {
  const { t } = useTranslation();

  const {currentAccount} = useContext(CurrentAccountContext);
  const {network: {networkName}} = useContext(CurrentNetworkContext);

  return (
    <KoniMenu className={className} reference={reference}>
      <div className='actions-wrapper'>
        <KoniLink
          className='menuItem'
          onClick={toggleEdit}
        >
          {t<string>('Rename')}
        </KoniLink>
        {!currentAccount?.isExternal && canDerive(currentAccount?.type) && (
          <KoniLink
            className='menuItem'
            to={`/account/derive/${currentAccount?.address}/locked`}
          >
            {t<string>('Derive New Account')}
          </KoniLink>
        )}
      </div>
      <KoniMenuDivider />

      <div className='actions-wrapper'>
        {!currentAccount?.isExternal && (
          <KoniLink
            className='menuItem'
            isDanger
            to={`/account/export/${currentAccount?.address}`}
          >
            {t<string>('Export Account')}
          </KoniLink>
        )}
        <KoniLink
          className='menuItem'
          isDanger
          to={`/account/forget/${currentAccount?.address}`}
        >
          {t<string>('Forget Account')}
        </KoniLink>
      </div>

      {(networkName === 'all') && !!toggleZeroBalances && (
        <>
          <KoniMenuDivider />

          <div className='actions-wrapper'>
            <KoniLink className={`menuItem kn-l-show-zero-balance ${isShowZeroBalances ? '-check': ''}`} onClick={toggleZeroBalances}>
              <span>
                {t<string>('Show Zero Balances')}
              </span>
              <img src={check} alt="check" className='kn-l-check-icon'/>
            </KoniLink>
          </div>
        </>
      )}
    </KoniMenu>
  )
}

export default React.memo(styled(KoniAccountAction)(({ theme }: Props) => `
  top: 60px;

  .actions-wrapper {
    margin: 10px;
  }

  .menuItem {
    border-radius: 8px;
    display: block;
    font-size: 15px;
    line-height: 20px;
    margin: 0;
    padding: 10px 16px;

    &:hover {
      background-color: ${theme.accountHoverBackground}
    }
  }

  .kn-l-show-zero-balance {
    display: flex;
    align-items: center;
  }

  .kn-l-check-icon {
    margin-left: 4px;
    opacity: 0;
  }

  .kn-l-show-zero-balance.-check .kn-l-check-icon {
    opacity: 1;
  }
`));

