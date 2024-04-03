// Copyright 2019-2022 @subwallet/extension-base authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ConfirmationDefinitionsBitcoin, ConfirmationsQueueBitcoin, ConfirmationsQueueItemOptions, ConfirmationTypeBitcoin, Input, Output, RequestConfirmationCompleteBitcoin } from '@subwallet/extension-base/background/KoniTypes';
import { ConfirmationRequestBase, Resolver } from '@subwallet/extension-base/background/types';
import RequestService from '@subwallet/extension-base/services/request-service';
import { isInternalRequest } from '@subwallet/extension-base/utils/request';
import keyring from '@subwallet/ui-keyring';
import { Psbt } from 'bitcoinjs-lib';
import { BehaviorSubject } from 'rxjs';

import { logger as createLogger } from '@polkadot/util';
import { Logger } from '@polkadot/util/types';

export default class BitcoinRequestHandler {
  readonly #requestService: RequestService;
  readonly #logger: Logger;
  private readonly confirmationsQueueSubjectBitcoin = new BehaviorSubject<ConfirmationsQueueBitcoin>({
    bitcoinSignatureRequest: {},
    bitcoinSendTransactionRequest: {},
    bitcoinWatchTransactionRequest: {}
  });

  private readonly confirmationsPromiseMap: Record<string, { resolver: Resolver<any>, validator?: (rs: any) => Error | undefined }> = {};

  constructor (requestService: RequestService) {
    this.#requestService = requestService;
    this.#logger = createLogger('BitcoinRequestHandler');
  }

  public getConfirmationsQueueSubjectBitcoin (): BehaviorSubject<ConfirmationsQueueBitcoin> {
    return this.confirmationsQueueSubjectBitcoin;
  }

  public async addConfirmationBitcoin<CT extends ConfirmationTypeBitcoin> (
    id: string,
    url: string,
    type: CT,
    payload: ConfirmationDefinitionsBitcoin[CT][0]['payload'],
    options: ConfirmationsQueueItemOptions = {}
  ): Promise<ConfirmationDefinitionsBitcoin[CT][1]> {
    const confirmations = this.confirmationsQueueSubjectBitcoin.getValue();
    const confirmationType = confirmations[type] as Record<string, ConfirmationDefinitionsBitcoin[CT][0]>;
    const payloadJson = JSON.stringify(payload);
    const isInternal = isInternalRequest(url);

    // Check duplicate request
    const duplicated = Object.values(confirmationType).find((c) => (c.url === url) && (c.payloadJson === payloadJson));

    if (duplicated) {
      throw new Error('Duplicate request');
    }

    confirmationType[id] = {
      id,
      url,
      isInternal,
      payload,
      payloadJson,
      ...options
    } as ConfirmationDefinitionsBitcoin[CT][0];

    const promise = new Promise<ConfirmationDefinitionsBitcoin[CT][1]>((resolve, reject) => {
      this.confirmationsPromiseMap[id] = {
        resolver: {
          resolve: resolve,
          reject: reject
        }
      };
    });

    this.confirmationsQueueSubjectBitcoin.next(confirmations);

    if (!isInternal) {
      this.#requestService.popupOpen();
    }

    this.#requestService.updateIconV2();

    return promise;
  }

  public updateConfirmationBitcoin<CT extends ConfirmationTypeBitcoin> (
    id: string,
    type: CT,
    payload: ConfirmationDefinitionsBitcoin[CT][0]['payload'],
    options: ConfirmationsQueueItemOptions = {},
    validator?: (input: ConfirmationDefinitionsBitcoin[CT][1]) => Error | undefined
  ) {
    const confirmations = this.confirmationsQueueSubjectBitcoin.getValue();
    const confirmationType = confirmations[type] as Record<string, ConfirmationDefinitionsBitcoin[CT][0]>;

    // Check duplicate request
    const exists = confirmationType[id];

    if (!exists) {
      throw new Error('Request does not exist');
    }

    const payloadJson = JSON.stringify(payload);

    confirmationType[id] = {
      ...exists,
      payload,
      payloadJson,
      ...options
    } as ConfirmationDefinitionsBitcoin[CT][0];

    if (validator) {
      this.confirmationsPromiseMap[id].validator = validator;
    }

    this.confirmationsQueueSubjectBitcoin.next(confirmations);
  }

