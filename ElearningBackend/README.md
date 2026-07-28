# 🚀 E-Learning Platform Backend

A scalable, production-ready backend for an e-learning platform, built with **Node.js**, **Express**, and **MongoDB**.  
It handles authentication, course management, enrollments, payments, and role-based access control.

🔗 **Live API**: https://elearningbackend-dhi6.onrender.com

---

## 🧩 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Atlas)
- **ODM**: Mongoose
- **Authentication**: JWT (HTTP-only cookies)
- **Authorization**: Role-based (User / Admin)
- **Validation**: Zod
- **Payments**: Stripe (Test Mode)
- **Deployment**: Render
- **Testing**: Jest

---

## ✨ Core Features

### 🔐 Authentication & Security
- User signup & login
- JWT stored in **HTTP-only cookies**
- Secure cookie handling (`SameSite=None`, `Secure=true`)
- Role-based authorization (Admin / User)

### 📚 Courses
- Create, update, delete courses (Admin)
- Public course listing & details
- Slug-based routing

### 🎓 Enrollments
- Free & paid course enrollment
- Lesson-level progress tracking
- Enrollment ownership validation

### 💳 Payments
- Stripe Checkout (test mode)
- Paid course access control
- Payment verification before enrollment

### 🛡️ Robust Backend Design
- Centralized error handling
- Input validation with Zod
- Async handler pattern
- Clean MVC architecture

---

## 📂 Project Structure
src/
├── controllers/
├── routes/
├── models/
├── middleware/
├── validators/
├── utils/
├── config/
└── app.js
server.js

---

## ⚙️ Environment Variables

Create a `.env` file (never commit it):

```env
PORT=5000
MONGO_URI=my_mongodb_uri
JWT_SECRET=my_jwt_secret
JWT_EXPIRES_IN=7d
STRIPE_SECRET_KEY=sk_test_xxx
FRONTEND_URL:https://elearningfrontend-alpha.vercel.app
NODE_ENV=production
👨‍💻 Author

Sharad Pal
B.Tech CSE | Full-Stack Developer
