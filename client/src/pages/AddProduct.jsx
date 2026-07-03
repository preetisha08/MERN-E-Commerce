import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./AddProduct.css";
import API_URL from "../config/api";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/products/add`, product);

      setMessage(res.data.message);

      setProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />

      <div className="add-product-page">
        <div className="add-product-header">
          <h1>Add New Product</h1>
          <p>
            Fill in the product details below to add a new item to your store.
          </p>
        </div>

        <div className="add-product-card">
          <form className="add-product-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="input-group">
                <label>Product Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={product.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Category</label>

                <input
                  type="text"
                  name="category"
                  placeholder="Enter category"
                  value={product.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group full-width">
                <label>Description</label>

                <textarea
                  name="description"
                  placeholder="Enter product description"
                  value={product.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Price (₹)</label>

                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={product.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Stock</label>

                <input
                  type="number"
                  name="stock"
                  placeholder="Available stock"
                  value={product.stock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group full-width">
                <label>Product Image URL</label>

                <input
                  type="text"
                  name="image"
                  placeholder="Paste image URL"
                  value={product.image}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="add-product-btn">
              Add Product
            </button>

            {message && <p className="message">{message}</p>}
          </form>
        </div>

        <div className="admin-note">
          <div className="note-card">
            <div className="note-icon">📦</div>

            <h3>Product Management</h3>

            <p>
              Ensure product details, pricing and image URL are accurate before
              adding the item to your store.
            </p>
          </div>

          <div className="note-card">
            <div className="note-icon">⭐</div>

            <h3>Professional Store</h3>

            <p>
              Well-organized product information improves the overall shopping
              experience for customers.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
