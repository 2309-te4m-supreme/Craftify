import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import springFlowers from '../assets/springFlowers.mp4'

export default function SingleProduct({ token }) {

    const [productDetails, setProductDetails] = useState({})
    const [isAddedToCart, setIsAddedToCart] = useState(false);
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
    
    async function handleAddToCart(productId){
        try{
            await fetch(`${API}/orders_products`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                     "product_id": productId 
                    }),
            })
            setIsAddedToCart(true);
            console.log(productId)
        } catch (error){
            console.log(error)
        }
    }

    // look at reserveBook function for 'add to cart'

    return (
        <>
        <div>
        {/* <video className='springFlowers' src={springFlowers} autoPlay loop muted/> */}
        <section key={productDetails.product_id} className='single-product'>
                    <h3>{productDetails.product_name}</h3>
                    <img src={productDetails.product_image} />
                    <p>{productDetails.description}</p>
                    <p>${productDetails.product_price}</p>
                        <button onClick={() => {handleAddToCart(productDetails.product_id)}}>Add to cart</button>
                        {isAddedToCart && <p>Item added to cart!</p>}
                </section>
        </div>
        </>
    )
}