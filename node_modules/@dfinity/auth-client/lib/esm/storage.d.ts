import { DBCreateOptions, IdbKeyVal } from './db';
export declare const KEY_STORAGE_KEY = "identity";
export declare const KEY_STORAGE_DELEGATION = "delegation";
export declare const KEY_VECTOR = "iv";
export declare const DB_VERSION = 1;
export declare const isBrowser: boolean;
export declare type StoredKey = string | CryptoKeyPair;
/**
 * Interface for persisting user authentication data
 */
export interface AuthClientStorage {
    get(key: string): Promise<StoredKey | null>;
    set(key: string, value: StoredKey): Promise<void>;
    remove(key: string): Promise<void>;
}
/**
 * Legacy implementation of AuthClientStorage, for use where IndexedDb is not available
 */
export declare class LocalStorage implements AuthClientStorage {
    readonly prefix: string;
    private readonly _localStorage?;
    constructor(prefix?: string, _localStorage?: Storage | undefined);
    get(key: string): Promise<string | null>;
    set(key: string, value: string): Promise<void>;
    remove(key: string): Promise<void>;
    private _getLocalStorage;
}
/**
 * IdbStorage is an interface for simple storage of string key-value pairs built on {@link IdbKeyVal}
 *
 * It replaces {@link LocalStorage}
 * @see implements {@link AuthClientStorage}
 */
export declare class IdbStorage implements AuthClientStorage {
    #private;
    /**
     * @param options - DBCreateOptions
     * @param options.dbName - name for the indexeddb database
     * @param options.storeName - name for the indexeddb Data Store
     * @param options.version - version of the database. Increment to safely upgrade
     * @constructs an {@link IdbStorage}
     * @example
     * ```typescript
     * const storage = new IdbStorage({ dbName: 'my-db', storeName: 'my-store', version: 2 });
     * ```
     */
    constructor(options?: DBCreateOptions);
    private initializedDb;
    get _db(): Promise<IdbKeyVal>;
    get<T = string>(key: string): Promise<T | null>;
    set<T = string>(key: string, value: T): Promise<void>;
    remove(key: string): Promise<void>;
}
