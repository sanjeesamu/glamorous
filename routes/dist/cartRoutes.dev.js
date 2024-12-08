"use strict";

var express = require("express");

var _require = require("../controllers/cartController"),
    addToCart = _require.addToCart,
    viewCart = _require.viewCart,
    removeFromCart = _require.removeFromCart,
    updateCartQuantity = _require.updateCartQuantity;

var router = express.Router();
router.post("/add", addToCart);
router.get("/", viewCart);
router.post("/remove", removeFromCart);
router.post("/update", updateCartQuantity);
module.exports = router;