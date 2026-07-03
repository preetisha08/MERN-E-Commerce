import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const { cartItems, increaseQuantity, decreaseQuantity, totalPrice } =
    useContext(CartContext);

  const discount = cartItems.length > 0 ? 999 : 0;
  const shipping = "FREE";
  const finalTotal = totalPrice - discount;

  return (
    <>
      <Navbar />

      <div className="cart-page">
        <div className="cart-header">
          <div className="cart-title">
            <span className="cart-icon">🛒</span>

            <div>
              <h1>Your Cart</h1>
              <p>Review your items and proceed to checkout.</p>
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>🛒 Your Cart is Empty</h2>

            <p>Looks like you haven't added any products yet.</p>

            <button onClick={() => navigate("/products")}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-container">
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div className="cart-card" key={item._id}>
                    <div className="cart-image">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="cart-details">
                      <h2>{item.name}</h2>

                      <p className="price">₹{item.price}</p>

                      <div className="quantity-box">
                        <button onClick={() => decreaseQuantity(item._id)}>
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button onClick={() => increaseQuantity(item._id)}>
                          +
                        </button>
                      </div>
                    </div>

                    <div className="item-total">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-card">
                <h2>Order Summary</h2>

                <div className="summary-row">
                  <span>Items ({cartItems.length})</span>
                  <span>₹{totalPrice}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="free">{shipping}</span>
                </div>

                <div className="summary-row">
                  <span>Discount</span>
                  <span className="discount">-₹{discount}</span>
                </div>

                <div className="summary-row total-row">
                  <span>Total Amount</span>
                  <span>₹{finalTotal}</span>
                </div>

                <div className="saving-box">
                  ✅ You are saving ₹{discount} on this order!
                </div>

                <button
                  className="checkout-btn"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout →
                </button>

                <p className="secure-checkout">🔒 Secure Checkout</p>
              </div>
            </div>

            <div className="cart-features">
              <div className="feature-card">
                <div className="feature-icon">🚚</div>

                <h4>Free Delivery</h4>

                <p>On all orders</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🛡️</div>

                <h4>Secure Payment</h4>

                <p>100% Secure</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🔄</div>

                <h4>Easy Returns</h4>

                <p>7-Day Return</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🎧</div>

                <h4>24×7 Support</h4>

                <p>We're here to help</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
