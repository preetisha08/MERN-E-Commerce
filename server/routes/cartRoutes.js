const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
} = require("../controllers/cartController");

router.post("/add", addToCart);
router.get("/", getCart);
router.put("/:id", updateCart);
router.delete("/:id", removeFromCart);

module.exports = router;
