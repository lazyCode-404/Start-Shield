// import Types "types";

// module {
//   private var storedDetails: ?Types.UserDetails = null;

//   public func new() : actor {
//     actor {
//       public query func getDetails() : async ?Types.UserDetails {
//         return storedDetails;
//       };

//       public func updateDetails(userDetails: Types.UserDetails) : async Bool {
//         storedDetails := ?userDetails;
//         return true;
//       };
//     }
//   };
// // };
// import Types "types";

// actor class UserDetailsActor {
//     private var storedDetails: ?Types.UserDetails = null;

//     public query func getDetails() : async ?Types.UserDetails {
//         return storedDetails;
//     };

//     public func updateDetails(userDetails: Types.UserDetails) : async Bool {
//         storedDetails := ?userDetails;
//         return true;
//     };
// };
