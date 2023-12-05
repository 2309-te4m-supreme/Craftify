import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'


function Admin (){
  const [ users, setUsers ] = useState([]);
  const [ products, setProducts ] = useState([]);

  useEffect(() => {
    fetchAdmin();
    fetchProducts()
  },[])

  async function fetchAdmin(){

    let API = 'http://localhost:3000/api'

    try {
      const response = await fetch(`${API}/users`)
      const result = await response.json()
      console.log(result.users)
      setUsers(result.users)
    } 
    catch(err){
      console.error(err.message)
    }
  } 

  async function fetchProducts(){

    let API = 'http://localhost:3000/api'
  
    try {
      const response = await fetch(`${API}/products`)
      const result = await response.json()
  
      console.log(result)
  
      setProducts(result)
    }
    catch(err){
      console.error(err.message)
    }
  }

  return (
    <>
    <div>
      <h1 className="users">Users:</h1>
      <thread>
        <tr>
          <th>First Name </th>
          <th>Last Name </th>
          <th>Email </th>
          <th>Address </th>
          <th>Phone Number </th>
          <th>Permission </th>
          <th>User Id</th>
        </tr>
      </thread>
      <tbody>
        {
          users.map((user) => (
          <tr key={user.users_id}>
            <td>{user.first_name} </td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>{user.address}</td>
            <td>{user.phone_number}</td>
            <td>{user.permissions}</td>
            <td>{user.users_id}</td>
            <td>
            <Link to={`/users/user/${user.users_id}`}>
              <button>Edit</button>
            </Link>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </div>
    <hr/>
    <div>
        <h1>Products</h1>
        <thread>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
          </tr>
        </thread>
        <tbody>
          {
          products.map((product) =>
          <tr key={product.product_id}>
            <td>{product.product_id}</td>
            <td>{product.product_name}</td>
            <td>{product.product_category}</td>
            <td>{product.product_stock}</td>
            <td>
            <Link to={`/admin/${product.product_id}`}>
              <button>Edit</button>
            </Link>
              <button>Delete</button>
            </td>
          </tr>
          )}
        </tbody>
    </div>
    </>
  );
};

export default Admin