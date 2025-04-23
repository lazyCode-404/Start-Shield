import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Amount = bigint;
export interface Claim {
  'id' : ClaimId,
  'evidenceUrls' : Array<string>,
  'status' : ClaimStatus,
  'verificationData' : [] | [string],
  'claimant' : UserId,
  'submittedAt' : Timestamp,
  'description' : string,
  'amount' : Amount,
  'policyId' : PolicyId,
}
export type ClaimId = bigint;
export type ClaimStatus = { 'pending' : null } |
  { 'paid' : null } |
  { 'verifying' : null } |
  { 'approved' : null } |
  { 'rejected' : null };
export type PolicyId = bigint;
export type Result = { 'ok' : ClaimId } |
  { 'err' : string };
export type Result_1 = { 'ok' : null } |
  { 'err' : string };
export type Result_2 = { 'ok' : Claim } |
  { 'err' : string };
export type Timestamp = bigint;
export type UserId = Principal;
export interface _SERVICE {
  'getClaim' : ActorMethod<[ClaimId], Result_2>,
  'getClaimStatistics' : ActorMethod<
    [],
    [bigint, bigint, bigint, bigint, bigint]
  >,
  'getUserClaims' : ActorMethod<[], Array<Claim>>,
  'markClaimAsPaid' : ActorMethod<[ClaimId], Result_1>,
  'processClaim' : ActorMethod<[ClaimId, boolean, [] | [string]], Result_1>,
  'startVerification' : ActorMethod<[ClaimId], Result_1>,
  'submitClaim' : ActorMethod<
    [PolicyId, Amount, string, Array<string>],
    Result
  >,
  'testMethod' : ActorMethod<[], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
