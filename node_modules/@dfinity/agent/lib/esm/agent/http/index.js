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
var _HttpAgent_instances, _HttpAgent_identity, _HttpAgent_fetch, _HttpAgent_fetchOptions, _HttpAgent_callOptions, _HttpAgent_timeDiffMsecs, _HttpAgent_credentials, _HttpAgent_rootKeyFetched, _HttpAgent_retryTimes, _HttpAgent_backoffStrategy, _HttpAgent_maxIngressExpiryInMinutes, _HttpAgent_waterMark, _HttpAgent_queryPipeline, _HttpAgent_updatePipeline, _HttpAgent_subnetKeys, _HttpAgent_verifyQuerySignatures, _HttpAgent_requestAndRetryQuery, _HttpAgent_requestAndRetry, _HttpAgent_verifyQueryResponse;
import { Principal } from '@dfinity/principal';
import { AgentError } from '../../errors';
import { AnonymousIdentity } from '../../auth';
import * as cbor from '../../cbor';
import { hashOfMap, requestIdOf } from '../../request_id';
import { bufFromBufLike, concat, fromHex } from '../../utils/buffer';
import { Expiry, httpHeadersTransform, makeNonceTransform } from './transforms';
import { makeNonce, SubmitRequestType, } from './types';
import { AgentHTTPResponseError } from './errors';
import { request } from '../../canisterStatus';
import { CertificateVerificationError, LookupStatus, lookup_path, } from '../../certificate';
import { ed25519 } from '@noble/curves/ed25519';
import { ExpirableMap } from '../../utils/expirableMap';
import { Ed25519PublicKey } from '../../public_key';
import { decodeTime } from '../../utils/leb';
import { ObservableLog } from '../../observable';
import { ExponentialBackoff } from '../../polling/backoff';
import { DEFAULT_INGRESS_EXPIRY_DELTA_IN_MSECS } from '../../constants';
export * from './transforms';
export { makeNonce } from './types';
export var RequestStatusResponseStatus;
(function (RequestStatusResponseStatus) {
    RequestStatusResponseStatus["Received"] = "received";
    RequestStatusResponseStatus["Processing"] = "processing";
    RequestStatusResponseStatus["Replied"] = "replied";
    RequestStatusResponseStatus["Rejected"] = "rejected";
    RequestStatusResponseStatus["Unknown"] = "unknown";
    RequestStatusResponseStatus["Done"] = "done";
})(RequestStatusResponseStatus || (RequestStatusResponseStatus = {}));
const MINUTE_TO_MSECS = 60 * 1000;
// Root public key for the IC, encoded as hex
export const IC_ROOT_KEY = '308182301d060d2b0601040182dc7c0503010201060c2b0601040182dc7c05030201036100814' +
    'c0e6ec71fab583b08bd81373c255c3c371b2e84863c98a4f1e08b74235d14fb5d9c0cd546d968' +
    '5f913a0c0b2cc5341583bf4b4392e467db96d65b9bb4cb717112f8472e0d5a4d14505ffd7484' +
    'b01291091c5f87b98883463f98091a0baaae';
