import Debug "mo:base/Debug";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Result "mo:base/Result"; // Import corect
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Data "data.mo"; // Replace with the actual import path for your `data.mo`
// import SmallCompany "smallCompany";


// import Types "types";
// import PersonalDetail "personalDetails";
actor {
  type AccessLevel = {
    #ADMIN;
    #USER;
  };

  type User = {
    firstName: Text;
    lastName: Text;
    email: Text;
    passwordHash: Text;  // Store password as a hash
    role: AccessLevel;
    principal: Principal; // Store user Principal
  };


  public shared(msg) func addOrUpdateCompany(
    companyName: Text,
    registrationNumber: Text,
    email: Text,
    phone: Text,
    address: Address,
    insuranceType: Text,
    insuredValue: Nat,
    policyValue: Nat,
    paymentOption: Text,
    premium: Bool,
    gps: Text
): async () {
    let companyData: Data.CompanyData = {
        companyName = companyName;
        registrationNumber = registrationNumber;
        email = email;
        phone = phone;
        address = address;
        insuranceType = insuranceType;
        insuredValue = insuredValue;
        policyValue = policyValue;
        paymentOption = paymentOption;
        premium = premium;
        gps = gps;
    };
    await Data.addOrUpdateCompany(companyData);
};

public shared(msg) func getCompanies(): async [Data.CompanyData] {
    return await Data.getCompanies();
};

  var users = TrieMap.TrieMap<Text, User>(Text.equal, Text.hash);
  stable var usersEntries: [(Text, User)] = [];

  stable var activePolicies : Text = "";
  stable var claimsStatus : Text = "";
  stable var renewalDate : Text = "";
  stable var tokenBalance : Text = "";
  stable var recentTransactions : Text = "";
  stable var events : Text = "";


  system func preupgrade() {
    usersEntries := Iter.toArray(users.entries());
  };

  system func postupgrade() {
    users := TrieMap.fromEntries(Iter.fromArray(usersEntries), Text.equal, Text.hash);
  };
  // public func getCompanyInfo() : Text {
  //   return SmallCompany.getCompanyInfo();
// };
  public func signUp(firstName: Text, lastName: Text, email: Text, passwordHash: Text, role: AccessLevel, principal: Principal) : async Result.Result<Text, Text> {
    Debug.print("Received signUp request: " # firstName # ", " # lastName # ", " # email);

    switch (users.get(email)) {
      case (null) {
        let newUser: User = {
          firstName = firstName;
          lastName = lastName;
          email = email;
          passwordHash = passwordHash;  // Ensure this is the hashed password
          role = role;
          principal = principal; // Store the Principal
        };

        users.put(email, newUser);
        Debug.print("User signed up: " # firstName # " " # lastName # " with email: " # email);
        return #ok("User signed up successfully.");
      };
      case (?_) {
        Debug.print("Email already in use: " # email);
        return #err("Email already in use.");
      };
    }
  };

  public shared query func login(email: Text, passwordHash: Text) : async Result.Result<User, Text> {
    switch (users.get(email)) {
      case (null) {
        return #err("User not found.");
      };
      case (?user) {
        if (user.passwordHash == passwordHash) {
          return #ok(user);
        } else {
          return #err("Incorrect password.");
        };
      };
    }
  };

  public shared query func getUserInfoByPrincipal(principal: Principal) : async Result.Result<User, Text> {
    // Loop through users to find by principal
    for (user in users.entries()) {
      if (user.1.principal == principal) {
        return #ok(user.1);
      }
    };
    return #err("User not found.");
  };

  public shared func resetPassword(email: Text, newPasswordHash: Text) : async Result.Result<Text, Text> {
    switch (users.get(email)) {
      case (null) {
        return #err("User not found.");
      };
      case (?user) {
        let updatedUser = { user with passwordHash = newPasswordHash };
        users.put(email, updatedUser);
        return #ok("Password updated successfully.");
      };
    }
  };

  // New methods using msg.caller

  // Automatically use the caller's Principal for signing up
  public shared(msg) func registerUser(
      firstName: Text,
      lastName: Text,
      email: Text,
      passwordHash: Text,
      role: AccessLevel
  ): async Text {
      let principal = msg.caller; // Get the caller Principal
      let result = await signUp(firstName, lastName, email, passwordHash, role, principal);
      switch (result) {
        case (#ok(success)) {
          return success;
        };
        case (#err(error)) {
          return error;
        };
      }
  };
  //  Fetch user info (if logged in)
  public shared query func getUserInfo(email: Text) : async Result.Result<User, Text> {
    switch (users.get(email)) {
      case (null) {
        return #err("User not found.");
      };
      case (?user) {
        return #ok(user);
      };
    }
  };
 
  public shared(msg) func getAllUsers(): async Result.Result<[User], Text> {
    let callerPrincipal = msg.caller;

    // Așteaptă rezultatul de la getUserInfoByPrincipal
    let userInfoResult = await getUserInfoByPrincipal(callerPrincipal);
    
    switch (userInfoResult) {
        case (#err(_error)) {
            return #err("Unauthorized access or user not found.");
        };
        case (#ok(user)) {
            switch (user.role) {
                case (#ADMIN) {
                    // Folosește vals() pentru a obține toate valorile (utilizatorii)
                    return #ok(Iter.toArray(users.vals()));  // Returnează toți utilizatorii
                };
                case (#USER) {
                    return #err("Access denied. Only Admins can view all users.");
                };
            };
        };
    };
};



  

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



// import Nat "mo:base/Nat";
// import Text "mo:base/Text";

// actor InsuranceBackend {

//   // Structura pentru adresa companiei
//   public type Address = {
//     country: Text;
//     state: Text;
//     city: Text;
//     street: Text;
//     number: Text;
//     postalCode: Text;
//   };

//   // Structura pentru datele companiei
//   public type Company = {
//     companyName: Text;
//     registrationNumber: Text;
//     email: Text;
//     phone: Text;
//     address: Address;
//     insuranceType: Text;
//     insuredValue: Nat;
//     policyValue: Nat;
//     paymentOption: Text;
//     premium: Bool;
//     gps: ?Text; // Opțional pentru tipurile care au nevoie
//     tokensEarned: Nat;
//   };

//   // Lista pentru a stoca companiile
//   stable var companies: [Company] = [];

//   // Functie pentru inregistrarea unei companii
//   public func registerCompany(company: Company): async Bool {
//     // Verificăm dacă firma este deja înregistrată
//     let existingCompany = companies.filter((c) => c.companyName == company.companyName);
//     if (existingCompany.size() > 0) {
//       return false; // Compania este deja înregistrată
//     } else {
//       companies := Array.append(companies, [company]);
//       return true; // Compania a fost înregistrată
//     }
//   };

//   // Functie pentru a returna toate companiile
//   public func getAllCompanies(): async [Company] {
//     return companies;
//   };

//   // Functie pentru a găsi o companie după nume
//   public func findCompanyByName(name: Text): async ?Company {
//     let result = companies.filter((c) => c.companyName == name);
//     if (result.size() > 0) {
//       return ?result[0];
//     } else {
//       return null; // Nu s-a găsit compania
//     }
//   };

//   // Functie pentru a calcula tokenii recompensați
//   public func calculateTokens(insuredValue: Nat, rewardPercentage: Nat): async Nat {
//     return (insuredValue * rewardPercentage) / 100;
//   };
// };




// // import Claims "claims";
// // import Coverage "coverage";
// // import Quote "quote";
// // import Policy "policy";
// import Token "token";

// actor Main {
//   public query func submitClaim(claimDetails: Claims.Claim) : async Text {
//     Claims.addClaim(claimDetails);
//     return "Claim submitted!";
//   };

//   public query func getQuote(quoteDetails: Quote.QuoteDetails) : async Text {
//     return await Quote.generateQuote(quoteDetails);
//   };

//   public query func renewPolicy(policyId: Text) : async Text {
//     return await Policy.renewPolicy(policyId);
//   };

//   public query func manageTokens(tokenData: Token.TokenManagement) : async Text {
//     return Token.processToken(tokenData);
//   };
// };
