import Int "mo:base/Int";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
// import CompanyData "mo:companyData";

actor Main {

  type User = {
    name : Text;
    email : Text;
    age : Nat;
    accessLevel : AccessLevel;
    timestamp : Int;
  };

  type AccessLevel = {
    #SUPER_ADMIN;
    #ADMIN;
    #USER;
    #GUEST;
  };
  var users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);
  stable var usersEntries: [(Principal, User)] = [];

  // public let companyDataActor = CompanyData.CompanyData();
  
  // public shared ({caller}) func getCompanyActor() : async Principal {
  //   return companyDataActor;
  // };

  system func preupgrade() {
    usersEntries := Iter.toArray(users.entries());
};

  system func postupgrade() {
    users := TrieMap.fromEntries(usersEntries.vals(), Principal.equal, Principal.hash);
};

public shared func getUserByPrincipal(caller: Principal): async ?User {
  return users.get(caller);
};

public shared func createUser(caller: Principal, args: User): async Text {
  switch (users.get(caller)) {
      case (?existingUser) {
          return "User already exists!";
      };
      case null {
          users.put(caller, args);
          return "Account created successfully for " # args.name # "!";
      };
  };
};


  public shared query func getUser(caller : Principal) : async Result.Result<User, Text> {
    switch (users.get(caller)) {
        case (null) {
            return #err("User not found");
        };
        case (?user) {
            return #ok(user);
        };
    };
};

  public shared func updateUser(caller : Principal, args : User) : async Text {
    if (users.get(caller) != null) {
        users.put(caller, args);
        return "User updated successfully.";
    } else {
        return "User not found.";
    };
};

  public shared func deleteUser(caller : Principal) : async Text {
    if (users.get(caller) != null) {
        users.delete(caller);
        return "User deleted successfully.";
    } else {
        return "User not found.";
    };
};

  public shared query func getAllUsers() : async [User] {
    return Iter.toArray(users.vals());
};

  public shared query func getUserAccessLevel(caller : Principal) : async Result.Result<Text, Text> {
    switch (users.get(caller)) {
        case (null) {
            return #err("User not found");
        };
        case (?user) {
            switch (user.accessLevel) {
                case (#SUPER_ADMIN) {
                    return #ok("You are an SUPER_ADMIN");
                };
                case (#ADMIN) {
                    return #ok("You are an ADMIN");
                };
                case (#USER) {
                    return #ok("You are just a USER");
                };
                case (#GUEST) {
                    return #ok("You are a GUEST");
                };
            };
        };
    };
};

Debug.print(debug_show(usersEntries));
};