export const MANAGEMENT_CANISTER_ID = 'aaaaa-aa';
// IC0 domain info
const IC0_DOMAIN = 'ic0.app';
const IC0_SUB_DOMAIN = '.ic0.app';
const ICP0_DOMAIN = 'icp0.io';
const ICP0_SUB_DOMAIN = '.icp0.io';
const ICP_API_DOMAIN = 'icp-api.io';
const ICP_API_SUB_DOMAIN = '.icp-api.io';
class HttpDefaultFetchError extends AgentError {
    constructor(message) {
        super(message);
        this.message = message;
    }
}
export class IdentityInvalidError extends AgentError {
    constructor(message) {
        super(message);
        this.message = message;
    }
}
function getDefaultFetch() {
    let defaultFetch;
    if (typeof window !== 'undefined') {
        // Browser context
        if (window.fetch) {
            defaultFetch = window.fetch.bind(window);
        }
        else {
            throw new HttpDefaultFetchError('Fetch implementation was not available. You appear to be in a browser context, but window.fetch was not present.');
        }
    }
    else if (typeof global !== 'undefined') {
        // Node context
        if (global.fetch) {
            defaultFetch = global.fetch.bind(global);
        }
        else {
            throw new HttpDefaultFetchError('Fetch implementation was not available. You appear to be in a Node.js context, but global.fetch was not available.');
        }
    }
    else if (typeof self !== 'undefined') {
        if (self.fetch) {
            defaultFetch = self.fetch.bind(self);
        }
    }
    if (defaultFetch) {
        return defaultFetch;
    }
    throw new HttpDefaultFetchError('Fetch implementation was not available. Please provide fetch to the HttpAgent constructor, or ensure it is available in the window or global context.');
}
function determineHost(configuredHost) {
    let host;
    if (configuredHost !== undefined) {
        if (!configuredHost.match(/^[a-z]+:/) && typeof window !== 'undefined') {
            host = new URL(window.location.protocol + '//' + configuredHost);
        }
        else {
            host = new URL(configuredHost);
        }
    }
    else {
        // Mainnet, local, and remote environments will have the api route available
        const knownHosts = ['ic0.app', 'icp0.io', '127.0.0.1', 'localhost'];
        const remoteHosts = ['.github.dev', '.gitpod.io'];
        const location = typeof window !== 'undefined' ? window.location : undefined;
        const hostname = location === null || location === void 0 ? void 0 : location.hostname;
        let knownHost;
        if (hostname && typeof hostname === 'string') {
            if (remoteHosts.some(host => hostname.endsWith(host))) {
                knownHost = hostname;
            }
            else {
                knownHost = knownHosts.find(host => hostname.endsWith(host));
            }
        }
        if (location && knownHost) {
            // If the user is on a boundary-node provided host, we can use the same host for the agent
            host = new URL(`${location.protocol}//${knownHost}${location.port ? ':' + location.port : ''}`);
        }
        else {
            host = new URL('https://icp-api.io');
        }
    }
    return host.toString();
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
export class HttpAgent {
    /**
     * @param options - Options for the HttpAgent
     * @deprecated Use `HttpAgent.create` or `HttpAgent.createSync` instead
     */
    constructor(options = {}) {
        var _a;
        _HttpAgent_instances.add(this);
        _HttpAgent_identity.set(this, void 0);
        _HttpAgent_fetch.set(this, void 0);
        _HttpAgent_fetchOptions.set(this, void 0);
        _HttpAgent_callOptions.set(this, void 0);
        _HttpAgent_timeDiffMsecs.set(this, 0);
        _HttpAgent_credentials.set(this, void 0);
        _HttpAgent_rootKeyFetched.set(this, false);
        _HttpAgent_retryTimes.set(this, void 0); // Retry requests N times before erroring by default
        _HttpAgent_backoffStrategy.set(this, void 0);
        _HttpAgent_maxIngressExpiryInMinutes.set(this, void 0);
        // Public signature to help with type checking.
        this._isAgent = true;
        this.config = {};
        // The UTC time in milliseconds when the latest request was made
        _HttpAgent_waterMark.set(this, 0);
        this.log = new ObservableLog();
        _HttpAgent_queryPipeline.set(this, []);
        _HttpAgent_updatePipeline.set(this, []);
        _HttpAgent_subnetKeys.set(this, new ExpirableMap({
            expirationTime: 5 * 60 * 1000, // 5 minutes
        }));
        _HttpAgent_verifyQuerySignatures.set(this, true);
        /**
         * See https://internetcomputer.org/docs/current/references/ic-interface-spec/#http-query for details on validation
         * @param queryResponse - The response from the query
         * @param subnetStatus - The subnet status, including all node keys
         * @returns ApiQueryResponse
         */
        _HttpAgent_verifyQueryResponse.set(this, (queryResponse, subnetStatus) => {
            if (__classPrivateFieldGet(this, _HttpAgent_verifyQuerySignatures, "f") === false) {
                // This should not be called if the user has disabled verification
                return queryResponse;
            }
            if (!subnetStatus) {
                throw new CertificateVerificationError('Invalid signature from replica signed query: no matching node key found.');
            }
            const { status, signatures = [], requestId } = queryResponse;
            const domainSeparator = new TextEncoder().encode('\x0Bic-response');
            for (const sig of signatures) {
                const { timestamp, identity } = sig;
                const nodeId = Principal.fromUint8Array(identity).toText();
                let hash;
                // Hash is constructed differently depending on the status
                if (status === 'replied') {
                    const { reply } = queryResponse;
                    hash = hashOfMap({
                        status: status,
                        reply: reply,
                        timestamp: BigInt(timestamp),
                        request_id: requestId,
                    });
                }
                else if (status === 'rejected') {
                    const { reject_code, reject_message, error_code } = queryResponse;
                    hash = hashOfMap({
                        status: status,
                        reject_code: reject_code,
                        reject_message: reject_message,
                        error_code: error_code,
                        timestamp: BigInt(timestamp),
                        request_id: requestId,
                    });
                }
                else {
                    throw new Error(`Unknown status: ${status}`);
                }
                const separatorWithHash = concat(domainSeparator, new Uint8Array(hash));
                // FIX: check for match without verifying N times
                const pubKey = subnetStatus === null || subnetStatus === void 0 ? void 0 : subnetStatus.nodeKeys.get(nodeId);
                if (!pubKey) {
                    throw new CertificateVerificationError('Invalid signature from replica signed query: no matching node key found.');
                }
                const rawKey = Ed25519PublicKey.fromDer(pubKey).rawKey;
                const valid = ed25519.verify(sig.signature, new Uint8Array(separatorWithHash), new Uint8Array(rawKey));
                if (valid)
                    return queryResponse;
                throw new CertificateVerificationError(`Invalid signature from replica ${nodeId} signed query.`);
            }
            return queryResponse;
        });
        this.config = options;
        __classPrivateFieldSet(this, _HttpAgent_fetch, options.fetch || getDefaultFetch() || fetch.bind(global), "f");
        __classPrivateFieldSet(this, _HttpAgent_fetchOptions, options.fetchOptions, "f");
        __classPrivateFieldSet(this, _HttpAgent_callOptions, options.callOptions, "f");
        this.rootKey = options.rootKey ? options.rootKey : fromHex(IC_ROOT_KEY);
        const host = determineHost(options.host);
        this.host = new URL(host);
        if (options.verifyQuerySignatures !== undefined) {
            __classPrivateFieldSet(this, _HttpAgent_verifyQuerySignatures, options.verifyQuerySignatures, "f");
        }
        // Default is 3
        __classPrivateFieldSet(this, _HttpAgent_retryTimes, (_a = options.retryTimes) !== null && _a !== void 0 ? _a : 3, "f");
        // Delay strategy for retries. Default is exponential backoff
        const defaultBackoffFactory = () => new ExponentialBackoff({
            maxIterations: __classPrivateFieldGet(this, _HttpAgent_retryTimes, "f"),
        });
        __classPrivateFieldSet(this, _HttpAgent_backoffStrategy, options.backoffStrategy || defaultBackoffFactory, "f");
        // Rewrite to avoid redirects
        if (this.host.hostname.endsWith(IC0_SUB_DOMAIN)) {
            this.host.hostname = IC0_DOMAIN;
        }
        else if (this.host.hostname.endsWith(ICP0_SUB_DOMAIN)) {
            this.host.hostname = ICP0_DOMAIN;
        }
        else if (this.host.hostname.endsWith(ICP_API_SUB_DOMAIN)) {
            this.host.hostname = ICP_API_DOMAIN;
        }
        if (options.credentials) {
            const { name, password } = options.credentials;
            __classPrivateFieldSet(this, _HttpAgent_credentials, `${name}${password ? ':' + password : ''}`, "f");
        }
        __classPrivateFieldSet(this, _HttpAgent_identity, Promise.resolve(options.identity || new AnonymousIdentity()), "f");
        if (options.ingressExpiryInMinutes && options.ingressExpiryInMinutes > 5) {
            throw new AgentError(`The maximum ingress expiry time is 5 minutes. Provided ingress expiry time is ${options.ingressExpiryInMinutes} minutes.`);
        }
        if (options.ingressExpiryInMinutes && options.ingressExpiryInMinutes <= 0) {
            throw new AgentError(`Ingress expiry time must be greater than 0. Provided ingress expiry time is ${options.ingressExpiryInMinutes} minutes.`);
        }
        __classPrivateFieldSet(this, _HttpAgent_maxIngressExpiryInMinutes, options.ingressExpiryInMinutes || 5, "f");
        // Add a nonce transform to ensure calls are unique
        this.addTransform('update', makeNonceTransform(makeNonce));
        if (options.useQueryNonces) {
            this.addTransform('query', makeNonceTransform(makeNonce));
        }
        if (options.logToConsole) {
            this.log.subscribe(log => {
                if (log.level === 'error') {
                    console.error(log.message);
                }
                else if (log.level === 'warn') {
                    console.warn(log.message);
                }
                else {
                    console.log(log.message);
                }
            });
        }
    }
    get waterMark() {
        return __classPrivateFieldGet(this, _HttpAgent_waterMark, "f");
    }
    static createSync(options = {}) {
        return new this(Object.assign({}, options));
    }
    static async create(options = {
        shouldFetchRootKey: false,
    }) {
        const agent = HttpAgent.createSync(options);
        const initPromises = [agent.syncTime()];
        if (agent.host.toString() !== 'https://icp-api.io' && options.shouldFetchRootKey) {
            initPromises.push(agent.fetchRootKey());
        }
        await Promise.all(initPromises);
        return agent;
    }
    static async from(agent) {
        var _a;
        try {
            if ('config' in agent) {
                return await HttpAgent.create(agent.config);
            }
            return await HttpAgent.create({
                fetch: agent._fetch,
                fetchOptions: agent._fetchOptions,
                callOptions: agent._callOptions,
                host: agent._host.toString(),
                identity: (_a = agent._identity) !== null && _a !== void 0 ? _a : undefined,
            });
        }
        catch (_b) {
            throw new AgentError('Failed to create agent from provided agent');
        }
    }
    isLocal() {
        const hostname = this.host.hostname;
        return hostname === '127.0.0.1' || hostname.endsWith('127.0.0.1');
    }
    addTransform(type, fn, priority = fn.priority || 0) {
        if (type === 'update') {
            // Keep the pipeline sorted at all time, by priority.
            const i = __classPrivateFieldGet(this, _HttpAgent_updatePipeline, "f").findIndex(x => (x.priority || 0) < priority);
            __classPrivateFieldGet(this, _HttpAgent_updatePipeline, "f").splice(i >= 0 ? i : __classPrivateFieldGet(this, _HttpAgent_updatePipeline, "f").length, 0, Object.assign(fn, { priority }));
        }
        else if (type === 'query') {
            // Keep the pipeline sorted at all time, by priority.
            const i = __classPrivateFieldGet(this, _HttpAgent_queryPipeline, "f").findIndex(x => (x.priority || 0) < priority);
            __classPrivateFieldGet(this, _HttpAgent_queryPipeline, "f").splice(i >= 0 ? i : __classPrivateFieldGet(this, _HttpAgent_queryPipeline, "f").length, 0, Object.assign(fn, { priority }));
        }
    }
    async getPrincipal() {
        if (!__classPrivateFieldGet(this, _HttpAgent_identity, "f")) {
            throw new IdentityInvalidError("This identity has expired due this application's security policy. Please refresh your authentication.");
        }
        return (await __classPrivateFieldGet(this, _HttpAgent_identity, "f")).getPrincipal();
    }
    async call(canisterId, options, identity) {
        var _a;
        // TODO - restore this value
        const callSync = (_a = options.callSync) !== null && _a !== void 0 ? _a : true;
        const id = await (identity !== undefined ? await identity : await __classPrivateFieldGet(this, _HttpAgent_identity, "f"));
        if (!id) {
            throw new IdentityInvalidError("This identity has expired due this application's security policy. Please refresh your authentication.");
        }
        const canister = Principal.from(canisterId);
        const ecid = options.effectiveCanisterId
            ? Principal.from(options.effectiveCanisterId)
            : canister;
        const sender = id.getPrincipal() || Principal.anonymous();
        let ingress_expiry = new Expiry(__classPrivateFieldGet(this, _HttpAgent_maxIngressExpiryInMinutes, "f") * MINUTE_TO_MSECS);
        // If the value is off by more than 30 seconds, reconcile system time with the network
        if (Math.abs(__classPrivateFieldGet(this, _HttpAgent_timeDiffMsecs, "f")) > 1000 * 30) {
            ingress_expiry = new Expiry(__classPrivateFieldGet(this, _HttpAgent_maxIngressExpiryInMinutes, "f") * MINUTE_TO_MSECS + __classPrivateFieldGet(this, _HttpAgent_timeDiffMsecs, "f"));
        }
        const submit = {
            request_type: SubmitRequestType.Call,
            canister_id: canister,
            method_name: options.methodName,
            arg: options.arg,
            sender,
            ingress_expiry,
        };
        let transformedRequest = (await this._transform({
            request: {
                body: null,
                method: 'POST',
                headers: Object.assign({ 'Content-Type': 'application/cbor' }, (__classPrivateFieldGet(this, _HttpAgent_credentials, "f") ? { Authorization: 'Basic ' + btoa(__classPrivateFieldGet(this, _HttpAgent_credentials, "f")) } : {})),
            },
            endpoint: "call" /* Endpoint.Call */,
            body: submit,
        }));
        const nonce = transformedRequest.body.nonce
            ? toNonce(transformedRequest.body.nonce)
            : undefined;
        submit.nonce = nonce;
        function toNonce(buf) {
            return new Uint8Array(buf);
        }
        // Apply transform for identity.
        transformedRequest = (await id.transformRequest(transformedRequest));
        const body = cbor.encode(transformedRequest.body);
        const backoff = __classPrivateFieldGet(this, _HttpAgent_backoffStrategy, "f").call(this);
        try {
            // Attempt v3 sync call
            const requestSync = () => {
                this.log.print(`fetching "/api/v3/canister/${ecid.toText()}/call" with request:`, transformedRequest);
                return __classPrivateFieldGet(this, _HttpAgent_fetch, "f").call(this, '' + new URL(`/api/v3/canister/${ecid.toText()}/call`, this.host), Object.assign(Object.assign(Object.assign({}, __classPrivateFieldGet(this, _HttpAgent_callOptions, "f")), transformedRequest.request), { body }));
            };
            const requestAsync = () => {
                this.log.print(`fetching "/api/v2/canister/${ecid.toText()}/call" with request:`, transformedRequest);
                return __classPrivateFieldGet(this, _HttpAgent_fetch, "f").call(this, '' + new URL(`/api/v2/canister/${ecid.toText()}/call`, this.host), Object.assign(Object.assign(Object.assign({}, __classPrivateFieldGet(this, _HttpAgent_callOptions, "f")), transformedRequest.request), { body }));
            };
            const request = __classPrivateFieldGet(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetry).call(this, {
                request: callSync ? requestSync : requestAsync,
                backoff,
                tries: 0,
            });
            const requestId = requestIdOf(submit);
            const response = await request;
            const responseBuffer = await response.arrayBuffer();
            const responseBody = (response.status === 200 && responseBuffer.byteLength > 0
                ? cbor.decode(responseBuffer)
                : null);
            // Update the watermark with the latest time from consensus
            if (responseBody && 'certificate' in responseBody) {
                const time = await this.parseTimeFromResponse({
                    certificate: responseBody.certificate,
                });
                __classPrivateFieldSet(this, _HttpAgent_waterMark, time, "f");
            }
            return {
                requestId,
                response: {
                    ok: response.ok,
                    status: response.status,
                    statusText: response.statusText,
                    body: responseBody,
                    headers: httpHeadersTransform(response.headers),
                },
                requestDetails: submit,
            };
        }
        catch (error) {
            // If the error is due to the v3 api not being supported, fall back to v2
            if (error.message.includes('v3 api not supported.')) {
                this.log.warn('v3 api not supported. Fall back to v2');
                return this.call(canisterId, Object.assign(Object.assign({}, options), { 
                    // disable v3 api
                    callSync: false }), identity);
            }
            this.log.error('Error while making call:', error);
            throw error;
        }
    }
    async query(canisterId, fields, identity) {
        const backoff = __classPrivateFieldGet(this, _HttpAgent_backoffStrategy, "f").call(this);
        const ecid = fields.effectiveCanisterId
            ? Principal.from(fields.effectiveCanisterId)
            : Principal.from(canisterId);
        this.log.print(`ecid ${ecid.toString()}`);
        this.log.print(`canisterId ${canisterId.toString()}`);
        const makeQuery = async () => {
            const id = await (identity !== undefined ? identity : __classPrivateFieldGet(this, _HttpAgent_identity, "f"));
            if (!id) {
                throw new IdentityInvalidError("This identity has expired due this application's security policy. Please refresh your authentication.");
            }
            const canister = Principal.from(canisterId);
            const sender = (id === null || id === void 0 ? void 0 : id.getPrincipal()) || Principal.anonymous();
            const request = {
                request_type: "query" /* ReadRequestType.Query */,
                canister_id: canister,
                method_name: fields.methodName,
                arg: fields.arg,
                sender,
                ingress_expiry: new Expiry(__classPrivateFieldGet(this, _HttpAgent_maxIngressExpiryInMinutes, "f") * MINUTE_TO_MSECS),
            };
            const requestId = requestIdOf(request);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let transformedRequest = await this._transform({
                request: {
                    method: 'POST',
                    headers: Object.assign({ 'Content-Type': 'application/cbor' }, (__classPrivateFieldGet(this, _HttpAgent_credentials, "f") ? { Authorization: 'Basic ' + btoa(__classPrivateFieldGet(this, _HttpAgent_credentials, "f")) } : {})),
                },
                endpoint: "read" /* Endpoint.Query */,
                body: request,
            });
            // Apply transform for identity.
            transformedRequest = (await (id === null || id === void 0 ? void 0 : id.transformRequest(transformedRequest)));
            const body = cbor.encode(transformedRequest.body);
            const args = {
                canister: canister.toText(),
                ecid,
                transformedRequest,
                body,
                requestId,
                backoff,
                tries: 0,
            };
            return {
                requestDetails: request,
                query: await __classPrivateFieldGet(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetryQuery).call(this, args),
            };
        };
        const getSubnetStatus = async () => {
            if (!__classPrivateFieldGet(this, _HttpAgent_verifyQuerySignatures, "f")) {
                return undefined;
            }
            const subnetStatus = __classPrivateFieldGet(this, _HttpAgent_subnetKeys, "f").get(ecid.toString());
            if (subnetStatus) {
                return subnetStatus;
            }
            await this.fetchSubnetKeys(ecid.toString());
            return __classPrivateFieldGet(this, _HttpAgent_subnetKeys, "f").get(ecid.toString());
        };
        // Attempt to make the query i=retryTimes times
        // Make query and fetch subnet keys in parallel
        const [queryResult, subnetStatus] = await Promise.all([makeQuery(), getSubnetStatus()]);
        const { requestDetails, query } = queryResult;
        const queryWithDetails = Object.assign(Object.assign({}, query), { requestDetails });
        this.log.print('Query response:', queryWithDetails);
        // Skip verification if the user has disabled it
        if (!__classPrivateFieldGet(this, _HttpAgent_verifyQuerySignatures, "f")) {
            return queryWithDetails;
        }
        try {
            return __classPrivateFieldGet(this, _HttpAgent_verifyQueryResponse, "f").call(this, queryWithDetails, subnetStatus);
        }
        catch (_a) {
            // In case the node signatures have changed, refresh the subnet keys and try again
            this.log.warn('Query response verification failed. Retrying with fresh subnet keys.');
            __classPrivateFieldGet(this, _HttpAgent_subnetKeys, "f").delete(canisterId.toString());
            await this.fetchSubnetKeys(ecid.toString());
            const updatedSubnetStatus = __classPrivateFieldGet(this, _HttpAgent_subnetKeys, "f").get(canisterId.toString());
            if (!updatedSubnetStatus) {
                throw new CertificateVerificationError('Invalid signature from replica signed query: no matching node key found.');
            }
            return __classPrivateFieldGet(this, _HttpAgent_verifyQueryResponse, "f").call(this, queryWithDetails, updatedSubnetStatus);
        }
    }
    async createReadStateRequest(fields, identity) {
        const id = await (identity !== undefined ? await identity : await __classPrivateFieldGet(this, _HttpAgent_identity, "f"));
        if (!id) {
            throw new IdentityInvalidError("This identity has expired due this application's security policy. Please refresh your authentication.");
        }
        const sender = (id === null || id === void 0 ? void 0 : id.getPrincipal()) || Principal.anonymous();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transformedRequest = await this._transform({
            request: {
                method: 'POST',
                headers: Object.assign({ 'Content-Type': 'application/cbor' }, (__classPrivateFieldGet(this, _HttpAgent_credentials, "f") ? { Authorization: 'Basic ' + btoa(__classPrivateFieldGet(this, _HttpAgent_credentials, "f")) } : {})),
            },
            endpoint: "read_state" /* Endpoint.ReadState */,
            body: {
                request_type: "read_state" /* ReadRequestType.ReadState */,
                paths: fields.paths,
                sender,
                ingress_expiry: new Expiry(__classPrivateFieldGet(this, _HttpAgent_maxIngressExpiryInMinutes, "f") * MINUTE_TO_MSECS),
            },
        });
        // Apply transform for identity.
        return id === null || id === void 0 ? void 0 : id.transformRequest(transformedRequest);
    }
    async readState(canisterId, fields, identity, 
    // eslint-disable-next-line
    request) {
        const canister = typeof canisterId === 'string' ? Principal.fromText(canisterId) : canisterId;
        const transformedRequest = request !== null && request !== void 0 ? request : (await this.createReadStateRequest(fields, identity));
        // With read_state, we should always use a fresh expiry, even beyond the point where the initial request would have expired
        const bodyWithAdjustedExpiry = Object.assign(Object.assign({}, transformedRequest.body), { ingress_expiry: new Expiry(DEFAULT_INGRESS_EXPIRY_DELTA_IN_MSECS) });
        const body = cbor.encode(bodyWithAdjustedExpiry);
        this.log.print(`fetching "/api/v2/canister/${canister}/read_state" with request:`, transformedRequest);
        // TODO - https://dfinity.atlassian.net/browse/SDK-1092
        const backoff = __classPrivateFieldGet(this, _HttpAgent_backoffStrategy, "f").call(this);
        try {
            const response = await __classPrivateFieldGet(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetry).call(this, {
                request: () => __classPrivateFieldGet(this, _HttpAgent_fetch, "f").call(this, '' + new URL(`/api/v2/canister/${canister.toString()}/read_state`, this.host), Object.assign(Object.assign(Object.assign({}, __classPrivateFieldGet(this, _HttpAgent_fetchOptions, "f")), transformedRequest.request), { body })),
                backoff,
                tries: 0,
            });
            if (!response.ok) {
                throw new Error(`Server returned an error:\n` +
                    `  Code: ${response.status} (${response.statusText})\n` +
                    `  Body: ${await response.text()}\n`);
            }
            const decodedResponse = cbor.decode(await response.arrayBuffer());
            this.log.print('Read state response:', decodedResponse);
            const parsedTime = await this.parseTimeFromResponse(decodedResponse);
            if (parsedTime > 0) {
                this.log.print('Read state response time:', parsedTime);
                __classPrivateFieldSet(this, _HttpAgent_waterMark, parsedTime, "f");
            }
            return decodedResponse;
        }
        catch (error) {
            this.log.error('Caught exception while attempting to read state', error);
            throw error;
        }
    }
    async parseTimeFromResponse(response) {
        let tree;
        if (response.certificate) {
            const decoded = cbor.decode(response.certificate);
            if (decoded && 'tree' in decoded) {
                tree = decoded.tree;
            }
            else {
                throw new Error('Could not decode time from response');
            }
            const timeLookup = lookup_path(['time'], tree);
            if (timeLookup.status !== LookupStatus.Found) {
                throw new Error('Time was not found in the response or was not in its expected format.');
            }
            if (!(timeLookup.value instanceof ArrayBuffer) && !ArrayBuffer.isView(timeLookup)) {
                throw new Error('Time was not found in the response or was not in its expected format.');
            }
            const date = decodeTime(bufFromBufLike(timeLookup.value));
            this.log.print('Time from response:', date);
            this.log.print('Time from response in milliseconds:', Number(date));
            return Number(date);
        }
        else {
            this.log.warn('No certificate found in response');
        }
        return 0;
    }
    /**
     * Allows agent to sync its time with the network. Can be called during intialization or mid-lifecycle if the device's clock has drifted away from the network time. This is necessary to set the Expiry for a request
     * @param {Principal} canisterId - Pass a canister ID if you need to sync the time with a particular replica. Uses the management canister by default
     */
    async syncTime(canisterId) {
        const CanisterStatus = await import('../../canisterStatus');
        const callTime = Date.now();
        try {
            if (!canisterId) {
                this.log.print('Syncing time with the IC. No canisterId provided, so falling back to ryjl3-tyaaa-aaaaa-aaaba-cai');
            }
            const status = await CanisterStatus.request({
                // Fall back with canisterId of the ICP Ledger
                canisterId: canisterId !== null && canisterId !== void 0 ? canisterId : Principal.from('ryjl3-tyaaa-aaaaa-aaaba-cai'),
                agent: this,
                paths: ['time'],
            });
            const replicaTime = status.get('time');
            if (replicaTime) {
                __classPrivateFieldSet(this, _HttpAgent_timeDiffMsecs, Number(replicaTime) - Number(callTime), "f");
            }
        }
        catch (error) {
            this.log.error('Caught exception while attempting to sync time', error);
        }
    }
    async status() {
        const headers = __classPrivateFieldGet(this, _HttpAgent_credentials, "f")
            ? {
                Authorization: 'Basic ' + btoa(__classPrivateFieldGet(this, _HttpAgent_credentials, "f")),
            }
            : {};
        this.log.print(`fetching "/api/v2/status"`);
        const backoff = __classPrivateFieldGet(this, _HttpAgent_backoffStrategy, "f").call(this);
        const response = await __classPrivateFieldGet(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetry).call(this, {
            backoff,
            request: () => __classPrivateFieldGet(this, _HttpAgent_fetch, "f").call(this, '' + new URL(`/api/v2/status`, this.host), Object.assign({ headers }, __classPrivateFieldGet(this, _HttpAgent_fetchOptions, "f"))),
            tries: 0,
        });
        return cbor.decode(await response.arrayBuffer());
    }
    async fetchRootKey() {
        if (!__classPrivateFieldGet(this, _HttpAgent_rootKeyFetched, "f")) {
            const status = await this.status();
            // Hex-encoded version of the replica root key
            this.rootKey = status.root_key;
            __classPrivateFieldSet(this, _HttpAgent_rootKeyFetched, true, "f");
        }
        return this.rootKey;
    }
    invalidateIdentity() {
        __classPrivateFieldSet(this, _HttpAgent_identity, null, "f");
    }
    replaceIdentity(identity) {
        __classPrivateFieldSet(this, _HttpAgent_identity, Promise.resolve(identity), "f");
    }
    async fetchSubnetKeys(canisterId) {
        const effectiveCanisterId = Principal.from(canisterId);
        const response = await request({
            canisterId: effectiveCanisterId,
            paths: ['subnet'],
            agent: this,
        });
        const subnetResponse = response.get('subnet');
        if (subnetResponse && typeof subnetResponse === 'object' && 'nodeKeys' in subnetResponse) {
            __classPrivateFieldGet(this, _HttpAgent_subnetKeys, "f").set(effectiveCanisterId.toText(), subnetResponse);
            return subnetResponse;
        }
        // If the subnet status is not returned, return undefined
        return undefined;
    }
    _transform(request) {
        let p = Promise.resolve(request);
        if (request.endpoint === "call" /* Endpoint.Call */) {
            for (const fn of __classPrivateFieldGet(this, _HttpAgent_updatePipeline, "f")) {
                p = p.then(r => fn(r).then(r2 => r2 || r));
            }
        }
        else {
            for (const fn of __classPrivateFieldGet(this, _HttpAgent_queryPipeline, "f")) {
                p = p.then(r => fn(r).then(r2 => r2 || r));
            }
        }
        return p;
    }
}
_HttpAgent_identity = new WeakMap(), _HttpAgent_fetch = new WeakMap(), _HttpAgent_fetchOptions = new WeakMap(), _HttpAgent_callOptions = new WeakMap(), _HttpAgent_timeDiffMsecs = new WeakMap(), _HttpAgent_credentials = new WeakMap(), _HttpAgent_rootKeyFetched = new WeakMap(), _HttpAgent_retryTimes = new WeakMap(), _HttpAgent_backoffStrategy = new WeakMap(), _HttpAgent_maxIngressExpiryInMinutes = new WeakMap(), _HttpAgent_waterMark = new WeakMap(), _HttpAgent_queryPipeline = new WeakMap(), _HttpAgent_updatePipeline = new WeakMap(), _HttpAgent_subnetKeys = new WeakMap(), _HttpAgent_verifyQuerySignatures = new WeakMap(), _HttpAgent_verifyQueryResponse = new WeakMap(), _HttpAgent_instances = new WeakSet(), _HttpAgent_requestAndRetryQuery = async function _HttpAgent_requestAndRetryQuery(args) {
    var _a, _b;
    const { ecid, transformedRequest, body, requestId, backoff, tries } = args;
    const delay = tries === 0 ? 0 : backoff.next();
    this.log.print(`fetching "/api/v2/canister/${ecid.toString()}/query" with tries:`, {
        tries,
        backoff,
        delay,
    });
    // If delay is null, the backoff strategy is exhausted due to a maximum number of retries, duration, or other reason
    if (delay === null) {
        throw new AgentError(`Timestamp failed to pass the watermark after retrying the configured ${__classPrivateFieldGet(this, _HttpAgent_retryTimes, "f")} times. We cannot guarantee the integrity of the response since it could be a replay attack.`);
    }
    if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    let response;
    // Make the request and retry if it throws an error
    try {
        this.log.print(`fetching "/api/v2/canister/${ecid.toString()}/query" with request:`, transformedRequest);
        const fetchResponse = await __classPrivateFieldGet(this, _HttpAgent_fetch, "f").call(this, '' + new URL(`/api/v2/canister/${ecid.toString()}/query`, this.host), Object.assign(Object.assign(Object.assign({}, __classPrivateFieldGet(this, _HttpAgent_fetchOptions, "f")), transformedRequest.request), { body }));
        if (fetchResponse.status === 200) {
            const queryResponse = cbor.decode(await fetchResponse.arrayBuffer());
            response = Object.assign(Object.assign({}, queryResponse), { httpDetails: {
                    ok: fetchResponse.ok,
                    status: fetchResponse.status,
                    statusText: fetchResponse.statusText,
                    headers: httpHeadersTransform(fetchResponse.headers),
                }, requestId });
        }
        else {
            throw new AgentHTTPResponseError(`Gateway returned an error:\n` +
                `  Code: ${fetchResponse.status} (${fetchResponse.statusText})\n` +
                `  Body: ${await fetchResponse.text()}\n`, {
                ok: fetchResponse.ok,
                status: fetchResponse.status,
                statusText: fetchResponse.statusText,
                headers: httpHeadersTransform(fetchResponse.headers),
            });
        }
    }
    catch (error) {
        if (tries < __classPrivateFieldGet(this, _HttpAgent_retryTimes, "f")) {
            this.log.warn(`Caught exception while attempting to make query:\n` +
                `  ${error}\n` +
                `  Retrying query.`);
            return await __classPrivateFieldGet(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetryQuery).call(this, Object.assign(Object.assign({}, args), { tries: tries + 1 }));
        }
        throw error;
    }
    const timestamp = (_b = (_a = response.signatures) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.timestamp;
    // Skip watermark verification if the user has set verifyQuerySignatures to false
    if (!__classPrivateFieldGet(this, _HttpAgent_verifyQuerySignatures, "f")) {
        return response;
    }
    if (!timestamp) {
        throw new Error('Timestamp not found in query response. This suggests a malformed or malicious response.');
    }
    // Convert the timestamp to milliseconds
    const timeStampInMs = Number(BigInt(timestamp) / BigInt(1000000));
    this.log.print('watermark and timestamp', {
        waterMark: this.waterMark,
        timestamp: timeStampInMs,
    });
    // If the timestamp is less than the watermark, retry the request up to the retry limit
    if (Number(this.waterMark) > timeStampInMs) {
        const error = new AgentError('Timestamp is below the watermark. Retrying query.');
        this.log.error('Timestamp is below', error, {
            timestamp,
            waterMark: this.waterMark,
        });
        if (tries < __classPrivateFieldGet(this, _HttpAgent_retryTimes, "f")) {
            return await __classPrivateFieldGet(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetryQuery).call(this, Object.assign(Object.assign({}, args), { tries: tries + 1 }));
        }
        {
            throw new AgentError(`Timestamp failed to pass the watermark after retrying the configured ${__classPrivateFieldGet(this, _HttpAgent_retryTimes, "f")} times. We cannot guarantee the integrity of the response since it could be a replay attack.`);
        }
    }
    return response;
}, _HttpAgent_requestAndRetry = async function _HttpAgent_requestAndRetry(args) {
    const { request, backoff, tries } = args;
    const delay = tries === 0 ? 0 : backoff.next();
    // If delay is null, the backoff strategy is exhausted due to a maximum number of retries, duration, or other reason
    if (delay === null) {
        throw new AgentError(`Timestamp failed to pass the watermark after retrying the configured ${__classPrivateFieldGet(this, _HttpAgent_retryTimes, "f")} times. We cannot guarantee the integrity of the response since it could be a replay attack.`);
    }
    if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    let response;
    try {
        response = await request();
    }
    catch (error) {
        if (__classPrivateFieldGet(this, _HttpAgent_retryTimes, "f") > tries) {
            this.log.warn(`Caught exception while attempting to make request:\n` +
                `  ${error}\n` +
                `  Retrying request.`);
            // Delay the request by the configured backoff strategy
            return await __classPrivateFieldGet(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetry).call(this, { request, backoff, tries: tries + 1 });
        }
        throw error;
    }
    if (response.ok) {
        return response;
    }
    const responseText = await response.clone().text();
    const errorMessage = `Server returned an error:\n` +
        `  Code: ${response.status} (${response.statusText})\n` +
        `  Body: ${responseText}\n`;
    if (response.status === 404 && response.url.includes('api/v3')) {
        throw new AgentHTTPResponseError('v3 api not supported. Fall back to v2', {
            ok: response.ok,
            status: response.status,
            statusText: response.statusText,
            headers: httpHeadersTransform(response.headers),
        });
    }
    if (tries < __classPrivateFieldGet(this, _HttpAgent_retryTimes, "f")) {
        return await __classPrivateFieldGet(this, _HttpAgent_instances, "m", _HttpAgent_requestAndRetry).call(this, { request, backoff, tries: tries + 1 });
    }
    throw new AgentHTTPResponseError(errorMessage, {
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        headers: httpHeadersTransform(response.headers),
    });
};
//# sourceMappingURL=index.js.map