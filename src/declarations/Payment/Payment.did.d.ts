import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Transaction {
  'id' : string,
  'status' : string,
  'user' : Principal,
  'timestamp' : bigint,
  'amount' : bigint,
}
export interface _SERVICE {
  'getAllTransactions' : ActorMethod<[], Array<Transaction>>,
  'getTransactionsByUser' : ActorMethod<[Principal], Array<Transaction>>,
  'saveTransaction' : ActorMethod<[Transaction], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
