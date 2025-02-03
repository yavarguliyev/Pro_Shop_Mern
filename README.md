# ProShop eCommerce Platform

## 📖 Table of Contents

1. Features
2. Technologies Used
3. Getting Started
4. Environment Variables
5. Installation & Setup
6. Running the Application
7. Seeding the Database
8. Sample User Credentials
9. Deployment (Heroku)
10. API Documentation
11. License

---

## ✨ Features

- Full-featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with order history
- Admin dashboard for product and user management
- Order tracking with delivery status updates
- Secure checkout process with shipping and payment method selection
- PayPal and credit card payment integration
- Database seeding with sample users and products

---

## 🛠 Technologies Used

- **Frontend**: React, Redux, Bootstrap
- **Backend**: Node.js, Express.js, MongoDB (Mongoose ORM)
- **Authentication**: JWT (JSON Web Token)
- **Payment Gateway**: PayPal API
- **Environment Management**: dotenv
- **Database**: MongoDB Atlas / Local MongoDB
- **State Management**: Redux Toolkit
- **Deployment**: Heroku

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yavarguliyev/Pro_Shop_Mern.git
cd Pro_Shop_Mern
```

### 2. Environment Variables

Create a `.env` file in the root directory and add the following:

```bash
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
```

---

## 📦 Installation & Setup

### Install Dependencies

#### Install server and client dependencies:
```bash
npm install  # Install server-side dependencies
cd frontend && npm install  # Install client-side dependencies
```

---

## ▶️ Running the Application

### Start the Development Server
```bash
npm run dev  # Runs frontend (:3000) and backend (:5000) concurrently
```

### Run Backend Only
```bash
npm run server
```

---

## 🗄️ Seeding the Database

To populate the database with sample users and products or to clear existing data, use the following commands:

```bash
# Import sample data
npm run data:import

# Destroy existing data
npm run data:destroy
```

---

## 🔑 Sample User Credentials

Use the following credentials for testing:

```plaintext
Admin User:
Email: admin@example.com
Password: 123456

Regular User:
Email: john@example.com
Password: 123456

Email: jane@example.com
Password: 123456
```

---

## ☁️ Deployment (Heroku)

### 1. Login to Heroku
```bash
heroku login
```

### 2. Create a New Heroku App
```bash
heroku create your-app-name
```

### 3. Add a `Procfile`
Create a `Procfile` in the root directory and add:
```bash
web: node server.js
```

### 4. Update `package.json`
Add the following line under `scripts`:
```json
"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix frontend && npm run build --prefix frontend"
```

### 5. Push the Code to Heroku
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

### 6. Configure Environment Variables in Heroku
```bash
heroku config:set NODE_ENV=production
heroku config:set PORT=5000
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set PAYPAL_CLIENT_ID=your_paypal_client_id
```

### 7. Check Heroku Logs for Errors
```bash
heroku logs --tail
```

---

## 📜 API Documentation

You can check the API documentation [here](https://documenter.getpostman.com/view/11043766/TW6xo823).

---

## 📝 License

This project is licensed under the MIT License.

&copy; 2020 Yavar Guliyev

---

### 📌 Additional Resources

- [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
