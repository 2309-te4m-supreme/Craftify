import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function SingleUser() {

    const [userDetails, setUserDetails] = useState({})
    const API = 'http://localhost:3000/api'

    const { userId } = useParams()

    useEffect(() => {
        fetchSingleUser()
    }, [userId])

    async function fetchSingleUser() {
        try {
            const response = await fetch(`${API}/users/user/${userId}`)
            const result = await response.json()
            console.log(result)
            setUserDetails(result.user)
        } catch (error) {
            console.error(error)
        }
    }

return (
    <>
    <div>
      <ul>
          <li key={userDetails.users_id}>
            <h3>
              {userDetails.first_name} {userDetails.last_name}
            </h3>
              <ul>
                <li>Email: {userDetails.email}</li>
                <li>Address: {userDetails.address}</li>
                <li>Phone Number: {userDetails.phone_number}</li>
                <li>Permissions: {userDetails.permissions}</li>
                <li>User ID: {userDetails.users_id}</li>
                <button>Edit</button>
              </ul>
          </li>
      </ul>
    </div>
    </>
)
}