import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Principal "mo:base/Principal";

actor TokenizationAndStaking {
  type User = {
    principal: Principal;
    stakedAmount: Nat;
  };

  stable var users : [User] = [];

  public shared func subscribe(principal: Principal, amount: Nat) : async Text {
    if (amount >= 10) {
      users := users # [{ principal = principal; stakedAmount = amount }];
      return "Subscription successful";
    } else {
      return "Subscription failed: Minimum amount is 10 STSH";
    }
  };

  public shared query func getUsers() : async [User] {
    return users;
  };
}
