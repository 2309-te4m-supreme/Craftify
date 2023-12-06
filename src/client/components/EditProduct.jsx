import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


export default function EditProduct({ token }) {
  const [ productName, setProductName ] = useState ('');
  const [ productDescription, setProductDescription ] = useState('');
  const [ productPrice, setProductPrice ] = useState('');
  const [ productImage, setProductImage ] = useState('');
  const [ productCategory, setProductCategory ] = useState('');
  const [ productStock, setProductStock ] = useState('');
  

  const API = 'http://localhost:3000/api'

  const { productId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchSingleProduct()
  }, [])

  async function fetchSingleProduct() {
    try {
      const response = await fetch(`${API}/products/${productId}`)
      const result = await response.json()
      console.log(result[0])
      setProductName(result[0].product_name);
      setProductDescription(result[0].product_description);
      setProductPrice(result[0].product_price);
      setProductImage(result[0].product_image);
      setProductCategory(result[0].product_category);
      setProductStock(result[0].product_stock);
    } catch (error) {
      console.error(error)
    }
  }

  async function editProductDetails() {
    const response = await fetch(`${API}/products/${productId}`, {
      method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          product_name: productName,
          product_description: productDescription,
          product_price: productPrice,
          product_image: productImage,
          product_category: productCategory,
          product_stock: productStock,
        })
    });
    const result = await response.json();
    console.log(result);
  }

  function handleClick(e) {
    e.preventDefault();
    editProductDetails();
    navigate('/admin');
  }


  // Add form listeners and state variables with starting values from userDetails
  return (
    <>
      <form className='edit-form'>
        <label> Product Name:
          <input 
            type='text'
            value={productName}
            onChange={(e) => setProductName(e.target.value)} />
        </label>
        <label> Description:
          <input 
            type='text'
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)} />
        </label>
        <label> Price:
          <input 
            type='productPrice' 
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)} />
        </label>
        <label> Image:
          <input 
            type='text' 
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)} />
        </label>
        <label> Category:
          <input 
            type='text' 
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)} />
        </label>
        <label> Stock:
          <input 
            type='text' 
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)} />
        </label>
        <button onClick={handleClick}>Save</button>
      </form>
    </>
  )
}