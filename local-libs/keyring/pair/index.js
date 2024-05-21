// Copyright 2017-2022 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as bitcoin from 'bitcoinjs-lib';
import { sign as bitcoinSignMessage } from 'bitcoinjs-message';
import { ECPairFactory } from 'ecpair';
import SimpleKeyring from 'eth-simple-keyring';
import * as ecc from 'tiny-secp256k1';
import { hexAddPrefix, hexStripPrefix, objectSpread, u8aConcat, u8aEmpty, u8aEq, u8aToHex, u8aToU8a } from '@polkadot/util';
import { blake2AsU8a, ethereumEncode, hdEthereum, keyExtractPath, mnemonicToLegacySeed, secp256k1Compress, signatureVerify, sr25519VrfSign, sr25519VrfVerify } from '@polkadot/util-crypto';
import { entropyToMnemonic } from '@polkadot/util-crypto/mnemonic/bip39';
import { getDerivePath, keyFromPath, TYPE_ADDRESS, TYPE_FROM_SEED, TYPE_PREFIX, TYPE_SIGNATURE } from "../utils/index.js";
import { decodePair } from "./decode.js";
import { encodePair } from "./encode.js";
import { pairToJson } from "./toJson.js";
bitcoin.initEccLib(ecc);
const ECPair = ECPairFactory(ecc);
const SIG_TYPE_NONE = new Uint8Array();
const toXOnly = pubKey => pubKey.length === 32 ? pubKey : pubKey.slice(1, 33);
function isEmpty(value) {
  return value === null || !value || u8aEmpty(value);
}
function isLocked(secretKey) {
  return !secretKey || u8aEmpty(secretKey);
}
function vrfHash(proof, context, extra) {
  return blake2AsU8a(u8aConcat(context || '', extra || '', proof));
}

/**
 * @name createPair
 * @summary Creates a keyring pair object
 * @description Creates a keyring pair object with provided account public key, metadata, and encoded arguments.
 * The keyring pair stores the account state including the encoded address and associated metadata.
 *
 * It has properties whose values are functions that may be called to perform account actions:
 *
 * - `address` function retrieves the address associated with the account.
 * - `decodedPkcs8` function is called with the account passphrase and account encoded public key.
 * It decodes the encoded public key using the passphrase provided to obtain the decoded account public key
 * and associated secret key that are then available in memory, and changes the account address stored in the
 * state of the pair to correspond to the address of the decoded public key.
 * - `encodePkcs8` function when provided with the correct passphrase associated with the account pair
 * and when the secret key is in memory (when the account pair is not locked) it returns an encoded
 * public key of the account.
 * - `meta` is the metadata that is stored in the state of the pair, either when it was originally
 * created or set via `setMeta`.
 * - `publicKey` returns the public key stored in memory for the pair.
 * - `sign` may be used to return a signature by signing a provided message with the secret
 * key (if it is in memory) using Nacl.
 * - `toJson` calls another `toJson` function and provides the state of the pair,
 * it generates arguments to be passed to the other `toJson` function including an encoded public key of the account
 * that it generates using the secret key from memory (if it has been made available in memory)
 * and the optionally provided passphrase argument. It passes a third boolean argument to `toJson`
 * indicating whether the public key has been encoded or not (if a passphrase argument was provided then it is encoded).
 * The `toJson` function that it calls returns a JSON object with properties including the `address`
 * and `meta` that are assigned with the values stored in the corresponding state variables of the account pair,
 * an `encoded` property that is assigned with the encoded public key in hex format, and an `encoding`
 * property that indicates whether the public key value of the `encoded` property is encoded or not.
 */

