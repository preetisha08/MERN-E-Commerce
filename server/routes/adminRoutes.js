const express = require("express");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getDashboardStats,
  updateOrderStatus,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/dashboard", protect, admin, getDashboardStats);

router.put("/orders/:id/status", protect, admin, updateOrderStatus);

module.exports = router;
