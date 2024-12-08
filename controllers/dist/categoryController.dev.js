"use strict";

var Category = require("../models/Category");

var Product = require("../models/Product");

var browseCategories = function browseCategories(req, res) {
  var categories, selectedCategoryId, products, selectedCategoryName, selectedCategory;
  return regeneratorRuntime.async(function browseCategories$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Category.find());

        case 3:
          categories = _context.sent;
          // Get the selected categoryId from the query string
          selectedCategoryId = req.query.categoryId;
          products = [];
          selectedCategoryName = ''; // If a category is selected, fetch its products

          if (!selectedCategoryId) {
            _context.next = 15;
            break;
          }

          _context.next = 10;
          return regeneratorRuntime.awrap(Category.findById(selectedCategoryId));

        case 10:
          selectedCategory = _context.sent;
          selectedCategoryName = selectedCategory ? selectedCategory.name : '';
          _context.next = 14;
          return regeneratorRuntime.awrap(Product.find({
            categoryId: selectedCategoryId
          }));

        case 14:
          products = _context.sent;

        case 15:
          // Render categories.ejs and pass categories, selected category, and products
          res.render("categories", {
            categories: categories,
            selectedCategory: selectedCategoryId,
            selectedCategoryName: selectedCategoryName,
            products: products
          });
          _context.next = 22;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          console.error("Error in browseCategories:", _context.t0);
          res.status(500).send("Server error");

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 18]]);
};

module.exports = {
  browseCategories: browseCategories
};