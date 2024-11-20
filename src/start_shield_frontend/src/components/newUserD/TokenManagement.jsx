import React, { useEffect, useState } from 'react';
import data from '../../../data.json';
import TokenTransactions from './TokenTransactions';
import './TokenManagement.css';

function TokenManagement() {
  const [tokenBalance, setTokenBalance] = useState(0);

  // Calcularea balanței totale de tokeni
  useEffect(() => {
    const totalTokens = data.policies.reduce((acc, policy) => acc + policy.tokensEarned, 0);
    setTokenBalance(totalTokens);
  }, []);

  return (
    <div className="token-management">
      <div className="balance-section">
        <h2>Current STSH Token Balance</h2>
        <p>{tokenBalance} STSH</p>
      </div>
      <TokenTransactions />
      <div className="token-utilization">
        <h2>Token Utilization</h2>
        <ul>
          <li>Use tokens for policy discounts.</li>
          <li>Exchange tokens for rewards and benefits.</li>
          <li>Claim special offers using your tokens.</li>
        </ul>
      </div>
    </div>
  );
}

export default TokenManagement;
