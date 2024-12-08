// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isAdminAuthenticated } = require('../middleware/authMiddleware');

// Admin login page
router.get('/login', (req, res) => {
  res.render('admin/login'); // Render the admin login page (create a login.ejs or equivalent view)
});

// Admin login POST
router.post('/login', adminController.login);


// Admin order management (protected route)
router.get('/orders', isAdminAuthenticated, adminController.getOrders);

// Admin feedbacks view (protected route)
router.get('/feedback',isAdminAuthenticated, adminController.getFeedbacks);

router.post("/orders/:id/update",isAdminAuthenticated, adminController.updateOrderStatus);

// Admin dashboard
router.get('/dashboard', (req, res) => {
  if (!req.session.admin) {
    return res.redirect('/admin/login'); // Redirect to login if not logged in
  }
  res.render('admin/dashboard'); // Render the admin dashboard (create a dashboard.ejs or equivalent view)
});

router.get("/logout", (req, res) => {
    // Clear the session or cookie for admin
    req.session.destroy((err) => {
      if (err) {
        console.error("Error logging out:", err);
        return res.status(500).send("Error logging out");
      }
      res.redirect("/admin/login"); // Redirect to the login page after logout
    });
  });
  

module.exports = router;
