"use strict";

// routes/adminRoutes.js
var express = require('express');

var router = express.Router();

var adminController = require('../controllers/adminController');

var _require = require('../middleware/authMiddleware'),
    isAdminAuthenticated = _require.isAdminAuthenticated; // Admin login page


router.get('/login', function (req, res) {
  res.render('admin/login'); // Render the admin login page (create a login.ejs or equivalent view)
}); // Admin login POST

router.post('/login', adminController.login); // Admin order management (protected route)

router.get('/orders', isAdminAuthenticated, adminController.getOrders); // Admin feedbacks view (protected route)

router.get('/feedback', isAdminAuthenticated, adminController.getFeedbacks);
router.post("/orders/:id/update", isAdminAuthenticated, adminController.updateOrderStatus); // Admin dashboard

router.get('/dashboard', function (req, res) {
  if (!req.session.admin) {
    return res.redirect('/admin/login'); // Redirect to login if not logged in
  }

  res.render('admin/dashboard'); // Render the admin dashboard (create a dashboard.ejs or equivalent view)
});
router.get("/logout", function (req, res) {
  // Clear the session or cookie for admin
  req.session.destroy(function (err) {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).send("Error logging out");
    }

    res.redirect("/admin/login"); // Redirect to the login page after logout
  });
});
module.exports = router;