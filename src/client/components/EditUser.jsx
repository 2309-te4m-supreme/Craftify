import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


export default function EditUser(userId) {

    // const [userDetails, setUserDetails] = useState({})

    // const API = 'http://localhost:3000/api'

    // const { userId } = useParams()

    // useEffect(() => {
    //     fetchSingleUser()
    // }, [])

    // async function fetchSingleUser() {
    //     try {
    //         const response = await fetch(`${API}/users/user/${userId}`)
    //         const result = await response.json()
    //         console.log(result)
    //         setUserDetails(result.user)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

return (
    <>
    <h1>TEST</h1>
    <form>
      <label> Username:
        <input/>
      </label>
      <label> Email:
        <input/>
      </label>
      <label> Password:
        <input/>
      </label>
      <label> First Name:
        <input/>
      </label>
      <label> Last Name:
        <input/>
      </label>
      <label> Address:
        <input/>
      </label>
      <label> Phone Number:
        <input/>
      </label>
    </form>
    </>
  )
}