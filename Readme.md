#  E-Learning Platform

A full-stack MERN e-learning platform that enables users to browse courses, enroll in free or premium content, track learning progress, and securely manage authentication. Built with React, Node.js, Express, MongoDB, and Stripe, the project follows modern web development practices with a scalable architecture.

🔗 **Live Application:** https://elearningfrontend-alpha.vercel.app

🔗 **Backend API:** https://elearningbackend-dhi6.onrender.com

---
<!-- 
# 📸 Preview

> Add screenshots or GIFs of the application here. -->

---

# ✨ Features

## 🔐 Authentication & Authorization

- User Registration & Login
- JWT Authentication using HTTP-only Cookies
- Persistent Login Sessions
- Protected Routes
- Role-Based Access Control (Admin/User)

---

## 📚 Course Management

- Browse Available Courses
- View Course Details
- Create, Update & Delete Courses (Admin)
- Slug-Based Course Routing

---

## 🎓 Enrollment & Learning

- Free Course Enrollment
- Paid Course Enrollment
- Lesson-by-Lesson Progress Tracking
- My Courses Dashboard
- Course Completion Status

---

## 💳 Payments

- Stripe Checkout Integration
- Secure Payment Verification
- Premium Course Access Control

---

## 📱 Responsive UI

- Modern User Interface
- Mobile-Friendly Design
- Loading States
- Toast Notifications
- Smooth Navigation

---

## 🛡 Backend Features

- RESTful API Architecture
- MVC Pattern
- Input Validation with Zod
- Centralized Error Handling
- Secure Cookie Handling
- Modular Folder Structure

---

# 🛠 Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Context API
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Zod Validation
- Stripe API
- Jest

---

# 📂 Project Structure

```
E-Learning-Platform/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── validators/
│   │   └── utils/
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Environment Variables

## Backend (.env)

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret

JWT_EXPIRES_IN=7d

STRIPE_SECRET_KEY=your_stripe_secret

FRONTEND_URL=https://elearningfrontend-alpha.vercel.app

NODE_ENV=production
```

## Frontend (.env)

```env
VITE_API_URL=https://elearningbackend-dhi6.onrender.com
```

---

# 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/yourusername/e-learning-platform.git

cd e-learning-platform
```

### Install Dependencies

Frontend

```bash
cd frontend
npm install
```

Backend

```bash
cd ../backend
npm install
```

---

# ▶️ Run Locally

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:5000
```

---

# 🌐 Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Payments | Stripe |

---

# 🚀 Future Improvements

- Course Reviews & Ratings
- Video Streaming Support
- Instructor Dashboard
- Quiz & Assignment Module
- Certificates of Completion
- Email Notifications
- Wishlist & Favorites
- Search & Filters

---

# 👨‍💻 Author

**Sharad Pal**

B.Tech Computer Science & Engineering

Full-Stack MERN Developer

GitHub: https://github.com/sharadpal8055

LinkedIn: https://linkedin.com/in/sharadpal8055