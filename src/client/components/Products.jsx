import { useState, useEffect } from "react"

import { Link } from 'react-router-dom'

function Products() {

const [ products, setProducts ] = useState([])
const [ searchString, setSearchString ] = useState('')


useEffect(() => {
  fetchProducts()
},[])

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

const handleChange = (event) => {
  setSearchString(event.target.value)
}

// const filteredProducts = products.filter(product => {
//   return product.title.toLowerCase().includes(searchString.toLowerCase())
// })
  
  return (
    <div>
      {/* <input
        className="search-filter"
        type="text"
        placeholder="Search for a book..."
        value={searchString}
        onChange={handleChange}
        /> */}
      <ul className="products-container">
      <h1>Products Catalog</h1>
        {
          products.map((product) => (
            <li key={product.product_id}>
              <Link to={`/products/${product.product_id}`}>
              <h2>{product.product_name}</h2>
              <img src={product.product_image} alt={product.product_name} className="product-image"/>
              </Link>
              <p>${product.product_price}</p>
            </li>
       ))}

      </ul>
    </div>
    )
  }

export default Products