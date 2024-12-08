"use strict";

require("dotenv").config();

var mongoose = require("mongoose");

var Category = require("../models/Category");

var Product = require("../models/Product");

var Feedback = require("../models/Feedback");

var Order = require("../models/Order"); // // MongoDB connection


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); // const seedDatabase = async () => {
//   try {
//     // Sample Categories
//     const categories = [
//       { name: "Men", description: "Fashion items for men" },
//       { name: "Women", description: "Fashion items for women" },
//       { name: "Kids", description: "Fashion items for kids" },
//       { name: "Electronics", description: "Various electronic gadgets and accessories" },
//     ];
//     // Clear existing categories and insert new ones
//     await Category.deleteMany();
//     const insertedCategories = await Category.insertMany(categories);
//     console.log("Categories seeded:", insertedCategories);
//     // Sample Products
//     const products = [
//       // Men's Products
//       {
//         name: "Men's Jacket",
//         description: "Stylish men's jacket for winter",
//         price: 79.99,
//         image: "mens-jacket.jpg",
//         categoryId: insertedCategories[0]._id,
//       },
//       {
//         name: "Men's T-Shirt",
//         description: "Casual men's t-shirt",
//         price: 25.0,
//         image: "mens-tshirt.jpg",
//         categoryId: insertedCategories[0]._id,
//       },
//       {
//         name: "Men's Jeans",
//         description: "Durable men's denim jeans",
//         price: 49.99,
//         image: "mens-jeans.jpg",
//         categoryId: insertedCategories[0]._id,
//       },
//       {
//         name: "Men's Sneakers",
//         description: "Comfortable men's sneakers",
//         price: 69.99,
//         image: "mens-sneakers.jpg",
//         categoryId: insertedCategories[0]._id,
//       },
//       {
//         name: "Men's Watch",
//         description: "Classic analog watch for men",
//         price: 199.99,
//         image: "mens-watch.jpg",
//         categoryId: insertedCategories[0]._id,
//       },
//       // Women's Products
//       {
//         name: "Women's Dress",
//         description: "Elegant women's evening dress",
//         price: 120.5,
//         image: "womens-dress.jpg",
//         categoryId: insertedCategories[1]._id,
//       },
//       {
//         name: "Women's Handbag",
//         description: "Stylish women's handbag",
//         price: 80.0,
//         image: "womens-handbag.jpg",
//         categoryId: insertedCategories[1]._id,
//       },
//       {
//         name: "Women's Heels",
//         description: "Chic women's high heels",
//         price: 65.99,
//         image: "womens-heels.jpg",
//         categoryId: insertedCategories[1]._id,
//       },
//       {
//         name: "Women's Scarf",
//         description: "Soft and cozy scarf for women",
//         price: 20.0,
//         image: "womens-scarf.jpg",
//         categoryId: insertedCategories[1]._id,
//       },
//       {
//         name: "Women's Jacket",
//         description: "Warm women's winter jacket",
//         price: 95.0,
//         image: "womens-jacket.jpg",
//         categoryId: insertedCategories[1]._id,
//       },
//       // Kids' Products
//       {
//         name: "Kids' T-Shirt",
//         description: "Colorful kids' t-shirt for daily wear",
//         price: 15.0,
//         image: "kids-tshirt.jpg",
//         categoryId: insertedCategories[2]._id,
//       },
//       {
//         name: "Kids' Shorts",
//         description: "Comfortable shorts for kids",
//         price: 12.5,
//         image: "kids-shorts.jpg",
//         categoryId: insertedCategories[2]._id,
//       },
//       {
//         name: "Kids' Jacket",
//         description: "Warm kids' winter jacket",
//         price: 35.0,
//         image: "kids-jacket.jpg",
//         categoryId: insertedCategories[2]._id,
//       },
//       {
//         name: "Kids' Sneakers",
//         description: "Lightweight sneakers for kids",
//         price: 40.0,
//         image: "kids-sneakers.jpg",
//         categoryId: insertedCategories[2]._id,
//       },
//       {
//         name: "Kids' Hat",
//         description: "Cute and comfy hat for kids",
//         price: 10.0,
//         image: "kids-hat.jpg",
//         categoryId: insertedCategories[2]._id,
//       },
//       // Electronics Products
//       {
//         name: "Smartphone",
//         description: "Latest smartphone with advanced features",
//         price: 699.99,
//         image: "smartphone.jpg",
//         categoryId: insertedCategories[3]._id,
//       },
//       {
//         name: "Laptop",
//         description: "High-performance laptop for professionals",
//         price: 999.99,
//         image: "laptop.jpg",
//         categoryId: insertedCategories[3]._id,
//       },
//       {
//         name: "Smartwatch",
//         description: "Feature-rich smartwatch",
//         price: 199.99,
//         image: "smartwatch.jpg",
//         categoryId: insertedCategories[3]._id,
//       },
//       {
//         name: "Wireless Earbuds",
//         description: "Noise-cancelling wireless earbuds",
//         price: 150.0,
//         image: "wireless-earbuds.jpg",
//         categoryId: insertedCategories[3]._id,
//       },
//       {
//         name: "Tablet",
//         description: "Lightweight and portable tablet",
//         price: 299.99,
//         image: "tablet.jpg",
//         categoryId: insertedCategories[3]._id,
//       },
//     ];
//     // Clear existing products and insert new ones
//     await Product.deleteMany();
//     const insertedProducts = await Product.insertMany(products);
//     console.log("Products seeded:", insertedProducts);
//     // Close the database connection
//     mongoose.connection.close();
//     console.log("Database seeding completed.");
//   } catch (err) {
//     console.error(err);
//     mongoose.connection.close();
//   }
// };
// seedDatabase();
// const Admin = require("../models/Admin");
// async function createAdmin() {
//   try {
//     const existingAdmin = await Admin.findOne({ username: 'admin' });
//     if (existingAdmin) {
//       console.log('Admin user already exists.');
//       process.exit(0);
//     }
//     const admin = new Admin({
//       username: 'admin',
//       password: 'securepassword123', // Plain-text password, will be hashed in the schema
//     });
//     await admin.save();
//     console.log('Admin user created successfully.');
//     process.exit(0);
//   } catch (err) {
//     console.error('Error creating admin:', err);
//     process.exit(1);
//   }
// }
//createAdmin();
// Test data for Feedback

