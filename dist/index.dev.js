"use strict";

require("dotenv").config();

var express = require("express");

var connectDB = require("./config/database");

var categoryRoutes = require("./routes/categoryRoutes");

var productRoutes = require("./routes/productRoutes");

var cartRoutes = require("./routes/cartRoutes");

var feedbackRoutes = require('./routes/feedbackRoutes');

var adminRoutes = require('./routes/adminRoutes');

var homeRoutes = require('./routes/index');

var session = require('express-session');

var app = express();
app.use(session({
  secret: process.env.JWT_SECRET,
  // Replace with a secure secret key
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  } // Set to `true` if using HTTPS

})); // Serve static files (CSS, images, JS)

app.use(express["static"]("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/admin', adminRoutes);
app.use("/", homeRoutes);
connectDB(); // app.listen(process.env.PORT, () =>
//   console.log(`Server running on port ${process.env.PORT}`)
// );

module.exports = app;