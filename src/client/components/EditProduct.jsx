import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function EditProduct() {

    const [productDetails, setProductDetails] = useState({})
    const API = 'http://localhost:3000/api'

    const { productId } = useParams()

    useEffect(() => {
        getSingleProduct()
    }, [productId])

    async function getSingleProduct() {
        try {
            const response = await fetch(`${API}/products/${productId}`)
            const result = await response.json()

            setProductDetails(result[0])
        } catch (error) {
            console.error(error)
        }
    }

    // ADD: IMAGE - DESCRIPTION

    return (
        <>
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
          <tr>
            <td>{productDetails.product_id}</td>
            <td>{productDetails.product_name}</td>
            <td>{productDetails.product_category}</td>
            <td>{productDetails.product_stock}</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        
          </tbody>
          </div>
        </>
    )
}