const Admin = require('../models/Admin');
const Order = require('../models/Order');
const Feedback = require('../models/Feedback');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Admin Login page
exports.loginPage = (req, res) => {
  res.render('admin/login');
};

// Handle Admin Login
exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Validate input
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
      }
  
      // Find the admin by username
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(401).json({ message: 'Invalid username or password.' });
      }
  
      // Compare the password
      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: '1Invalid username or password.' });
      }
  
      // Store admin info in session
      // Set session for admin
      req.session.isAdminAuthenticated = true;
      req.session.adminId = admin._id;
      req.session.admin = admin;
      res.redirect('/admin/dashboard');
    } catch (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ message: 'An internal server error occurred.' });
    }
};

// Admin Dashboard (after successful login)
exports.dashboard = async (req, res) => {
  res.render('admin/dashboard');
};

// Fetch and render orders
exports.getOrders = async (req, res) => {
    try {
      const orders = await Order.find(); // Fetch orders from the database
      res.render("admin/orders", { orders }); // Render orders.ejs with the orders data
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).send("Error fetching orders.");
    }
};

exports.getFeedbacks = async (req, res) => {
    try {
      const feedbacks = await Feedback.find();
      res.render("admin/feedback", { feedbacks });
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      res.status(500).send("Error fetching feedbacks.");
    }
};

exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      // Find the order by ID and update the status
      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true } // Return the updated document
      );
  
      if (!updatedOrder) {
        return res.status(404).send("Order not found.");
      }
  
      // Redirect back to the orders page
      res.redirect("/admin/orders");
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).send("Error updating order status.");
    }
};