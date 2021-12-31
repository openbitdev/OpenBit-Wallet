import {KeypairType} from "@polkadot/util-crypto/types";
import {decodeAddress, encodeAddress} from "@polkadot/util-crypto";

export default function reformatAddress(address: string, networkPrefix: number, accountType?: KeypairType): string {
  if (networkPrefix < 0) {
    return address;
  }

  const publicKey = decodeAddress(address);


  return accountType === 'ethereum'
    ? address
    : encodeAddress(publicKey, networkPrefix)
}
