import type { PasswordStore } from '../types';
import { KeyringPasswordJson } from '@subwallet/keyring/types';
export declare class PasswordBrowserStore implements PasswordStore {
    get(fn: (value: KeyringPasswordJson) => void): void;
    remove(fn?: () => void): void;
    set(value: KeyringPasswordJson, fn?: () => void): void;
}
