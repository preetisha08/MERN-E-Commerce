import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import API_URL from "../config/api";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState("");

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data);
      setError("");
    } catch (error) {
      console.log(error);
      setError("Unable to load admin dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingOrderId(orderId);

      const token = localStorage.getItem("token");

      await axios.put(
        `${API_URL}/admin/orders/${orderId}/status`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStats((previousStats) => ({
        ...previousStats,
        recentOrders: previousStats.recentOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order,
        ),
      }));
    } catch (error) {
      console.log(error);
      alert("Failed to update order status.");
    } finally {
      setUpdatingOrderId("");
    }
  };

  return (
    <>
      <Navbar />

      <div className="admin-page">
        <div className="admin-header">
          <div>
            <p className="admin-label">ADMIN PANEL</p>
            <h1>Dashboard Overview</h1>
            <p>Monitor your store performance and latest activity.</p>
          </div>
        </div>

        {loading ? (
          <div className="admin-message">Loading dashboard...</div>
        ) : error ? (
          <div className="admin-message admin-error">{error}</div>
        ) : (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <span>Total Users</span>
                <h2>{stats.totalUsers}</h2>
                <p>Registered customers</p>
              </div>

              <div className="stat-card">
                <span>Total Products</span>
                <h2>{stats.totalProducts}</h2>
                <p>Products in store</p>
              </div>

              <div className="stat-card">
                <span>Total Orders</span>
                <h2>{stats.totalOrders}</h2>
                <p>Orders received</p>
              </div>

              <div className="stat-card revenue-card">
                <span>Total Revenue</span>
                <h2>₹{stats.totalRevenue.toLocaleString("en-IN")}</h2>
                <p>From successful payments</p>
              </div>
            </div>

            <div className="recent-orders-section">
              <div className="section-heading">
                <div>
                  <h2>Recent Orders</h2>
                  <p>Latest customer orders in your store.</p>
                </div>
              </div>

              {stats.recentOrders.length === 0 ? (
                <div className="no-recent-orders">No orders available yet.</div>
              ) : (
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Payment</th>
                        <th>Order Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {stats.recentOrders.map((order) => (
                        <tr key={order._id}>
                          <td className="admin-order-id">
                            #{order._id.slice(-8).toUpperCase()}
                          </td>

                          <td>
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-IN",
                            )}
                          </td>

                          <td>₹{order.totalPrice.toLocaleString("en-IN")}</td>

                          <td>
                            <span
                              className={`admin-badge ${
                                order.paymentStatus === "Paid"
                                  ? "paid"
                                  : "unpaid"
                              }`}
                            >
                              {order.paymentStatus}
                            </span>
                          </td>

                          <td>
                            <select
                              className="status-select"
                              value={order.status}
                              disabled={updatingOrderId === order._id}
                              onChange={(event) =>
                                handleStatusChange(
                                  order._id,
                                  event.target.value,
                                )
                              }
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default AdminDashboard;
