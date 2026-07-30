import { Routes, Route, Navigate } from "react-router-dom";
import RequireAuth from "./routes/RequireAuth";
import RequireAdmin from "./routes/RequireAdmin";
//components
// import Navbar from "./components/Navbar";
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
import CoursePlayer from "./pages/user/course-player/CoursePlayer";
import Certificates from "./pages/user/Certificates";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import InterviewQuestions from "./pages/admin/InterviewQuestions";


// Payment
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import BackendWakeup from "./pages/public/BackendWakeup";
import { useEffect, useState } from "react";

import { checkBackend } from "./services/health.service";
import Navbar from "./components/navbar/Navbar";
import InterviewSubjects from "./pages/admin/InterviewSubjects";

function App() {
  const [serverReady, setServerReady] = useState(false);
  useEffect(() => {
    async function wakeServer() {
        try {
            await checkBackend();
            setServerReady(true);
        } catch {
            setTimeout(wakeServer, 3000);
        }
    }

    wakeServer();
}, []);
if (!serverReady) {
    return <BackendWakeup/>;
}
  return (
    <>
      {/* <Navbar /> */}
      <Navbar/>
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

          {/* <Route
          path="/progress/:enrollmentId"
          element={
            <RequireAuth>
              <CourseProgress />
            </RequireAuth>
          }
        /> */}

          <Route path="/my-learning/:enrollmentId" element={<CoursePlayer />} />

<Route
  path="/certificates"
  element={<Certificates />}
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
<Route
  path="/admin/interview"
  element={
    <RequireAdmin>
      <InterviewSubjects />
    </RequireAdmin>
  }
/>
<Route
  path="/admin/interview/:subjectId"
  element={
    <RequireAdmin>
      <InterviewQuestions />
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
