import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import "./Products.css";
import API_URL from "../config/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("default");

  const { addToCart } = useContext(CartContext);

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/products/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts((currentProducts) =>
        currentProducts.filter((product) => product._id !== _id),
      );

      toast.success("Product deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
  };

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((product) => category === "All" || product.category === category)
    .filter((product) => maxPrice === "" || product.price <= Number(maxPrice))
    .sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "name-az") return a.name.localeCompare(b.name);
      if (sort === "name-za") return b.name.localeCompare(a.name);

      return 0;
    });

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setMaxPrice("");
    setSort("default");
  };

  return (
    <>
      <Navbar />

      <section className="products-page">
        <div className="products-header">
          <span className="page-badge">🛍 Premium Collection</span>

          <h1>Explore Our Products</h1>

          <p>
            Browse our carefully selected premium collection with secure
            shopping, fast delivery and excellent quality.
          </p>
        </div>

        {loading ? (
          <div className="no-products-found">
            <h2>Loading Products...</h2>
            <p>Please wait while we prepare the collection.</p>
          </div>
        ) : (
          <>
            <div className="products-stats">
              <div className="stat-card">
                <h2>{products.length}</h2>
                <p>Total Products</p>
              </div>

              <div className="stat-card">
                <h2>100%</h2>
                <p>Quality Checked</p>
              </div>

              <div className="stat-card">
                <h2>24×7</h2>
                <p>Customer Support</p>
              </div>
            </div>

            <div className="product-filters">
              <div className="search-box">
                <label>Search Products</label>

                <input
                  type="text"
                  placeholder="Search by product name..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

              <div className="filter-box">
                <label>Category</label>

                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  {categories.map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-box">
                <label>Maximum Price</label>

                <input
                  type="number"
                  min="0"
                  placeholder="Enter max price"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(event.target.value)}
                />
              </div>

              <div className="filter-box">
                <label>Sort By</label>

                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-az">Name: A to Z</option>
                  <option value="name-za">Name: Z to A</option>
                </select>
              </div>

              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>

            <div className="results-info">
              <p>
                Showing <strong>{filteredProducts.length}</strong> of{" "}
                <strong>{products.length}</strong> products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="no-products-found">
                <h2>No Products Found</h2>
                <p>Try changing your search or filter options.</p>

                <button onClick={clearFilters}>Clear All Filters</button>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <div className="admin-product-card" key={product._id}>
                    <div className="admin-product-image">
                      <img src={product.image} alt={product.name} />
                      <span className="product-status">In Stock</span>
                    </div>

                    <div className="admin-product-info">
                      <div className="product-top">
                        <span className="rating">⭐ 4.8</span>
                        <span className="delivery">🚚 Free Delivery</span>
                      </div>

                      <h3>{product.name}</h3>
                      <h2>₹{product.price}</h2>

                      <p className="product-description">
                        Premium quality product with secure shopping, reliable
                        delivery and customer satisfaction.
                      </p>

                      <div className="product-buttons">
                        <button
                          className="cart-btn"
                          onClick={() => addToCart(product)}
                        >
                          🛒 Add to Cart
                        </button>

                        <Link
                          to={`/product/${product._id}`}
                          className="product-link"
                        >
                          <button className="view-btn">👁 View Details</button>
                        </Link>

                        {isAdmin && (
                          <>
                            <Link
                              to={`/edit-product/${product._id}`}
                              className="product-link"
                            >
                              <button className="edit-btn">✏ Edit</button>
                            </Link>

                            <button
                              className="delete-btn"
                              onClick={() => deleteProduct(product._id)}
                            >
                              🗑 Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <section className="products-footer">
              <div className="footer-card">
                <div className="footer-icon">🚚</div>
                <h3>Fast Delivery</h3>
                <p>Reliable shipping with trusted delivery partners.</p>
              </div>

              <div className="footer-card">
                <div className="footer-icon">🔒</div>
                <h3>Secure Shopping</h3>
                <p>Safe checkout with protected payment methods.</p>
              </div>

              <div className="footer-card">
                <div className="footer-icon">⭐</div>
                <h3>Premium Quality</h3>
                <p>
                  Carefully selected products with excellent quality standards.
                </p>
              </div>
            </section>
          </>
        )}
      </section>
    </>
  );
}

export default Products;
