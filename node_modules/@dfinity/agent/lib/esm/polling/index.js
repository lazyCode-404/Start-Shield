import { Expiry, RequestStatusResponseStatus } from '../agent';
import { Certificate, lookupResultToBuffer } from '../certificate';
import { toHex } from '../utils/buffer';
export * as strategy from './strategy';
import { defaultStrategy } from './strategy';
import { DEFAULT_INGRESS_EXPIRY_DELTA_IN_MSECS } from '../constants';
export { defaultStrategy } from './strategy';
/**
 * Check if an object has a property
 * @param value the object that might have the property
 * @param property the key of property we're looking for
 */
function hasProperty(value, property) {
    return Object.prototype.hasOwnProperty.call(value, property);
}
/**
 * Check if value is a signed read state request with expiry
 * @param value to check
 */
function isSignedReadStateRequestWithExpiry(value) {
    return (value !== null &&
        typeof value === 'object' &&
        hasProperty(value, 'body') &&
        value.body !== null &&
        typeof value.body === 'object' &&
        hasProperty(value.body, 'content') &&
        value.body.content !== null &&
        typeof value.body.content === 'object' &&
        hasProperty(value.body.content, 'request_type') &&
        value.body.content.request_type === "read_state" /* ReadRequestType.ReadState */ &&
        hasProperty(value.body.content, 'ingress_expiry') &&
        typeof value.body.content.ingress_expiry === 'object' &&
        value.body.content.ingress_expiry !== null &&
        hasProperty(value.body.content.ingress_expiry, 'toCBOR') &&
        typeof value.body.content.ingress_expiry.toCBOR === 'function' &&
        hasProperty(value.body.content.ingress_expiry, 'toHash') &&
        typeof value.body.content.ingress_expiry.toHash === 'function');
}
/**
 * Polls the IC to check the status of the given request then
 * returns the response bytes once the request has been processed.
 * @param agent The agent to use to poll read_state.
 * @param canisterId The effective canister ID.
 * @param requestId The Request ID to poll status for.
 * @param strategy A polling strategy.
 * @param request Request for the repeated readState call.
 * @param blsVerify - optional replacement function that verifies the BLS signature of a certificate.
 */
export async function pollForResponse(agent, canisterId, requestId, strategy = defaultStrategy(), request, blsVerify) {
    var _a;
    const path = [new TextEncoder().encode('request_status'), requestId];
    const currentRequest = request !== null && request !== void 0 ? request : (await ((_a = agent.createReadStateRequest) === null || _a === void 0 ? void 0 : _a.call(agent, { paths: [path] })));
    // Use a fresh expiry for the repeated readState call
    if (request && isSignedReadStateRequestWithExpiry(currentRequest)) {
        currentRequest.body.content.ingress_expiry = new Expiry(DEFAULT_INGRESS_EXPIRY_DELTA_IN_MSECS);
    }
    const state = await agent.readState(canisterId, { paths: [path] }, undefined, currentRequest);
    if (agent.rootKey == null)
        throw new Error('Agent root key not initialized before polling');
    const cert = await Certificate.create({
        certificate: state.certificate,
        rootKey: agent.rootKey,
        canisterId: canisterId,
        blsVerify,
    });
    const maybeBuf = lookupResultToBuffer(cert.lookup([...path, new TextEncoder().encode('status')]));
    let status;
    if (typeof maybeBuf === 'undefined') {
        // Missing requestId means we need to wait
        status = RequestStatusResponseStatus.Unknown;
    }
    else {
        status = new TextDecoder().decode(maybeBuf);
    }
    switch (status) {
        case RequestStatusResponseStatus.Replied: {
            return {
                reply: lookupResultToBuffer(cert.lookup([...path, 'reply'])),
                certificate: cert,
            };
        }
        case RequestStatusResponseStatus.Received:
        case RequestStatusResponseStatus.Unknown:
        case RequestStatusResponseStatus.Processing:
            // Execute the polling strategy, then retry.
            await strategy(canisterId, requestId, status);
            return pollForResponse(agent, canisterId, requestId, strategy, currentRequest, blsVerify);
        case RequestStatusResponseStatus.Rejected: {
            const rejectCode = new Uint8Array(lookupResultToBuffer(cert.lookup([...path, 'reject_code'])))[0];
            const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(cert.lookup([...path, 'reject_message'])));
            throw new Error(`Call was rejected:\n` +
                `  Request ID: ${toHex(requestId)}\n` +
                `  Reject code: ${rejectCode}\n` +
                `  Reject text: ${rejectMessage}\n`);
        }
        case RequestStatusResponseStatus.Done:
            // This is _technically_ not an error, but we still didn't see the `Replied` status so
            // we don't know the result and cannot decode it.
            throw new Error(`Call was marked as done but we never saw the reply:\n` +
                `  Request ID: ${toHex(requestId)}\n`);
    }
    throw new Error('unreachable');
}
//# sourceMappingURL=index.js.map