import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./ProductCard.css";

function ProductCard({ _id, image, name, price }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={name} />

        <span className="stock-badge">In Stock</span>
      </div>

      <div className="product-info">
        <div className="rating-row">
          <span className="rating">⭐ 4.8</span>

          <span className="delivery">🚚 Free Delivery</span>
        </div>

        <h3>{name}</h3>

        <p className="price">₹{price}</p>

        <p className="product-tagline">
          Premium quality product with secure shopping, reliable delivery and
          excellent customer support.
        </p>

        <div className="card-buttons">
          <button
            className="cart-btn"
            onClick={() =>
              addToCart({
                _id,
                image,
                name,
                price,
              })
            }
          >
            🛒 Add to Cart
          </button>

          <Link to={`/product/${_id}`} className="details-link">
            <button className="details-btn">👁 View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
