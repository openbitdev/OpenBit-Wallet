// Copyright 2017-2021 @polkadot/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {useContext} from 'react';
import {ApiContext} from '../react-api';
import {createNamedHook} from './createNamedHook';
import {ApiProps} from "@polkadot/extension-base/background/types";

function useApiImpl (): ApiProps {
  return useContext(ApiContext);
}

export const useApi = createNamedHook('useApi', useApiImpl);
