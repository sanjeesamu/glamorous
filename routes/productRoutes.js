const express = require("express");
const { getFilteredProducts } = require("../controllers/productController");
const router = express.Router();

// Route for filtered products
router.get("/", getFilteredProducts);

module.exports = router;
