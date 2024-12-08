"use strict";

// models/Admin.js
var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

var adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}); // Hash the password before saving

adminSchema.pre('save', function _callee(next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (this.isModified('password')) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", next());

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(this.password, 10));

        case 4:
          this.password = _context.sent;
          next();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
}); // Add a method to compare passwords

adminSchema.methods.comparePassword = function _callee2(inputPassword) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", bcrypt.compare(inputPassword, this.password));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
};

module.exports = mongoose.model('Admin', adminSchema);