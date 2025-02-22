// import Int "mo:base/Int";
// import TrieMap "mo:base/TrieMap";
// import Text "mo:base/Text";
// import Result "mo:base/Result";
// import Iter "mo:base/Iter";
// import Principal "mo:base/Principal";
// import Debug "mo:base/Debug";
// import HashMap "mo:base/HashMap";
// import Time "mo:base/Time";
// import Nat "mo:base/Nat";
// // import CompanyData "mo:companyData";

// actor Main {

//   type User = {
//     name : Text;
//     email : Text;
//     age : Nat;
//     accessLevel : AccessLevel;
//     timestamp : Int;
//   };

//   type AccessLevel = {
//     #SUPER_ADMIN;
//     #ADMIN;
//     #USER;
//     #GUEST;
//   };

//   type AdminRequest = {
//     principal: Principal;
//     user: User;
//   };

//   type Address = {
//     country: Text;
//     state: Text;
//     city: Text;
//     street: Text;
//     number: Text;
//     postalCode: Text;
// };

// type Company = {
//     companyName: Text;
//     registrationNumber: Text;
//     email: Text;
//     phone: Text;
//     address: Address;
//     insuranceType: Text;
//     additionalInfo: Text;
//     insuredValue: Nat;
//     policyValue: Nat;
//     paymentOption: Text;
//     premium: Bool;
//     startDate: Text;
//     endDate: Text;
//     insuranceMonths: Nat;
//     termsAgreed: Bool;
//     over18: Bool;
//     discount: Nat;
//     commission: Nat;
//     tokensEarned: Nat;
//     rewardPercentage: Nat;
//     industryType: Text;
//     annualRevenue: Nat;
//     employees: Nat;
// };


//   var users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);
//   stable var usersEntries: [(Principal, User)] = [];

// let CompanyData = actor("b77ix-eeaaa-aaaaa-qaada-cai") : actor {
//   addCompany : (Principal, Company) -> async Bool;
//   getCompany : (Principal) -> async ?Company;
// };


// public shared func addCompanyForUser(caller: Principal, company: Company): async Text {
//   switch (users.get(caller)) {
//       case (null) {
//           return "User not found. Please create an account first.";
//       };
//       case (?user) {
//           let result = await CompanyData.addCompany(caller, company);
//           if (result) {
//               return "Company added successfully for user " # user.name # ".";
//           } else {
//               return "Failed to add company.";
//           };
//       };
//   };
// };


// public shared func getCompanyForUser(caller: Principal): async ?Company {
//   switch (users.get(caller)) {
//       case (null) {
//           return null; // Utilizatorul nu există
//       };
//       case (?user) {
//           // Apelăm funcția din CompanyData pentru a obține compania asociată
//           return await CompanyData.getCompany(caller);
//       };
//   };
// };

//   // Cereri pentru administratori
//   stable var pendingAdmins: [(Principal, User)] = [];
//   stable var approvedAdmins: [(Principal, User)] = [];

//   system func preupgrade() {
//     usersEntries := Iter.toArray(users.entries());
//   };

//   system func postupgrade() {
//     users := TrieMap.fromEntries(usersEntries.vals(), Principal.equal, Principal.hash);
//   };

//   // Use update (without 'shared') to ensure msg is available.
//   // public update func getCallerPrincipal(): async Principal {
//   //   return msg.caller;
//   // };
//   // public shared func getCompanyData() : async CompanyData.CompanyData {
//   //   return companyDataActor;
//   // };

// //   public shared update func getCallerPrincipal(): async Principal {
// //   return msg.caller;
// // };


// //   // Funcție pentru aprobare Admin
// //   public shared func approveAdmin(principal: Principal, args: AdminRequest): async Text {
// //     switch (users.get(principal)) {
// //         case (null) {
// //             return "User not found.";
// //         };
// //         case (?user) {
// //             if (user.accessLevel == #GUEST) {
// //                 user.accessLevel := #ADMIN;
// //                 approvedAdmins.add((principal, user));
// //                 return "Admin approval successful.";
// //             } else {
// //                 return "User is already approved or does not require approval.";
// //             };
// //       };
// //   };
// // };

