import { AuthContext } from 'Context/Context';
import React, { useState, useContext } from 'react';

export const LoginForm = () => {
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  const onChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    login(password);
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Enter your password"
        onChange={onChange}
      />
      <button>Login</button>
    </form>
  );
};
