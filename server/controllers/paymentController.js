const crypto = require("crypto");
const razorpay = require("../config/razorpay");
const Order = require("../models/Order");

// =====================================
// Create Razorpay Order
// =====================================

const createRazorpayOrder = async (req, res) => {
  try {
    console.log("========== CREATE ORDER ==========");
    console.log("Request Body:", req.body);
    console.log("Key ID:", process.env.RAZORPAY_KEY_ID);
    console.log("Key Secret Exists:", !!process.env.RAZORPAY_KEY_SECRET);

    const { totalPrice } = req.body;

    const options = {
      amount: Number(totalPrice) * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    console.log("Options:", options);

    const order = await razorpay.orders.create(options);

    console.log("Razorpay Order Created:", order);
    console.log("=================================");

    res.status(200).json(order);
  } catch (error) {
    console.log("========== RAZORPAY ERROR ==========");
    console.log(error);
    console.log("====================================");

    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

// =====================================
// Verify Payment & Save Order
// =====================================

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      shippingAddress,
      products,
      totalPrice,
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        message: "Payment Verification Failed",
      });
    }

    const order = await Order.create({
      user: req.user.id,

      shippingAddress,

      products,

      totalPrice,

      paymentId: razorpay_payment_id,

      paymentStatus: "Paid",

      status: "Pending",
    });

    res.status(201).json({
      message: "Payment Successful",
      order,
    });
  } catch (error) {
    console.log("========== VERIFY PAYMENT ERROR ==========");
    console.log(error);
    console.log("==========================================");

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createRazorpayOrder,
  verifyPayment,
};
