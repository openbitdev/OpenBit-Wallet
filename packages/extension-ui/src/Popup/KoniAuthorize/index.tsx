// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ThemeProps } from '../../types';

import React, { useContext } from 'react';
import styled from 'styled-components';

import { AuthorizeReqContext } from '../../components';
import Request from './Request';
import KoniHeader from "@polkadot/extension-ui/partials/KoniHeader";

interface Props extends ThemeProps {
  className?: string;
}

function Authorize ({ className = '' }: Props): React.ReactElement {
  const requests = useContext(AuthorizeReqContext);

  return (
    <>
      <div className={`${className} ${requests.length === 1 ? 'lastRequest' : ''}`}>
        <KoniHeader showSubHeader subHeaderName='Authorize'/>
        {requests.map(({ id, request, url }, index): React.ReactNode => (
          <Request
            authId={id}
            className='request'
            isFirst={index === 0}
            key={id}
            request={request}
            url={url}
          />
        ))}
      </div>
    </>
  );
}

export default styled(Authorize)`
  overflow-y: auto;

  &.lastRequest {
    overflow: hidden;
  }

  && {
    padding: 0;
  }

  .request {
    padding: 0 15px;
  }
`;
