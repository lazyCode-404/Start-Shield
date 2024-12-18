export const idlFactory = ({ IDL }) => {
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
    'createUser' : IDL.Func([IDL.Principal, User], [IDL.Text], []),
    'deleteUser' : IDL.Func([IDL.Principal], [IDL.Text], []),
    'getAllUsers' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'getUser' : IDL.Func([IDL.Principal], [Result_1], ['query']),
    'getUserAccessLevel' : IDL.Func([IDL.Principal], [Result], ['query']),
    'getUserByPrincipal' : IDL.Func([IDL.Principal], [IDL.Opt(User)], []),
    'updateUser' : IDL.Func([IDL.Principal, User], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
