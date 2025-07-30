const serverless = require("serverless-http");
require("dotenv").config();
const express = require("express");
const connectDB = require("../config/database");
const categoryRoutes = require("../routes/categoryRoutes");
const productRoutes = require("../routes/productRoutes");
const cartRoutes = require("../routes/cartRoutes");
const feedbackRoutes = require('../routes/feedbackRoutes');
const adminRoutes = require('../routes/adminRoutes');
const homeRoutes = require('../routes/index');
const session = require('express-session');

const app = express();

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/admin", adminRoutes);
app.use("/", homeRoutes);

// Ensure DB connects only once
let isConnected = false;
if (!isConnected) {
  connectDB();
  isConnected = true;
}

module.exports = serverless(app);
