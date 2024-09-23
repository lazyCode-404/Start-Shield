import Debug "mo:base/Debug";
// import Types "types";
// import PersonalDetail "personalDetails";
actor {
  stable var activePolicies : Text = "";
  stable var claimsStatus : Text = "";
  stable var renewalDate : Text = "";
  stable var tokenBalance : Text = "";
  stable var recentTransactions : Text = "";
  stable var events : Text = "";

  public func setPolicySummary(newPolicies: Text, newClaimsStatus: Text, newRenewalDate: Text) : async () {
    activePolicies := newPolicies;
    claimsStatus := newClaimsStatus;
    renewalDate := newRenewalDate;
    Debug.print("Policy Summary Updated!");
  };

  public func getPolicySummary() : async (Text, Text, Text) {
    return (activePolicies, claimsStatus, renewalDate);
  };

  public func setTokenOverview(newTokenBalance: Text, newTransactions: Text) : async () {
    tokenBalance := newTokenBalance;
    recentTransactions := newTransactions;
    Debug.print("Token Overview Updated!");
  };

  public func getTokenOverview() : async (Text, Text) {
    return (tokenBalance, recentTransactions);
  };

  public func setUpcomingEvents(newEvents: Text) : async () {
    events := newEvents;
    Debug.print("Upcoming Events Updated!");
  };

  public func getUpcomingEvents() : async Text {
    return events;
  };
};