// //   //Funcție pentru respingerea Adminului
// //   public shared func rejectAdmin(principal: Principal, args: AdminRequest): async Text {
// //     switch (users.get(principal)) {
// //         case (null) {
// //             return "User not found.";
// //         };
// //         case (?user) {
// //             if (user.pendingApproval == true) { // Accesăm câmpul cu .pendingApproval
// //                 users.remove(principal);  // Remove the user if pending approval
// //                 return "Admin request rejected.";  // Return rejection message
// //             } else {
// //                 return "User is already approved or does not require approval.";  // User is already approved
// //             };
// //         };
// //   };
// // };

// //   // Funcție pentru aprobare utilizatorului
// //   public shared func approveUser(principal: Principal, args: AdminRequest): async Text {
// //     switch (users.get(principal)) {
// //         case (null) {
// //             return "User not found.";
// //         };
// //         case (?user) {
// //             if (user.accessLevel == #GUEST) {
// //                 user.accessLevel = #USER;
// //                 approvedAdmins.add((principal, user));
// //                 return "User approval successful.";
// //             } else {
// //                 return "User is already approved or does not require approval.";
// //             };
// //         };
// //   };
// // };
// //   // Funcție pentru respingerea utilizatorului
// //   public shared func rejectUser(principal: Principal, args: AdminRequest): async Text {
// //     switch (users.get(principal)) {
// //         case (null) {
// //             return "User not found.";
// //         };
// //         case (?user) {
// //             if (user.pendingApproval == true) { // Accesăm câmpul cu .pendingApproval
// //                 users.remove(principal);  // Remove the user if pending approval
// //                 return "User request rejected.";  // Return rejection message
// //             } else {
// //                 return "User is already approved or does not require approval.";  // User is already approved
// //             };
// //         };
// //   };
// // };

// //   // Funcție pentru aprobare utilizatorii
// //   public shared func approveAllUsers(): async Text {
// //     for (pendingAdmin in pendingAdmins) {
// //         await approveUser(pendingAdmin.0, pendingAdmin.1);
// //     };
// //     pendingAdmins = [];
// //     return "All pending users approved successfully.";
// //   };

//   // public shared query func getUserByPrincipal(principal: Principal) : async ?User {
//   //   return users.get(principal);
//   // };
//   // Funcție pentru aprobare Admin
// public shared func approveAdmin(principal: Principal): async Text {
//   switch (users.get(principal)) {
//     case (null) {
//       return "User not found.";
//     };
//     case (?user) {
//       if (user.accessLevel == #GUEST) {
//         let updatedUser = {
//           name = user.name;
//           email = user.email;
//           age = user.age;
//           accessLevel = #ADMIN;
//           timestamp = user.timestamp;
//         };
//         users.put(principal, updatedUser);
//         return "Admin approval successful.";
//       } else {
//         return "User is already approved or does not require approval.";
//       };
//     };
//   };
// };

// // Funcție pentru respingerea Adminului
// public shared func rejectAdmin(principal: Principal): async Text {
//   switch (users.get(principal)) {
//     case (null) {
//       return "User not found.";
//     };
//     case (?user) {
//       if (user.accessLevel == #GUEST) {
//         users.delete(principal);
//         return "Admin request rejected.";
//       } else {
//         return "User is already approved or does not require approval.";
//       };
//     };
//   };
// };


//   public shared func getUserByPrincipal(caller: Principal): async ?User {
//     Debug.print(debug_show(caller));
//     return users.get(caller);
//   };

//   public shared func createUser(caller: Principal, args: User): async Text {
//     switch (users.get(caller)) {
//         case (?existingUser) {
//             return "User already exists!";
//         };
//         case null {
//             users.put(caller, args);
//             return "Account created successfully for " # args.name # "!";
//         };
//     };
//   };

