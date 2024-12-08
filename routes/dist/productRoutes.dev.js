"use strict";

var express = require("express");

var _require = require("../controllers/productController"),
    getFilteredProducts = _require.getFilteredProducts;

var router = express.Router(); // Route for filtered products

router.get("/", getFilteredProducts);
module.exports = router;