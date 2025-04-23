export const idlFactory = ({ IDL }) => {
  const PolicyType = IDL.Variant({
    'premium' : IDL.Null,
    'basic' : IDL.Null,
    'standard' : IDL.Null,
  });
  const Result_5 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const UserId = IDL.Principal;
  const RiskFactor = IDL.Record({
    'weight' : IDL.Float64,
    'value' : IDL.Float64,
    'name' : IDL.Text,
  });
  const Result_4 = IDL.Variant({
    'ok' : IDL.Vec(RiskFactor),
    'err' : IDL.Text,
  });
  const PricingParameters = IDL.Record({
    'maxDiscount' : IDL.Float64,
    'discountRate' : IDL.Float64,
    'riskMultiplier' : IDL.Float64,
    'basePrice' : IDL.Float64,
  });
  const Result_3 = IDL.Variant({ 'ok' : PricingParameters, 'err' : IDL.Text });
  const Time = IDL.Int;
  const RiskProfile = IDL.Record({
    'userId' : UserId,
    'lastUpdated' : Time,
    'riskFactors' : IDL.Vec(RiskFactor),
    'riskScore' : IDL.Float64,
  });
  const Result_2 = IDL.Variant({ 'ok' : RiskProfile, 'err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Float64, 'err' : IDL.Text });
  return IDL.Service({
    'calculatePremium' : IDL.Func([PolicyType, IDL.Nat], [Result_5], []),
    'fetchExternalRiskData' : IDL.Func([UserId], [Result_4], []),
    'getAverageRiskScore' : IDL.Func([], [IDL.Float64], ['query']),
    'getPricingParameters' : IDL.Func([PolicyType], [Result_3], ['query']),
    'getUserRiskProfile' : IDL.Func([UserId], [Result_2], ['query']),
    'simulateAIRiskAssessment' : IDL.Func(
        [UserId, IDL.Opt(IDL.Text)],
        [IDL.Float64],
        [],
      ),
    'updatePricingParameters' : IDL.Func(
        [PolicyType, PricingParameters],
        [Result_1],
        [],
      ),
    'updateUserRiskFactors' : IDL.Func([IDL.Vec(RiskFactor)], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
