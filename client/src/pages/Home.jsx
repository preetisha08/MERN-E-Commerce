import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import "./Home.css";
import API_URL from "../config/api";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToProducts = () => {
    document.querySelector(".featured-products").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar />

      {/* Hero */}

      <section className="hero">
        <div className="hero-left">
          <span className="hero-badge">✨ Premium Online Shopping</span>

          <h1>
            Discover Products You'll
            <span> Love Every Day.</span>
          </h1>

          <p>
            Shop premium quality products with secure payments, fast delivery,
            and an effortless shopping experience.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn" onClick={scrollToProducts}>
              Shop Now
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/products")}
            >
              Explore Products
            </button>
          </div>

          <div className="hero-stats">
            <div>
              <h3>500+</h3>
              <p>Products</p>
            </div>

            <div>
              <h3>1000+</h3>
              <p>Happy Customers</p>
            </div>

            <div>
              <h3>24×7</h3>
              <p>Support</p>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-card">
            <div className="hero-icon">🛍️</div>

            <h3>Premium Collection</h3>

            <p>Carefully selected products with quality and affordability.</p>
          </div>

          <div className="hero-card">
            <div className="hero-icon">🚚</div>

            <h3>Fast Delivery</h3>

            <p>Quick and reliable shipping on all eligible orders.</p>
          </div>

          <div className="hero-card">
            <div className="hero-icon">🔒</div>

            <h3>Secure Shopping</h3>

            <p>Safe checkout with trusted payment security.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}

      <section className="why-us">
        <div className="section-title">
          <h2>Why Shop With Us?</h2>

          <p>Everything you need for a seamless online shopping experience.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Free Delivery</h3>
            <p>Fast shipping on eligible products.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Secure Payment</h3>
            <p>100% secure payment experience.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Easy Returns</h3>
            <p>Simple and hassle-free returns.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎧</div>
            <h3>24×7 Support</h3>
            <p>Always available to help you.</p>
          </div>
        </div>
      </section>

      {/* Products */}

      <section className="featured-products">
        <div className="section-title">
          <h2>Featured Products</h2>

          <p>Browse our latest premium collection curated for every shopper.</p>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </section>

      {/* Newsletter */}

      <section className="newsletter">
        <div className="newsletter-card">
          <h2>Stay Updated</h2>

          <p>
            Get notified about new arrivals, special offers, and exclusive
            deals.
          </p>

          <button onClick={() => navigate("/products")}>Start Shopping</button>
        </div>
      </section>
    </>
  );
}

export default Home;
