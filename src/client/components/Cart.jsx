import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function Cart({ token }) {
    // const [cart, setCart] = useState([]);
    // const API = 'http://localhost:3000/api'

    // useEffect(() => {
    //     fetchCart()
    // }, []);

    // const { userId } = useParams();

    // async function fetchCart() {
    // try {
    //   const response = await fetch(``, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${token}`
    //     }
    //   })
    //   const result = await response.json()
    //   console.log(result)
    //   setCart(result)
    // } catch (error) {
    //   console.error(error.message)
    // }
  // }

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
            {/* {
              orders.map((order) => {
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
                )})
            } */}
          </tbody>
        </table>
            <Link to='/checkout/:userId'>
              <button>Checkout</button>
            </Link>
      </div>

  )
}