import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import flowers2 from '../assets/flowers2.mp4'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      localStorage.setItem("token", `${result.token}`);
      setToken(result.token)
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
    <>
    {/* <video className='treeBg' src={flowers2} autoPlay loop muted/> */}
    <div className='form-div'>
      <form className='form' onSubmit={handleSubmit}>
        <h2 className='form-heading'>Login</h2>
          <label htmlFor='email'></label>
          <input
            type='email'
            id='email' placeholder='Email'
            value={email}
            onChange={handleEmailChange}
            required/>
          <label htmlFor='password'></label>
          <input
            type='password'
            id='password'
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
            required/>
        <button type='submit'>Login</button>
      <p><Link to="/register">
      No account? Register HERE! 
      </Link></p>
      </form>
    </div>
    </>
  );
};

export default Login;
