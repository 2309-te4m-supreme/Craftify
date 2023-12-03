import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      const result = await response.json();
      console.log(result)
      setMessage(result.message);
      setToken(result.token);
      navigate('/products')
    } catch (err) {
      console.error(`${err.name}: ${err.message}`);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className='form-div'>
      <form className='form' onSubmit={handleSubmit}>
        <h2 className='form-heading'>Login</h2>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={handleEmailChange}
          required/>
        <label htmlFor='password'>Password:</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={handlePasswordChange}
          required/>
        <button type='submit'>Login</button>
      <p><Link to="/register">
      No account? Register HERE! 
      </Link></p>
      </form>
    </div>
  );
};

export default Login;
