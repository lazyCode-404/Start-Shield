import _Array "mo:base/Array";
import _Buffer "mo:base/Buffer";
import _Error "mo:base/Error";
import Float "mo:base/Float";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import _Nat32 "mo:base/Nat32";
import SUPER_ADMINOption "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
import _Cycles "mo:base/ExperimentalCycles";
import _IC "ic:aaaaa-aa";
import Int "mo:base/Int";

actor PricingActor {
  // Types
  type UserId = Principal;
  type PolicyType = {
    #basic;
    #standard;
    #premium;
  };
  
  type RiskFactor = {
    name: Text;
    weight: Float;
    value: Float;
  };
  
  type RiskProfile = {
    userId: UserId;
    riskFactors: [RiskFactor];
    riskScore: Float;
    lastUpdated: Time.Time;
  };
  
  type PricingParameters = {
    basePrice: Float;
    riskMultiplier: Float;
    discountRate: Float;
    maxDiscount: Float;
  };
  
  // State
  stable var pricingParametersEntries : [(PolicyType, PricingParameters)] = [];
  stable var riskProfilesEntries : [(UserId, RiskProfile)] = [];
  
    // Helper functions for PolicyType equality and hashing
    private func policytypeEqual(a: PolicyType, b: PolicyType) : Bool {
        switch (a, b) {
          case (#basic, #basic) { true };
          case (#standard, #standard) { true };
          case (#premium, #premium) { true };
          case _ { false };
        };
      };
      
      private func policytypeHash(a: PolicyType) : Hash.Hash {
        switch (a) {
          case (#basic) { 1 };
          case (#standard) { 2 };
          case (#premium) { 3 };
        };
      };

  // In-memory data structures
  private var pricingParameters = HashMap.HashMap<PolicyType, PricingParameters>(3, policytypeEqual, policytypeHash);
  private var riskProfiles = HashMap.HashMap<UserId, RiskProfile>(10, Principal.equal, Principal.hash);
  
  
  // System functions for upgrades
  system func preupgrade() {
    pricingParametersEntries := Iter.toArray(pricingParameters.entries());
    riskProfilesEntries := Iter.toArray(riskProfiles.entries());
  };
  
  system func postupgrade() {
    pricingParameters := HashMap.fromIter<PolicyType, PricingParameters>(
      pricingParametersEntries.vals(), 
      pricingParametersEntries.size(), 
      policytypeEqual, 
      policytypeHash
    );
    
    riskProfiles := HashMap.fromIter<UserId, RiskProfile>(
      riskProfilesEntries.vals(), 
      riskProfilesEntries.size(), 
      Principal.equal, 
      Principal.hash
    );
    
    pricingParametersEntries := [];
    riskProfilesEntries := [];
    
    // Initialize default pricing parameters if empty
    if (pricingParameters.size() == 0) {
      initializeDefaultPricingParameters();
    };
  };
  
  // Initialize default pricing parameters
  private func initializeDefaultPricingParameters() {
    let basicParams : PricingParameters = {
      basePrice = 10.0;
      riskMultiplier = 1.5;
      discountRate = 0.05;
      maxDiscount = 0.2;
    };
    
    let standardParams : PricingParameters = {
      basePrice = 50.0;
      riskMultiplier = 1.3;
      discountRate = 0.07;
      maxDiscount = 0.25;
    };
    
    let premiumParams : PricingParameters = {
      basePrice = 100.0;
      riskMultiplier = 1.2;
      discountRate = 0.1;
      maxDiscount = 0.3;
    };
    
    pricingParameters.put(#basic, basicParams);
    pricingParameters.put(#standard, standardParams);
    pricingParameters.put(#premium, premiumParams);
  };
  
  // Public functions
  public query func getPricingParameters(policyType: PolicyType) : async Result.Result<PricingParameters, Text> {
    switch (pricingParameters.get(policyType)) {
      case (null) { #err("Pricing parameters not found for this policy type") };
      case (?params) { #ok(params) };
    };
  };
  
  public shared(_msg) func updatePricingParameters(policyType: PolicyType, params: PricingParameters) : async Result.Result<(), Text> {
    // In production, this would have admin-only access control
    pricingParameters.put(policyType, params);
    return #ok();
  };
  
  public query func getUserRiskProfile(userId: UserId) : async Result.Result<RiskProfile, Text> {
    switch (riskProfiles.get(userId)) {
      case (null) { #err("Risk profile not found for this user") };
      case (?profile) { #ok(profile) };
    };
  };
  
  public shared(msg) func updateUserRiskFactors(riskFactors: [RiskFactor]) : async Result.Result<Float, Text> {
    let caller = msg.caller;
    let now = Time.now();
    
    // Calculate risk score
    var totalWeight : Float = 0;
    var weightedSum : Float = 0;
    
    for (factor in riskFactors.vals()) {
      totalWeight += factor.weight;
      weightedSum += factor.weight * factor.value;
    };
    
    let riskScore = if (totalWeight > 0) {
      weightedSum / totalWeight;
    } else {
      1.0; // Default risk score if no weights
    };
    
    // Create or update risk profile
    let profile : RiskProfile = {
      userId = caller;
      riskFactors = riskFactors;
      riskScore = riskScore;
      lastUpdated = now;
    };
    
    riskProfiles.put(caller, profile);
    
    return #ok(riskScore);
  };
  
  public shared(msg) func calculatePremium(policyType: PolicyType, coverage: Nat) : async Result.Result<Nat, Text> {
    let caller = msg.caller;
    
    // Get pricing parameters
    switch (pricingParameters.get(policyType)) {
      case (null) {
        return #err("Pricing parameters not found for this policy type");
      };
      case (?params) {
        // Get user risk profile or use default
        let riskScore = switch (riskProfiles.get(caller)) {
          case (null) { 1.0 }; // Default risk score
          case (?profile) { profile.riskScore };
        };
        
        // Calculate base premium
        let basePremium = params.basePrice * Float.fromInt(coverage) / 1000.0;
        
        // Apply risk multiplier
        let riskAdjustedPremium = basePremium * (1.0 + (riskScore - 1.0) * params.riskMultiplier);
        
        // Apply discount based on risk score (lower risk = higher discount)
        let discountFactor = Float.max(0.0, Float.min(params.maxDiscount, params.discountRate * (2.0 - riskScore)));
        let finalPremium = riskAdjustedPremium * (1.0 - discountFactor);
        
        // Round to nearest integer
        let roundedPremium = if (finalPremium < 0.0) {
            0
          } else {
            Int.abs(Float.toInt(finalPremium + 0.5))
          };
        
        return #ok(roundedPremium);
      };
    };
  };
  
  // External data integration (would use HTTPS outcalls in production)
  public shared func fetchExternalRiskData(_userId: UserId) : async Result.Result<[RiskFactor], Text> {
    // In a real implementation, this would use HTTPS outcalls to fetch data from external APIs
    // For demonstration, we'll return mock data
    
    // Example of how HTTPS outcalls would be implemented:
    /*
    let url = "https://risk-api.example.com/user/" # Principal.toText(userId);
    
    Cycles.add(10_000_000_000); // Add cycles for the call
    
    let request = {
      url = url;
      method = #get;
      body = null;
      headers = [("Content-Type", "application/json")];
      transform = null;
    };
    
    try {
      let response = await IC.http_request(request);
      
      if (response.status >= 200 and response.status < 300) {
        // Parse response and return risk factors
        // ...
      } else {
        return #err("API request failed with status: " # Nat.toText(response.status));
      };
    } catch (e) {
      return #err("Error making API request: " # Error.message(e));
    };
    */
    
    // Mock implementation
    let mockRiskFactors : [RiskFactor] = [
      {
        name = "Age";
        weight = 0.3;
        value = 1.2;
      },
      {
        name = "Location";
        weight = 0.2;
        value = 0.9;
      },
      {
        name = "Claim History";
        weight = 0.5;
        value = 1.0;
      }
    ];
    
    return #ok(mockRiskFactors);
  };
  
  // AI-based risk assessment (simplified simulation)
  public func simulateAIRiskAssessment(_userId: UserId, _data: ?Text) : async Float {
    // In a real implementation, this would use more sophisticated algorithms
    // or potentially call an external AI service via HTTPS outcalls
    
    // For demonstration, we'll use a simple random factor
    let now = Time.now();
    let randomSeed = Float.fromInt(now % 1000) / 1000.0;
    let baseRisk = 0.8 + randomSeed * 0.4; // Random risk between 0.8 and 1.2
    
    return baseRisk;
  };
  
  // Statistics and reporting
  public query func getAverageRiskScore() : async Float {
    var totalScore : Float = 0;
    var count : Nat = 0;
    
    for ((_, profile) in riskProfiles.entries()) {
      totalScore += profile.riskScore;
      count += 1;
    };
    
    if (count == 0) {
      return 1.0; // Default if no profiles
    } else {
      return totalScore / Float.fromInt(count);
    };
  };
};
