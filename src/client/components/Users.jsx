import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

function Users (){
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    fetchUsers()
  },[])

  async function fetchUsers(){

    let API = 'http://localhost:3000/api'

    try {
      const response = await fetch(`${API}/users`)
      const result = await response.json()
      console.log(result.users)
      setUsers(result.users)
    } 
    catch(err){
      console.error(err.message)
    }
  } 

  return (
    <div>
      <h1 className="users">Users:</h1>
      <ul>
        {
          users.map((user) => (
          <li key={user.users_id}>
            <Link to={`/users/user/${user.users_id}`}>
            <h3>
              {user.first_name} {user.last_name}
            </h3>
            </Link>
              {/* <ul>
                <li>Email: {user.email}</li>
                <li>Address: {user.address}</li>
                <li>Phone Number: {user.phone_number}</li>
                <li>Permissions: {user.permissions}</li>
                <li>User ID: {user.users_id}</li>
              </ul> */}
          </li>
        ))}
      </ul>
    </div>
  );
 };
export default Users