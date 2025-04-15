import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type AcceptanceStatus = { 'accepted' : null } |
  { 'declined' : null };
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
export type AdminStatus = { 'Approved' : null } |
  { 'Rejected' : null } |
  { 'NotRequested' : null } |
  { 'Pending' : null };
export type Amount = bigint;
export interface Company {
  'additionalInfo' : string,
  'insuranceType' : string,
  'endDate' : string,
  'employees' : bigint,
  'premium' : AcceptanceStatus,
  'paymentOption' : string,
  'tokensEarned' : bigint,
  'commission' : bigint,
  'registrationNumber' : string,
  'email' : string,
  'policyValue' : bigint,
  'insuranceMonths' : bigint,
  'over18' : AcceptanceStatus,
  'address' : Address,
  'companyName' : string,
  'discount' : bigint,
  'insuredValue' : bigint,
  'phone' : string,
  'termsAgreed' : AcceptanceStatus,
  'industryType' : string,
  'annualRevenue' : bigint,
  'rewardPercentage' : bigint,
  'startDate' : string,
}
export interface Payment {
  'id' : PaymentId,
  'to' : UserId,
  'status' : PaymentStatus,
  'from' : UserId,
  'timestamp' : Time,
  'amount' : Amount,
}
export type PaymentId = bigint;
export type PaymentStatus = { 'pending' : null } |
  { 'completed' : null } |
  { 'refunded' : null } |
  { 'failed' : null };
export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : string } |
  { 'err' : string };
export type Result_2 = { 'ok' : PaymentId } |
  { 'err' : string };
export type Time = bigint;
export interface User {
  'age' : bigint,
  'accessLevel' : AccessLevel,
  'name' : string,
  'adminStatus' : AdminStatus,
  'email' : string,
  'timestamp' : bigint,
}
export interface UserAddress {
  'street' : [] | [string],
  'country' : [] | [string],
  'city' : [] | [string],
  'postalCode' : [] | [string],
  'state' : [] | [string],
  'number' : [] | [string],
}
export type UserId = Principal;
export interface UserResponse {
  'age' : bigint,
  'accessLevel' : AccessLevel,
  'principal' : Principal,
  'name' : string,
  'adminStatus' : AdminStatus,
  'userAddress' : [] | [UserAddress],
  'email' : string,
  'timestamp' : bigint,
  'phone' : [] | [string],
  'photo' : [] | [Uint8Array | number[]],
  'photoId' : [] | [string],
}
export interface _SERVICE {
  'addCompany' : ActorMethod<[Principal, Company], boolean>,
  'addUser' : ActorMethod<[Principal, User], string>,
  'completePayment' : ActorMethod<[PaymentId], Result>,
  'createPayment' : ActorMethod<[UserId, Amount], Result_2>,
  'createUser' : ActorMethod<[Principal, User], string>,
  'deposit' : ActorMethod<[], undefined>,
  'getAdminStatus' : ActorMethod<[Principal], AdminStatus>,
  'getAllUsers' : ActorMethod<[], Array<UserResponse>>,
  'getBalance' : ActorMethod<[], Amount>,
  'getCallerPrincipal' : ActorMethod<[], Principal>,
  'getCompany' : ActorMethod<[Principal], [] | [Company]>,
  'getCompanyForUser' : ActorMethod<[Principal], [] | [Company]>,
  'getPayment' : ActorMethod<[PaymentId], [] | [Payment]>,
  'getPendingAdmins' : ActorMethod<[], Array<[Principal, User]>>,
  'getUserAccessLevel' : ActorMethod<[Principal], Result_1>,
  'getUserById' : ActorMethod<[Principal], [] | [UserResponse]>,
  'getUserByPrincipal' : ActorMethod<[Principal], [] | [User]>,
  'handleAdminApproval' : ActorMethod<[Principal, AdminStatus], Result_1>,
  'healthCheck' : ActorMethod<[], string>,
  'refundPayment' : ActorMethod<[PaymentId], Result>,
  'requestAdminAccess' : ActorMethod<[], string>,
  'secureAdminOperation' : ActorMethod<[], string>,
  'updateUser' : ActorMethod<
    [
      Principal,
      string,
      string,
      [] | [Address],
      [] | [string],
      [] | [Uint8Array | number[]],
      [] | [string],
    ],
    boolean
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
