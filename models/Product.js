const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, // Reference to Category
});

module.exports = mongoose.model("Product", productSchema);
