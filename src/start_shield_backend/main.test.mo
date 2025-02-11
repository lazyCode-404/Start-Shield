import Principal "mo:base/Principal";
import Result "mo:base/Result";
import TrieMap "mo:base/TrieMap";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Iter "mo:base/Iter";

import Main "main";

actor {
    let main = await Main.Main();

    public func run() : async () {


let testPrincipal = Principal.fromText("2vxsx-fae");
let testUser : Main.User = {
    name = "Test User";
    email = "test@example.com";
    age = 30;
    accessLevel = #USER;
    timestamp = 1234567890;
};

// Create a user
let createResult = await main.createUser(testPrincipal, testUser);
assert(createResult == "Account created successfully for Test User!");

// Try to create the same user again
let duplicateResult = await main.createUser(testPrincipal, testUser);
assert(duplicateResult == "User already exists!");

public func testCreateUser() : async () {
  let result = await main.createUser(testPrincipal, testUser);
  assert(result == "Account created successfully for Test User!");

  let createdUser = await main.getUserByPrincipal(testPrincipal);
  assert(createdUser != null);
  assert(createdUser?.name == "Test User");
  assert(createdUser?.email == "test@example.com");
  assert(createdUser?.age == 30);
  assert(createdUser?.accessLevel == #USER);
  assert(createdUser?.timestamp == 1234567890);
};

public func testGetUser() : async () {
  let testPrincipal = Principal.fromText("2vxsx-fae");
  let testUser : Main.User = {
    name = "Test User";
    email = "test@example.com";
    age = 30;
    accessLevel = #USER;
    timestamp = 1234567890;
  };

  // Create a user first
  let createResult = await main.createUser(testPrincipal, testUser);
  assert(createResult == "Account created successfully for Test User!");

  // Test getUser function
  let getUserResult = await main.getUser(testPrincipal);
  switch (getUserResult) {
    case (#ok(user)) {
      assert(user.name == "Test User");
      assert(user.email == "test@example.com");
      assert(user.age == 30);
      assert(user.accessLevel == #USER);
      assert(user.timestamp == 1234567890);
    };
    case (#err(message)) {
      assert(false, "Expected user details, but got error: " # message);
    };
  };
};

public func testGetUserWithInvalidPrincipal() : async () {
  let invalidPrincipal = Principal.fromText("aaaaa-aa");
  let result = await main.getUser(invalidPrincipal);
  
  switch (result) {
    case (#ok(_)) {
      assert(false, "Expected an error, but got a successful result");
    };
    case (#err(errorMessage)) {
      assert(errorMessage == "User not found", "Expected 'User not found' error message");
    };
  };
};

public func testDeleteUser() : async () {
  let testPrincipal = Principal.fromText("2vxsx-fae");
  let testUser : Main.User = {
    name = "Test User";
    email = "test@example.com";
    age = 30;
    accessLevel = #USER;
    timestamp = 1234567890;
  };

  // Create a user first
  let createResult = await main.createUser(testPrincipal, testUser);
  assert(createResult == "Account created successfully for Test User!");

  // Delete the user
  let deleteResult = await main.deleteUser(testPrincipal);
  assert(deleteResult == "User deleted successfully.");

  // Verify that the user no longer exists
  let getUserResult = await main.getUser(testPrincipal);
  switch (getUserResult) {
    case (#ok(_)) {
      assert(false, "User should have been deleted");
    };
    case (#err(message)) {
      assert(message == "User not found", "Expected 'User not found' error message");
    };
  };
};

public func testDeleteNonExistentUser() : async () {
  let nonExistentPrincipal = Principal.fromText("aaaaa-aa");
  
  // Attempt to delete a non-existent user
  let deleteResult = await main.deleteUser(nonExistentPrincipal);
  
  // Assert that the correct error message is returned
  assert(deleteResult == "User not found.");
};

public func testGetAllUsers() : async () {
  // Create some test users
  let user1 : Main.User = {
    name = "User 1";
    email = "user1@example.com";
    age = 25;
    accessLevel = #USER;
    timestamp = 1234567890;
  };
  let user2 : Main.User = {
    name = "User 2";
    email = "user2@example.com";
    age = 30;
    accessLevel = #ADMIN;
    timestamp = 1234567891;
  };

  // Add users to the system
  let principal1 = Principal.fromText("2vxsx-fae");
  let principal2 = Principal.fromText("aaaaa-aa");
  ignore await main.addUser(principal1, user1);
  ignore await main.addUser(principal2, user2);

  // Call getAllUsers and check the result
  let allUsers = await main.getAllUsers();
  
  // Assert that we have the correct number of users
  assert(allUsers.size() == 2);

  // Assert that both users are present in the result
  assert(allUsers[0].name == "User 1" or allUsers[1].name == "User 1");
  assert(allUsers[0].name == "User 2" or allUsers[1].name == "User 2");

  // Clean up: delete the test users
  ignore await main.deleteUser(principal1);
  ignore await main.deleteUser(principal2);
};

public func testGetUserAccessLevelSuperAdmin() : async () {
  let testPrincipal = Principal.fromText("2vxsx-fae");
  let testUser : Main.User = {
    name = "Super Admin";
    email = "superadmin@example.com";
    age = 35;
    accessLevel = #SUPER_ADMIN;
    timestamp = 1234567890;
  };

  // Create a user with SUPER_ADMIN privileges
  let createResult = await main.createUser(testPrincipal, testUser);
  assert(createResult == "Account created successfully for Super Admin!");

  // Test getUserAccessLevel function for SUPER_ADMIN
  let accessLevelResult = await main.getUserAccessLevel(testPrincipal);
  switch (accessLevelResult) {
    case (#ok(accessLevel)) {
      assert(accessLevel == "You are an SUPER_ADMIN", "Expected SUPER_ADMIN access level");
    };
    case (#err(message)) {
      assert(false, "Expected access level, but got error: " # message);
    };
  };

  // Clean up: delete the test user
  ignore await main.deleteUser(testPrincipal);
};


public func testGetCallerPrincipal() : async () {
  let testPrincipal = Principal.fromText("2vxsx-fae");
  let result = await main.getCallerPrincipal();
  
  // Assert that the returned Principal matches the expected Principal
  assert(Principal.equal(result, testPrincipal));
};

public func testPostupgrade() : async () {
  // Create some test users
  let user1 : Main.User = {
    name = "User 1";
    email = "user1@example.com";
    age = 25;
    accessLevel = #USER;
    timestamp = 1234567890;
  };
  let user2 : Main.User = {
    name = "User 2";
    email = "user2@example.com";
    age = 30;
    accessLevel = #ADMIN;
    timestamp = 1234567891;
  };

  // Add users to the system
  let principal1 = Principal.fromText("2vxsx-fae");
  let principal2 = Principal.fromText("aaaaa-aa");
  ignore await main.addUser(principal1, user1);
  ignore await main.addUser(principal2, user2);

  // Simulate preupgrade
  await main.preupgrade();

  // Simulate postupgrade
  await main.postupgrade();

  // Verify that users are correctly restored
  let restoredUser1 = await main.getUserByPrincipal(principal1);
  let restoredUser2 = await main.getUserByPrincipal(principal2);

  assert(restoredUser1 != null and restoredUser2 != null);
  assert(restoredUser1?.name == "User 1");
  assert(restoredUser2?.name == "User 2");
  assert(restoredUser1?.email == "user1@example.com");
  assert(restoredUser2?.email == "user2@example.com");
  assert(restoredUser1?.age == 25);
  assert(restoredUser2?.age == 30);
  assert(restoredUser1?.accessLevel == #USER);
  assert(restoredUser2?.accessLevel == #ADMIN);
  assert(restoredUser1?.timestamp == 1234567890);
  assert(restoredUser2?.timestamp == 1234567891);

  // Clean up
  ignore await main.deleteUser(principal1);
  ignore await main.deleteUser(principal2);
};
    };
};
