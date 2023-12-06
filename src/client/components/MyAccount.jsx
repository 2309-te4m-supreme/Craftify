import { useState, useEffect } from "react"

export default function MyAccount({ token }) {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchUserData();
    // fetchOrderHistory();
  }, []);

  const API = 'http://localhost:3000/api'

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
  
  // async function fetchOrderHistory() {
  //   try {
  //     console.log(user)
  //     const response = await fetch(`${API}/orders/${user.user_id}`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       }
  //     })
  //     const result = await response.json()
  //     console.log(result)
  //     setOrders(result)
  //   } catch (error) {
  //     console.error(error.message)
  //   }
  // }

  return (
    <>
      <div>
        <h1>Welcome to Your Account!</h1>
        <h2>{`${user.first_name} ${user.last_name}`}</h2>
        <div>
          <h3>Email: {user.email}</h3>
          <h3>Address: {user.address}</h3>
          <h3>Phone Number: {user.phone_number}</h3>
        </div>
      </div>
      {/* <div>
        <h1>Orders:</h1>
        <table className="nice-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Order Total</th>
              <th>User</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map((order) => {
                return (
                  <tr key={order.order_id}>
                    <td>{order.order_id}</td>
                    <td>{order.order_date}</td>
                    <td>{order.order_total}</td>
                    <td>{order.user_id}</td>
                    <td>{order.order_status}</td>
                    <td>
                      <Link to={`/admin/orders/${order.order_id}`}>
                        <button>Edit</button>
                      </Link>
                      <button>View</button>
                    </td>
                  </tr>
                )})
            }
          </tbody>
        </table>
      </div> */}
    </>
  )

};
