import React from "react";
import {useApi} from "@polkadot/extension-ui/koni/react-hooks";

export function apiWrap<T>({ ...props }: T) : (Component: React.ComponentType<T>) => JSX.Element {
  const { isApiReady } = useApi();

  return (Component: React.ComponentType<T>) => {
    if (!isApiReady) {
      return (<></>);
    }

    return <Component {...props} />;
  };
}
