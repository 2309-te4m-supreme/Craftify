import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function MyAccount({ token }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUserData();
  }, [token]);

  const API = '/api'

  async function fetchUserData() {
    try {
      const response = await fetch(`${API}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      console.log(result)
      setUser(result)
    } catch (err) {
      console.log(err)
    }
  };


  return (
    <>
      <div className='account-page'>
        <h1>Welcome to Your Account!</h1>
        <h2>{`${user.first_name} ${user.last_name}`}</h2>
        <div className='account-body'>
          <h3>Email: {user.email}</h3>
          <h3>Address: {user.address}</h3>
          <h3>Phone Number: {user.phone_number}</h3>
        {/* <Link to={`/orders/${user.user_id}`}>
          <button>Order History</button>
        </Link> */}
        <Link to={`/cart/${user.user_id}`}>
          <button className='cart-btn'>Cart</button>
        </Link>
        </div>
      </div>
      
    </>
  )

};
