import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type AccessLevel = { 'GUEST' : null } |
  { 'USER' : null } |
  { 'ADMIN' : null } |
  { 'SUPER_ADMIN' : null };
export type Result = { 'ok' : string } |
  { 'err' : string };
export type Result_1 = { 'ok' : User } |
  { 'err' : string };
export interface User {
  'age' : bigint,
  'accessLevel' : AccessLevel,
  'name' : string,
  'email' : string,
  'timestamp' : bigint,
}
export interface _SERVICE {
  'createUser' : ActorMethod<[Principal, User], string>,
  'deleteUser' : ActorMethod<[Principal], string>,
  'getAllUsers' : ActorMethod<[], Array<User>>,
  'getUser' : ActorMethod<[Principal], Result_1>,
  'getUserAccessLevel' : ActorMethod<[Principal], Result>,
  'getUserByPrincipal' : ActorMethod<[Principal], [] | [User]>,
  'updateUser' : ActorMethod<[Principal, User], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
