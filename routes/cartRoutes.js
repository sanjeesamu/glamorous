const express = require("express");
const {
  addToCart,
  viewCart,
  removeFromCart,
  updateCartQuantity,
} = require("../controllers/cartController");
const router = express.Router();

router.post("/add", addToCart);
router.get("/", viewCart);
router.post("/remove", removeFromCart);
router.post("/update", updateCartQuantity);

module.exports = router;
