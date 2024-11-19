import React, { useState } from 'react';
import './TokenTransactions.css';

function TokenTransactions() {
  //momentan Tranzacțiile fictive de tokeni ca exemplu
  const transactions = [
    { id: 'TXN001', amount: 200, date: '2024-11-01' },
    { id: 'TXN002', amount: 100, date: '2024-10-15' },
    { id: 'TXN003', amount: 300, date: '2024-09-20' },
    { id: 'TXN004', amount: 150, date: '2024-08-05' },
  ];

  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (field) => {
    const order = sortOrder === 'asc' ? 'desc' : 'asc';
    const sortedTransactions = [...transactions].sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
      return 0;
    });
    setSortField(field);
    setSortOrder(order);
  };

  return (
    <div className="transactions-section">
      <h2>Token Transactions</h2>
      <table className="transactions-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>Transaction ID</th>
            <th onClick={() => handleSort('amount')}>Amount</th>
            <th onClick={() => handleSort('date')}>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.id}</td>
              <td>{txn.amount} STSH</td>
              <td>{txn.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TokenTransactions;
