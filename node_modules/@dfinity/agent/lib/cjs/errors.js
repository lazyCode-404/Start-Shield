"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCallRejectedError = exports.QueryCallRejectedError = exports.ActorCallError = exports.AgentError = void 0;
const principal_1 = require("@dfinity/principal");
const api_1 = require("./agent/api");
const buffer_1 = require("./utils/buffer");
/**
 * An error that happens in the Agent. This is the root of all errors and should be used
 * everywhere in the Agent code (this package).
 * @todo https://github.com/dfinity/agent-js/issues/420
 */
class AgentError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'AgentError';
        this.__proto__ = AgentError.prototype;
        Object.setPrototypeOf(this, AgentError.prototype);
    }
}
exports.AgentError = AgentError;
class ActorCallError extends AgentError {
    constructor(canisterId, methodName, type, props) {
        const cid = principal_1.Principal.from(canisterId);
        super([
            `Call failed:`,
            `  Canister: ${cid.toText()}`,
            `  Method: ${methodName} (${type})`,
            ...Object.getOwnPropertyNames(props).map(n => `  "${n}": ${JSON.stringify(props[n])}`),
        ].join('\n'));
        this.canisterId = canisterId;
        this.methodName = methodName;
        this.type = type;
        this.props = props;
        this.name = 'ActorCallError';
        this.__proto__ = ActorCallError.prototype;
        Object.setPrototypeOf(this, ActorCallError.prototype);
    }
}
exports.ActorCallError = ActorCallError;
class QueryCallRejectedError extends ActorCallError {
    constructor(canisterId, methodName, result) {
        var _a;
        const cid = principal_1.Principal.from(canisterId);
        super(cid, methodName, 'query', {
            Status: result.status,
            Code: (_a = api_1.ReplicaRejectCode[result.reject_code]) !== null && _a !== void 0 ? _a : `Unknown Code "${result.reject_code}"`,
            Message: result.reject_message,
        });
        this.result = result;
        this.name = 'QueryCallRejectedError';
        this.__proto__ = QueryCallRejectedError.prototype;
        Object.setPrototypeOf(this, QueryCallRejectedError.prototype);
    }
}
exports.QueryCallRejectedError = QueryCallRejectedError;
class UpdateCallRejectedError extends ActorCallError {
    constructor(canisterId, methodName, requestId, response) {
        const cid = principal_1.Principal.from(canisterId);
        super(cid, methodName, 'update', Object.assign({ 'Request ID': (0, buffer_1.toHex)(requestId) }, (response.body
            ? Object.assign(Object.assign({}, (response.body.error_code
                ? {
                    'Error code': response.body.error_code,
                }
                : {})), { 'Reject code': String(response.body.reject_code), 'Reject message': response.body.reject_message }) : {
            'HTTP status code': response.status.toString(),
            'HTTP status text': response.statusText,
        })));
        this.requestId = requestId;
        this.response = response;
        this.name = 'UpdateCallRejectedError';
        this.__proto__ = UpdateCallRejectedError.prototype;
        Object.setPrototypeOf(this, UpdateCallRejectedError.prototype);
    }
}
exports.UpdateCallRejectedError = UpdateCallRejectedError;
//# sourceMappingURL=errors.js.map