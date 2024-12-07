import Int "mo:base/Int";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
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

  var users = TrieMap.TrieMap<Text, User>(Text.equal, Text.hash);
  stable var usersEntries: [(Text, User)] = [];

  system func preupgrade() {
    usersEntries := Iter.toArray(users.entries());
  };

  system func postupgrade() {
    users := TrieMap.fromEntries(usersEntries.vals(), Text.equal, Text.hash);
  };

  public shared func createUser(args : User) : async () {
    users.put(args.email, args);
  };

  public shared query func getUser(email : Text) : async Result.Result<User, Text> {
    switch (users.get(email)) {
      case (null) {
        return #err("User not found");
      };
      case (?user) {
        return #ok(user);
      };
    };
  };

  public shared func updateUser(args : User) : async () {
    users.put(args.email, args);
  };

  public shared func deleteUser(email : Text) : async () {
    users.delete(email);
  };

  public shared query func getAllUsers() : async [User] {
    Iter.toArray(users.vals());
  };

  public shared query func getUserAccessLevel(email : Text) : async Result.Result<Text, Text> {
    switch (users.get(email)) {
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

// import Debug "mo:base/Debug";
// import TrieMap "mo:base/TrieMap";
// import Text "mo:base/Text";
// import Result "mo:base/Result"; // Import corect
// import Iter "mo:base/Iter";
// import Principal "mo:base/Principal";
// import Data "data.mo"; // Replace with the actual import path for your `data.mo`
// // import SmallCompany "smallCompany";


// // import Types "types";
// // import PersonalDetail "personalDetails";
// actor {
//   type AccessLevel = {
//     #ADMIN;
//     #USER;
//   };

//   type User = {
//     firstName: Text;
//     lastName: Text;
//     email: Text;
//     passwordHash: Text;  // Store password as a hash
//     role: AccessLevel;
//     principal: Principal; // Store user Principal
//   };


//   public shared(msg) func addOrUpdateCompany(
//     companyName: Text,
//     registrationNumber: Text,
//     email: Text,
//     phone: Text,
//     address: Address,
//     insuranceType: Text,
//     insuredValue: Nat,
//     policyValue: Nat,
//     paymentOption: Text,
//     premium: Bool,
//     gps: Text
// ): async () {
//     let companyData: Data.CompanyData = {
//         companyName = companyName;
//         registrationNumber = registrationNumber;
//         email = email;
//         phone = phone;
//         address = address;
//         insuranceType = insuranceType;
//         insuredValue = insuredValue;
//         policyValue = policyValue;
//         paymentOption = paymentOption;
//         premium = premium;
//         gps = gps;
//     };
//     await Data.addOrUpdateCompany(companyData);
// };

// public shared(msg) func getCompanies(): async [Data.CompanyData] {
//     return await Data.getCompanies();
// };

//   var users = TrieMap.TrieMap<Text, User>(Text.equal, Text.hash);
//   stable var usersEntries: [(Text, User)] = [];

//   stable var activePolicies : Text = "";
//   stable var claimsStatus : Text = "";
//   stable var renewalDate : Text = "";
//   stable var tokenBalance : Text = "";
//   stable var recentTransactions : Text = "";
//   stable var events : Text = "";


//   system func preupgrade() {
//     usersEntries := Iter.toArray(users.entries());
//   };

//   system func postupgrade() {
//     users := TrieMap.fromEntries(Iter.fromArray(usersEntries), Text.equal, Text.hash);
//   };
//   // public func getCompanyInfo() : Text {
//   //   return SmallCompany.getCompanyInfo();
// // };
//   public func signUp(firstName: Text, lastName: Text, email: Text, passwordHash: Text, role: AccessLevel, principal: Principal) : async Result.Result<Text, Text> {
//     Debug.print("Received signUp request: " # firstName # ", " # lastName # ", " # email);

//     switch (users.get(email)) {
//       case (null) {
//         let newUser: User = {
//           firstName = firstName;
//           lastName = lastName;
//           email = email;
//           passwordHash = passwordHash;  // Ensure this is the hashed password
//           role = role;
//           principal = principal; // Store the Principal
//         };

//         users.put(email, newUser);
//         Debug.print("User signed up: " # firstName # " " # lastName # " with email: " # email);
//         return #ok("User signed up successfully.");
//       };
//       case (?_) {
//         Debug.print("Email already in use: " # email);
//         return #err("Email already in use.");
//       };
//     }
//   };

//   public shared query func login(email: Text, passwordHash: Text) : async Result.Result<User, Text> {
//     switch (users.get(email)) {
//       case (null) {
//         return #err("User not found.");
//       };
//       case (?user) {
//         if (user.passwordHash == passwordHash) {
//           return #ok(user);
//         } else {
//           return #err("Incorrect password.");
//         };
//       };
//     }
//   };

//   public shared query func getUserInfoByPrincipal(principal: Principal) : async Result.Result<User, Text> {
//     // Loop through users to find by principal
//     for (user in users.entries()) {
//       if (user.1.principal == principal) {
//         return #ok(user.1);
//       }
//     };
//     return #err("User not found.");
//   };

//   public shared func resetPassword(email: Text, newPasswordHash: Text) : async Result.Result<Text, Text> {
//     switch (users.get(email)) {
//       case (null) {
//         return #err("User not found.");
//       };
//       case (?user) {
//         let updatedUser = { user with passwordHash = newPasswordHash };
//         users.put(email, updatedUser);
//         return #ok("Password updated successfully.");
//       };
//     }
//   };

//   // New methods using msg.caller

//   // Automatically use the caller's Principal for signing up
//   public shared(msg) func registerUser(
//       firstName: Text,
//       lastName: Text,
//       email: Text,
//       passwordHash: Text,
//       role: AccessLevel
//   ): async Text {
//       let principal = msg.caller; // Get the caller Principal
//       let result = await signUp(firstName, lastName, email, passwordHash, role, principal);
//       switch (result) {
//         case (#ok(success)) {
//           return success;
//         };
//         case (#err(error)) {
//           return error;
//         };
//       }
//   };
//   //  Fetch user info (if logged in)
//   public shared query func getUserInfo(email: Text) : async Result.Result<User, Text> {
//     switch (users.get(email)) {
//       case (null) {
//         return #err("User not found.");
//       };
//       case (?user) {
//         return #ok(user);
//       };
//     }
//   };
 
//   public shared(msg) func getAllUsers(): async Result.Result<[User], Text> {
//     let callerPrincipal = msg.caller;

//     // Așteaptă rezultatul de la getUserInfoByPrincipal
//     let userInfoResult = await getUserInfoByPrincipal(callerPrincipal);
    
//     switch (userInfoResult) {
//         case (#err(_error)) {
//             return #err("Unauthorized access or user not found.");
//         };
//         case (#ok(user)) {
//             switch (user.role) {
//                 case (#ADMIN) {
//                     // Folosește vals() pentru a obține toate valorile (utilizatorii)
//                     return #ok(Iter.toArray(users.vals()));  // Returnează toți utilizatorii
//                 };
//                 case (#USER) {
//                     return #err("Access denied. Only Admins can view all users.");
//                 };
//             };
//         };
//     };
//   };



  

//   public func setPolicySummary(newPolicies: Text, newClaimsStatus: Text, newRenewalDate: Text) : async () {
//     activePolicies := newPolicies;
//     claimsStatus := newClaimsStatus;
//     renewalDate := newRenewalDate;
//     Debug.print("Policy Summary Updated!");
//   };

//   public func getPolicySummary() : async (Text, Text, Text) {
//     return (activePolicies, claimsStatus, renewalDate);
//   };

//   public func setTokenOverview(newTokenBalance: Text, newTransactions: Text) : async () {
//     tokenBalance := newTokenBalance;
//     recentTransactions := newTransactions;
//     Debug.print("Token Overview Updated!");
//   };

//   public func getTokenOverview() : async (Text, Text) {
//     return (tokenBalance, recentTransactions);
//   };

//   public func setUpcomingEvents(newEvents: Text) : async () {
//     events := newEvents;
//     Debug.print("Upcoming Events Updated!");
//   };

//   public func getUpcomingEvents() : async Text {
//     return events;
//   };
// };
