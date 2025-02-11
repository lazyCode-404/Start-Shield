import { Principal } from '@dfinity/principal';
import { QueryResponseRejected, SubmitResponse } from './agent/api';
import { RequestId } from './request_id';
/**
 * An error that happens in the Agent. This is the root of all errors and should be used
 * everywhere in the Agent code (this package).
 * @todo https://github.com/dfinity/agent-js/issues/420
 */
export declare class AgentError extends Error {
    readonly message: string;
    name: string;
    __proto__: AgentError;
    constructor(message: string);
}
export declare class ActorCallError extends AgentError {
    readonly canisterId: Principal | string;
    readonly methodName: string;
    readonly type: 'query' | 'update';
    readonly props: Record<string, string>;
    name: string;
    __proto__: ActorCallError;
    constructor(canisterId: Principal | string, methodName: string, type: 'query' | 'update', props: Record<string, string>);
}
export declare class QueryCallRejectedError extends ActorCallError {
    readonly result: QueryResponseRejected;
    name: string;
    __proto__: QueryCallRejectedError;
    constructor(canisterId: Principal | string, methodName: string, result: QueryResponseRejected);
}
export declare class UpdateCallRejectedError extends ActorCallError {
    readonly requestId: RequestId;
    readonly response: SubmitResponse['response'];
    name: string;
    __proto__: UpdateCallRejectedError;
    constructor(canisterId: Principal | string, methodName: string, requestId: RequestId, response: SubmitResponse['response']);
}
