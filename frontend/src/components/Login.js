import React, { useState } from 'react';
import axios from 'axios';

const Login = ({handleLoginOnClick}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", { username, password });
      handleLoginOnClick();
      console.log("username submitted");
    } catch (error) {
      setError('Invalid credentials');
      console.log(error);
    }
  };

  const handleClose = () => {
    // Reset form fields and error message, and close the login form
    setUsername('');
    setPassword('');
    setError('');
  };

  return (
    <div className="login-form">
      <h4>Only for the owner</h4>
      <input className='user'
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className='user'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className='logg'>
      <button className="logButton" onClick={handleLogin}>Login</button>
      {error && <p className="error">{error}</p>}
      <button onClick={handleClose} className="logButton">Clear</button> {/* Add close button */}</div>
    </div>
  );
};

export default Login;
