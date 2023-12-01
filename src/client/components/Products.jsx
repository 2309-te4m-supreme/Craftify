import { useState, useEffect } from "react"
import Axios from "axios"

import { Link } from 'react-router-dom'

function Products() {

const [ products, setProducts ] = useState([])
const [ searchString, setSearchString ] = useState('')



useEffect(() => {
  fetchProducts()
},[])

// Change this function
async function fetchProducts(){
  // input NEW API ******
  // let API = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/'

  try {
    const { data: response } = await Axios.get(`${API}/books`)

    setProducts(response.books)
  }
  catch(err){
    console.error(err.message)
  }
}

const handleChange = (event) => {
  setSearchString(event.target.value)
}

const filteredProducts = products.filter(product => {
  return product.title.toLowerCase().includes(searchString.toLowerCase())
})
  
  return (
    <div>
      <input
        className="search-filter"
        type="text"
        placeholder="Search for a book..."
        value={searchString}
        onChange={handleChange}
        />
      <ul className="products-container">
      <h1>Library Catalog</h1>
        {filteredProducts.length ?
          filteredProducts.map((product) => (
            <li key={product.id}>
              <Link to={`/details/${product.id}`}>
              <h2>{product.title}</h2>
              <img src={product.coverimage} alt={product.title} className="product-image"/>
              </Link>
            </li>
       )) : (
        <h2>Loading.....</h2>
        )}
      </ul>
    </div>
    )
  }

export default Products