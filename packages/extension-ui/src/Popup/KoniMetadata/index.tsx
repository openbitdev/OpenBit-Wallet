// Copyright 2019-2021 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useContext } from 'react';

import { Loading, MetadataReqContext } from '../../components';
import Request from './Request';
import KoniHeader from "@polkadot/extension-ui/partials/KoniHeader";
import useTranslation from "@polkadot/extension-ui/hooks/useTranslation";

export default function Metadata (): React.ReactElement {
  const { t } = useTranslation();
  const requests = useContext(MetadataReqContext);

  return (
    <>
      <KoniHeader showSubHeader subHeaderName={t<string>('Metadata')} />
      {requests[0]
        ? (
          <Request
            key={requests[0].id}
            metaId={requests[0].id}
            request={requests[0].request}
            url={requests[0].url}
          />
        )
        : <Loading />
      }
    </>
  );
}
