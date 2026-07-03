import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import "./Orders.css";
import API_URL from "../config/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="orders-page">
        <div className="orders-header">
          <h1>My Orders</h1>
          <p>Track your purchases and view your order history.</p>
        </div>

        {loading ? (
          <div className="empty-orders">
            <h2>Loading Orders...</h2>
            <p>Please wait while we fetch your order history.</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-orders">
            <h2>No Orders Yet</h2>
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="orders-container">
            {orders.map((order) => (
              <div className="order-card" key={order._id}>
                <div className="order-top">
                  <div>
                    <h3>Order ID</h3>
                    <p className="order-id">{order._id}</p>
                  </div>

                  <span
                    className={`status-badge ${
                      order.status === "Pending" ? "pending" : "delivered"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="order-date">
                  <strong>Order Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </div>

                <hr />

                <div className="products-section">
                  <h3>Products</h3>

                  {order.products.map((item, index) => (
                    <div className="product-row" key={index}>
                      <div className="product-info">
                        <h4>{item.product?.name}</h4>
                        <p>Quantity: {item.quantity}</p>
                      </div>

                      <div className="product-price">
                        ₹{item.product?.price}
                      </div>
                    </div>
                  ))}
                </div>

                <hr />

                {order.shippingAddress && (
                  <>
                    <div className="shipping-section">
                      <h3>Shipping Address</h3>

                      <p>
                        <strong>{order.shippingAddress.fullName}</strong>
                      </p>

                      <p>{order.shippingAddress.address}</p>

                      <p>
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}
                      </p>

                      <p>{order.shippingAddress.pincode}</p>
                      <p>📞 {order.shippingAddress.phone}</p>
                    </div>

                    <hr />
                  </>
                )}

                <div className="order-footer">
                  <div>
                    <span>Total Paid</span>
                    <h2>₹{order.totalPrice}</h2>
                  </div>

                  <div className="payment-status">
                    <span>Payment</span>
                    <p>
                      {order.paymentStatus === "Paid"
                        ? "Completed ✓"
                        : order.paymentStatus}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Orders;
