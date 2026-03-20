

## 📌 Auth System 

### 1. Overview

Node.js + Express + MongoDB + JWT + Nodemailer
Features: Register, Email verify, Login, Refresh token, Forgot/Reset password, Roles, Admin routes

---

### 2. Architecture

Client → Express → Routes → Middleware → Controller → DB → Response

---

### 3. Server Start

`index.js → connectDB → app.listen`
All requests handled by `app.js`

---

### 4. Folder Structure

* controllers → logic
* db → MongoDB connection
* middlewares → auth, role, validation
* models → user schema
* routes → API endpoints
* utils → helpers
* validators → request rules
* app.js → config
* index.js → entry

---

### 5. Request Flow

Client → Route → Validation → Auth → Role → Controller → DB → Response

---

### 6. Middleware

**verifyJWT (Auth)**

* Get token (cookie/header)
* Verify JWT
* Get user → attach `req.user`

👉 Auth = Who you are

**verifyRole (Authorization)**

* Check `req.user.role`
  👉 Authorization = What you can access

---

### 7. Register

POST `/auth/register`

* Check user exists
* Create user (not verified)
* Generate token
* Store hashed token
* Send email

---

### 8. Email Verify

POST `/verify-email/:token`

* Hash token
* Find user
* Mark verified

---

### 9. Login

POST `/auth/login`

* Check email + password
* Generate access + refresh tokens
* Send via cookies

---

### 10. Token System

* Access → short (API auth)
* Refresh → long (get new access)

---

### 11. Forgot Password

POST `/forgot-password`

* Generate reset token
* Store hashed
* Send email link

---

### 12. Reset Password

POST `/reset-password/:token`

* Verify token + expiry
* Update password

---

### 13. Current User

GET `/current-user`

* Verify token
* Return user (no sensitive data)

---

### 14. Change Password

POST `/change-password`

* Check old password
* Update new

---

### 15. Logout

POST `/logout`

* Remove refresh token
* Clear cookies

---

### 16. Delete User

* Verify token + password
* Delete user
* Clear tokens

---

### 17. Admin Routes

Example: `/users`
Flow: verifyJWT → verifyRole("admin") → controller

---

### 18. Security

* bcrypt hashing
* JWT auth
* HTTP-only cookies
* Email verification
* Hashed tokens in DB

---

### 19. Example Flow

GET `/healthcheck`
Client → route → middleware → controller → response

---

---

If you want, I can make this into:
👉 1-page cheat sheet
👉 or viva explanation script (very useful for placements)
