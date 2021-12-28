import React, { useContext } from 'react';
import styled from 'styled-components';
import {ThemeProps} from "@polkadot/extension-ui/types";
import KoniMenu from "@polkadot/extension-ui/components/KoniMenu";
import {CurrentAccountContext} from "@polkadot/extension-ui/components";
import useTranslation from "@polkadot/extension-ui/hooks/useTranslation";
import KoniMenuDivider from "@polkadot/extension-ui/components/KoniMenuDivider";
import {canDerive} from "@polkadot/extension-base/utils";
import KoniLink from "@polkadot/extension-ui/components/KoniLink";

interface Props extends ThemeProps {
  className?: string;
  reference: React.MutableRefObject<null>;
  toggleEdit?: () => void
}

function KoniAccountAction({ className, reference, toggleEdit }: Props): React.ReactElement<Props>  {
  const { t } = useTranslation();

  const {currentAccount} = useContext(CurrentAccountContext);


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
    </KoniMenu>
  )
}

export default React.memo(styled(KoniAccountAction)(({ theme }: Props) => `
  right: -15px;
  top: 5px;

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
      background-color: ${theme.buttonBackground1}
    }
  }
`));

