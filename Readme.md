# 🎓 E-Learning Platform

A feature-rich **Full Stack MERN Learning Management System (LMS)** that enables students to learn through structured courses, practice interview questions, access study notes, track learning progress, and securely purchase premium content.

Built using the **MERN Stack (MongoDB, Express.js, React, Node.js)** with **Stripe**, **Cloudinary**, and modern web technologies following scalable software architecture and best development practices.

🌐 **Live Demo:** https://future-nest-jet.vercel.app

🚀 **Backend API:** https://elearningbackend-dhi6.onrender.com


**Movie Recommendation API:**  
https://futurenest-movie-api.onrender.com
**Chatbot API:**  
https://future-nest-chatbot.onrender.com/

---

# 🚀 Project Highlights

- 🔐 Secure JWT Authentication
- 🎓 Course Enrollment & Progress Tracking
- 💳 Stripe Payment Integration
- 📚 Digital Library
- 📄 PDF Notes Viewer
- 💼 Interview Preparation Module
- ☁️ Cloudinary Image & PDF Storage
- 👨‍💼 Admin Dashboard
- 📈 Learning Analytics
- 📱 Fully Responsive Design

---

# ✨ Features

## 🔐 Authentication & Authorization

- User Registration & Login
- JWT Authentication using HTTP-only Cookies
- Persistent Login Sessions
- Protected Routes
- Role-Based Access Control (Admin/User)
- Secure Logout
- Profile Management
- Avatar Upload (Cloudinary)
- Password Update
- Delete Account

---

## 📚 Course Management

- Browse Available Courses
- Course Detail Page
- Rich Course Information
- Free & Premium Courses
- Create Courses (Admin)
- Edit Courses (Admin)
- Delete Courses (Admin)
- Publish / Draft Support
- Slug-Based Routing

---

## 🎓 Learning Experience

- Free Course Enrollment
- Premium Course Enrollment
- Interactive Course Player
- Lesson-by-Lesson Navigation
- Learning Progress Tracking
- Continue Learning
- My Courses Dashboard
- Course Completion Status
- Certificates Section

---

## 📖 Digital Library

- Study Notes Repository
- Built-in PDF Viewer
- Responsive PDF Reader
- Download Notes
- Search Notes
- Subject Filtering
- Notes Upload (Admin)
- Edit Notes (Admin)
- Delete Notes (Admin)
- Cloudinary PDF Storage

---

# 🎯 Fun Corner

FutureNest includes a dedicated **Fun Corner** where students can explore interactive and AI-powered utilities outside the core learning modules.

### Current Fun Corner Feature

🎬 **Movie Recommendation System**

Students can select a movie and receive similar movie recommendations using a Machine Learning recommendation model.

### Workflow

````text
Student
   ↓
Fun Corner
   ↓
Movie Recommendation
   ↓
Select Favourite Movie
   ↓
FastAPI Movie API
   ↓
ML Recommendation Engine
   ↓
similarity.pkl
   ↓
Top 5 Similar Movies
   ↓
React UI
## 💼 Interview Preparation

- Subject-wise Interview Questions
- Detailed Questions & Answers
- Difficulty Levels
- Tags for Easy Filtering
- Subject Management (Admin)
- Question CRUD (Admin)

---

## 👨‍💼 Admin Dashboard

- Course Management
- Student Management
- Enrollment Management
- Notes Management
- Interview Subject Management
- Interview Question Management
- Dashboard Statistics

---

## 💳 Payments

- Stripe Checkout
- Secure Payment Verification
- Premium Course Access
- Payment Success Page

---

## 📱 Responsive UI

- Fully Responsive Design
- Mobile Friendly
- Modern Dashboard
- Interactive PDF Viewer
- Loading States
- Toast Notifications
- Clean Navigation
- Beautiful Admin Panel

---

## ☁️ Cloud Storage

- Image Uploads
- PDF Uploads
- Secure Cloudinary Storage
- Automatic File Management

---

## 🛡 Backend Features

- RESTful API Architecture
- MVC Architecture
- JWT Authentication
- Zod Validation
- Centralized Error Handling
- Multer File Upload
- Cloudinary Integration
- Cookie-Based Authentication
- Modular Folder Structure

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Context API
- React Hot Toast
- React PDF
- Lucide React

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Zod
- Stripe
- Cloudinary
- Multer
- Cookie Parser
- CORS

---

# 📂 Project Structure

```text
E-Learning-Platform/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   │
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
│   │   ├── utils/
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
└── README.md
````

---

# ⚙️ Environment Variables

## Backend (.env)

```env
PORT=5000

NODE_ENV=production

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret

JWT_EXPIRES_IN=7d

FRONTEND_URL=http://localhost:5173

STRIPE_SECRET_KEY=your_stripe_secret_key

STRIPE_WEBHOOK_SECRET=your_webhook_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

## Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/sharadpal8055/E-Learning-Platform.git

cd E-Learning-Platform
```

---

## Install Dependencies

### Frontend

```bash
cd frontend

npm install
```

### Backend

```bash
cd backend

npm install
```

---

# ▶️ Run Locally

## Start Backend

```bash
cd backend

npm run dev
```

Runs at:

```text
http://localhost:5000
```

---

## Start Frontend

```bash
cd frontend

npm run dev
```

Runs at:

```text
http://localhost:5173
```

---

# 🌐 Deployment

| Service      | Platform      |
| ------------ | ------------- |
| Frontend     | Vercel        |
| Backend      | Render        |
| Database     | MongoDB Atlas |
| File Storage | Cloudinary    |
| Payments     | Stripe        |

---

# 📌 Core Modules

- Authentication
- User Dashboard
- Course Management
- Course Player
- Learning Progress
- Digital Library
- PDF Notes Viewer
- Interview Preparation
- Admin Dashboard
- Payments
- Profile Management

---

# 🚀 Future Enhancements

### 🤖 AI Features

- AI Personalized Learning Roadmap Generator
- AI Course Recommendation System
- AI Skill Gap Analysis
- AI Learning Assistant (Chatbot)
- AI Quiz Generator
- AI Mock Interview Generator
- AI Study Planner
- AI Smart Notes Recommendation

### 📚 Learning Features

- Video Streaming
- Adaptive Learning Paths
- Coding Playground
- Assignments
- Practice Tests
- Live Classes
- Discussion Forums
- Learning Streaks

### 👨‍🏫 Instructor Features

- Instructor Dashboard
- Course Analytics
- Revenue Dashboard
- Student Performance Reports

### 🎯 Student Features

- Course Wishlist
- Course Reviews & Ratings
- Learning Calendar
- Email Notifications
- Push Notifications
- Certificate Generation
- Achievement Badges
- Leaderboards

### 🌍 Platform Features

- Progressive Web App (PWA)
- Mobile Application
- Dark Mode
- Multi-language Support
- Advanced Search
- Recommendation Engine
- Social Login
- Real-time Notifications

---

# 👨‍💻 Author

## Sharad Pal

**B.Tech Computer Science & Engineering**

**Full Stack MERN Developer**

### Connect with me

- GitHub: https://github.com/sharadpal8055
- LinkedIn: https://linkedin.com/in/sharadpal8055

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.
