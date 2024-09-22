// src/components/LoggedIn.js
import React from 'react';

function LoggedIn({ user }) {
  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default LoggedIn;