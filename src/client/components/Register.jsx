import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleRegister(event) {
    event.preventDefault();

    try {
      // INSERT CORRECT API
      // const API = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api';
      const response = await fetch(`${API}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          email,
          password,
          address,
          phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed Registration Attempt');
      }

      const data = await response.json();
      navigate('/');
      const newToken = data.token || data.accessToken;
      setToken(newToken);
    } catch (err) {
      setError(err.message || 'Failed Registration Attempt');
      console.error('Failed Registration Error', err);
    }
  }

  return (
    <div className='register-container'>
      <form className='register-form' onSubmit={handleRegister}>
        <h2>Sign up here!</h2>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <button type="submit">Register Account</button>
      </form>
    </div>
  );
}

export default Register;