//   public shared query func getUser(caller : Principal) : async Result.Result<User, Text> {
//     switch (users.get(caller)) {
//         case (null) {
//             return #err("User not found");
//         };
//         case (?User) {
//             return #ok(User);
//         };
//     };
//   };

//   public shared func deleteUser(caller : Principal) : async Text {
//     if (users.get(caller) != null) {
//         users.delete(caller);
//         return "User deleted successfully.";
//     } else {
//         return "User not found.";
//     };
//   };

//   public shared query func getAllUsers() : async [User] {
//     return Iter.toArray(users.vals());
//   };

//   public func addUser(principal: Principal, user: User): async Text {
//     users.put(principal, user);
//     return "User added successfully.";
//   };

//   public shared query func getUserAccessLevel(caller : Principal) : async Result.Result<Text, Text> {
//     switch (users.get(caller)) {
//         case (null) {
//             return #err("User not found");
//         };
//         case (?User) {
//             switch (User.accessLevel) {
//                 case (#SUPER_ADMIN) {
//                     return #ok("You are an SUPER_ADMIN");
//                 };
//                 case (#ADMIN) {
//                     return #ok("You are an ADMIN");
//                 };
//                 case (#USER) {
//                     return #ok("You are just a USER");
//                 };
//                 case (#GUEST) {
//                     return #ok("You are a GUEST");
//                 };
//             };
//         };
//     };
//   };

//   Debug.print(debug_show(usersEntries));
// };
import Int "mo:base/Int";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
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

  type AdminRequest = {
    principal: Principal;
    user: User;
  };

  type Address = {
    country: Text;
    state: Text;
    city: Text;
    street: Text;
    number: Text;
    postalCode: Text;
};

type Company = {
    companyName: Text;
    registrationNumber: Text;
    email: Text;
    phone: Text;
    address: Address;
    insuranceType: Text;
    additionalInfo: Text;
    insuredValue: Nat;
    policyValue: Nat;
    paymentOption: Text;
    premium: Bool;
    startDate: Text;
    endDate: Text;
    insuranceMonths: Nat;
    termsAgreed: Bool;
    over18: Bool;
    discount: Nat;
    commission: Nat;
    tokensEarned: Nat;
    rewardPercentage: Nat;
    industryType: Text;
    annualRevenue: Nat;
    employees: Nat;
};


  var users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);
  stable var usersEntries: [(Principal, User)] = [];

  let CompanyData = actor("b77ix-eeaaa-aaaaa-qaada-cai") : actor {
    addCompany : (Principal, Company) -> async Bool; // Folosește tipul local "Company"
    getCompany : (Principal) -> async ?Company;     // Folosește tipul local "Company"
};

// public shared(msg) query func getCallerPrincipal() : async Principal {
//   return msg.caller;
// };

public shared func addCompanyForUser(caller: Principal, company: Company): async Text {
  switch (users.get(caller)) {
      case (null) {
          return "User not found. Please create an account first.";
      };
      case (?user) {
          let result = await CompanyData.addCompany(caller, company);
          if (result) {
              return "Company added successfully for user " # user.name # ".";
          } else {
              return "Failed to add company.";
          };
      };
  };
};


