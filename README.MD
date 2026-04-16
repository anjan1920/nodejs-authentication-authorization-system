# 🔐 Authentication & Authorization System (Dev Version)

A full-stack authentication and authorization system built using **Node.js, Express.js, MongoDB, and JWT**.

This project implements a complete authentication lifecycle including **email verification, access & refresh token handling, password reset, and role-based access control**.

---

# 🚧 Project Version (Important)

This repository represents the **Development Version** of the system.

It focuses on:

* Core authentication logic
* Clean backend architecture
* Understanding of authentication flows

⚠️ This version is intentionally simplified for development clarity.
For production-grade security and scalability features, refer to the deployment version below.

---

# 🚀 Production / Deployment Version

👉 https://github.com/anjan1920/auth-system-backend

The production version includes advanced real-world features such as:

### 🔒 Security Enhancements

* Redis-based session management
* Rate limiting (prevents brute-force attacks)
* Improved secure logout handling

### 📧 External Services

* Brevo email API integration for:

  * Email verification
  * Password reset workflows

### ⚙️ Production Readiness

* Stronger validation & error handling
* Scalable architecture decisions
* Environment-based configurations

---

# 🧰 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Frontend

* HTML
* Tailwind CSS
* JavaScript (Fetch API)

---

# ✨ Features

## 🔑 Authentication

* User registration
* Email verification (dev: link in terminal)
* JWT-based login
* Access Token + Refresh Token
* Refresh token rotation
* Logout with token invalidation

## 👤 Account Management

* Forgot password
* Reset password
* Change password
* Get current logged-in user

## 🛡️ Authorization

* Role-based access control (Admin / User)
* Protected routes using middleware
* Admin endpoint to fetch all users

## 🔐 Security

* Password hashing using bcrypt
* HTTP-only cookie storage
* Token expiration handling
* Input validation using express-validator

---

# 🔄 Application Flow

## Registration

User Register
→ Validate input
→ Save user in DB
→ Generate email verification token
→ Display link in terminal

## Email Verification

User clicks verification link
→ Backend verifies token
→ Email marked as verified

## Login

User login
→ Verify password
→ Generate Access + Refresh tokens
→ Send tokens via HTTP-only cookies

## Protected Routes

Request
→ verifyJWT middleware
→ verifyRole middleware
→ Controller executes

## Refresh Token

Access token expires
→ Client sends refresh token
→ Server verifies
→ New tokens generated

## Logout

User logout
→ Clear cookies
→ Remove refresh token from DB

---

# 📡 API Endpoints

## Authentication

* POST `/api/v1/auth/register`
* POST `/api/v1/auth/login`
* POST `/api/v1/auth/logout`
* POST `/api/v1/auth/refresh-token`
* POST `/api/v1/auth/forgot-password`
* POST `/api/v1/auth/reset-password/:token`
* GET `/api/v1/auth/verify-email/:token`
* POST `/api/v1/auth/resend-verification`

## User

* GET `/api/v1/users/current-user`
* POST `/api/v1/users/change-password`
* DELETE `/api/v1/users/delete-me`

## Admin

* GET `/api/v1/admin/login`
* GET `/api/v1/admin/healthcheck`
* GET `/api/v1/admin/getAllUsers`

## System

* GET `/api/v1/home`

---

# 🧪 API Testing

All APIs tested using **Postman**

---

# 📁 Project Structure

backend/
├── src
│   ├── controllers
│   ├── db
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── utils
│   └── validators
├── app.js
├── index.js
└── .env

---

# ⚙️ Environment Variables

PORT=
MONGO_PASS=
MONGO_USER_ID=
MONGO_URI=

JWT_SECRET=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=15m

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=10d

---

# ⚡ Installation

git clone https://github.com/anjan1920/nodejs-authentication-authorization-system

npm install
npm run dev

---

# 💻 Development Note

* Email verification and password reset links appear in the **server terminal**
* Use **Ctrl + Click** to open links in browser

---

# 👨‍💻 Author

**Anjan Das**
LinkedIn: https://www.linkedin.com/in/anjan-das-22b278236
