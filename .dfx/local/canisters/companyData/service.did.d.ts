import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

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
export interface _SERVICE {
  'addCompany' : ActorMethod<[Principal, Company], boolean>,
  'getCompany' : ActorMethod<[Principal], [] | [Company]>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
