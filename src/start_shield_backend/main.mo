import Int "mo:base/Int";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";

actor {

  type User = {
    name : Text;
    email : Text;
    age : Nat;
    accessLevel : AccessLevel;
    timestamp : Int;
  };

  type AccessLevel = {
    #ADMIN;
    #USER;
    #GUEST;
  };
  var users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);
  stable var usersEntries: [(Principal, User)] = [];
  // var users = TrieMap.TrieMap<Text, User>(Text.equal, Text.hash);
  // stable var usersEntries: [(Text, User)] = [];

  system func preupgrade() {
    usersEntries := Iter.toArray(users.entries());
};
  // system func preupgrade() {
  //   usersEntries := Iter.toArray(users.entries());
  // };

  system func postupgrade() {
    users := TrieMap.fromEntries(usersEntries.vals(), Principal.equal, Principal.hash);
};
  // system func postupgrade() {
  //   users := TrieMap.fromEntries(usersEntries.vals(), Text.equal, Text.hash);
  // };

//   public shared func createUser(caller : Principal, args : User) : async () {
//     users.put(caller, args);
//     switch (users.get(caller)) {
//       case (?existingUser) {
//           return "Bun venit înapoi, " # existingUser.name # "!";
//       };
//       case (null) {
//           users.put(caller, args);
//           return "Cont creat cu succes pentru " # args.name # "!";
//       };
//   };
// };

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

  // public shared func createUser(args : User) : async () {
  //   users.put(args.email, args);
  // };

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

  // public shared query func getUser(email : Text) : async Result.Result<User, Text> {
  //   switch (users.get(email)) {
  //     case (null) {
  //       return #err("User not found");
  //     };
  //     case (?user) {
  //       return #ok(user);
  //     };
  //   };
  // };

  public shared func updateUser(caller : Principal, args : User) : async Text {
    if (users.get(caller) != null) {
        users.put(caller, args);
        return "User updated successfully.";
    } else {
        return "User not found.";
    };
};
  // public shared func updateUser(args : User) : async () {
  //   users.put(args.email, args);
  // };

  public shared func deleteUser(caller : Principal) : async Text {
    if (users.get(caller) != null) {
        users.delete(caller);
        return "User deleted successfully.";
    } else {
        return "User not found.";
    };
};
  // public shared func deleteUser(email : Text) : async () {
  //   users.delete(email);
  // };

  public shared query func getAllUsers() : async [User] {
    return Iter.toArray(users.vals());
};
  // public shared query func getAllUsers() : async [User] {
  //   Iter.toArray(users.vals());
  // };

  public shared query func getUserAccessLevel(caller : Principal) : async Result.Result<Text, Text> {
    // let caller = Principal.fromActor(this); // Obține principalul actorului curent
    switch (users.get(caller)) {
        case (null) {
            return #err("User not found");
        };
        case (?user) {
            switch (user.accessLevel) {
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
};
