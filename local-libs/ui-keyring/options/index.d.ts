import type { KeyringStruct } from '../types';
import type { KeyringOptionInstance, KeyringOptions, KeyringSectionOption } from './types';
import { BehaviorSubject } from 'rxjs';
export declare class KeyringOption implements KeyringOptionInstance {
    readonly optionsSubject: BehaviorSubject<KeyringOptions>;
    createOptionHeader(name: string): KeyringSectionOption;
    init(keyring: KeyringStruct): void;
    private linkItems;
    private addAccounts;
    private addAddresses;
    private addContracts;
    private emptyOptions;
}
