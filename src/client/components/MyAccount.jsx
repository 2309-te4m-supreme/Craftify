import { useState, useEffect } from "react"

const MyAccount = ({ token }) => {
  const [user, setUser] = useState({});
  const API = 'http://localhost:3000/api'
  
  useEffect(() => {
    fetchUserData()
    }, []);

    async function fetchUserData() {
      try {
        const response = await fetch(`${API}/users/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
          const result = await response.json();
          console.log(result)
          setUser(result)
      } catch (err) {
        console.log(err)
      }
    };

    return (
      <div>
        <h1>Welcome to Your Account!</h1>
          <h2>{`${user.first_name} ${user.last_name}`}</h2>
          <div>
            <h3>Email: {user.email}</h3>
            <h3>Address: {user.address}</h3>
            <h3>Phone Number: {user.phone_number}</h3>
          </div>
      </div>
    )
    
  };
  export default MyAccount
