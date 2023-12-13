import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AddProduct({ token }) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productStock, setProductStock] = useState("");

  const API = "/api";

  const { productId } = useParams();
  const navigate = useNavigate();

  async function AddProductDetails() {
    const response = await fetch(`${API}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_name: productName,
        product_description: productDescription,
        product_price: productPrice,
        product_image: productImage,
        product_category: productCategory,
        product_stock: productStock,
      }),
    });
    const result = await response.json();
    console.log(result);
  }

  function handleClick(e) {
    e.preventDefault();
    AddProductDetails();
    navigate("/admin");
  }

  // Add form listeners and state variables with starting values from userDetails
  return (
    <>
      <form className="edit-form">
        <label>
          {" "}
          Product Name:
          <input type="text" onChange={(e) => setProductName(e.target.value)} />
        </label>
        <label>
          {" "}
          Description:
          <input
            type="text"
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </label>
        <label>
          {" "}
          Price:
          <input
            type="productPrice"
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </label>
        <label>
          {" "}
          Image:
          <input
            type="text"
            onChange={(e) => setProductImage(e.target.value)}
          />
        </label>
        <label>
          {" "}
          Category:
          <input
            type="text"
            onChange={(e) => setProductCategory(e.target.value)}
          />
        </label>
        <label>
          {" "}
          Stock:
          <input
            type="text"
            onChange={(e) => setProductStock(e.target.value)}
          />
        </label>
        <button onClick={handleClick}>Save</button>
      </form>
    </>
  );
}
