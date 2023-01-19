import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  return (
    <>
      <form>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          name='username'
          value={username}
          onChange={handleUsernameChange}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={handlePasswordChange}
        />
        <button type='submit'>Login</button>
      </form>
    </>
  );
};

export default Login;