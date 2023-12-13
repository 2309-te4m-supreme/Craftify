import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Cart({ token }) {
  const { userId } = useParams();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState("");
  const API = "/api";

  useEffect(() => {
    if (token) fetchCart();
    fetchTotal();
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

  async function fetchTotal() {
    const response = await fetch(`${API}/orders/order/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    setTotal(result.order_total);
    console.log(result);
  }

  return (
    <div className="checkout-table">
      <h1>Cart</h1>
      <table className="nice-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
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
      <div>
        <h3>{`Total: $${total}`}</h3>
      </div>
      <button>Pay Now</button>
    </div>
  );
}

