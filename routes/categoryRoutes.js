const express = require("express");
const { browseCategories } = require("../controllers/categoryController");
const router = express.Router();

// Route to browse categories and products
router.get("/", browseCategories);

module.exports = router;
