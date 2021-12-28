import {BalanceVal} from "@polkadot/extension-ui/components/koni/balance";
import React from "react";
import styled from "styled-components";
import {ThemeProps} from "@polkadot/extension-ui/types";
import {BalanceSubInfo} from "@polkadot/extension-ui/util/koni/types";

interface Props extends ThemeProps {
  className?: string;
  item: BalanceSubInfo;
}

function ChainBalanceItemRow({item, className}: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      <div className='kn-chain-balance-item-row__col-1'>
        {item.label}
      </div>
      <div className='kn-chain-balance-item-row__col-2'>
        <BalanceVal value={item.balanceValue} symbol={item.symbol}/>
      </div>
      <div className='kn-chain-balance-item-row__col-3'>
        <BalanceVal value={item.totalValue} symbol={'$'} startWithSymbol/>
      </div>
    </div>
  )
}

export default React.memo(styled(ChainBalanceItemRow)(({ theme }: Props) => `
  display: flex;

  .kn-chain-balance-item-row__col-1,
  .kn-chain-balance-item-row__col-2,
  .kn-chain-balance-item-row__col-3 {
    flex: 0;
  }

  .kn-chain-balance-item-row__col-1 {
    flex-grow: 4.18;
    max-width: 41.8%;
    padding-left: 15px;
    padding-right: 7.5px;
  }

  .kn-chain-balance-item-row__col-2 {
    flex-grow: 2.91;
    max-width: 29.1%;
    padding-left: 7.5px;
    padding-right: 7.5px;
    text-align: right;
  }

  .kn-chain-balance-item-row__col-3 {
    flex-grow: 2.91;
    max-width: 29.1%;
    padding-left: 7.5px;
    padding-right: 15px;
    text-align: right;
  }
`));
