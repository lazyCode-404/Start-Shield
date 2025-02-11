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


//   var users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);
//   stable var usersEntries: [(Principal, User)] = [];

//   //public let companyDataActor = CompanyData.CompanyData();
  
//   // public shared ({caller}) func getCompanyActor() : async Principal {
//   //   return companyDataActor;
//   // };
//  // Cereri pentru administratori
//   stable var pendingAdmins: [(Principal, User)] = [];
//   stable var approvedAdmins: [(Principal, User)] = [];

//   // Obține cererile de administratori în așteptare
//   // public func getPendingAdmins(): async [AdminRequest] {
//   //   var result: [AdminRequest] = [];
//   //   for (entry in pendingAdmins) {
//   //     let adminRequest: AdminRequest = {
//   //       principal = entry.0;
//   //       user = entry.1;
//   //     };
//   //     result := Array.append(result, [adminRequest]); // Folosim Array.append
//   //   };
//   //   return result;
//   // };
  


//   system func preupgrade() {
//     usersEntries := Iter.toArray(users.entries());
// };

//   system func postupgrade() {
//     users := TrieMap.fromEntries(usersEntries.vals(), Principal.equal, Principal.hash);
// };

// public shared update func getCallerPrincipal(): async Principal {
//   return msg.caller;
// };

// public shared func getUserByPrincipal(caller: Principal): async ?User {
//   Debug.print(debug_show(caller));
//   return users.get(caller);
// };

// public shared func createUser(caller: Principal, args: User): async Text {
//   switch (users.get(caller)) {
//       case (?existingUser) {
//           return "User already exists!";
//       };
//       case null {
//           users.put(caller, args);
//           return "Account created successfully for " # args.name # "!";
//       };
//   };
// };


//   public shared query func getUser(caller : Principal) : async Result.Result<User, Text> {
//     switch (users.get(caller)) {
//         case (null) {
//             return #err("User not found");
//         };
//         case (?User) {
//             return #ok(User);
//         };
//     };
// };

// // public shared func getUserDetails(principal: Principal): async User {
// //   switch (users.get(principal)) {
// //       case (?user) {
// //           return user;
// //       };
// //       case null {
// //           return null;  // Or handle the case appropriately
// //       };
// //   };
// // };


// // public shared func getUserDetails(principal: Principal): async User {
// //   // Logică pentru obținerea detaliilor utilizatorului
// // };


//   public shared func deleteUser(caller : Principal) : async Text {
//     if (users.get(caller) != null) {
//         users.delete(caller);
//         return "User deleted successfully.";
//     } else {
//         return "User not found.";
//     };
// };

//   public shared query func getAllUsers() : async [User] {
//     return Iter.toArray(users.vals());
// };
// public func addUser(principal: Principal, user: User): async Text {
//   users.put(principal, user);
//   return "User added successfully.";
// };


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
// };

// Debug.print(debug_show(usersEntries));
// };


// // import Int "mo:base/Int";
// // import TrieMap "mo:base/TrieMap";
// // import Text "mo:base/Text";
// // import Result "mo:base/Result";
// // import Iter "mo:base/Iter";
// // import Principal "mo:base/Principal";
// // import Debug "mo:base/Debug";
// // import Bool "mo:base/Bool";
// // // import CompanyData "mo:companyData";

// // actor Main {

// //   type AccessLevel = {
// //     #SUPER_ADMIN;
// //     #ADMIN;
// //     #USER;
// //     #GUEST;
// //   };

// //   type User = {
// //     name : Text;
// //     email : Text;
// //     age : Nat;
// //     accessLevel : AccessLevel;
// //     timestamp : Nat64;
// //     pendingApproval : Bool; // Câmp pentru aprobarea Adminului
// //   };

// //   var users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);
// //   stable var usersEntries: [(Principal, User)] = [];

// //   // public let companyDataActor = CompanyData.CompanyData();
  
// //   // public shared ({caller}) func getCompanyActor() : async Principal {
// //   //   return companyDataActor;
// //   // };

// //   system func preupgrade() {
// //     usersEntries := Iter.toArray(users.entries());
// //   };

// //   system func postupgrade() {
// //     users := TrieMap.fromEntries(usersEntries.vals(), Principal.equal, Principal.hash);
// //   };

// //   public shared func getUserByPrincipal(caller: Principal): async ?User {
// //     return users.get(caller);
// //   };

// //   // public shared func createUser(caller: Principal, args: User): async Text {
// //   //   switch (users.get(caller)) {y
// //   //     case (?existingUser) {
// //   //       return "User already exists!";
// //   //     };
// //   //     case null {
// //   //       users.put(caller, args);
// //   //       return "Account created successfully for " # args.name # "!";
// //   //     };
// //   //   };
// //   // };
// //   public shared func createUser(caller: Principal, args: User): async Text {
// //     switch (users.get(caller)) {
// //       case (?existingUser) {
// //         return "User already exists!";
// //       };
// //       case null {
// //         // Setează câmpul `pendingApproval` dacă lipsește
// //         let userWithApproval = {
// //           name = args.name;
// //           email = args.email;
// //           age = args.age;
// //           accessLevel = args.accessLevel;
// //           timestamp = args.timestamp;
// //           pendingApproval = true; // sau valoarea implicită dorită
// //         };
// //         users.put(caller, userWithApproval);
// //         return "Account created successfully for " # args.name # "!";
// //       };
// //     };
// //   };
  
