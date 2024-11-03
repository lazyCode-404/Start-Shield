import React, { useState } from 'react';
import './style3.css'

const TokenManagement = ({ totalTokens }) => {
  const [tokens, setTokens] = useState({
    discounts: 0,
    liquidity: 0,
    collateral: 0,
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newTokens = { ...tokens, [name]: Number(value) };

    const totalAllocated = newTokens.discounts + newTokens.liquidity + newTokens.collateral;

    if (totalAllocated > totalTokens) {
      setError('Insufficient token balance. Please adjust your token allocation.');
    } else {
      setError('');
    }

    setTokens(newTokens);
  };

  const handleAction = (action) => {
    alert(`Using ${tokens[action]} tokens for ${action}!`);
    // Add your logic for processing each action here
  };

  return (
    <div className="token-management">
      <h2>Manage Your STSH Tokens</h2>
      <p>Total STSH Tokens: {totalTokens}</p>

      <div className="token-option">
        <h4>Redeem for Discounts</h4>
        <p>Max tokens you can use: {totalTokens - (tokens.liquidity + tokens.collateral)}</p>
        <input
          type="number"
          name="discounts"
          value={tokens.discounts}
          onChange={handleInputChange}
        />
        <button onClick={() => handleAction('discounts')}>Redeem Tokens</button>
      </div>

      <div className="token-option">
        <h4>Trade for Liquidity</h4>
        <p>Max tokens you can use: {totalTokens - (tokens.discounts + tokens.collateral)}</p>
        <input
          type="number"
          name="liquidity"
          value={tokens.liquidity}
          onChange={handleInputChange}
        />
        <button onClick={() => handleAction('liquidity')}>Trade Tokens</button>
      </div>

      <div className="token-option">
        <h4>Use as Collateral</h4>
        <p>Max tokens you can use: {totalTokens - (tokens.discounts + tokens.liquidity)}</p>
        <input
          type="number"
          name="collateral"
          value={tokens.collateral}
          onChange={handleInputChange}
        />
        <button onClick={() => handleAction('collateral')}>Use Tokens</button>
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default TokenManagement;
