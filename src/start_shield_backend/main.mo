actor {
  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };
};
// import Text "mo:base/Text";
// actor CreateAccountService {
 

//   public type Account = {
//     username: Text;
//     email: Text;
//     dob: Text;
//     address: Text;
//     firstName: Text;
//     lastName: Text;
//     password: Text;
//     confirmPassword: Text; // Add this field
//   };

//   public func createAccount(account: Account) : async Text {
//     // Validate input (e.g., check if username is unique, etc.)
//     if (account.password != account.confirmPassword) {
//       return "Passwords do not match.";
//     };

//     // You can add more validation logic here (e.g., email format, uniqueness, etc.)

//     // Save the account data to your storage (e.g., a canister)
//     // For demonstration purposes, we'll just print the account details
//     let accountDetails = Text.concat(
//       "Username: ", account.username,
//       "\nEmail: ", account.email,
//       "\nDate of Birth: ", account.dob,
//       "\nAddress: ", account.address,
//       "\nFirst Name: ", account.firstName,
//       "\nLast Name: ", account.lastName
//     );
//     Debug.print(accountDetails);

//     // Return a success message
//     return "Account created successfully!";
//   };
// };


// import Nat32 "mo:base/Nat32";
// import Nat "mo:base/Nat";
// import Text "mo:base/Text";

// actor Newsletter {
//   type Email = Text;

//   var emailCounter : Nat = Nat.fromInt(0);
//   var emails : Map Nat32 Email = HashMap.empty;

//   public func validateEmail(email: Text) : Bool {
//     // Validare simplificată (verificăm dacă conține "@")
//     return Text.contains(email, "@");
//   };

//   public func subscribe(email: Text) : async Bool {
//     if validateEmail(email) {
//       emailCounter += 1;
//       emails[emailCounter] := email;
//       return true;
//     } else {
//       return false; // Adresă invalidă
//     }
//   };

//   public query func getEmails() : async [Email] {
//     return HashMap.values(emails);
//   };

//   public func deleteEmail(id: Nat) : async Bool {
//     if HashMap.contains(emails, id) {
//       emails := HashMap.remove(emails, id);
//       return true;
//     } else {
//       return false; // Adresă inexistentă
//     }
//   };
// };

// import Array "mo:base/Array";
// import Text "mo:base/Text";
// import Debug "mo:base/Debug";
// import Bool "mo:base/Bool";

// actor {
//   stable var subscribers : [Text] = [];

//   public func subscribe(email: Text) : async Text {
//     if (isValidEmail(email)) {
//       subscribers := Array.append(subscribers, [email]);
//       Debug.print("New subscriber: " # email);
//       return "Subscribed successfully!";
//     } else {
//       return "Invalid email address.";
//     }
//   };

  // func isValidEmail(email: Text) : Bool {
  // //   Check if email contains '@' and '.'
  //   if (Text.contains(email, #char('@')) and Text.contains(email, #char('.'))) {
  //     let partsIter = Text.split(email, "@");
  //     let firstPart = partsIter.next();
  //     let secondPart = partsIter.next();

  //     if (firstPart != null and secondPart != null and partsIter.next() == null) {
  //       let domainPartsIter = Text.split(Option.get(secondPart), ".");
  //       if (domainPartsIter.next() != null and domainPartsIter.next() != null) {
  //         return true;
  //       }
  //     };
    // };
    // return false;
  // };
// };


