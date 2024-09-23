import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'getPolicySummary' : ActorMethod<[], [string, string, string]>,
  'getTokenOverview' : ActorMethod<[], [string, string]>,
  'getUpcomingEvents' : ActorMethod<[], string>,
  'setPolicySummary' : ActorMethod<[string, string, string], undefined>,
  'setTokenOverview' : ActorMethod<[string, string], undefined>,
  'setUpcomingEvents' : ActorMethod<[string], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
