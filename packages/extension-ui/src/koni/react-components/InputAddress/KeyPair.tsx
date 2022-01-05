// Copyright 2017-2021 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, {useContext} from 'react';
import styled from 'styled-components';

import Identicon from "@polkadot/extension-ui/koni/react-components/Identicon";
import {CurrentNetworkContext} from "@polkadot/extension-ui/components";
import { isUndefined } from '@polkadot/util';
import {decodeAddress, encodeAddress} from "@polkadot/util-crypto";
import {IconTheme} from "@polkadot/react-identicon/types";

interface Props {
  name?: string;
  address: string;
  className?: string;
  style?: Record<string, string>;
}

function getShortenText(text: string, cut: number =  6) {
  return `${text.slice(0, cut)}…${text.slice(-cut)}`;
}

function getName(address: string, name?: string): string {
  return isUndefined(name) ? address.length > 15 ? getShortenText(address) : address : name;
}

function getFormattedAddress(address: string, networkPrefix: number) {
  if (networkPrefix === -1) {
    return address;
  }

  const publicKey = decodeAddress(address);
  return encodeAddress(publicKey, networkPrefix);
}

function KeyPair ({name, address, className = '' }: Props): React.ReactElement<Props> {
  const {network:{networkPrefix, icon}} = useContext(CurrentNetworkContext);
  const formattedAddress = getFormattedAddress(address, networkPrefix);

  return (
    <div className={`ui--KeyPair ${className}`}>
      <Identicon
        className='ui--KeyPair-icon'
        prefix={networkPrefix}
        iconTheme={icon as IconTheme}
        value={formattedAddress}
      />
      <div className='name'>
        {getName(formattedAddress, name)}
      </div>
      <div className='address'>
        {getShortenText(formattedAddress, 9)}
      </div>
    </div>
  );
}

export default React.memo(styled(KeyPair)`

`);
