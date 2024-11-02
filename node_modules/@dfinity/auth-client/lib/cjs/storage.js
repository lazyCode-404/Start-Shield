"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _IdbStorage_options;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdbStorage = exports.LocalStorage = exports.isBrowser = exports.DB_VERSION = exports.KEY_VECTOR = exports.KEY_STORAGE_DELEGATION = exports.KEY_STORAGE_KEY = void 0;
const db_1 = require("./db");
exports.KEY_STORAGE_KEY = 'identity';
exports.KEY_STORAGE_DELEGATION = 'delegation';
exports.KEY_VECTOR = 'iv';
// Increment if any fields are modified
exports.DB_VERSION = 1;
exports.isBrowser = typeof window !== 'undefined';
/**
 * Legacy implementation of AuthClientStorage, for use where IndexedDb is not available
 */
class LocalStorage {
    constructor(prefix = 'ic-', _localStorage) {
        this.prefix = prefix;
        this._localStorage = _localStorage;
    }
    get(key) {
        return Promise.resolve(this._getLocalStorage().getItem(this.prefix + key));
    }
    set(key, value) {
        this._getLocalStorage().setItem(this.prefix + key, value);
        return Promise.resolve();
    }
    remove(key) {
        this._getLocalStorage().removeItem(this.prefix + key);
        return Promise.resolve();
    }
    _getLocalStorage() {
        if (this._localStorage) {
            return this._localStorage;
        }
        const ls = typeof window === 'undefined'
            ? typeof global === 'undefined'
                ? typeof self === 'undefined'
                    ? undefined
                    : self.localStorage
                : global.localStorage
            : window.localStorage;
        if (!ls) {
            throw new Error('Could not find local storage.');
        }
        return ls;
    }
}
exports.LocalStorage = LocalStorage;
/**
 * IdbStorage is an interface for simple storage of string key-value pairs built on {@link IdbKeyVal}
 *
 * It replaces {@link LocalStorage}
 * @see implements {@link AuthClientStorage}
 */
class IdbStorage {
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
    constructor(options) {
        _IdbStorage_options.set(this, void 0);
        __classPrivateFieldSet(this, _IdbStorage_options, options !== null && options !== void 0 ? options : {}, "f");
    }
    get _db() {
        return new Promise(resolve => {
            if (this.initializedDb) {
                resolve(this.initializedDb);
                return;
            }
            db_1.IdbKeyVal.create(__classPrivateFieldGet(this, _IdbStorage_options, "f")).then(db => {
                this.initializedDb = db;
                resolve(db);
            });
        });
    }
    async get(key) {
        const db = await this._db;
        return await db.get(key);
        // return (await db.get<string>(key)) ?? null;
    }
    async set(key, value) {
        const db = await this._db;
        await db.set(key, value);
    }
    async remove(key) {
        const db = await this._db;
        await db.remove(key);
    }
}
exports.IdbStorage = IdbStorage;
_IdbStorage_options = new WeakMap();
//# sourceMappingURL=storage.js.map