var feedbackData = [{
  name: "John Doe",
  email: "john.doe@example.com",
  message: "Great experience! The website was easy to use and the service was excellent.",
  date: new Date("2024-12-01T10:00:00Z")
}, {
  name: "Jane Smith",
  email: "jane.smith@example.com",
  message: "I had some issues with my order, but customer service resolved it quickly.",
  date: new Date("2024-12-02T15:30:00Z")
}, {
  name: "Alice Johnson",
  email: "alice.johnson@example.com",
  message: "The product quality is amazing! Highly recommended.",
  date: new Date("2024-12-03T08:45:00Z")
}, {
  name: "Bob Brown",
  email: "bob.brown@example.com",
  message: "The delivery was delayed, but the team was very communicative.",
  date: new Date("2024-12-04T12:00:00Z")
}]; // Test data for Orders

var seedOrders = function seedOrders() {
  var orders;
  return regeneratorRuntime.async(function seedOrders$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Order.deleteMany());

        case 3:
          orders = [{
            customerName: "Alice Doe",
            email: "alice@example.com",
            items: [{
              name: "Red Dress",
              quantity: 1,
              price: 50
            }, {
              name: "Blue Hat",
              quantity: 2,
              price: 20
            }],
            totalPrice: 90,
            status: "Pending"
          }, {
            customerName: "John Smith",
            email: "john@example.com",
            items: [{
              name: "Black Shoes",
              quantity: 1,
              price: 75
            }],
            totalPrice: 75,
            status: "Completed"
          }];
          _context.next = 6;
          return regeneratorRuntime.awrap(Order.insertMany(orders));

        case 6:
          console.log("Orders seeded successfully");
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error("Error seeding orders:", _context.t0);

        case 12:
          _context.prev = 12;
          mongoose.connection.close();
          return _context.finish(12);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9, 12, 15]]);
};

seedOrders(); // Seed the database
// async function seedDatabase() {
//   try {
//    // await Feedback.deleteMany();
//     await Order.deleteMany();
//     // const feedbackInserted = await Feedback.insertMany(feedbackData);
//     // console.log(`Inserted ${feedbackInserted.length} feedback records.`);
//     const ordersInserted = await Order.insertMany(orderData);
//     console.log(`Inserted ${ordersInserted.length} order records.`);
//     mongoose.disconnect();
//     console.log("Database seeding completed!");
//   } catch (error) {
//     console.error("Error seeding the database:", error);
//     mongoose.disconnect();
//   }
// }
//seedDatabase();