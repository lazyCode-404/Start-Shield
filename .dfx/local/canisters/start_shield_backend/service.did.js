export const idlFactory = ({ IDL }) => {
  const AccessLevel = IDL.Variant({
    'GUEST' : IDL.Null,
    'USER' : IDL.Null,
    'ADMIN' : IDL.Null,
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
    'createUser' : IDL.Func([User], [], []),
    'deleteUser' : IDL.Func([IDL.Text], [], []),
    'getAllUsers' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'getUser' : IDL.Func([IDL.Text], [Result_1], ['query']),
    'getUserAccessLevel' : IDL.Func([IDL.Text], [Result], ['query']),
    'updateUser' : IDL.Func([User], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
