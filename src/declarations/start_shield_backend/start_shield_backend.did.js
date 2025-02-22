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
  const AccessLevel = IDL.Variant({
    'GUEST' : IDL.Null,
    'USER' : IDL.Null,
    'ADMIN' : IDL.Null,
    'SUPER_ADMIN' : IDL.Null,
  });
  const User = IDL.Record({
    'age' : IDL.Nat,
    'accessLevel' : AccessLevel,
    'name' : IDL.Text,
    'email' : IDL.Text,
    'timestamp' : IDL.Int,
  });
  const Result_1 = IDL.Variant({ 'ok' : User, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  return IDL.Service({
    'addCompanyForUser' : IDL.Func([IDL.Principal, Company], [IDL.Text], []),
    'addUser' : IDL.Func([IDL.Principal, User], [IDL.Text], []),
    'createUser' : IDL.Func([IDL.Principal, User], [IDL.Text], []),
    'deleteUser' : IDL.Func([IDL.Principal], [IDL.Text], []),
    'getAllUsers' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'getCallerPrincipal' : IDL.Func([], [IDL.Principal], []),
    'getCompanyForUser' : IDL.Func([IDL.Principal], [IDL.Opt(Company)], []),
    'getUser' : IDL.Func([IDL.Principal], [Result_1], ['query']),
    'getUserAccessLevel' : IDL.Func([IDL.Principal], [Result], ['query']),
    'getUserByPrincipal' : IDL.Func([IDL.Principal], [IDL.Opt(User)], []),
  });
};
export const init = ({ IDL }) => { return []; };
