export const idlFactory = ({ IDL }) => {
  const TokenId = IDL.Nat;
  const UserId = IDL.Principal;
  const Time = IDL.Int;
  const PolicyId = IDL.Nat;
  const Metadata = IDL.Record({
    'name' : IDL.Text,
    'createdAt' : Time,
    'description' : IDL.Text,
    'attributes' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
    'image' : IDL.Opt(IDL.Text),
    'policyId' : PolicyId,
  });
  const NFT = IDL.Record({
    'id' : TokenId,
    'owner' : UserId,
    'metadata' : Metadata,
  });
  const Result_2 = IDL.Variant({ 'ok' : NFT, 'err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'ok' : TokenId, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  return IDL.Service({
    'getNFT' : IDL.Func([TokenId], [Result_2], ['query']),
    'getNFTByPolicy' : IDL.Func([PolicyId], [Result_2], ['query']),
    'getUserNFTs' : IDL.Func([], [IDL.Vec(NFT)], ['query']),
    'mintPolicyNFT' : IDL.Func(
        [
          PolicyId,
          IDL.Text,
          IDL.Text,
          IDL.Opt(IDL.Text),
          IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
        ],
        [Result_1],
        [],
      ),
    'transferNFT' : IDL.Func([TokenId, IDL.Principal], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
