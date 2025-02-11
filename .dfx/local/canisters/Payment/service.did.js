export const idlFactory = ({ IDL }) => {
  const Transaction = IDL.Record({
    'id' : IDL.Text,
    'status' : IDL.Text,
    'user' : IDL.Principal,
    'timestamp' : IDL.Int,
    'amount' : IDL.Nat,
  });
  return IDL.Service({
    'getAllTransactions' : IDL.Func([], [IDL.Vec(Transaction)], ['query']),
    'getTransactionsByUser' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(Transaction)],
        ['query'],
      ),
    'saveTransaction' : IDL.Func([Transaction], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
