// Copyright 2019-2022 @polkadot/extension-ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useMemo, useState } from 'react';

export default function useWaitForSeedPhrase (seedPhrase: string) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (seedPhrase) {
      setReady(true);
    } else {
      setReady(false);
    }
  }, [seedPhrase]);

  const waitReady = useMemo(() => {
    return new Promise((resolve, reject) => {
      if (ready) {
        if (seedPhrase) {
          resolve(true);
        } else {
          console.log('seedPhrase', seedPhrase);
          reject(new Error('Seed phrase is not defined'));
        }
      }
    });
  }, [ready, seedPhrase]);

  return waitReady;
}
