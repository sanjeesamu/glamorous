"use strict";

var Product = require("../models/Product"); // Import Product model


var Category = require("../models/Category"); // Import Category model


var getFilteredProducts = function getFilteredProducts(req, res) {
  var _req$query, categoryId, minPrice, maxPrice, filters, products, categories;

  return regeneratorRuntime.async(function getFilteredProducts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$query = req.query, categoryId = _req$query.categoryId, minPrice = _req$query.minPrice, maxPrice = _req$query.maxPrice; // Build the filters object dynamically

          filters = {};

          if (categoryId) {
            filters.categoryId = categoryId;
          }

          if (minPrice || maxPrice) {
            filters.price = {};
            if (minPrice) filters.price.$gte = parseFloat(minPrice);
            if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
          } // Fetch products with filters applied


          _context.next = 7;
          return regeneratorRuntime.awrap(Product.find(filters).populate("categoryId"));

        case 7:
          products = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(Category.find());

        case 10:
          categories = _context.sent;
          res.render("products", {
            products: products,
            categories: categories,
            selectedFilters: req.query
          });
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.error("Error in getFilteredProducts:", _context.t0.message);
          res.status(500).send("Server error");

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
};

module.exports = {
  getFilteredProducts: getFilteredProducts
};