const Razorpay = require("razorpay");

console.log("=================================");
console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);
console.log("KEY SECRET EXISTS:", !!process.env.RAZORPAY_KEY_SECRET);
console.log("=================================");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = razorpay;
