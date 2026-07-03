import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./EditProduct.css";
import API_URL from "../config/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

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

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_URL}/products/${id}`, product);

      alert("Product Updated Successfully");

      navigate("/products");
    } catch (error) {
      console.log(error);
      alert("Failed to update product");
    }
  };

  return (
    <>
      <Navbar />

      <div className="edit-product-page">
        <div className="edit-product-header">
          <h1>Edit Product</h1>

          <p>
            Update product information and keep your store catalog accurate and
            up-to-date.
          </p>
        </div>

        <div className="edit-product-card">
          <form className="edit-product-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="input-group">
                <label>Product Name</label>

                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="input-group">
                <label>Category</label>

                <input
                  type="text"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  placeholder="Enter category"
                  required
                />
              </div>

              <div className="input-group full-width">
                <label>Description</label>

                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  required
                />
              </div>

              <div className="input-group">
                <label>Price (₹)</label>

                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  required
                />
              </div>

              <div className="input-group">
                <label>Stock</label>

                <input
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  placeholder="Available stock"
                  required
                />
              </div>

              <div className="input-group full-width">
                <label>Image URL</label>

                <input
                  type="text"
                  name="image"
                  value={product.image}
                  onChange={handleChange}
                  placeholder="Paste image URL"
                  required
                />
              </div>
            </div>

            <button type="submit" className="update-btn">
              Update Product
            </button>
          </form>
        </div>

        <div className="edit-note">
          <div className="note-card">
            <div className="note-icon">✏️</div>

            <h3>Edit Carefully</h3>

            <p>
              Ensure the product information remains accurate before saving the
              changes.
            </p>
          </div>

          <div className="note-card">
            <div className="note-icon">⭐</div>

            <h3>Better Shopping Experience</h3>

            <p>
              Updated products improve customer trust and make your online store
              look more professional.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProduct;
