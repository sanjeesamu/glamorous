"use strict";

var express = require("express");

var router = express.Router(); // Route for the homepage

router.get("/", function (req, res) {
  res.render("home"); // Render the home.ejs file
});
module.exports = router;