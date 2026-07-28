import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./routes/RequireAuth";
import RequireAdmin from "./routes/RequireAdmin";
//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from "../src/components/profile/Profile";

// Public pages
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Signup from "./pages/public/Signup";
import CourseDetail from "./pages/public/CourseDetail";

// User pages
import Dashboard from "./pages/user/Dashboard";
import Courses from "./pages/user/Courses";
import MyCourses from "./pages/user/MyCourses";
import CourseProgress from "./pages/user/CourseProgress";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";

// Payment
import PaymentSuccess from "./pages/payment/PaymentSuccess";

function App() {
  return (
    <>
      <Navbar />
  <main className="pt-16 min-h-screen">
      <Routes>
        {/* ===== Public Routes ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />

        {/* ===== User Protected Routes ===== */}
<Route
  path="/profile"
  element={
    <RequireAuth>
      <Profile />
    </RequireAuth>
  }
/>

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />

        <Route
          path="/my-courses"
          element={
            <RequireAuth>
              <MyCourses />
            </RequireAuth>
          }
        />

        <Route
          path="/progress/:enrollmentId"
          element={
            <RequireAuth>
              <CourseProgress />
            </RequireAuth>
          }
        />

        {/* ===== Admin Routes ===== */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />

        {/* ===== 404 ===== */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </main>
        <Footer />
    </>
  );
}

export default App;
