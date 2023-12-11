import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Cart({ token }) {
  const { userId } = useParams();
  const [cart, setCart] = useState([]);
  const API = "http://localhost:3000/api";

  useEffect(() => {
    if(token)
    fetchCart();
  }, [userId, token]);

  console.log(userId);

  async function fetchCart() {
    try {
      const response = await fetch(`${API}/orders_products/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log(result);
      setCart(result);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div>
      <h1>Cart</h1>
      <table className="nice-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => {
            return (
              <tr key={item.product_id}>
                <td>{item.product_name}</td>
                <td>{item.product_price}</td>
                <td>{item.quantity} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button>Pay Now</button>
    </div>
  );
}
// when refreshing page, it breaks the page ***** SAME for My Account
