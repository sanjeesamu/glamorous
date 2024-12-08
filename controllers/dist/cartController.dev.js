"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Product = require("../models/Product");

var addToCart = function addToCart(req, res) {
  // Initialize the cart if it doesn't exist
  if (!req.session.cart) {
    req.session.cart = {
      items: []
    }; // Ensure cart has an `items` array
  }

  var productId = req.body.productId; // Check if the product is already in the cart

  var existingProduct = req.session.cart.items.find(function (item) {
    return item.productId === productId;
  });

  if (existingProduct) {
    existingProduct.quantity += 1; // Increment quantity
  } else {
    req.session.cart.items.push({
      productId: productId,
      quantity: 1
    }); // Add new product
  }

  console.log('Updated cart:', req.session.cart); // Log the cart for debugging

  res.redirect('/cart'); // Redirect to the cart page
};

var viewCart = function viewCart(req, res) {
  var cart, products;
  return regeneratorRuntime.async(function viewCart$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          cart = req.session.cart; // Check if the cart is empty

          if (!(!cart || !cart.items || cart.items.length === 0)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.render('cart', {
            products: [],
            message: 'Your cart is empty.'
          }));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(Promise.all(cart.items.map(function _callee(item) {
            var product;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return regeneratorRuntime.awrap(Product.findById(item.productId));

                  case 2:
                    product = _context.sent;
                    return _context.abrupt("return", _objectSpread({}, product.toObject(), {
                      quantity: item.quantity,
                      totalPrice: product.price * item.quantity
                    }));

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            });
          })));

        case 5:
          products = _context2.sent;
          res.render('cart', {
            products: products,
            message: null
          });

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var removeFromCart = function removeFromCart(req, res) {
  var productId = req.body.productId;
  var cart = req.session.cart;
  cart.items = cart.items.filter(function (item) {
    return item.productId !== productId;
  });
  req.session.cart = cart;
  res.redirect("/cart");
};

var updateCartQuantity = function updateCartQuantity(req, res) {
  var _req$body = req.body,
      productId = _req$body.productId,
      quantity = _req$body.quantity;
  var cart = req.session.cart;
  var item = cart.items.find(function (item) {
    return item.productId === productId;
  });

  if (item && quantity > 0) {
    item.quantity = quantity;
  }

  req.session.cart = cart;
  res.redirect("/cart");
};

module.exports = {
  addToCart: addToCart,
  viewCart: viewCart,
  removeFromCart: removeFromCart,
  updateCartQuantity: updateCartQuantity
};