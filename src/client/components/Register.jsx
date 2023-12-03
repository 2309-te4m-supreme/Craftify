import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ setToken }) {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const API = 'http://localhost:3000/api';


  async function handleRegister(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${API}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
          address,
          phone_number,
        }),
      });
      const result = await response.json();
      console.log(result.token)
      setToken()
      navigate('/products');
    } catch (err) {
      console.error(err);
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
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={last_name}
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
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <button type="submit">Register Account</button>
      </form>
    </div>
  );
}

export default Register;
