const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createRazorpayOrder,
  verifyPayment,
} = require("../controllers/paymentController");

// Test Route
router.get("/test", (req, res) => {
  res.json({
    message: "Payment Route Working",
  });
});

// Create Razorpay Order
router.post(
  "/create-order",
  protect,
  (req, res, next) => {
    console.log("Reached payment route");
    next();
  },
  createRazorpayOrder,
);

// Verify Payment
router.post("/verify", protect, verifyPayment);

module.exports = router;
