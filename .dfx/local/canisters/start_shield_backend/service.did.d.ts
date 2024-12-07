import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type AccessLevel = { 'GUEST' : null } |
  { 'USER' : null } |
  { 'ADMIN' : null };
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
  'createUser' : ActorMethod<[User], undefined>,
  'deleteUser' : ActorMethod<[string], undefined>,
  'getAllUsers' : ActorMethod<[], Array<User>>,
  'getUser' : ActorMethod<[string], Result_1>,
  'getUserAccessLevel' : ActorMethod<[string], Result>,
  'updateUser' : ActorMethod<[User], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
