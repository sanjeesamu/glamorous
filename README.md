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
8. [Conclusion](#conclusion)

---

## **Introduction**
The **Glamorous** e-commerce platform is designed to provide a shopping experience for customers and management tools for admins. It allows customers to browse products, apply filters, manage their shopping cart, and provide feedback. Admins can manage orders and view feedback.

---

## **Features**

### **Customer Features**
- **Browsable Categories with Products**:
  Customers can browse products categorized by type (e.g., clothing, electronics).
  
- **Product Filtering**:
  Customers can filter products by price range, rating, and categories to help them make quicker decisions.

- **Shopping Cart**:
  Customers can add products to the cart.

- **Feedback Form**:
  A feedback section allows customers to submit reviews and ratings for products.

### **Admin Features**
- **Order Management**:
  Admins can change the status (e.g., Pending, Completed).

- **Feedback Management**:
  Admins can view all customer feedback for products and the platform.

---

## **Technologies Used**

### **Backend**
- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for handling HTTP requests and routing.
- **MongoDB**: NoSQL database for data storage, including products, orders, and feedback.
- **Mongoose**: ODM (Object Data Modeling) tool for MongoDB to simplify database interactions.

### **Frontend**
- **HTML**: Structure and content of web pages.
- **CSS**: Styling and layout using custom styles.
- **EJS (Embedded JavaScript)**: Templating engine for generating dynamic HTML.

### **Authentication**
- **Express-Session**: Session management to handle user login states (admin and customers).

---

## **Database Schema**
The application stores data in **MongoDB** using the following schemas:

### **Categories Schema**
```js
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});
```

### **Products Schema**
```js
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, // Reference to Category
});
```

### **Feedback Schema**
```js
const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});
```

### **Order Schema**
```js
const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed", "Cancelled"],
    default: "Pending",
  },
  date: { type: Date, default: Date.now },
});
```

### **Admin Schema**
```js
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

```

## Backend Architecture
The backend is built with **Node.js** and **Express.js** for routing and handling HTTP requests.

### Admin Routes
- **POST /login**: Admin login.
- **GET /orders**: Admin order management (protected route)
- **GET /feedback**: Admin feedbacks view (protected route)

- **GET /products**: Route for filtered products
- **GET /categories**: Route for browse categories
- **POST /feedback**: Route for submit feedback

### Controllers
- **Product Controller**: Handles operations for products.
- **Categories Controller**: Handles operations categories.
- **Feedback Controller**: Handles feedback form submissions.
- **AdminController**: Handles operations for admin.

---

## Frontend Architecture
The frontend utilizes **EJS** templates to render dynamic data, such as product lists, user carts, and order status. 

### EJS Templates:
- **home.ejs**: Home page with category listings and featured products.
- **product.ejs**: Displays a filtered product's details.
- **cart.ejs**: Shows items added to the cart.
- **admin.ejs**: Admin dashboard for managing orders, and view customers feedback.

---

## Development Process
### 1. Planning
- Identified features and user roles (customer and admin).
- Designed database schema to support the application’s needs.

### 2. Backend Development
-  Developed using Node.js, which is a JavaScript runtime that enables building scalable server-side applications, and Express, a web framework for Node.js that simplifies the process of handling HTTP requests and routing.
- Implemented session management for admin login and authentication.

### 3. Frontend Development
- Designed the UI with **Bootstrap** for responsiveness and used **EJS** for dynamic content rendering.
- Implemented JavaScript for interactive features like adding to the cart.

### 4. Testing
- Unit testing for backend routes and database operations.
- Manual testing of the user interface to ensure proper functionality across devices.

---

## Conclusion
The **Glamorous** e-commerce platform provides a simple features and admin interface. Built with **Node.js**, **Express.js**, and **MongoDB**, the app is highly scalable and can be expanded with additional features in the future. This documentation provides a comprehensive overview of the app’s architecture, technologies used, and its functionality.
