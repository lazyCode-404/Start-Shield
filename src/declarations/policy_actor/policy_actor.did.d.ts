import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type PolicyType = { 'premium' : null } |
  { 'basic' : null } |
  { 'standard' : null };
export interface PricingParameters {
  'maxDiscount' : number,
  'discountRate' : number,
  'riskMultiplier' : number,
  'basePrice' : number,
}
export type Result = { 'ok' : number } |
  { 'err' : string };
export type Result_1 = { 'ok' : null } |
  { 'err' : string };
export type Result_2 = { 'ok' : RiskProfile } |
  { 'err' : string };
export type Result_3 = { 'ok' : PricingParameters } |
  { 'err' : string };
export type Result_4 = { 'ok' : Array<RiskFactor> } |
  { 'err' : string };
export type Result_5 = { 'ok' : bigint } |
  { 'err' : string };
export interface RiskFactor {
  'weight' : number,
  'value' : number,
  'name' : string,
}
export interface RiskProfile {
  'userId' : UserId,
  'lastUpdated' : Time,
  'riskFactors' : Array<RiskFactor>,
  'riskScore' : number,
}
export type Time = bigint;
export type UserId = Principal;
export interface _SERVICE {
  'calculatePremium' : ActorMethod<[PolicyType, bigint], Result_5>,
  'fetchExternalRiskData' : ActorMethod<[UserId], Result_4>,
  'getAverageRiskScore' : ActorMethod<[], number>,
  'getPricingParameters' : ActorMethod<[PolicyType], Result_3>,
  'getUserRiskProfile' : ActorMethod<[UserId], Result_2>,
  'simulateAIRiskAssessment' : ActorMethod<[UserId, [] | [string]], number>,
  'updatePricingParameters' : ActorMethod<
    [PolicyType, PricingParameters],
    Result_1
  >,
  'updateUserRiskFactors' : ActorMethod<[Array<RiskFactor>], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