  private async signMessageBitcoin (confirmation: ConfirmationDefinitionsBitcoin['bitcoinSignatureRequest'][0]): Promise<string> {
    const { account, payload } = confirmation.payload;
    const address = account.address;
    const pair = keyring.getPair(address);

    if (pair.isLocked) {
      keyring.unlockPair(pair.address);
    }

    // Check if payload is a string
    if (typeof payload === 'string') {
      // Assume BitcoinSigner is an instance that implements the BitcoinSigner interface
      return await pair.bitcoin.signMessage(payload, false); // Assuming compressed = false
    }
    // Check if payload is a byte array (Uint8Array)
    else if (payload instanceof Uint8Array) {
      // Convert Uint8Array to string
      const payloadString = Buffer.from(payload).toString('hex');

      // Assume BitcoinSigner is an instance that implements the BitcoinSigner interface
      return await pair.bitcoin.signMessage(payloadString, false); // Assuming compressed = false
    } else {
      // Handle the case where payload is invalid
      throw new Error('Invalid payload type');
    }
  }

  private async signTransactionBitcoin (request: ConfirmationDefinitionsBitcoin['bitcoinSendTransactionRequest'][0]): Promise<string> {
    // Extract necessary information from the BitcoinSendTransactionRequest
    const { account, inputs, outputs } = request.payload;
    const address = account.address;
    const pair = keyring.getPair(address);

    // Unlock the pair if it is locked
    if (pair.isLocked) {
      keyring.unlockPair(pair.address);
    }

    // Create a new Psbt object
    const psbt = new Psbt();

    // Set inputs
    inputs.forEach((input: Input) => {
      const scriptBuffer = Buffer.from(input.script, 'hex'); // Convert hex string to Buffer

      psbt.addInput({
        hash: input.hash,
        index: input.index,
        sequence: input.sequence,
        witnessUtxo: {
          script: scriptBuffer, // Use the converted Buffer
          value: input.value
        }
      });
    });

    // Set outputs
    outputs.forEach((output: Output) => {
      const scriptBuffer = Buffer.from(output.script, 'hex'); // Convert hex string to Buffer

      psbt.addOutput({
        script: scriptBuffer,
        value: output.value
      });
    });

    // Finalize all inputs in the Psbt
    psbt.finalizeAllInputs();

    // Sign the Psbt using the pair's bitcoin object
    const signedTransaction = await pair.bitcoin.signTransaction(psbt);

    return signedTransaction;
  }

  private async decorateResultBitcoin<T extends ConfirmationTypeBitcoin> (t: T, request: ConfirmationDefinitionsBitcoin[T][0], result: ConfirmationDefinitionsBitcoin[T][1]) {
    if (result.payload === '') {
      if (t === 'bitcoinSignatureRequest') {
        result.payload = await this.signMessageBitcoin(request as ConfirmationDefinitionsBitcoin['bitcoinSignatureRequest'][0]);
      } else if (t === 'bitcoinSendTransactionRequest') {
        // Thay đổi đối số từ KeyringService thành Keyring
        result.payload = await this.signTransactionBitcoin(request as ConfirmationDefinitionsBitcoin['bitcoinSendTransactionRequest'][0]);
      }

      if (t === 'bitcoinSignatureRequest' || t === 'bitcoinSendTransactionRequest') {
        const isAlwaysRequired = await this.#requestService.settingService.isAlwaysRequired;

        if (isAlwaysRequired) {
          this.#requestService.keyringService.lock();
        }
      }
    }
  }

  public async completeConfirmationBitcoin (request: RequestConfirmationCompleteBitcoin): Promise<boolean> {
    const confirmations = this.confirmationsQueueSubjectBitcoin.getValue();

    for (const ct in request) {
      const type = ct as ConfirmationTypeBitcoin;
      const result = request[type] as ConfirmationDefinitionsBitcoin[typeof type][1];

      const { id } = result;
      const { resolver } = this.confirmationsPromiseMap[id];
      const confirmation = confirmations[type][id];

      if (!resolver || !confirmation) {
        this.#logger.error('Unable to proceed. Please try again', type, id);
        throw new Error('Unable to proceed. Please try again');
      }

      // Fill signature for some special type
      await this.decorateResultBitcoin(type, confirmation, result);

      // Delete confirmations from queue
      delete this.confirmationsPromiseMap[id];
      delete confirmations[type][id];
      this.confirmationsQueueSubjectBitcoin.next(confirmations);

      // Update icon, and close queue
      this.#requestService.updateIconV2(this.#requestService.numAllRequests === 0);
      resolver.resolve(result);
    }

    return true;
  }

  public resetWallet () {
    const confirmations = this.confirmationsQueueSubjectBitcoin.getValue();

    for (const [type, requests] of Object.entries(confirmations)) {
      for (const confirmation of Object.values(requests)) {
        const { id } = confirmation as ConfirmationRequestBase;
        const { resolver } = this.confirmationsPromiseMap[id];

        if (!resolver || !confirmation) {
          console.error('Not found confirmation', type, id);
        } else {
          resolver.reject(new Error('Reset wallet'));
        }

        delete this.confirmationsPromiseMap[id];
        delete confirmations[type as ConfirmationTypeBitcoin][id];
      }
    }

    this.confirmationsQueueSubjectBitcoin.next(confirmations);
  }
}
