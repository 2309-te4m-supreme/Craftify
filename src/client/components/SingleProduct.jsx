import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function SingleProduct() {

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

    // look at reserveBook function for 'add to cart'

    return (
        <>
        <div>
        <section key={productDetails.product_id} className='single-product'>
                    <h3>{productDetails.product_name}</h3>
                    <img src={productDetails.product_image} />
                    <p>{productDetails.description}</p>
                    <p>${productDetails.product_price}</p>
                        <button>Add to cart</button>
                </section>
        </div>
        </>
    )
}