public shared func getCompanyForUser(caller: Principal): async ?Company {
  switch (users.get(caller)) {
      case (null) {
          return null; // Utilizatorul nu există
      };
      case (?user) {
          // Apelăm funcția din CompanyData pentru a obține compania asociată
          return await CompanyData.getCompany(caller);
      };
  };
};




  //public let companyDataActor = CompanyData.CompanyData();
  
  // public shared ({caller}) func getCompanyActor() : async Principal {
  //   return companyDataActor;
  // };
  // Cereri pentru administratori
  stable var pendingAdmins: [(Principal, User)] = [];
  stable var approvedAdmins: [(Principal, User)] = [];

  system func preupgrade() {
    usersEntries := Iter.toArray(users.entries());
  };

  system func postupgrade() {
    users := TrieMap.fromEntries(usersEntries.vals(), Principal.equal, Principal.hash);
  };

  // Use update (without 'shared') to ensure msg is available.
  // public update func getCallerPrincipal(): async Principal {
  //   return msg.caller;
  // };
  // public shared func getCompanyData() : async CompanyData.CompanyData {
  //   return companyDataActor;
  // };

  public shared(msg) func getCallerPrincipal(): async Principal {
    return msg.caller;
  };
  

  // Funcție pentru aprobare Admin
  // public shared func approveAdmin(principal: Principal, args: AdminRequest): async Text {
  //   switch (users.get(principal)) {
  //       case (null) {
  //           return "User not found.";
  //       };
  //       case (?user) {
  //           if (user.accessLevel == #GUEST) {
  //               user.accessLevel = #ADMIN;
  //               approvedAdmins.add((principal, user));
  //               return "Admin approval successful.";
  //           } else {
  //               return "User is already approved or does not require approval.";
  //           };
  //     };
  // };

  // Funcție pentru respingerea Adminului
  // public shared func rejectAdmin(principal: Principal, args: AdminRequest): async Text {
  //   switch (users.get(principal)) {
  //       case (null) {
  //           return "User not found.";
  //       };
  //       case (?user) {
  //           if (user.pendingApproval == true) { // Accesăm câmpul cu .pendingApproval
  //               users.remove(principal);  // Remove the user if pending approval
  //               return "Admin request rejected.";  // Return rejection message
  //           } else {
  //               return "User is already approved or does not require approval.";  // User is already approved
  //           };
  //       };
  // };

  // Funcție pentru aprobare utilizatorului
  // public shared func approveUser(principal: Principal, args: AdminRequest): async Text {
  //   switch (users.get(principal)) {
  //       case (null) {
  //           return "User not found.";
  //       };
  //       case (?user) {
  //           if (user.accessLevel == #GUEST) {
  //               user.accessLevel = #USER;
  //               approvedAdmins.add((principal, user));
  //               return "User approval successful.";
  //           } else {
  //               return "User is already approved or does not require approval.";
  //           };
  //       };
  // };
  // Funcție pentru respingerea utilizatorului
  // public shared func rejectUser(principal: Principal, args: AdminRequest): async Text {
  //   switch (users.get(principal)) {
  //       case (null) {
  //           return "User not found.";
  //       };
  //       case (?user) {
  //           if (user.pendingApproval == true) { // Accesăm câmpul cu .pendingApproval
  //               users.remove(principal);  // Remove the user if pending approval
  //               return "User request rejected.";  // Return rejection message
  //           } else {
  //               return "User is already approved or does not require approval.";  // User is already approved
  //           };
  //       };
  // };

  // Funcție pentru aprobare utilizatorii
  // public shared func approveAllUsers(): async Text {
  //   for (pendingAdmin in pendingAdmins) {
  //       await approveUser(pendingAdmin.0, pendingAdmin.1);
  //   };
  //   pendingAdmins = [];
  //   return "All pending users approved successfully.";
  // };


  public shared func getUserByPrincipal(caller: Principal): async ?User {
    Debug.print(debug_show(caller));
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
        case (?User) {
            return #ok(User);
        };
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

  public func addUser(principal: Principal, user: User): async Text {
    users.put(principal, user);
    return "User added successfully.";
  };


  // public shared(msg) query func getCallerPrincipal() : async Text {
  //   return Debug.show(msg.caller); // Returnează apelantul ca text
  // };

  // public query func getCallerPrincipal() : async Text {
  //   return Debug.show(Principal.fromActor(this));
  // };
  
  

  public shared query func getUserAccessLevel(caller : Principal) : async Result.Result<Text, Text> {
    switch (users.get(caller)) {
        case (null) {
            return #err("User not found");
        };
        case (?User) {
            switch (User.accessLevel) {
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