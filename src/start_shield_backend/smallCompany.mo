// import Trie "Trie";

// actor smallCompany {

//   stable var userCounter: Nat = 0;
//   stable var insuranceCounter: Nat = 0;

//   type User = {
//     id: Nat;
//     principal: Principal;
//     email: Text;
//   };

//   type Insurance = {
//     id: Nat;
//     userId: Nat;  // Ensure this matches how you're using it
//     companyName: Text;
//     insuranceType: Text;
//     startDate: Text;
//     endDate: Text;
//     marketValue: Nat;
//     insurancePercentage: Nat;
//     paymentType: Text;
//     commission: Nat;
//     companyType: Text;
//   };

//   stable var users: Trie.Trie<Principal, User> = Trie.empty();
//   stable var insurances: Trie.Trie<Nat, Insurance> = Trie.empty();

//   public func registerUser(principal: Principal): async Text {
//     // Check if user already exists
//     if (Trie.get(users, principal, (x, y) => x == y) != null) {
//       return "User already exists!";
//     };

//     // Create a new user
//     let newUser: User = {
//       id: userCounter,
//       principal: principal,
//       email: ""
//     };

//     // Update the Trie with the new user
//     users := Trie.put(users, principal, (x, y) => x == y, newUser);
//     userCounter += 1;  // Incrementing after putting the user
//     return "User registered successfully!";
//   };

//   public func getUser(principal: Principal): async ?User {
//     return Trie.get(users, principal, (x, y) => x == y);
//   };

//   public func createInsurance(
//     principal: Principal,
//     companyName: Text,
//     companyType: Text,
//     insuranceType: Text,
//     startDate: Text,
//     endDate: Text,
//     marketValue: Nat,
//     insurancePercentage: Nat,
//     paymentType: Text,
//     commission: Nat
//   ): async Bool {
//     let userIdOpt = Trie.get(users, principal, (x, y) => x == y);
//     switch userIdOpt {
//       case (null) { return false; }
//       case (?user) {
//         // Create a new insurance object
//         let newInsurance: Insurance = {
//           id: insuranceCounter,
//           userId: user.id,  // Ensure this matches with User id type
//           companyName: companyName,
//           insuranceType: insuranceType,
//           startDate: startDate,
//           endDate: endDate,
//           marketValue: marketValue,
//           insurancePercentage: insurancePercentage,
//           paymentType: paymentType,
//           commission: commission,
//           companyType: companyType
//         };

//         // Update the Trie with the new insurance
//         insurances := Trie.put(insurances, insuranceCounter, (x, y) => x == y, newInsurance);
//         insuranceCounter += 1;  // Incrementing after putting the insurance
//         return true;
//       }
//     };
//   };

//   public func getUserInsurances(userId: Nat): async [Insurance] {
//     var insuranceList: [Insurance] = [];
//     Trie.fold<_, Insurance, ()>(insurances, func(key, value, _) {
//       if (value.userId == userId) {
//         insuranceList := Array.append<Insurance>(insuranceList, [value]);
//       };
//     }, ());
//     return insuranceList;
//   };
// };
