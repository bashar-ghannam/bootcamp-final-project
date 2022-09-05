import React, { useState } from 'react';

function Login({ login, logout, user }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <div className="form">
        <label>Username :</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password :</label>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => login(username, password)}>Sign in </button>
      </div>

      {user !== null && (
        <div>
          <span>{user.username}</span>
          <button onClick={logout}>Log out</button>
        </div>
      )}
    </div>
  );
}

export default Login;
