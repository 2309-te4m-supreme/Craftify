import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'


function Admin({ token }) {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAdmin();
    fetchProducts()
  }, [])

  async function fetchAdmin() {

    let API = 'http://localhost:3000/api'

    try {
      const response = await fetch(`${API}/users`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      const result = await response.json()
      console.log(result.users)
      setUsers(result.users)
    }
    catch (err) {
      console.error(err.message)
    }
  }

  async function fetchProducts() {

    let API = 'http://localhost:3000/api'

    try {
      const response = await fetch(`${API}/products`)
      const result = await response.json()

      console.log(result)

      setProducts(result)
    }
    catch (err) {
      console.error(err.message)
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
            {
              users.map((user) => (
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
            {
              products.map((product) =>
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
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Admin