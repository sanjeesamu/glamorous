const Category = require("../models/Category");
const Product = require("../models/Product");

const browseCategories = async (req, res) => {
  try {
    // Fetch all categories
    const categories = await Category.find();

    // Get the selected categoryId from the query string
    const selectedCategoryId = req.query.categoryId;
    let products = [];
    let selectedCategoryName = '';

    // If a category is selected, fetch its products
    if (selectedCategoryId) {
      const selectedCategory = await Category.findById(selectedCategoryId);
      selectedCategoryName = selectedCategory ? selectedCategory.name : '';
      products = await Product.find({ categoryId: selectedCategoryId });
    }

    // Render categories.ejs and pass categories, selected category, and products
    res.render("categories", {
      categories,
      selectedCategory: selectedCategoryId,
      selectedCategoryName,
      products,
    });
  } catch (err) {
    console.error("Error in browseCategories:", err);
    res.status(500).send("Server error");
  }
};

module.exports = { browseCategories };
