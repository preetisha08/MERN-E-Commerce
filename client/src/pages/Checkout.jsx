import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import API_URL from "../config/api";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, totalPrice, clearCart } = useContext(CartContext);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const { data: razorpayOrder } = await axios.post(
        `${API_URL}/payment/create-order`,
        {
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "ShopEase",
        description: "Order Payment",
        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            await axios.post(
              `${API_URL}/payment/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                shippingAddress: formData,

                products: cartItems.map((item) => ({
                  product: item._id,
                  quantity: item.quantity,
                })),

                totalPrice,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );

            toast.success("Payment successful! Order placed.");

            clearCart();
            navigate("/orders");
          } catch (error) {
            console.log(error);
            toast.error("Payment verification failed");
          }
        },

        prefill: {
          name: formData.fullName,
          contact: formData.phone,
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log(error);
      toast.error("Unable to start payment");
    }
  };

  return (
    <>
      <Navbar />

      <div className="checkout-page">
        <div className="checkout-header">
          <h1>Checkout</h1>

          <p>
            Complete your shipping details to proceed with your secure payment.
          </p>
        </div>

        <div className="checkout-card">
          <form className="checkout-form" onSubmit={handlePayment}>
            <div className="form-grid">
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group full-width">
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group full-width">
                <label>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="checkout-summary">
              <h2>Total Amount</h2>
              <h1>₹{totalPrice}</h1>
            </div>

            <button type="submit" className="payment-btn">
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Checkout;
