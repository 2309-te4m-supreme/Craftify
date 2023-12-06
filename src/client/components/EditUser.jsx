import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


export default function EditUser({ token }) {

  const [userDetails, setUserDetails] = useState({})

  const API = 'http://localhost:3000/api'

  const { userId } = useParams()

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
      setUserDetails(result.user)
    } catch (error) {
      console.error(error)
    }
  }

  function handleClick() {
    console.log("Fix this later (make a put call).")
  }


  // Add form listeners and state variables with starting values from userDetails
  return (
    <>
      <form className='edit-form'>
        <label> Username:
          <input type='text' value={userDetails.username} />
        </label>
        <label> Email:
          <input type='text' value={userDetails.email} />
        </label>
        <label> Password:
          <input type='text' value={userDetails.password} />
        </label>
        <label> First Name:
          <input type='text' value={userDetails.first_name} />
        </label>
        <label> Last Name:
          <input type='text' value={userDetails.last_name} />
        </label>
        <label> Address:
          <input type='text' value={userDetails.address} />
        </label>
        <label> Phone Number:
          <input type='text' value={userDetails.phone_number} />
        </label>
        <button onClick={handleClick}>Save</button>
      </form>
    </>
  )
}