import Array "mo:base/Array";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import TrieMap "mo:base/TrieMap";
import HashMap "mo:base/HashMap";

actor CompanyData {

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

  var companyData = TrieMap.TrieMap<Principal, Company>(Principal.equal, Principal.hash);
  stable var companyStorage: [(Principal, Company)] = [];
  var subscribers = HashMap.HashMap<Principal, Bool>(0, Principal.equal, Principal.hash);


  system func preupgrade() {
    companyStorage := Iter.toArray(companyData.entries());
  };

  system func postupgrade() {
    companyData := TrieMap.fromEntries(companyStorage.vals(), Principal.equal, Principal.hash);
  };

  // public shared func addCompany(principal: Principal, company: Company): async Bool {
  //   companyData.put(principal, company);
  //   notifyClients(principal, "Company data added successfully");
  //   return true;
  // };
  public shared func addCompany(principal: Principal, company: Company): async Bool {
    companyData.put(principal, company);
    return true;
  };


  public shared query func getCompany(principal: Principal): async ?Company {
    return companyData.get(principal);
  };

  // public shared query func getAllCompanies(): async [(Principal, Company)] {
  //   return companyData.entries();
  // };


  // public shared func updateCompany(principal: Principal, company: Company): async Bool {
  //   if (companyData.get(principal) != null) {
  //     companyData.put(principal, company);
  //     notifyClients(principal, "Company data updated successfully");
  //     return true;
  //   };
  //   return false;
  // };

  // public shared func deleteCompany(principal: Principal): async Bool {
  //   if (companyData.get(principal) != null) {
  //     companyData.delete(principal);
  //     notifyClients(principal, "Company data deleted successfully");
  //     return true;
  //   };
  //   return false;
  // };

  // WebSocket notification system
  // var subscribers: [Principal] = [];

  // public shared func subscribe(principal: Principal): async Bool {
  //   subscribers := Array.append(subscribers, [principal]);
  //   return true;
  // };
//   private func notifyClients(principal: Principal, message: Text) {
//     Array.fromIter(subscribers.keys()).forEach(func (subscriber: Principal) {
//         if (subscriber != principal) {
//             // Simulate WebSocket notification
//             Debug.print(message # " sent to: " # Principal.toText(subscriber));
//         };
//     });
// };



};

