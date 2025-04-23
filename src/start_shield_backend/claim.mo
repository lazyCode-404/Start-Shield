import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import _Error "mo:base/Error";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor ClaimActor {
  // Types
  type PolicyId = Nat;
  type ClaimId = Nat;
  type UserId = Principal;
  type Amount = Nat;
  type Timestamp = Time.Time;
  
  type ClaimStatus = {
    #pending;
    #verifying;
    #approved;
    #rejected;
    #paid;
  };
  
  type Claim = {
    id: ClaimId;
    policyId: PolicyId;
    claimant: UserId;
    amount: Amount;
    description: Text;
    evidenceUrls: [Text];
    submittedAt: Timestamp;
    status: ClaimStatus;
    verificationData: ?Text;
  };
  
  // State
  stable var nextClaimId : ClaimId = 1;
  
  // Stable variables for upgrades
  stable var claimsEntries : [(ClaimId, Claim)] = [];
  stable var userClaimsEntries : [(UserId, [ClaimId])] = [];
  
  // In-memory data structures
  private var claims = HashMap.HashMap<ClaimId, Claim>(10, Nat.equal, Hash.hash);
  private var userClaims = HashMap.HashMap<UserId, [ClaimId]>(10, Principal.equal, Principal.hash);
  
  // System functions for upgrades
  system func preupgrade() {
    claimsEntries := Iter.toArray(claims.entries());
    userClaimsEntries := Iter.toArray(userClaims.entries());
  };
  
  system func postupgrade() {
    claims := HashMap.fromIter<ClaimId, Claim>(claimsEntries.vals(), claimsEntries.size(), Nat.equal, Hash.hash);
    userClaims := HashMap.fromIter<UserId, [ClaimId]>(userClaimsEntries.vals(), userClaimsEntries.size(), Principal.equal, Principal.hash);
    
    claimsEntries := [];
    userClaimsEntries := [];
  };
  public query func testMethod() : async Text {
    return "Claim actor is working!";
};
  // Helper functions
  private func getNextClaimId() : ClaimId {
    let id = nextClaimId;
    nextClaimId += 1;
    return id;
  };
  
  private func addUserClaim(user: UserId, claimId: ClaimId) {
    let userClaimIds = Option.get(userClaims.get(user), []);
    let updatedClaimIds = Array.append(userClaimIds, [claimId]);
    userClaims.put(user, updatedClaimIds);
  };
  
  // Actor references - replace with actual canister IDs after deployment
  let policyActor = actor "b77ix-eeaaa-aaaaa-qaada-cai" : actor {
    isPolicyValid : (PolicyId, Principal) -> async Bool;
    getPolicyCoverage : (PolicyId) -> async ?Amount;
  };
  
  // Public functions
  public shared(msg) func submitClaim(policyId: PolicyId, amount: Amount, description: Text, evidenceUrls: [Text]) : async Result.Result<ClaimId, Text> {
    let caller = msg.caller;
    
    // Verify policy validity by calling PolicyActor
    let isPolicyValid = await policyActor.isPolicyValid(policyId, caller);
    if (not isPolicyValid) {
      return #err("Invalid policy or you are not the policy owner");
    };
    
    // Check if claim amount is within policy coverage
    switch (await policyActor.getPolicyCoverage(policyId)) {
      case (null) {
        return #err("Could not retrieve policy coverage");
      };
      case (?coverage) {
        if (amount > coverage) {
          return #err("Claim amount exceeds policy coverage");
        };
      };
    };
    
    // Create claim
    let claimId = getNextClaimId();
    let now = Time.now();
    
    let newClaim : Claim = {
      id = claimId;
      policyId = policyId;
      claimant = caller;
      amount = amount;
      description = description;
      evidenceUrls = evidenceUrls;
      submittedAt = now;
      status = #pending;
      verificationData = null;
    };
    
    // Store claim
    claims.put(claimId, newClaim);
    addUserClaim(caller, claimId);
    
    return #ok(claimId);
  };
  
  public query func getClaim(claimId: ClaimId) : async Result.Result<Claim, Text> {
    switch (claims.get(claimId)) {
      case (null) { #err("Claim not found") };
      case (?claim) { #ok(claim) };
    };
  };
  
  public query(msg) func getUserClaims() : async [Claim] {
    let caller = msg.caller;
    let userClaimIds = Option.get(userClaims.get(caller), []);
    
    let userClaimsBuffer = Buffer.Buffer<Claim>(0);
    
    for (claimId in userClaimIds.vals()) {
      switch (claims.get(claimId)) {
        case (?claim) { userClaimsBuffer.add(claim) };
        case (null) { /* Skip invalid IDs */ };
      };
    };
    
    return Buffer.toArray(userClaimsBuffer);
  };

//   public query func getUserClaims() : async [Claim] {
//     let caller = msg.caller;
//     let userClaimIds = Option.get(userClaims.get(caller), []);
    
//     let userClaimsBuffer = Buffer.Buffer<Claim>(0);
    
//     for (claimId in userClaimIds.vals()) {
//         switch (claims.get(claimId)) {
//             case (?claim) { userClaimsBuffer.add(claim) };
//             case (null) { /* Skip invalid IDs */ };
//         };
//     };
    
//     return Buffer.toArray(userClaimsBuffer);
// };
  
  // Verification functions - would connect to oracles in production
  public shared func startVerification(claimId: ClaimId) : async Result.Result<(), Text> {
    switch (claims.get(claimId)) {
      case (null) {
        return #err("Claim not found");
      };
      case (?claim) {
        if (claim.status != #pending) {
          return #err("Claim is not in pending status");
        };
        
        let updatedClaim = {
          id = claim.id;
          policyId = claim.policyId;
          claimant = claim.claimant;
          amount = claim.amount;
          description = claim.description;
          evidenceUrls = claim.evidenceUrls;
          submittedAt = claim.submittedAt;
          status = #verifying;
          verificationData = claim.verificationData;
        };
        
        claims.put(claimId, updatedClaim);
        
        // In a real implementation, this would trigger oracle calls
        // to fetch external data for verification
        
        return #ok();
      };
    };
  };
  
  // Admin functions - would have proper access control in production
  public shared func processClaim(claimId: ClaimId, approved: Bool, verificationData: ?Text) : async Result.Result<(), Text> {
    switch (claims.get(claimId)) {
      case (null) {
        return #err("Claim not found");
      };
      case (?claim) {
        if (claim.status != #verifying and claim.status != #pending) {
          return #err("Claim cannot be processed in its current state");
        };
        
        let updatedStatus : ClaimStatus = if (approved) { #approved } else { #rejected };
        
        let updatedClaim = {
          id = claim.id;
          policyId = claim.policyId;
          claimant = claim.claimant;
          amount = claim.amount;
          description = claim.description;
          evidenceUrls = claim.evidenceUrls;
          submittedAt = claim.submittedAt;
          status = updatedStatus;
          verificationData = verificationData;
        };
        
        claims.put(claimId, updatedClaim);
        
        return #ok();
      };
    };
  };
  
  public shared func markClaimAsPaid(claimId: ClaimId) : async Result.Result<(), Text> {
    switch (claims.get(claimId)) {
      case (null) {
        return #err("Claim not found");
      };
      case (?claim) {
        if (claim.status != #approved) {
          return #err("Only approved claims can be marked as paid");
        };
        
        let updatedClaim = {
          id = claim.id;
          policyId = claim.policyId;
          claimant = claim.claimant;
          amount = claim.amount;
          description = claim.description;
          evidenceUrls = claim.evidenceUrls;
          submittedAt = claim.submittedAt;
          status = #paid;
          verificationData = claim.verificationData;
        };
        
        claims.put(claimId, updatedClaim);
        
        return #ok();
      };
    };
  };
  
  // Statistics and reporting functions
  public query func getClaimStatistics() : async (Nat, Nat, Nat, Nat, Nat) {
    var pendingCount = 0;
    var verifyingCount = 0;
    var approvedCount = 0;
    var rejectedCount = 0;
    var paidCount = 0;
    
    for ((_, claim) in claims.entries()) {
      switch (claim.status) {
        case (#pending) { pendingCount += 1 };
        case (#verifying) { verifyingCount += 1 };
        case (#approved) { approvedCount += 1 };
        case (#rejected) { rejectedCount += 1 };
        case (#paid) { paidCount += 1 };
      };
    };
    
    return (pendingCount, verifyingCount, approvedCount, rejectedCount, paidCount);
  };
};