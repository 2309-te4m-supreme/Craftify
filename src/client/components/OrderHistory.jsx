import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function OrderHistory({ token }) {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const API = "http://localhost:3000/api";

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  async function fetchOrderHistory() {
    try {
      const response = await fetch(`${API}/orders/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log(result);
      setOrders(result);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div>
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
          {orders.map((order) => {
            return (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.order_date}</td>
                <td>{order.order_total}</td>
                <td>{order.user_id}</td>
                <td>{order.order_status}</td>
                <td>
                  <button>View Order</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
