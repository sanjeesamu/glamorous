"use strict";

var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  items: [{
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    "enum": ["Pending", "In Progress", "Completed", "Cancelled"],
    "default": "Pending"
  },
  date: {
    type: Date,
    "default": Date.now
  }
});
module.exports = mongoose.model("Order", orderSchema);