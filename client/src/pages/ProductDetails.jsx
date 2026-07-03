import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import "./ProductDetails.css";
import API_URL from "../config/api";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}/products/${id}`);

      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return (
      <>
        <Navbar />

        <div className="loading-container">
          <h2>Loading Product...</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="product-details-page">
        <div className="product-details-card">
          <div className="product-image-section">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-info-section">
            <p className="product-tag">PREMIUM COLLECTION</p>

            <h1>{product.name}</h1>

            <h2>₹{product.price}</h2>

            <p className="product-description">{product.description}</p>

            <button
              onClick={() => {
                addToCart(product);
                alert(`${product.name} added to cart!`);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
