export const idlFactory = ({ IDL }) => {
  const AddUserByAdminCanister = IDL.Service({
    'addUser' : IDL.Func([IDL.Principal], [IDL.Text], []),
    'listUsers' : IDL.Func([], [IDL.Vec(IDL.Principal)], []),
  });
  return AddUserByAdminCanister;
};
export const init = ({ IDL }) => { return [IDL.Principal]; };
