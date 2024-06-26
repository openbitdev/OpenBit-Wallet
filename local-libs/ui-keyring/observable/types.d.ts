import type { BehaviorSubject } from 'rxjs';
import type { KeyringSectionOption } from '../options/types';
import type { KeyringJson, KeyringStore } from '../types';
import { KeypairType } from '@subwallet/keyring/types';
export interface SingleAddress {
    json: KeyringJson;
    option: KeyringSectionOption;
    type?: KeypairType;
}
export interface SubjectInfo {
    [index: string]: SingleAddress;
}
export interface AddressSubject {
    add: (store: KeyringStore, address: string, json: KeyringJson, type?: KeypairType) => SingleAddress;
    remove: (store: KeyringStore, address: string) => void;
    subject: BehaviorSubject<SubjectInfo>;
}
