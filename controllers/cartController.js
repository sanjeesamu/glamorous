const Product = require("../models/Product");

const addToCart = (req, res) => {
    // Initialize the cart if it doesn't exist
    if (!req.session.cart) {
      req.session.cart = { items: [] }; // Ensure cart has an `items` array
    }
  
    const { productId } = req.body;
  
    // Check if the product is already in the cart
    const existingProduct = req.session.cart.items.find((item) => item.productId === productId);
  
    if (existingProduct) {
      existingProduct.quantity += 1; // Increment quantity
    } else {
      req.session.cart.items.push({ productId, quantity: 1 }); // Add new product
    }
  
    console.log('Updated cart:', req.session.cart); // Log the cart for debugging
    res.redirect('/cart'); // Redirect to the cart page
};
  
const viewCart = async (req, res) => {
    const cart = req.session.cart;
  
    // Check if the cart is empty
    if (!cart || !cart.items || cart.items.length === 0) {
      return res.render('cart', { products: [], message: 'Your cart is empty.' });
    }
  
    // Fetch product details for items in the cart
    const products = await Promise.all(
      cart.items.map(async (item) => {
        const product = await Product.findById(item.productId); // Replace with your model
        return {
          ...product.toObject(),
          quantity: item.quantity,
          totalPrice: product.price * item.quantity,
        };
      })
    );
  
    res.render('cart', { products, message: null });
};
  
const removeFromCart = (req, res) => {
  const { productId } = req.body;
  const cart = req.session.cart;

  cart.items = cart.items.filter(item => item.productId !== productId);

  req.session.cart = cart;
  res.redirect("/cart");
};

const updateCartQuantity = (req, res) => {
  const { productId, quantity } = req.body;
  const cart = req.session.cart;

  const item = cart.items.find(item => item.productId === productId);
  if (item && quantity > 0) {
    item.quantity = quantity;
  }

  req.session.cart = cart;
  res.redirect("/cart");
};

module.exports = { addToCart, viewCart, removeFromCart, updateCartQuantity };
