export const idlFactory = ({ IDL }) => {
  const ClaimId = IDL.Nat;
  const ClaimStatus = IDL.Variant({
    'pending' : IDL.Null,
    'paid' : IDL.Null,
    'verifying' : IDL.Null,
    'approved' : IDL.Null,
    'rejected' : IDL.Null,
  });
  const UserId = IDL.Principal;
  const Timestamp = IDL.Int;
  const Amount = IDL.Nat;
  const PolicyId = IDL.Nat;
  const Claim = IDL.Record({
    'id' : ClaimId,
    'evidenceUrls' : IDL.Vec(IDL.Text),
    'status' : ClaimStatus,
    'verificationData' : IDL.Opt(IDL.Text),
    'claimant' : UserId,
    'submittedAt' : Timestamp,
    'description' : IDL.Text,
    'amount' : Amount,
    'policyId' : PolicyId,
  });
  const Result_2 = IDL.Variant({ 'ok' : Claim, 'err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : ClaimId, 'err' : IDL.Text });
  return IDL.Service({
    'getClaim' : IDL.Func([ClaimId], [Result_2], ['query']),
    'getClaimStatistics' : IDL.Func(
        [],
        [IDL.Nat, IDL.Nat, IDL.Nat, IDL.Nat, IDL.Nat],
        ['query'],
      ),
    'getUserClaims' : IDL.Func([], [IDL.Vec(Claim)], ['query']),
    'markClaimAsPaid' : IDL.Func([ClaimId], [Result_1], []),
    'processClaim' : IDL.Func(
        [ClaimId, IDL.Bool, IDL.Opt(IDL.Text)],
        [Result_1],
        [],
      ),
    'startVerification' : IDL.Func([ClaimId], [Result_1], []),
    'submitClaim' : IDL.Func(
        [PolicyId, Amount, IDL.Text, IDL.Vec(IDL.Text)],
        [Result],
        [],
      ),
    'testMethod' : IDL.Func([], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
