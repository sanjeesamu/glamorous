const express = require("express");
const router = express.Router();

// Route for the homepage
router.get("/", (req, res) => {
  res.render("home"); // Render the home.ejs file
});

module.exports = router;
