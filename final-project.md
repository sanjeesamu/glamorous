# Glamorous E-commerce System Documentation

## **Table of Contents**
1. [Introduction](#introduction)
2. [Features](#features)
    - [Customer Features](#customer-features)
    - [Admin Features](#admin-features)
3. [Technologies Used](#technologies-used)
4. [Database Schema](#database-schema)
5. [Backend Architecture](#backend-architecture)
6. [Frontend Architecture](#frontend-architecture)
7. [Development Process](#development-process)
8. [Future Improvements](#future-improvements)
9. [Conclusion](#conclusion)

---

## **Introduction**
The **Glamorous** e-commerce platform is designed to provide a seamless shopping experience for customers and robust management tools for admins. It allows customers to browse products, apply filters, manage their shopping cart, and provide feedback. Admins can manage orders, view feedback, and control product listings.

---

## **Features**

### **Customer Features**
- **Browsable Categories with Products**:
  Customers can browse products categorized by type (e.g., clothing, electronics).
  
- **Product Filtering**:
  Customers can filter products by price range, rating, and categories to help them make quicker decisions.

- **Shopping Cart**:
  Customers can add products to the cart, adjust quantities, and view total costs before checkout.

- **Feedback Form**:
  A feedback section allows customers to submit reviews and ratings for products.

### **Admin Features**
- **Order Management**:
  Admins can manage all orders, change the status (e.g., Pending, Shipped), and view detailed customer order history.

- **Product Management**:
  Admins can add, update, or delete products from the catalog, including details like price, stock quantity, and description.

- **Feedback Management**:
  Admins can view and manage all customer feedback for products and the platform.

---

## **Technologies Used**
### **Frontend**
- **HTML**: Structure and content of web pages.
- **CSS**: Styling and layout using custom styles.
- **JavaScript**: Enhancing page interactivity, form handling, and dynamic content.
- **EJS (Embedded JavaScript)**: Templating engine for generating dynamic HTML.
- **Bootstrap**: For responsive design and pre-built UI components.

### **Backend**
- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for handling HTTP requests and routing.
- **MongoDB**: NoSQL database for data storage, including products, orders, and feedback.
- **Mongoose**: ODM (Object Data Modeling) tool for MongoDB to simplify database interactions.
  
### **Authentication**
- **Express-Session**: Session management to handle user login states (admin and customers).

---

## **Database Schema**
The application stores data in **MongoDB** using the following schemas:

### **Products Schema**
```js
const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  stock: Number,
  description: String,
});
