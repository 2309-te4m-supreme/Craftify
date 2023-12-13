import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


export default function EditUser({ token }) {
  const [ permissions, setPermissions ] = useState ('');
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ phoneNumber, setPhoneNumber ] = useState('');

  const API = '/api'

  const { userId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchSingleUser()
  }, [])

  async function fetchSingleUser() {
    try {
      const response = await fetch(`${API}/users/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
      )
      const result = await response.json()
      console.log(result)
      setPermissions(result.user.permissions);
      setUsername(result.user.username);
      setEmail(result.user.email);
      setPassword(result.user.password);
      setFirstName(result.user.first_name);
      setLastName(result.user.last_name);
      setAddress(result.user.address);
      setPhoneNumber(result.user.phone_number);
    } catch (error) {
      console.error(error)
    }
  }

  async function editUserDetails() {
    const response = await fetch(`${API}/users/${userId}`, {
      method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          permissions: permissions,
          username: username,
          email: email,
          password: password,
          first_name: firstName,
          last_name: lastName,
          address: address,
          phone_number: phoneNumber,
        })
    });
    const result = await response.json();
    console.log(result);
  }

  function handleClick(e) {
    e.preventDefault();
    editUserDetails();
    navigate('/admin');
  }


  // Add form listeners and state variables with starting values from userDetails
  return (
    <>
      <form className='edit-form'>
        <label> Permissions:
          <input 
            type='text'
            value={permissions}
            onChange={(e) => setPermissions(e.target.value)} />
        </label>
        <label> Username:
          <input 
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label> Email:
          <input 
            type='email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </label>
        {/* <label> Password:
          <input 
            type='text' 
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </label> */}
        <label> First Name:
          <input 
            type='text' 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label> Last Name:
          <input 
            type='text' 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label> Address:
          <input 
            type='text' 
            value={address}
            onChange={(e) => setAddress(e.target.value)} />
        </label>
        <label> Phone Number:
          <input 
            type='text' 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>
        <button onClick={handleClick}>Save</button>
      </form>
    </>
  )
}