import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function Cart({ token }) {
  const { userId } = useParams();
    const [cart, setCart] = useState([]);
    const API = 'http://localhost:3000/api'

    useEffect(() => {
        fetchCart()
    }, [userId]);

    console.log(userId)

    async function fetchCart() {
    try {
      const response = await fetch(`${API}/orders_products/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const result = await response.json()
      console.log(result)
      setCart(result)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (

    <div>
        <h1>Cart</h1>
        <table className="nice-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Item</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
              {/* add edit or delete button here */}
            </tr>
          </thead>
          <tbody>
            {
              cart.map((item) => {
                return (
                  <tr key={item.product_id}>
                    <td>{item.product_id}</td>
                    <td>{item.item_name}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                        <button>View Order</button>
                    </td>
                  </tr>
                )})
            }
          </tbody>
        </table>
            {/* <Link to='/checkout/:userId'>
              <button>Checkout</button>
            </Link> */}
      </div>

  )
}