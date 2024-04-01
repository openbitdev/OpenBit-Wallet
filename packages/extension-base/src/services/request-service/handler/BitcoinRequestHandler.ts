import { ConfirmationDefinitionsBitcoin, ConfirmationsQueueBitcoin, ConfirmationsQueueItemOptions, ConfirmationTypeBitcoin, RequestConfirmationCompleteBitcoin } from '@subwallet/extension-base/background/KoniTypes';
import RequestService from '@subwallet/extension-base/services/request-service';
import { isInternalRequest } from '@subwallet/extension-base/utils/request';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@polkadot/util/types';
import { logger as createLogger } from '@polkadot/util';
import { ConfirmationRequestBase, Resolver } from '@subwallet/extension-base/background/types';
import keyring, { Keyring } from '@subwallet/ui-keyring';
import { Psbt } from 'bitcoinjs-lib';

export default class BitcoinRequestHandler {
  readonly #requestService: RequestService;
  readonly #logger: Logger;
  private readonly confirmationsQueueSubjectBitcoin = new BehaviorSubject<ConfirmationsQueueBitcoin>({
    bitcoinSignatureRequest: {},
    bitcoinSendTransactionRequest: {},
    bitcoinWatchTransactionRequest: {}
  });
  private readonly confirmationsPromiseMap: Record<string, { resolver: Resolver<any>, validator?: (rs: any) => Error | undefined }> = {};
  
  constructor(requestService: RequestService) {
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

  private async signMessageBitcoin(confirmation: ConfirmationDefinitionsBitcoin['bitcoinSignatureRequest'][0]): Promise<string> {
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
    } 
    else {
        // Handle the case where payload is invalid
        throw new Error('Invalid payload type');
    }
  }
  configToTransactionBitcoin(config: BitcoinTransactionConfig): Psbt {
    const psbt = new Psbt();

    // Set version and locktime
    psbt.setVersion(1);
    psbt.setLocktime(0);

    // Set inputs
    config.inputs.forEach(input => {
        psbt.addInput(input);
    });

    // Set outputs
    config.outputs.forEach(output => {
        psbt.addOutput(output);
    });

    // Finalize inputs
    psbt.finalizeAllInputs();

    return psbt;
  }

  private async signTransactionBitcoin(config: BitcoinTransactionConfig, keyring: Keyring): Promise<string> {
    const psbt = this.configToTransaction(config);

    // Sign transaction inputs
    for (let i = 0; i < config.inputs.length; i++) {
        const input = config.inputs[i];
        const pair = keyring.getPair(input.address);
        await psbt.signInput(i, pair);
    }

    // Serialize and return the signed transaction
    return psbt.toHex();
  
  }
  private async decorateResultBitcoin<T extends ConfirmationTypeBitcoin> (t: T, request: ConfirmationDefinitionsBitcoin[T][0], result: ConfirmationDefinitionsBitcoin[T][1]) {
    // Implement logic for decorating result (if needed)
    if (result.payload === '') {
      if (t === 'bitcoinSignatureRequest') {
        result.payload = await this.signMessageBitcoin(request as ConfirmationDefinitionsBitcoin['bitcoinSignatureRequest'][0]);
      } else if (t === 'bitcoinSendTransactionRequest') {
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

  public async completeConfirmationBitcoin(request: RequestConfirmationCompleteBitcoin): Promise<boolean> {
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

  public resetWalletBitcoin() {
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
