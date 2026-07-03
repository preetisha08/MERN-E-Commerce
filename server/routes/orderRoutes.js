const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  placeOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.post("/place", protect, placeOrder);

router.get("/", protect, getOrders);

router.put("/:id", protect, updateOrder);

router.delete("/:id", protect, deleteOrder);

module.exports = router;
