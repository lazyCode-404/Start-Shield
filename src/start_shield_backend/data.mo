import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";

// Define the data structures
type Address = {
    country: Text;
    state: Text;
    city: Text;
    street: Text;
    number: Text;
    postalCode: Text;
};

type CompanyData = {
    companyName: Text;
    registrationNumber: Text;
    email: Text;
    phone: Text;
    address: Address;
    insuranceType: Text;
    insuredValue: Nat;
    policyValue: Nat;
    paymentOption: Text;
    premium: Bool;
    gps: Text;
};

// Storage for all company data
var companies: [CompanyData] = [];

public func getCompanies(): async [CompanyData] {
    return companies;
}

public func addOrUpdateCompany(companyData: CompanyData): async () {
    let index = Array.findIndex<CompanyData>(companies, func (c) { c.registrationNumber == companyData.registrationNumber });
    if (Option.isSome(index)) {
        // Update existing company data
        companies[Option.get(index)] := companyData;
    } else {
        // Add new company data
        companies := Array.append<CompanyData>(companies, [companyData]);
    };
    Debug.print("Company data has been added or updated.");
}

public func clearAllCompanies(): async () {
    companies := [];
    Debug.print("All company data has been cleared.");
}
