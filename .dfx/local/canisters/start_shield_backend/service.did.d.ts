import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type AccessLevel = { 'GUEST' : null } |
  { 'USER' : null } |
  { 'ADMIN' : null } |
  { 'SUPER_ADMIN' : null };
export interface Address {
  'street' : string,
  'country' : string,
  'city' : string,
  'postalCode' : string,
  'state' : string,
  'number' : string,
}
export interface Company {
  'additionalInfo' : string,
  'insuranceType' : string,
  'endDate' : string,
  'employees' : bigint,
  'premium' : boolean,
  'paymentOption' : string,
  'tokensEarned' : bigint,
  'commission' : bigint,
  'registrationNumber' : string,
  'email' : string,
  'policyValue' : bigint,
  'insuranceMonths' : bigint,
  'over18' : boolean,
  'address' : Address,
  'companyName' : string,
  'discount' : bigint,
  'insuredValue' : bigint,
  'phone' : string,
  'termsAgreed' : boolean,
  'industryType' : string,
  'annualRevenue' : bigint,
  'rewardPercentage' : bigint,
  'startDate' : string,
}
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
  'addCompanyForUser' : ActorMethod<[Principal, Company], string>,
  'addUser' : ActorMethod<[Principal, User], string>,
  'createUser' : ActorMethod<[Principal, User], string>,
  'deleteUser' : ActorMethod<[Principal], string>,
  'getAllUsers' : ActorMethod<[], Array<User>>,
  'getCompanyForUser' : ActorMethod<[Principal], [] | [Company]>,
  'getUser' : ActorMethod<[Principal], Result_1>,
  'getUserAccessLevel' : ActorMethod<[Principal], Result>,
  'getUserByPrincipal' : ActorMethod<[Principal], [] | [User]>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
