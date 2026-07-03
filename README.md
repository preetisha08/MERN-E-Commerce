# 🛍️ ShopEase — Full Stack MERN E-Commerce Application

ShopEase is a complete full-stack e-commerce web application built using the MERN stack. It provides a modern shopping experience with secure authentication, product management, cart functionality, online payments, order tracking, and a role-based admin dashboard.

The application is fully deployed and supports separate customer and admin workflows.

## 🌐 Live Demo

**Live Application:**  
https://shopease-frontend-c7rc.onrender.com

**Backend API:**  
https://mern-e-commerce-lyj5.onrender.com

> Note: The application is hosted on Render's free tier, so the backend may take a short time to wake up after inactivity.

---

## ✨ Key Features

### 👤 Customer Features

- User registration and login
- JWT-based authentication
- Protected routes
- Browse all products
- View individual product details
- Search products by name
- Filter products by category
- Filter products by maximum price
- Sort products by price and name
- Add products to cart
- Increase and decrease product quantity
- Secure checkout flow
- Razorpay test payment integration
- Payment signature verification
- Automatic cart clearing after successful payment
- Personal order history
- Order status tracking
- Professional toast notifications
- Loading states for API-based pages
- Responsive modern user interface

### 🛡️ Admin Features

- Role-based admin access
- Protected admin routes
- Admin dashboard
- Total users statistics
- Total products statistics
- Total orders statistics
- Total revenue overview
- Recent orders section
- Update order status
- Add new products
- Edit existing products
- Delete products
- Backend authorization for admin-only operations

---

## 💳 Payment Flow

ShopEase uses Razorpay in Test Mode for secure payment processing.

The complete payment flow includes:

1. Customer enters shipping details.
2. Backend creates a Razorpay order.
3. Razorpay Checkout opens.
4. Customer completes the test payment.
5. Backend verifies the Razorpay payment signature.
6. The order is saved in MongoDB.
7. Payment status is updated.
8. The shopping cart is cleared automatically.
9. The customer is redirected to the Orders page.

---

## 🧑‍💻 Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- React Context API
- React Hot Toast
- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt.js
- Razorpay

### Deployment & Tools

- MongoDB Atlas
- Render
- Git
- GitHub
- VS Code

---

## 🔐 Authentication & Authorization

The application uses JWT authentication to protect private routes.

### Customer Access

Customers can access:

- Cart
- Checkout
- Personal Orders

### Admin Access

Only users with the `admin` role can access:

- Admin Dashboard
- Add Product
- Edit Product
- Delete Product
- Order Status Management

Admin authorization is implemented on both the frontend and backend.

---

## 📦 Order Management

Each order stores:

- Customer information
- Shipping address
- Ordered products
- Product quantities
- Total price
- Razorpay payment ID
- Payment status
- Order status
- Order creation date

Available order statuses:

- Pending
- Processing
- Shipped
- Delivered
- Cancelled

---

## 🔍 Product Discovery

The Products page includes:

- Real-time product search
- Dynamic category filtering
- Maximum price filtering
- Price sorting from low to high
- Price sorting from high to low
- Alphabetical sorting from A to Z
- Alphabetical sorting from Z to A
- Clear filters functionality
- Dynamic result count

---

## 📁 Project Structure

```text
ECommerce/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── config/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```
