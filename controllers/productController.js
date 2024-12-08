const Product = require("../models/Product"); // Import Product model
const Category = require("../models/Category"); // Import Category model

const getFilteredProducts = async (req, res) => {
  try {
    const { categoryId, minPrice, maxPrice } = req.query;

    // Build the filters object dynamically
    const filters = {};
    if (categoryId) {
      filters.categoryId = categoryId;
    }
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = parseFloat(minPrice);
      if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
    }

    // Fetch products with filters applied
    const products = await Product.find(filters).populate("categoryId");

    // Fetch all categories for the dropdown
    const categories = await Category.find();

    res.render("products", { products, categories, selectedFilters: req.query });
  } catch (error) {
    console.error("Error in getFilteredProducts:", error.message);
    res.status(500).send("Server error");
  }
};

module.exports = { getFilteredProducts };
