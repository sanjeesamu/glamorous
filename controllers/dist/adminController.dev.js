"use strict";

var Admin = require('../models/Admin');

var Order = require('../models/Order');

var Feedback = require('../models/Feedback');

var bcrypt = require('bcrypt');

var mongoose = require('mongoose'); // Admin Login page


exports.loginPage = function (req, res) {
  res.render('admin/login');
}; // Handle Admin Login


exports.login = function _callee(req, res) {
  var _req$body, username, password, admin, isMatch;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, username = _req$body.username, password = _req$body.password; // Validate input

          if (!(!username || !password)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: 'Username and password are required.'
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(Admin.findOne({
            username: username
          }));

        case 6:
          admin = _context.sent;

          if (admin) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: 'Invalid username or password.'
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(admin.comparePassword(password));

        case 11:
          isMatch = _context.sent;

          if (isMatch) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: '1Invalid username or password.'
          }));

        case 14:
          // Store admin info in session
          // Set session for admin
          req.session.isAdminAuthenticated = true;
          req.session.adminId = admin._id;
          req.session.admin = admin;
          res.redirect('/admin/dashboard');
          _context.next = 24;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          console.error('Error logging in:', _context.t0);
          res.status(500).json({
            message: 'An internal server error occurred.'
          });

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 20]]);
}; // Admin Dashboard (after successful login)


exports.dashboard = function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.render('admin/dashboard');

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // Fetch and render orders


exports.getOrders = function _callee3(req, res) {
  var orders;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Order.find());

        case 3:
          orders = _context3.sent;
          // Fetch orders from the database
          res.render("admin/orders", {
            orders: orders
          }); // Render orders.ejs with the orders data

          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error("Error fetching orders:", _context3.t0);
          res.status(500).send("Error fetching orders.");

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getFeedbacks = function _callee4(req, res) {
  var feedbacks;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Feedback.find());

        case 3:
          feedbacks = _context4.sent;
          res.render("admin/feedback", {
            feedbacks: feedbacks
          });
          _context4.next = 11;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error("Error fetching feedbacks:", _context4.t0);
          res.status(500).send("Error fetching feedbacks.");

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.updateOrderStatus = function _callee5(req, res) {
  var id, status, updatedOrder;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          status = req.body.status;
          _context5.prev = 2;
          _context5.next = 5;
          return regeneratorRuntime.awrap(Order.findByIdAndUpdate(id, {
            status: status
          }, {
            "new": true
          } // Return the updated document
          ));

        case 5:
          updatedOrder = _context5.sent;

          if (updatedOrder) {
            _context5.next = 8;
            break;
          }

          return _context5.abrupt("return", res.status(404).send("Order not found."));

        case 8:
          // Redirect back to the orders page
          res.redirect("/admin/orders");
          _context5.next = 15;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](2);
          console.error("Error updating order status:", _context5.t0);
          res.status(500).send("Error updating order status.");

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 11]]);
};