export function createPair({
  toSS58,
  type
}, {
  entropy,
  publicKey,
  secretKey
}, meta = {}, encoded = null, encTypes) {
  const decodePkcs8 = (passphrase, userEncoded) => {
    const decoded = decodePair(passphrase, userEncoded || encoded, encTypes);
    if (decoded.secretKey.length === 64) {
      publicKey = decoded.publicKey;
      secretKey = decoded.secretKey;
      entropy = decoded.entropy;
    } else {
      const pair = TYPE_FROM_SEED[type](decoded.secretKey);
      publicKey = pair.publicKey;
      secretKey = pair.secretKey;
      entropy = decoded.entropy;
    }
  };
  const recode = passphrase => {
    isLocked(secretKey) && encoded && decodePkcs8(passphrase, encoded);
    encoded = encodePair({
      entropy,
      publicKey,
      secretKey
    }, passphrase); // re-encode, latest version
    encTypes = undefined; // swap to defaults, latest version follows

    return encoded;
  };
  const encodeAddress = () => {
    const raw = TYPE_ADDRESS[type](publicKey);
    const bitNetwork = ['bitcoin-44', 'bitcoin-84', 'bitcoin-86'].includes(type) ? bitcoin.networks.bitcoin : ['bittest-44', 'bittest-84', 'bittest-86'].includes(type) ? bitcoin.networks.testnet : bitcoin.networks.regtest;

    /**
     *  With bitcoin accounts, some attached account have no public key (only address).
     *  In this case, public key is the hash of result after decoded address.
     *  Add `noPublicKey` in metadata for this case.
     */
    let dataKey;
    if (meta.noPublicKey) {
      dataKey = 'hash';
    } else {
      dataKey = 'pubkey';
    }
    switch (type) {
      case 'ethereum':
        return ethereumEncode(raw);
      case 'bitcoin-44':
      case 'bittest-44':
        return bitcoin.payments.p2pkh({
          [dataKey]: Buffer.from(publicKey),
          network: bitNetwork
        }).address || '';
      case 'bitcoin-84':
      case 'bittest-84':
        return bitcoin.payments.p2wpkh({
          [dataKey]: Buffer.from(publicKey),
          network: bitNetwork
        }).address || '';
      case 'bitcoin-86':

      // eslint-disable-next-line no-fallthrough
      case 'bittest-86':
        {
          const internalPubkey = toXOnly(Buffer.from(publicKey));
          if (meta.isReadOnly) {
            return bitcoin.address.toBech32(Buffer.from(publicKey), 1, bitNetwork.bech32);
          } else {
            return bitcoin.payments.p2tr({
              internalPubkey,
              network: bitNetwork
            }).address || '';
          }
        }
      case 'ecdsa':
      case 'ed25519':
      case 'sr25519':
      default:
        return toSS58(raw);
    }
  };
  const sign = (message, options = {}) => {
    if (isLocked(secretKey)) {
      throw new Error('Cannot sign with a locked key pair');
    }
    return u8aConcat(options.withType ? TYPE_PREFIX[type] : SIG_TYPE_NONE, TYPE_SIGNATURE[type](u8aToU8a(message), {
      publicKey,
      secretKey
    }));
  };
  return {
    get address() {
      return encodeAddress();
    },
    get addressRaw() {
      const raw = TYPE_ADDRESS[type](publicKey);
      return type === 'ethereum' ? raw.slice(-20) : raw;
    },
    get isLocked() {
      return isLocked(secretKey);
    },
    get meta() {
      return meta;
    },
    get publicKey() {
      return publicKey;
    },
    get type() {
      return type;
    },
    get haveEntropy() {
      return !!entropy;
    },
    get evm() {
      if (!['ethereum'].includes(type)) {
        throw new Error('Unable to create ethereum handler for this keypair');
      }
      return {
        signMessage: async (payload, method) => {
          if (isLocked(secretKey)) {
            throw new Error('Cannot encrypt with a locked key pair');
          }
          const privateKey = hexStripPrefix(u8aToHex(secretKey));
          const address = encodeAddress();
          const simpleKeyring = new SimpleKeyring([privateKey]);
          switch (method) {
            case 'eth_sign':
              return await simpleKeyring.signMessage(address, payload);
            case 'personal_sign':
              return await simpleKeyring.signPersonalMessage(address, payload);
            case 'eth_signTypedData':
              return await simpleKeyring.signTypedData_v4(address, payload);
            case 'eth_signTypedData_v1':
              return await simpleKeyring.signTypedData_v1(address, payload);
            case 'eth_signTypedData_v3':
              return await simpleKeyring.signTypedData_v3(address, payload);
            case 'eth_signTypedData_v4':
              return await simpleKeyring.signTypedData_v4(address, payload);
            default:
              throw new Error('Not found sign method');
          }
        },
        signTransaction: transaction => {
          if (isLocked(secretKey)) {
            throw new Error('Cannot encrypt with a locked key pair');
          }
          if (!transaction) {
            throw new Error('Not found sign method');
          }
          return hexAddPrefix(u8aToHex(transaction.sign(secretKey).serialize()));
        },
        derive: (index, meta) => {
          if (isEmpty(entropy)) {
            throw new Error('Cannot derive on this keypair');
          } else if (isLocked(secretKey)) {
            throw new Error('Cannot derive on a locked keypair');
          }
          const phrase = entropyToMnemonic(entropy);
          const seed = mnemonicToLegacySeed(phrase, '', false, 64);
          const derivePathFunction = getDerivePath(type);
          const derivePath = derivePathFunction(index);
          const derived = hdEthereum(seed, derivePath);
          return createPair({
            toSS58,
            type
          }, derived, meta, null);
        }
      };
    },
    get substrate() {
      if (!['ed25519', 'sr25519', 'ecdsa'].includes(type)) {
        throw new Error('Unable to create substrate handler for this keypair');
      }
      return {
        derive: (suri, meta) => {
          if (isLocked(secretKey)) {
            throw new Error('Cannot derive on a locked keypair');
          }
          const {
            path
          } = keyExtractPath(suri);
          const derived = keyFromPath({
            publicKey,
            secretKey
          }, path, type);
          return createPair({
            toSS58,
            type
          }, derived, meta, null);
        },
        sign
      };
    },
    get bitcoin() {
      if (!['bitcoin-44', 'bitcoin-84', 'bitcoin-86', 'bittest-44', 'bittest-84', 'bittest-86'].includes(type)) {
        throw new Error('Unable to create bitcoin handler for this keypair');
      }
      const bitNetwork = ['bitcoin-44', 'bitcoin-84', 'bitcoin-86'].includes(type) ? bitcoin.networks.bitcoin : ['bittest-44', 'bittest-84', 'bittest-86'].includes(type) ? bitcoin.networks.testnet : bitcoin.networks.regtest;
      const internalPubkey = toXOnly(Buffer.from(publicKey));
      let output;
      switch (type) {
        case 'bitcoin-44':
        case 'bittest-44':
          output = bitcoin.payments.p2pkh({
            pubkey: Buffer.from(publicKey),
            network: bitNetwork
          }).output;
          break;
        case 'bitcoin-84':
        case 'bittest-84':
          output = bitcoin.payments.p2wpkh({
            pubkey: Buffer.from(publicKey),
            network: bitNetwork
          }).output;
          break;
        case 'bitcoin-86':
        case 'bittest-86':
          output = bitcoin.payments.p2tr({
            internalPubkey,
            network: bitNetwork
          }).output;
          break;
      }
      return {
        derive: (index, meta) => {
          if (isEmpty(entropy)) {
            throw new Error('Cannot derive on this keypair');
          } else if (isLocked(secretKey)) {
            throw new Error('Cannot derive on a locked keypair');
          }
          const phrase = entropyToMnemonic(entropy);
          const seed = mnemonicToLegacySeed(phrase, '', false, 64);
          const derivePathFunction = getDerivePath(type);
          const derived = hdEthereum(seed, derivePathFunction(index));
          return createPair({
            toSS58,
            type
          }, derived, meta, null);
        },
        signMessage: (message, compressed, options) => {
          if (isLocked(secretKey)) {
            throw new Error('Cannot encrypt with a locked key pair');
          }
          const _message = typeof message === 'string' ? message : Buffer.from(message);

          // Sign the message
          const signature = bitcoinSignMessage(_message, Buffer.from(secretKey), compressed, options);
          return signature.toString('base64');
        },
        signTransaction: (transaction, indexes) => {
          if (isLocked(secretKey)) {
            throw new Error('Cannot encrypt with a locked key pair');
          }
          if (!transaction) {
            throw new Error('Not found sign method');
          }
          const pair = ECPair.fromPrivateKey(Buffer.from(secretKey));
          const isTaproot = ['bitcoin-86', 'bittest-86'].includes(type);
          for (const index of indexes) {
            if (isTaproot) {
              const tweakedSigner = pair.tweak(bitcoin.crypto.taggedHash('TapTweak', toXOnly(pair.publicKey)));
              transaction.signTaprootInput(index, tweakedSigner);
            } else {
              transaction.signInput(index, pair);
            }
          }
          return transaction;
        },
        get output() {
          return output || Buffer.from([]);
        },
        get internalPubkey() {
          return internalPubkey;
        }
      };
    },
    sign,
    // eslint-disable-next-line sort-keys
    changePkcs8(newPassphrase, oldPassphrase) {
      encoded && decodePkcs8(oldPassphrase, encoded);
      encoded = encodePair({
        publicKey,
        secretKey,
        entropy
      }, newPassphrase);
      encTypes = undefined;
      return encoded;
    },
    decodePkcs8,
    encodePkcs8: passphrase => {
      return recode(passphrase);
    },
    exportMnemonic: passphrase => {
      secretKey = new Uint8Array();
      decodePkcs8(passphrase);
      if (isLocked(secretKey)) {
        throw new Error('Cannot export mnemonic on a locked keypair');
      } else if (isEmpty(entropy)) {
        throw new Error('Cannot export mnemonic on this keypair');
      }
      return entropyToMnemonic(entropy);
    },
    lock: () => {
      secretKey = new Uint8Array();
    },
    setMeta: additional => {
      meta = objectSpread({}, meta, additional);
    },
    toJson: passphrase => {
      // NOTE: For ecdsa and ethereum, the publicKey cannot be extracted from the address. For these
      // pass the hex-encoded publicKey through to the address portion of the JSON (before decoding)
      // unless the publicKey is already an address

      // Address is public key if not substrate pair
      // Address is address if substrate pair
      const address = ['ecdsa', 'ethereum'].includes(type) ? publicKey.length === 20 ? u8aToHex(publicKey) : u8aToHex(secp256k1Compress(publicKey)) : ['bitcoin-44', 'bitcoin-84', 'bitcoin-86', 'bittest-44', 'bittest-84', 'bittest-86'].includes(type) ? u8aToHex(publicKey) : encodeAddress();
      return pairToJson(type, {
        address,
        meta
      }, recode(passphrase), !!passphrase);
    },
    unlock: passphrase => {
      return decodePkcs8(passphrase);
    },
    verify: (message, signature, signerPublic) => {
      return signatureVerify(message, signature, TYPE_ADDRESS[type](u8aToU8a(signerPublic))).isValid;
    },
    vrfSign: (message, context, extra) => {
      if (isLocked(secretKey)) {
        throw new Error('Cannot sign with a locked key pair');
      }
      if (type === 'sr25519') {
        return sr25519VrfSign(message, {
          secretKey
        }, context, extra);
      }
      const proof = TYPE_SIGNATURE[type](u8aToU8a(message), {
        publicKey,
        secretKey
      });
      return u8aConcat(vrfHash(proof, context, extra), proof);
    },
    vrfVerify: (message, vrfResult, signerPublic, context, extra) => {
      if (type === 'sr25519') {
        return sr25519VrfVerify(message, vrfResult, publicKey, context, extra);
      }
      const result = signatureVerify(message, u8aConcat(TYPE_PREFIX[type], vrfResult.subarray(32)), TYPE_ADDRESS[type](u8aToU8a(signerPublic)));
      return result.isValid && u8aEq(vrfResult.subarray(0, 32), vrfHash(vrfResult.subarray(32), context, extra));
    }
  };
}