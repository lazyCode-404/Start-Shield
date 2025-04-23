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
import Random "mo:base/Random";
import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Nat8 "mo:base/Nat8";

import Error "mo:base/Error";
import Hash "mo:base/Hash";
import Option "mo:base/Option";



actor Main {

  type User = {
    name : Text;
    email : Text;
    age : Nat;
    accessLevel : AccessLevel;
    timestamp : Int;
    adminStatus : AdminStatus;
};

type UserAddress = {
  country : ?Text;
  state : ?Text;
  city : ?Text;
  street : ?Text;
  number : ?Text;
  postalCode : ?Text;
};

type UpdateUser = {
  name : Text;
  email : Text;
  age : Nat;
  accessLevel : AccessLevel;
  timestamp : Int;
  adminStatus : AdminStatus;
  userAddress : UserAddress; // Nu mai este opțional
  phone : ?Text;
  photo : ?[Nat8];
  photoId : ?Text;
};

type UserResponse = {
    principal: Principal;
    name: Text;
    email: Text;
    age: Nat;
    accessLevel: AccessLevel;
    timestamp: Int;
    adminStatus: AdminStatus;
    userAddress : ?UserAddress;
    phone : ?Text;
    photo : ?[Nat8];
    photoId : ?Text;
};


  
  

  type Status = { #ACTIVE; #INACTIVE };

  public type EditableUser = {
    id : Nat;
    principal : Principal;
    name : Text;
    email : Text;
    age : Nat;
    accessLevel : AccessLevel;
    timestamp : Int;
    adminStatus : AdminStatus;
    userAddress : ?UserAddress;  // Optional Address
    phone : ?Text;       // Optional Phone number
    photo : ?[Nat8];       // Optional Photo upload
    photoId : ?Text;     // Optional Photo ID
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

  public type Address = {
    country : Text;
    state : Text;
    city : Text;
    street : Text;
    number : Text;
    postalCode : Text;
  };
type AcceptanceStatus = {
  #accepted;
  #declined;
};
type AdminStatus = {
  #Pending;
  #Approved;
  #Rejected;
  #NotRequested;
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
    premium: AcceptanceStatus;
    startDate: Text;
    endDate: Text;
    insuranceMonths: Nat;
    termsAgreed: AcceptanceStatus;
    over18: AcceptanceStatus;
    discount: Nat;
    commission: Nat;
    tokensEarned: Nat;
    rewardPercentage: Nat;
    industryType: Text;
    annualRevenue: Nat;
    employees: Nat;
};
public type Transaction = {
  id : Text;
  user : Principal;
  amount : Nat;
  currency : Text;
  status : Text;
  method : Text;
  timestamp : Int;
};

  // Tipuri de date
  type UserId = Principal;
  type PaymentId = Nat;
  type Amount = Nat;
  
  type Payment = {
    id: PaymentId;
    from: UserId;
    to: UserId;
    amount: Amount;
    timestamp: Time.Time;
    status: PaymentStatus;
  };
  
  type PaymentStatus = {
    #pending;
    #completed;
    #failed;
    #refunded;
  };
  

 var users = TrieMap.TrieMap<Principal, EditableUser>(Principal.equal, Principal.hash);
stable var usersEntries: [(Principal, EditableUser)] = [];

  // Company Data integration
  // var companyData = TrieMap.TrieMap<Principal, Company>(Principal.equal, Principal.hash);
  stable var companyStorage: [(Principal, Company)] = [];
  var subscribers = HashMap.HashMap<Principal, Bool>(0, Principal.equal, Principal.hash);

    // Stare
    stable var nextPaymentId : PaymentId = 0;

  public query func healthCheck() : async Text {
    return "Salut eu sunt Backendul tau din Motoko!";
};

// Alternative random number generation
let SubnetManager : actor {
  raw_rand() : async Blob;
} = actor "aaaaa-aa";

public shared func createUser(caller: Principal, args: User): async Text {
  switch (users.get(caller)) {
      case (?existingUser) {
          return "User already exists!";
      };
      case null {
          // Get random bytes from subnet manager
          let randomBytes = await SubnetManager.raw_rand();
          let id = Int.abs(Time.now()); // Fallback if needed
          
          let editableUser : EditableUser = {
                  id = id;
              principal = caller;
              name = args.name;
              email = args.email;
              age = args.age;
              accessLevel = args.accessLevel;
              timestamp = args.timestamp;
              adminStatus = args.adminStatus;
              userAddress = null;
              phone = null;
              photo = null;
              photoId = null;
          };
          users.put(caller, editableUser);
          return "Account created successfully for " # args.name # "!";
      };
  };
};


public shared func updateUser(userId : Principal, name : Text, email : Text, userAddress : ?Address, phone : ?Text, photo : ?Blob, photoId : ?Text) : async Bool {
  switch (users.get(userId)) {
      case (?existingUser) {
          // Convert Address to UserAddress
         let convertedUserAddress = switch (userAddress) {
  case (null) { null };
  case (?addr) {
    ?{
      country = ?addr.country;
      state = ?addr.state;
      city = ?addr.city;
      street = ?addr.street;
      number = ?addr.number;
      postalCode = ?addr.postalCode;
    }
  };
};
          
          // Convert Blob to [Nat8]
          let convertedPhoto = switch (photo) {
  case (null) { null };
  case (?p) { ?Blob.toArray(p) };
};
          
          let updatedUser : EditableUser = {
              id = existingUser.id;
              principal = userId;
              name = name;
              email = email;
              age = existingUser.age;
              accessLevel = existingUser.accessLevel;
              timestamp = Int.abs(Time.now());
              adminStatus = existingUser.adminStatus;
              userAddress = convertedUserAddress;
              phone = phone;
              photo = convertedPhoto;
              photoId = photoId;
          };
          users.put(userId, updatedUser);
          return true;
      };
      case (null) {
          return false;
      };
  };
};



public shared(msg) func requestAdminAccess() : async Text {
  let caller = msg.caller;
  switch (users.get(caller)) {
    case (?user) {
      if (user.adminStatus == #NotRequested or user.adminStatus == #Rejected) {
        let updatedUser = { user with adminStatus = #Pending };
        users.put(caller, updatedUser);
        return "Cererea de acces admin a fost înregistrată!";
      };
      "Cerere deja existentă sau în așteptare";
    };
    case null { "Utilizator inexistent" };
  };
};

public query func getPendingAdmins() : async [(Principal, User)] {
  Iter.toArray(Iter.filter(users.entries(), func ((p, user) : (Principal, User)) : Bool {
    switch (user.adminStatus) {
      case (#Pending) { true };
      case (_) { false };
    };
  }));
};

public query func getAdminStatus(principal : Principal) : async AdminStatus {
  switch (users.get(principal)) {
    case (?user) { user.adminStatus };
    case null { #NotRequested };
  };
};

// public shared(msg) func handleAdminApproval(principal : Principal, status : AdminStatus) : async Result.Result<Text, Text> {
//   assert(isSuperAdmin(msg.caller));
//   switch (users.get(principal)) {
//     case (?user) {
//       let updatedUser = { user with adminStatus = status };
//       users.put(principal, updatedUser);
//       return #ok("Cererea a fost procesată cu succes!");
//     };
//     case null { return #err("Utilizatorul nu există."); };
//   };
// };
public shared(msg) func handleAdminApproval(principal : Principal, status : AdminStatus) : async Result.Result<Text, Text> {
  assert(isSuperAdmin(msg.caller));
  switch (users.get(principal)) {
    case (?user) {
      let updatedUser = { user with adminStatus = status };
      users.put(principal, updatedUser);
      return #ok("Cererea a fost procesată cu succes!");
    };
    case null { return #err("Utilizatorul nu există."); };
  };
};

// Funcția de verificare Super Admin
private func isSuperAdmin(principal : Principal) : Bool {
  switch (users.get(principal)) {
    case (?user) { user.accessLevel == #SUPER_ADMIN };
    case null { false };
  };
};

// Exemplu de funcție securizată
public shared(msg) func secureAdminOperation() : async Text {
  assert(isSuperAdmin(msg.caller)); // Verificare permisie
  
  // Logica operației securizate
  "Operație reușită pentru Super Admin";
};

  private var companyData : TrieMap.TrieMap<Principal, Company> = TrieMap.TrieMap<Principal, Company>(Principal.equal, Principal.hash);

  system func preupgrade() {
    usersEntries := Iter.toArray(users.entries());
    companyStorage := Iter.toArray(companyData.entries());
  };

  system func postupgrade() {
    users := TrieMap.fromEntries(usersEntries.vals(), Principal.equal, Principal.hash);
    companyData := TrieMap.fromEntries(companyStorage.vals(), Principal.equal, Principal.hash);
  };

  public shared query func getCompany(principal: Principal): async ?Company {
    return companyData.get(principal);
  };

  stable var pendingAdmins: [(Principal, User)] = [];
  stable var approvedAdmins: [(Principal, User)] = [];

  // Use update (without 'shared') to ensure msg is available.


  public shared(msg) func getCallerPrincipal(): async Principal {
    return msg.caller;
  };

  public shared func getUserByPrincipal(caller: Principal): async ?User {
    Debug.print(debug_show(caller));
    return users.get(caller);
  };

public query func getUserById(userId: Principal) : async ?UserResponse {
  switch (users.get(userId)) {
      case (?user) {
           return ?{
              principal = userId;
              name = user.name;
              email = user.email;
              age = user.age;
              accessLevel = user.accessLevel;
              timestamp = user.timestamp;
              adminStatus = user.adminStatus;
              userAddress = user.userAddress;
              phone = user.phone;
              photo = user.photo;
              photoId = user.photoId;
          };
      };
      case (null) {
          return null;
      };
  };
};

public query func getAllUsers() : async [UserResponse] {
  let usersArray : [(Principal, EditableUser)] = Iter.toArray(users.entries());
  return Array.map<(Principal, EditableUser), UserResponse>(usersArray, func ((principal, user)) {
      {
          principal = principal;
          name = user.name;
          email = user.email;
          age = user.age;
          accessLevel = user.accessLevel;
          timestamp = user.timestamp;
          adminStatus = user.adminStatus;
          userAddress = user.userAddress;
          phone = user.phone;
          photo = user.photo;
          photoId = user.photoId;
      };
  });
};



 public func addUser(principal: Principal, user: User): async Text {
    // Create an EditableUser from the User
    let editableUser: EditableUser = {
        id = Int.abs(Time.now()) % 1000000; // Generate an ID
        principal = principal;
        name = user.name;
        email = user.email;
        age = user.age;
        accessLevel = user.accessLevel;
        timestamp = user.timestamp;
        adminStatus = user.adminStatus;
        userAddress = null;  // Optional fields set to null
        phone = null;
        photo = null;
        photoId = null;
    };
    
    users.put(principal, editableUser);
    return "User added successfully.";
};

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

    // Company Management
    public shared func addCompany(principal : Principal, company : Company) : async Bool {
      companyData.put(principal, company);
      true
    };
  
    public query func getCompanyForUser(caller : Principal) : async ?Company {
      return companyData.get(caller);
    };


 // Folosim HashMap pentru a stoca plățile
 private var payments = HashMap.HashMap<PaymentId, Payment>(0, Nat.equal, Hash.hash);
 private var userBalances = HashMap.HashMap<UserId, Amount>(0, Principal.equal, Principal.hash);
 
 // Funcții publice
 public shared(msg) func createPayment(to: UserId, amount: Amount) : async Result.Result<PaymentId, Text> {
   let caller = msg.caller;
   
   // Verificăm dacă utilizatorul are suficient sold
   let callerBalance = Option.get(userBalances.get(caller), 0);
   if (callerBalance < amount) {
     return #err("Sold insuficient");
   };
   
   // Creăm plata
   let paymentId = nextPaymentId;
   nextPaymentId += 1;
   
   let newPayment : Payment = {
     id = paymentId;
     from = caller;
     to = to;
     amount = amount;
     timestamp = Time.now();
     status = #pending;
   };
   
   // Actualizăm soldurile
   userBalances.put(caller, callerBalance - amount);
   
   // Stocăm plata
   payments.put(paymentId, newPayment);
   
   return #ok(paymentId);
 };
 
 public shared(msg) func completePayment(paymentId: PaymentId) : async Result.Result<(), Text> {
   // Doar administratorul sau destinatarul pot finaliza plata
   // În producție, adăugați verificări suplimentare de securitate
   
   switch (payments.get(paymentId)) {
     case (null) {
       return #err("Plata nu a fost găsită");
     };
     case (?payment) {
       if (payment.status != #pending) {
         return #err("Plata nu este în starea pending");
       };
       
       // Actualizăm soldul destinatarului
       let recipientBalance = Option.get(userBalances.get(payment.to), 0);
       userBalances.put(payment.to, recipientBalance + payment.amount);
       
       // Actualizăm starea plății
       let updatedPayment = {
         id = payment.id;
         from = payment.from;
         to = payment.to;
         amount = payment.amount;
         timestamp = payment.timestamp;
         status = #completed;
       };
       payments.put(paymentId, updatedPayment);
       
       return #ok();
     };
   };
 };
 
 public shared(msg) func deposit() : async () {
   // În producție, aceasta ar trebui să integreze cu un token ICP real
   // Acest exemplu simplu doar adaugă 100 de unități la soldul utilizatorului
   let caller = msg.caller;
   let currentBalance = Option.get(userBalances.get(caller), 0);
   userBalances.put(caller, currentBalance + 100);
 };
 
 public query func getBalance() : async Amount {
   let caller = Principal.fromActor(Main);
   return Option.get(userBalances.get(caller), 0);
 };
 
 public query func getPayment(paymentId: PaymentId) : async ?Payment {
   return payments.get(paymentId);
 };
 
 // Funcții administrative
 public shared(msg) func refundPayment(paymentId: PaymentId) : async Result.Result<(), Text> {
   // În producție, adăugați verificări pentru a vă asigura că doar administratorii pot face refund
   
   switch (payments.get(paymentId)) {
     case (null) {
       return #err("Plata nu a fost găsită");
     };
     case (?payment) {
       if (payment.status != #completed) {
         return #err("Doar plățile finalizate pot fi rambursate");
       };
       
       // Returnăm fondurile expeditorului
       let senderBalance = Option.get(userBalances.get(payment.from), 0);
       userBalances.put(payment.from, senderBalance + payment.amount);
       
       // Deducem fondurile din soldul destinatarului
       let recipientBalance = Option.get(userBalances.get(payment.to), 0);
       if (recipientBalance >= payment.amount) {
         userBalances.put(payment.to, recipientBalance - payment.amount);
       } else {
         return #err("Destinatarul nu are suficiente fonduri pentru rambursare");
       };
       
       // Actualizăm starea plății
       let updatedPayment = {
         id = payment.id;
         from = payment.from;
         to = payment.to;
         amount = payment.amount;
         timestamp = payment.timestamp;
         status = #refunded;
       };
       payments.put(paymentId, updatedPayment);
       
       return #ok();
     };
   };
 };
 private var userAccessLevels = HashMap.HashMap<Principal, AccessLevel>(0, Principal.equal, Principal.hash);

 public query func checkAccessLevel(user: Principal, requiredLevel: AccessLevel) : async Bool {
  let userAccessLevel = Option.get(userAccessLevels.get(user), #USER);
  switch (userAccessLevel, requiredLevel) {
      case (#SUPER_ADMIN, _) { true };
      case (#ADMIN, #USER) { true };
      case (#USER, #USER) { true };
      case _ { false };
  }
};


  Debug.print(debug_show(usersEntries));
  Debug.print(debug_show(companyStorage));
};


