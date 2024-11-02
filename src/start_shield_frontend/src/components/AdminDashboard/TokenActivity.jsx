import React, { useEffect, useState } from 'react';

function TokenActivity() {
  const [tokenTransactions, setTokenTransactions] = useState([]);

  useEffect(() => {
    fetch('/api/tokenTransactions')
      .then(res => res.json())
      .then(data => setTokenTransactions(data))
      .catch(error => console.error('Error fetching token transactions:', error));
  }, []);

  return (
    <div>
      <h3>Token Activity</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {tokenTransactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.type}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TokenActivity;

