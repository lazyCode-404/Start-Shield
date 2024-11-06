import Debug "mo:base/Debug";

actor InsuranceAPI {

  type Address = {
    country: Text;
    state: Text;
    city: Text;
    street: Text;
    number: Text;
    postalCode: Text;
  };

  type Owner = {
    firstName: Text;
    lastName: Text;
  };

  type InsuranceFormData = {
    companyName: Text;
    registrationNumber: Text;
    email: Text;
    phone: Text;
    address: Address;
    insuranceType: Text;
    additionalInfo: Text;
    insuredValue: Float;
    policyValue: Float;
    paymentOption: Text;
    premium: Bool;
    startDate: Text;
    endDate: Text;
    insuranceMonths: Nat;
    termsAgreed: Bool;
    over18: Bool;
    discount: Float;
    commission: Float;
    tokensEarned: Float;
    rewardPercentage: Float;
    industryType: Text;
    annualRevenue: Text;
    employees: Text;
    owners: [Owner];
    uploadedImages: [Text];
    uploadedDocuments: [Text];
  };

  var formDataStore: [InsuranceFormData] = [];

  public func applyForInsurance(data: InsuranceFormData) : async Text {
    formDataStore := formDataStore # [data];
    Debug.print("Insurance application received: " # debug_show(data));
    "Insurance application saved successfully."
  }

  public query func getAllApplications() : async [InsuranceFormData] {
    formDataStore;
  }
};
