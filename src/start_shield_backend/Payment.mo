import Principal "mo:base/Principal";
import _HashMap "mo:base/HashMap";
import Array "mo:base/Array";

actor Payment {
  type Transaction = {
    id: Text;
    amount: Nat;
    status: Text;
    timestamp: Int;
    user: Principal;
  };

  // Initialize transactions as an empty array of type Transaction
  stable var transactions: [Transaction] = [];

  // Save a transaction, appending to the transactions array
  public func saveTransaction(transaction: Transaction): async Bool {
    transactions := Array.append<Transaction>(transactions, [transaction]); // Use Array.append for array concatenation
    return true;
  };



  // Retrieve transactions for a specific user

  public query func getTransactionsByUser(user: Principal): async [Transaction] {
    // Define a function to check if the user matches
    let filterFunc = func(t: Transaction): Bool {
      return t.user == user;
    };
    // Use the filter function with the custom filter logic
    return Array.filter<Transaction>(transactions, filterFunc);
  };

  // Retrieve all transactions
  public query func getAllTransactions(): async [Transaction] {
    return transactions;
  };
};
