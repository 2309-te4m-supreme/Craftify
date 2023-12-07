import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Admin({ token }) {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const API = "http://localhost:3000/api";

  useEffect(() => {
    fetchAdmin();
    fetchAllOrders();
    fetchProducts();
  },[]);

  
  async function fetchAdmin() {
    try {
      const response = await fetch(`${API}/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log(result.users);
      setUsers(result.users);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function fetchProducts() {
    try {
      const response = await fetch(`${API}/products`);
      const result = await response.json();

      console.log(result);

      setProducts(result);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function fetchAllOrders() {
    try {
      const response = await fetch(`${API}/orders`);
      // add headers once require Admin is added on DB
      const result = await response.json();

      console.log(result);
      setOrders(result);
      console.log(orders);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function handleDelete(productId) {
    try {
      const response = await fetch(`${API}/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      fetchProducts();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div>
        <h1 className="users">Users:</h1>
        <table className="nice-table">
          <thead>
            <tr>
              <th>First Name </th>
              <th>Last Name </th>
              <th>Email </th>
              <th>Address </th>
              <th>Phone Number </th>
              <th>Permission </th>
              <th>User Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.first_name} </td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.phone_number}</td>
                <td>{user.permissions}</td>
                <td>{user.user_id}</td>
                <td>
                  <Link to={`/admin/users/${user.user_id}`}>
                    <button>Edit</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr />
      <div>
        <h1>Products:</h1>
        <Link to={"/admin/addproduct/"}>
          <button>Add Product</button>
        </Link>
        <table className="nice-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id}>
                <td>{product.product_id}</td>
                <td>{product.product_name}</td>
                <td>${product.product_price}</td>
                <td>{product.product_category}</td>
                <td>{product.product_stock}</td>
                <td>
                  <Link to={`/admin/products/${product.product_id}`}>
                    <button>Edit</button>
                  </Link>
                  <button
                    onClick={() => {
                      handleDelete(product.product_id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.order_date}</td>
                <td>{order.order_total}</td>
                <td>{order.user_id}</td>
                <td>{order.order_status}</td>
                <td>
                  {/* <Link to={`/admin/orders/${order.order_id}`}>
                      <button>Edit</button>
                    </Link> */}
                  <button>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Admin;
