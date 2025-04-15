import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface AddUserByAdminCanister {
  'addUser' : ActorMethod<[Principal], string>,
  'listUsers' : ActorMethod<[], Array<Principal>>,
}
export interface _SERVICE extends AddUserByAdminCanister {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
