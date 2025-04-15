import Principal "mo:base/Principal";
import Array "mo:base/Array";

actor class AddUserByAdminCanister(adminPrincipal: Principal) {
  stable var users : [Principal] = [];

  public shared(msg) func addUser(newUser: Principal) : async Text {
    if (msg.caller == adminPrincipal) {
      users := Array.append(users, [newUser]);
      return "User added successfully.";
    } else {
      return "Error: Only the administrator can add users.";
    }
  };
  
  public func listUsers() : async [Principal] {
    return users;
  };
}
// actor AdminCanister {
//   stable var users : [Principal] = [];
//   // let adminPrincipal : Principal = Principal.fromText("xxxx-yyyyy-zzzzz");

//   public func addUser(newUser: Principal) : async Text {
//     if (msg.caller == adminPrincipal) {
//       users := Array.append(users, [newUser]);
//       return "Utilizatorul a fost adăugat cu succes.";
//     } else {
//       return "Eroare: Doar administratorul poate adăuga utilizatori.";
//     }
//   }
// }

// j    return users; //listing users
// }

// public func removeUser(userToRemove: Principal) : async Text {
//     if (msg.caller == adminPrincipal) {
//         users := users.filter(func(user) { user != userToRemove });
//         return "Utilizatorul a fost eliminat.";//deleteing users
//     } else {
//         return "Eroare: Doar administratorul poate elimina utilizatori.";
//     }
// }
