export const idlFactory = ({ IDL }) => {
  const AcceptanceStatus = IDL.Variant({
    'accepted' : IDL.Null,
    'declined' : IDL.Null,
  });
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
    'premium' : AcceptanceStatus,
    'paymentOption' : IDL.Text,
    'tokensEarned' : IDL.Nat,
    'commission' : IDL.Nat,
    'registrationNumber' : IDL.Text,
    'email' : IDL.Text,
    'policyValue' : IDL.Nat,
    'insuranceMonths' : IDL.Nat,
    'over18' : AcceptanceStatus,
    'address' : Address,
    'companyName' : IDL.Text,
    'discount' : IDL.Nat,
    'insuredValue' : IDL.Nat,
    'phone' : IDL.Text,
    'termsAgreed' : AcceptanceStatus,
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
  const AdminStatus = IDL.Variant({
    'Approved' : IDL.Null,
    'Rejected' : IDL.Null,
    'NotRequested' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const User = IDL.Record({
    'age' : IDL.Nat,
    'accessLevel' : AccessLevel,
    'name' : IDL.Text,
    'adminStatus' : AdminStatus,
    'email' : IDL.Text,
    'timestamp' : IDL.Int,
  });
  const PaymentId = IDL.Nat;
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const UserId = IDL.Principal;
  const Amount = IDL.Nat;
  const Result_2 = IDL.Variant({ 'ok' : PaymentId, 'err' : IDL.Text });
  const UserAddress = IDL.Record({
    'street' : IDL.Opt(IDL.Text),
    'country' : IDL.Opt(IDL.Text),
    'city' : IDL.Opt(IDL.Text),
    'postalCode' : IDL.Opt(IDL.Text),
    'state' : IDL.Opt(IDL.Text),
    'number' : IDL.Opt(IDL.Text),
  });
  const UserResponse = IDL.Record({
    'age' : IDL.Nat,
    'accessLevel' : AccessLevel,
    'principal' : IDL.Principal,
    'name' : IDL.Text,
    'adminStatus' : AdminStatus,
    'userAddress' : IDL.Opt(UserAddress),
    'email' : IDL.Text,
    'timestamp' : IDL.Int,
    'phone' : IDL.Opt(IDL.Text),
    'photo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'photoId' : IDL.Opt(IDL.Text),
  });
  const PaymentStatus = IDL.Variant({
    'pending' : IDL.Null,
    'completed' : IDL.Null,
    'refunded' : IDL.Null,
    'failed' : IDL.Null,
  });
  const Time = IDL.Int;
  const Payment = IDL.Record({
    'id' : PaymentId,
    'to' : UserId,
    'status' : PaymentStatus,
    'from' : UserId,
    'timestamp' : Time,
    'amount' : Amount,
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  return IDL.Service({
    'addCompany' : IDL.Func([IDL.Principal, Company], [IDL.Bool], []),
    'addUser' : IDL.Func([IDL.Principal, User], [IDL.Text], []),
    'completePayment' : IDL.Func([PaymentId], [Result], []),
    'createPayment' : IDL.Func([UserId, Amount], [Result_2], []),
    'createUser' : IDL.Func([IDL.Principal, User], [IDL.Text], []),
    'deposit' : IDL.Func([], [], []),
    'getAdminStatus' : IDL.Func([IDL.Principal], [AdminStatus], ['query']),
    'getAllUsers' : IDL.Func([], [IDL.Vec(UserResponse)], ['query']),
    'getBalance' : IDL.Func([], [Amount], ['query']),
    'getCallerPrincipal' : IDL.Func([], [IDL.Principal], []),
    'getCompany' : IDL.Func([IDL.Principal], [IDL.Opt(Company)], ['query']),
    'getCompanyForUser' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(Company)],
        ['query'],
      ),
    'getPayment' : IDL.Func([PaymentId], [IDL.Opt(Payment)], ['query']),
    'getPendingAdmins' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, User))],
        ['query'],
      ),
    'getUserAccessLevel' : IDL.Func([IDL.Principal], [Result_1], ['query']),
    'getUserById' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(UserResponse)],
        ['query'],
      ),
    'getUserByPrincipal' : IDL.Func([IDL.Principal], [IDL.Opt(User)], []),
    'handleAdminApproval' : IDL.Func(
        [IDL.Principal, AdminStatus],
        [Result_1],
        [],
      ),
    'healthCheck' : IDL.Func([], [IDL.Text], ['query']),
    'refundPayment' : IDL.Func([PaymentId], [Result], []),
    'requestAdminAccess' : IDL.Func([], [IDL.Text], []),
    'secureAdminOperation' : IDL.Func([], [IDL.Text], []),
    'updateUser' : IDL.Func(
        [
          IDL.Principal,
          IDL.Text,
          IDL.Text,
          IDL.Opt(Address),
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Vec(IDL.Nat8)),
          IDL.Opt(IDL.Text),
        ],
        [IDL.Bool],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
