export const idlFactory = ({ IDL }) => {
  const Address = IDL.Record({
    'street' : IDL.Text,
    'country' : IDL.Text,
    'city' : IDL.Text,
    'postalCode' : IDL.Text,
    'state' : IDL.Text,
    'number' : IDL.Text,
  });
  const Company = IDL.Record({
    'additionalInfo' : IDL.Text,
    'insuranceType' : IDL.Text,
    'endDate' : IDL.Text,
    'employees' : IDL.Nat,
    'premium' : IDL.Bool,
    'paymentOption' : IDL.Text,
    'tokensEarned' : IDL.Nat,
    'commission' : IDL.Nat,
    'registrationNumber' : IDL.Text,
    'email' : IDL.Text,
    'policyValue' : IDL.Nat,
    'insuranceMonths' : IDL.Nat,
    'over18' : IDL.Bool,
    'address' : Address,
    'companyName' : IDL.Text,
    'discount' : IDL.Nat,
    'insuredValue' : IDL.Nat,
    'phone' : IDL.Text,
    'termsAgreed' : IDL.Bool,
    'industryType' : IDL.Text,
    'annualRevenue' : IDL.Nat,
    'rewardPercentage' : IDL.Nat,
    'startDate' : IDL.Text,
  });
  return IDL.Service({
    'addCompany' : IDL.Func([IDL.Principal, Company], [IDL.Bool], []),
    'getCompany' : IDL.Func([IDL.Principal], [IDL.Opt(Company)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
