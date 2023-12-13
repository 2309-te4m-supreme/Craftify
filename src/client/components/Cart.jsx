import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Cart({ token }) {
  const { userId } = useParams();
  const [cart, setCart] = useState([]);
  const API = "/api";

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

  const handleUpdateQuantity = async (product_id, newQuantity) => {
    try {
      console.log(product_id)
      await fetch(`${API}/orders_products/${product_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteItem = async (product_id) => {
    try {
      await fetch(`${API}/orders_products/${product_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id }),
      });
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      <table className="nice-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
            {/* add edit or delete button here */}
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => {
            return (
              <tr key={item.product_id}>
                <td>{item.product_name}</td>
                <td>{item.product_price}</td>
                <td>
                  <input
                  type="number"
                  value={item.quantity} 
                  onChange={(e) => handleUpdateQuantity(item.product_id, e.target.value)
                  }
                
                  />
                </td>
                <td>
                  <button onClick={() => handleDeleteItem(item.product_id)}>
                    Delete Item
                  </button>
                  {/* <button>Delete</button> */}
                </td>
                {console.log(item)}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to={`/checkout/${userId}`}>
              <button>Checkout</button>
            </Link>
    </div>
  );
}
// when refreshing page, it breaks the page ***** SAME for My Account
