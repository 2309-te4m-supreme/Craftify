import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import flowers2 from '../assets/flowers2.mp4'

function Register() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
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
          username,
          email,
          password,
          first_name,
          last_name,
          address,
          phone_number,
        }),
      });
      const result = await response.json();
      console.log(result.token)
      localStorage.setItem("token", `${result.token}`);
      navigate('/products');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
    {/* <video className='treeBg' src={flowers2} autoPlay loop muted/> */}
    <div className='form-div'>
      <form className='form' onSubmit={handleRegister}>
        <h2 className='form-heading'>Sign up here!</h2>
        <label>
          <input
            type="text" placeholder="First Name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          <input
            type="text" placeholder="Last Name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          <input
            type="text" placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <input
            type="text" placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <input
            type="password" placeholder="Set password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {/* ADD RE-TYPE PASSWORD?? */}
        <label>
          <input
            type="text" placeholder="Street Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        {/* Splitting up address info into street address, city, state, zip?? */}
        <label>
          <input
            type="text" placeholder="Phone Number"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <button type="submit">Register Account</button>
      </form>
    </div>
    </>
  );
}

export default Register;
