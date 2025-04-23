import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Metadata {
  'name' : string,
  'createdAt' : Time,
  'description' : string,
  'attributes' : Array<[string, string]>,
  'image' : [] | [string],
  'policyId' : PolicyId,
}
export interface NFT { 'id' : TokenId, 'owner' : UserId, 'metadata' : Metadata }
export type PolicyId = bigint;
export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : TokenId } |
  { 'err' : string };
export type Result_2 = { 'ok' : NFT } |
  { 'err' : string };
export type Time = bigint;
export type TokenId = bigint;
export type UserId = Principal;
export interface _SERVICE {
  'getNFT' : ActorMethod<[TokenId], Result_2>,
  'getNFTByPolicy' : ActorMethod<[PolicyId], Result_2>,
  'getUserNFTs' : ActorMethod<[], Array<NFT>>,
  'mintPolicyNFT' : ActorMethod<
    [PolicyId, string, string, [] | [string], Array<[string, string]>],
    Result_1
  >,
  'transferNFT' : ActorMethod<[TokenId, Principal], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
