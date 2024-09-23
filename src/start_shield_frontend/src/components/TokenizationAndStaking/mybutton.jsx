import React from 'react';
import TickIcon from './TickIcon'; // Componentă pentru iconița de bifă

const MyButton = ({ children, className }) => (
  <button className={`my-button ${className}`}>
    {children}
    <TickIcon />
  </button>
);

export default MyButton;