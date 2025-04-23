import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Error "mo:base/Error";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";

actor NFTActor {
  // Types
  type TokenId = Nat;
  type PolicyId = Nat;
  type UserId = Principal;
  
  type Metadata = {
    policyId: PolicyId;
    name: Text;
    description: Text;
    image: ?Text;
    attributes: [(Text, Text)];
    createdAt: Time.Time;
  };
  
  type NFT = {
    id: TokenId;
    owner: UserId;
    metadata: Metadata;
  };
  
  // State
  stable var nextTokenId : TokenId = 1;
  
  // Stable variables for upgrades
  stable var nftsEntries : [(TokenId, NFT)] = [];
  stable var userNFTsEntries : [(UserId, [TokenId])] = [];
  stable var policyToNFTEntries : [(PolicyId, TokenId)] = [];
  
  // In-memory data structures
  private var nfts = HashMap.HashMap<TokenId, NFT>(10, Nat.equal, Hash.hash);
  private var userNFTs = HashMap.HashMap<UserId, [TokenId]>(10, Principal.equal, Principal.hash);
  private var policyToNFT = HashMap.HashMap<PolicyId, TokenId>(10, Nat.equal, Hash.hash);
  
  // Actor references - replace with actual canister IDs after deployment
  let policyActor = actor "rrkah-fqaaa-aaaaa-aaaaq-cai" : actor {
    getPolicy : (PolicyId) -> async Result.Result<{
      id: PolicyId;
      owner: Principal;
      policyType: {#basic; #standard; #premium};
      premium: Nat;
      coverage: Nat;
      createdAt: Time.Time;
      expiresAt: Time.Time;
      status: {#active; #expired; #cancelled};
      nftId: ?Nat;
    }, Text>;
    updatePolicyNFT : (PolicyId, TokenId) -> async Result.Result<(), Text>;
  };
  
  // System functions for upgrades
  system func preupgrade() {
    nftsEntries := Iter.toArray(nfts.entries());
    userNFTsEntries := Iter.toArray(userNFTs.entries());
    policyToNFTEntries := Iter.toArray(policyToNFT.entries());
  };
  
  system func postupgrade() {
    nfts := HashMap.fromIter<TokenId, NFT>(nftsEntries.vals(), nftsEntries.size(), Nat.equal, Hash.hash);
    userNFTs := HashMap.fromIter<UserId, [TokenId]>(userNFTsEntries.vals(), userNFTsEntries.size(), Principal.equal, Principal.hash);
    policyToNFT := HashMap.fromIter<PolicyId, TokenId>(policyToNFTEntries.vals(), policyToNFTEntries.size(), Nat.equal, Hash.hash);
    
    nftsEntries := [];
    userNFTsEntries := [];
    policyToNFTEntries := [];
  };
  
  // Helper functions
  private func getNextTokenId() : TokenId {
    let id = nextTokenId;
    nextTokenId += 1;
    return id;
  };
  
  private func addUserNFT(user: UserId, tokenId: TokenId) {
    let userTokenIds = Option.get(userNFTs.get(user), []);
    let updatedTokenIds = Array.append(userTokenIds, [tokenId]);
    userNFTs.put(user, updatedTokenIds);
  };
  
  // Public functions
  public shared(msg) func mintPolicyNFT(policyId: PolicyId, name: Text, description: Text, image: ?Text, attributes: [(Text, Text)]) : async Result.Result<TokenId, Text> {
    let caller = msg.caller;
    
    // Check if NFT already exists for this policy
    switch (policyToNFT.get(policyId)) {
      case (?existingTokenId) {
        return #err("An NFT already exists for this policy with token ID: " # Nat.toText(existingTokenId));
      };
      case (null) {
        // Verify policy exists and caller is the owner
        switch (await policyActor.getPolicy(policyId)) {
          case (#err(message)) {
            return #err("Error retrieving policy: " # message);
          };
          case (#ok(policy)) {
            if (not Principal.equal(policy.owner, caller)) {
              return #err("Only the policy owner can mint an NFT for this policy");
            };
            
            if (policy.status != #active) {
              return #err("Cannot mint NFT for inactive policy");
            };
            
            // Create NFT
            let tokenId = getNextTokenId();
            let now = Time.now();
            
            let metadata : Metadata = {
              policyId = policyId;
              name = name;
              description = description;
              image = image;
              attributes = attributes;
              createdAt = now;
            };
            
            let newNFT : NFT = {
              id = tokenId;
              owner = caller;
              metadata = metadata;
            };
            
            // Store NFT
            nfts.put(tokenId, newNFT);
            addUserNFT(caller, tokenId);
            policyToNFT.put(policyId, tokenId);
            
            // Update policy with NFT ID
            ignore await policyActor.updatePolicyNFT(policyId, tokenId);
            
            return #ok(tokenId);
          };
        };
      };
    };
  };
  
  public query func getNFT(tokenId: TokenId) : async Result.Result<NFT, Text> {
    switch (nfts.get(tokenId)) {
      case (null) { #err("NFT not found") };
      case (?nft) { #ok(nft) };
    };
  };
  
  public query func getNFTByPolicy(policyId: PolicyId) : async Result.Result<NFT, Text> {
    switch (policyToNFT.get(policyId)) {
      case (null) { #err("No NFT found for this policy") };
      case (?tokenId) {
        switch (nfts.get(tokenId)) {
          case (null) { #err("NFT data inconsistency") };
          case (?nft) { #ok(nft) };
        };
      };
    };
  };
  
  public query(msg) func getUserNFTs() : async [NFT] {
    let caller = msg.caller;
    let userTokenIds = Option.get(userNFTs.get(caller), []);
    
    let userNFTsBuffer = Buffer.Buffer<NFT>(0);
    
    for (tokenId in userTokenIds.vals()) {
      switch (nfts.get(tokenId)) {
        case (?nft) { userNFTsBuffer.add(nft) };
        case (null) { /* Skip invalid IDs */ };
      };
    };
    
    return Buffer.toArray(userNFTsBuffer);
  };
  
  // Transfer functions
  public shared(msg) func transferNFT(tokenId: TokenId, to: Principal) : async Result.Result<(), Text> {
    let caller = msg.caller;
    
    switch (nfts.get(tokenId)) {
      case (null) {
        return #err("NFT not found");
      };
      case (?nft) {
        if (not Principal.equal(nft.owner, caller)) {
          return #err("You are not the owner of this NFT");
        };
        
        // Update NFT ownership
        let updatedNFT : NFT = {
          id = nft.id;
          owner = to;
          metadata = nft.metadata;
        };
        
        nfts.put(tokenId, updatedNFT);
        
        // Update user NFT mappings
        switch (userNFTs.get(caller)) {
          case (?tokenIds) {
            let updatedTokenIds = Array.filter<TokenId>(tokenIds, func(id) { id != tokenId });
            userNFTs.put(caller, updatedTokenIds);
          };
          case (null) { /* Nothing to remove */ };
        };
        
        addUserNFT(to, tokenId);
        
        return #ok();
      };
    };
  };
  
  // // Metadata functions
  // public shared(msg) func updateNFTMetadata(tokenId: TokenId, name: ?Text, description: ?Text, image: ?Text, attributes: ?[(Text, Text)]) : async Result.Result<(), Text> {
  //   let caller = msg.caller;
    
  //   switch (nfts.get(tokenId)) {
  //     case (null) {
  //       return #err("NFT not found");
  //     };
  //     case (?nft) {
  //       if (not Principal.equal(nft.owner, caller)) {
  //         return #err("You are not the owner of this NFT");
  //       };
        
  //       let currentMetadata = nft.metadata;
        
//  let updatedMetadata : Metadata = {
//   policyId = currentMetadata.policyId;
//   name = switch (name) {
//     case (null) { currentMetadata.name };
//     case (?newName) { newName };
//   };
//   description = switch (description) {
//     case (null) { currentMetadata.description };
//     case (?newDescription) { newDescription };
//   };
//   image = switch (image) {
//     case (null) { currentMetadata.image };
//     case (?newImage) { newImage };
//   };
//   attributes = switch (attributes) {
//     case (null) { currentMetadata.attributes };
//     case (?newAttributes) { newAttributes };
//   };
//   createdAt = currentMetadata.createdAt;
// };
        
  //       let updatedNFT : NFT = {
  //         id = nft.id;
  //         owner = nft.owner;
  //         metadata = updatedMetadata;
  //       };
        
  //       nfts.put(tokenId, updatedNFT);
        
  //       return #ok();
  //     };
  //   };
  // };
  
  // // Statistics
  // public query func getTotalSupply() : async Nat {
  //   return nfts.size();
  // };
};