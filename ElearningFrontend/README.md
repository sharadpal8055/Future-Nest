
---

---

# 📗 Frontend README — `ElearningFrontend`


# 🎓 E-Learning Platform Frontend

A modern, responsive frontend for an e-learning platform built with **React** and **Vite**, featuring secure authentication, role-based routing, and real-world UX patterns.

🔗 **Live APP**: https://elearningfrontend-alpha.vercel.app

---

## 🧩 Tech Stack

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Auth Strategy**: Cookie-based JWT
- **Notifications**: React Hot Toast
- **Deployment**: Vercel

---

## ✨ Features

### 🔐 Authentication
- Signup / Login / Logout
- Persistent login via cookies
- Protected routes
- Admin-only routes

### 📚 Courses
- Browse all courses
- Course detail view
- Enroll in free & paid courses

### 🎓 Learning Experience
- My Courses dashboard
- Lesson-wise progress tracking
- Visual completion percentage

### 🛡️ Access Control
- `RequireAuth` route guard
- `RequireAdmin` role guard
- Automatic redirect after login

### 📱 UI/UX
- Fully responsive design
- Clean navigation with mobile menu
- Optimized production build

---

## 📂 Project Structure

src/
├── api/
├── auth/
├── components/
├── pages/
├── routes/
├── App.jsx
└── main.jsx


---

## ⚙️ Environment Variables



```env
VITE_API_URL=https://elearningbackend-dhi6.onrender.com

👨‍💻 Author

Sharad Pal
B.Tech CSE | Full-Stack Developer
