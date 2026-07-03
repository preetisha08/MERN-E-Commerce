import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    setIsLoggedIn(!!token);

    if (user) {
      setUserName(user.name);
      setIsAdmin(user.role === "admin");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setIsAdmin(false);

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="logo">
          <span className="logo-icon">🛍</span>

          <div className="logo-text">
            <h2>ShopEase</h2>
            <p>Premium Shopping</p>
          </div>
        </NavLink>

        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Products
          </NavLink>

          {isAdmin && (
            <>
              <NavLink
                to="/admin"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/add-product"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Add Product
              </NavLink>
            </>
          )}

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "cart-link active-link" : "cart-link"
            }
          >
            Cart
            <span className="cart-count">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </NavLink>

          {isLoggedIn && (
            <NavLink
              to="/orders"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Orders
            </NavLink>
          )}
        </div>

        <div className="nav-actions">
          {isLoggedIn ? (
            <>
              <span className="welcome-user">👋 Hi, {userName}</span>

              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Login
              </NavLink>

              <NavLink to="/register" className="register-btn">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
