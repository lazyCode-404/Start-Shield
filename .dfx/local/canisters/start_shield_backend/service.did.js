export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getPolicySummary' : IDL.Func([], [IDL.Text, IDL.Text, IDL.Text], []),
    'getTokenOverview' : IDL.Func([], [IDL.Text, IDL.Text], []),
    'getUpcomingEvents' : IDL.Func([], [IDL.Text], []),
    'setPolicySummary' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [], []),
    'setTokenOverview' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'setUpcomingEvents' : IDL.Func([IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
