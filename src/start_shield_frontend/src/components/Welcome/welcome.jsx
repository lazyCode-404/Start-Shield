import React from 'react';

export const WelcomePage = ({ userInfo }) => {
  return (
    <div>
      <h1>Welcome, {userInfo.firstName}!</h1>
      <h2>You are logged in as {userInfo.role}</h2>
    </div>
  );
};