// //   public shared query func getUser(caller : Principal) : async Result.Result<User, Text> {
// //     switch (users.get(caller)) {
// //       case (null) {
// //         return #err("User not found");
// //       };
// //       case (?user) {
// //         return #ok(user);
// //       };
// //     };
// //   };
// //   // public shared query func getUser(caller : Principal) : async Result.Result<User, Text> {
// //   //   switch (users.get(caller)) {
// //   //     case (null) {
// //   //       return #err("User not found");
// //   //     };
// //   //     case (?user) {
// //   //       if (not exists user.pendingApproval) {
// //   //           return #err("User data is invalid: pendingApproval missing");
// //   //       };
// //   //       return #ok(user);
// //   //   };
// //   //   };
// //   // };
  

// //   public shared func updateUser(caller : Principal, args : User) : async Text {
// //     if (users.get(caller) != null) {
// //       users.put(caller, args);
// //       return "User updated successfully.";
// //     } else {
// //       return "User not found.";
// //     };
// //   };

// //   public shared func deleteUser(caller : Principal) : async Text {
// //     if (users.get(caller) != null) {
// //       users.delete(caller);
// //       return "User deleted successfully.";
// //     } else {
// //       return "User not found.";
// //     };
// //   };

// //   public shared query func getAllUsers() : async [User] {
// //     return Iter.toArray(users.vals());
// //   };

// // //   system func postupgrade() {
// // //     users := TrieMap.fromEntries(usersEntries.vals(), Principal.equal, Principal.hash);

// // //     // Iterate through users and ensure `pendingApproval` is set
// // //     for ((principal, user) in users.entries()) {
// // //         users.put(principal, {
// // //             name = user.name;
// // //             email = user.email;
// // //             age = user.age;
// // //             accessLevel = user.accessLevel;
// // //             timestamp = user.timestamp;
// // //             pendingApproval = user.pendingApproval ?: true;
// // //             // {
// // //           //     case (null) { true }; // Default to `true` when `pendingApproval` is null or missing
// // //           //     case (?value) { value }; // Use the value directly if it exists
// // //           // };
// // //         });
// // //     };
// // // };


  

// //   public shared query func getUserAccessLevel(caller : Principal) : async Result.Result<Text, Text> {
// //     switch (users.get(caller)) {
// //       case (null) {
// //         return #err("User not found");
// //       };
// //       case (?user) {
// //         switch (user.accessLevel) {
// //           case (#SUPER_ADMIN) {
// //             return #ok("You are a SUPER_ADMIN");
// //           };
// //           case (#ADMIN) {
// //             return #ok("You are an ADMIN");
// //           };
// //           case (#USER) {
// //             return #ok("You are just a USER");
// //           };
// //           case (#GUEST) {
// //             return #ok("You are a GUEST");
// //           };
// //         };
// //       };
// //     };
// //   };

// //   // Funcție pentru aprobare Admin
// //   // public shared func approveAdmin(principal: Principal) : async Text {
// //   //   switch (users.get(principal)) {
// //   //     case (?user) {
// //   //       if (user.pendingApproval) {
// //   //         type User = {
// //   //           name : Text;
// //   //           email : Text;
// //   //           age : Nat;
// //   //           accessLevel : AccessLevel;
// //   //           timestamp : Int;
// //   //           pendingApproval : Bool; // Make sure to include this field
// //   //         };
          
          
// //   //         return "Admin approval successful.";
// //   //       } else {
// //   //         return "User is already approved or does not require approval.";
// //   //       };
// //   //     };
// //   //     case (_) {
// //   //       return "User not found.";
// //   //     };
// //   //   };
// //   // };

// //   public shared func approveAdmin(principal: Principal) : async Text {
// //     switch (users.get(principal)) {
// //       case (?user) {
// //         if (user.pendingApproval) {
// //           let updatedUser = {
// //             name = user.name;
// //             email = user.email;
// //             age = user.age;
// //             accessLevel = #ADMIN;
// //             timestamp = user.timestamp;
// //             pendingApproval = false;
// //           };
// //           users.put(principal, updatedUser);
// //           return "Admin approval successful.";
// //         } else {
// //           return "User is already approved or does not require approval.";
// //         };
// //       };
// //       case (_) {
// //         return "User not found.";
// //       };
// //     };
// //   };
  

// //   // Funcție pentru respingerea Adminului
// //   // public func rejectAdmin(principal: Principal) : async Text {
// //   //   switch (users.get(principal)) {
// //   //     case (?user) {
// //   //       if (user.pendingApproval == true) { // Accesăm câmpul cu .pendingApproval
// //   //         users.remove(principal);  // Remove the user if pending approval
// //   //         return "Admin request rejected.";  // Return rejection message
// //   //       } else {
// //   //         return "User is already approved or does not require approval.";  // User is already approved
// //   //       };
// //   //     };
// //   //     case null {
// //   //       return "User not found.";  // No user found with the given principal
// //   //     };
// //   //   };
// //   // };


// //   // Funcție pentru obținerea datelor unui utilizator
// //   public shared func getUserData(principal: Principal) : async Text {
// //     switch (users.get(principal)) {
// //       case (?user) {
// //         return "User: " # user.name # ", Role: " # (switch (user.accessLevel) {
// //           case (#SUPER_ADMIN) { "SUPER_ADMIN" };
// //           case (#ADMIN) { "ADMIN" };
// //           case (#USER) { "USER" };
// //           case (#GUEST) { "GUEST" };
// //         }) # ", Pending Approval: " # (if (user.pendingApproval) "Yes" else "No");
// //       };
// //       case (_) {
// //         return "User not found.";
// //       };
// //     };
// //   };

// //   // Funcție pentru obținerea tuturor utilizatorilor
// //   public shared query func getAllUsersWithApproval() : async [User] {
// //     return Iter.toArray(users.vals());
// //   };

// //   Debug.print(debug_show(usersEntries));
// // };


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

//   public shared update func getCallerPrincipal(): async Principal {
//   return msg.caller;
// };


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
