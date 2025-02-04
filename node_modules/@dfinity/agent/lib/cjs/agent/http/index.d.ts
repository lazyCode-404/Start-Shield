import { JsonObject } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
import { AgentError } from '../../errors';
import { Identity } from '../../auth';
import { Agent, ApiQueryResponse, QueryFields, ReadStateOptions, ReadStateResponse, SubmitResponse } from '../api';
import { HttpAgentRequest, HttpAgentRequestTransformFn } from './types';
import { SubnetStatus } from '../../canisterStatus';
import { ObservableLog } from '../../observable';
import { BackoffStrategyFactory } from '../../polling/backoff';
export * from './transforms';
export { Nonce, makeNonce } from './types';
export declare enum RequestStatusResponseStatus {
    Received = "received",
    Processing = "processing",
    Replied = "replied",
    Rejected = "rejected",
    Unknown = "unknown",
    Done = "done"
}
export declare const IC_ROOT_KEY: string;
export declare const MANAGEMENT_CANISTER_ID = "aaaaa-aa";
export declare class IdentityInvalidError extends AgentError {
    readonly message: string;
    constructor(message: string);
}
export interface HttpAgentOptions {
    fetch?: typeof fetch;
    fetchOptions?: Record<string, unknown>;
    callOptions?: Record<string, unknown>;
    host?: string;
    identity?: Identity | Promise<Identity>;
    /**
     * The maximum time a request can be delayed before being rejected.
     * @default 5 minutes
     */
    ingressExpiryInMinutes?: number;
    credentials?: {
        name: string;
        password?: string;
    };
    /**
     * Adds a unique {@link Nonce} with each query.
     * Enabling will prevent queries from being answered with a cached response.
     * @example
     * const agent = new HttpAgent({ useQueryNonces: true });
     * agent.addTransform(makeNonceTransform(makeNonce);
     * @default false
     */
    useQueryNonces?: boolean;
    /**
     * Number of times to retry requests before throwing an error
     * @default 3
     */
    retryTimes?: number;
    /**
     * The strategy to use for backoff when retrying requests
     */
    backoffStrategy?: BackoffStrategyFactory;
    /**
     * Whether the agent should verify signatures signed by node keys on query responses. Increases security, but adds overhead and must make a separate request to cache the node keys for the canister's subnet.
     * @default true
     */
    verifyQuerySignatures?: boolean;
    /**
     * Whether to log to the console. Defaults to false.
     */
    logToConsole?: boolean;
    /**
     * Alternate root key to use for verifying certificates. If not provided, the default IC root key will be used.
     */
    rootKey?: ArrayBuffer;
}
interface V1HttpAgentInterface {
    _identity: Promise<Identity> | null;
    readonly _fetch: typeof fetch;
    readonly _fetchOptions?: Record<string, unknown>;
    readonly _callOptions?: Record<string, unknown>;
    readonly _host: URL;
    readonly _credentials: string | undefined;
    readonly _retryTimes: number;
    _isAgent: true;
}
/**
 * A HTTP agent allows users to interact with a client of the internet computer
using the available methods. It exposes an API that closely follows the
public view of the internet computer, and is not intended to be exposed
directly to the majority of users due to its low-level interface.
 * There is a pipeline to apply transformations to the request before sending
it to the client. This is to decouple signature, nonce generation and
other computations so that this class can stay as simple as possible while
allowing extensions.
 */
export declare class HttpAgent implements Agent {
    #private;
    rootKey: ArrayBuffer;
    readonly host: URL;
    readonly _isAgent = true;
    config: HttpAgentOptions;
    get waterMark(): number;
    log: ObservableLog;
    /**
     * @param options - Options for the HttpAgent
     * @deprecated Use `HttpAgent.create` or `HttpAgent.createSync` instead
     */
    constructor(options?: HttpAgentOptions);
    static createSync(options?: HttpAgentOptions): HttpAgent;
    static create(options?: HttpAgentOptions & {
        shouldFetchRootKey?: boolean;
    }): Promise<HttpAgent>;
    static from(agent: Pick<HttpAgent, 'config'> | V1HttpAgentInterface): Promise<HttpAgent>;
    isLocal(): boolean;
    addTransform(type: 'update' | 'query', fn: HttpAgentRequestTransformFn, priority?: number): void;
    getPrincipal(): Promise<Principal>;
    call(canisterId: Principal | string, options: {
        methodName: string;
        arg: ArrayBuffer;
        effectiveCanisterId?: Principal | string;
        callSync?: boolean;
    }, identity?: Identity | Promise<Identity>): Promise<SubmitResponse>;
    query(canisterId: Principal | string, fields: QueryFields, identity?: Identity | Promise<Identity>): Promise<ApiQueryResponse>;
    createReadStateRequest(fields: ReadStateOptions, identity?: Identity | Promise<Identity>): Promise<any>;
    readState(canisterId: Principal | string, fields: ReadStateOptions, identity?: Identity | Promise<Identity>, request?: any): Promise<ReadStateResponse>;
    parseTimeFromResponse(response: {
        certificate: ArrayBuffer;
    }): Promise<number>;
    /**
     * Allows agent to sync its time with the network. Can be called during intialization or mid-lifecycle if the device's clock has drifted away from the network time. This is necessary to set the Expiry for a request
     * @param {Principal} canisterId - Pass a canister ID if you need to sync the time with a particular replica. Uses the management canister by default
     */
    syncTime(canisterId?: Principal): Promise<void>;
    status(): Promise<JsonObject>;
    fetchRootKey(): Promise<ArrayBuffer>;
    invalidateIdentity(): void;
    replaceIdentity(identity: Identity): void;
    fetchSubnetKeys(canisterId: Principal | string): Promise<SubnetStatus | undefined>;
    protected _transform(request: HttpAgentRequest): Promise<HttpAgentRequest>;
}
