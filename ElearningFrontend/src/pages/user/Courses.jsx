import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import api from "../../api/axios";
import CourseCard from "./CourseCard";
import toast from "react-hot-toast";

export default function Courses() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [search, setSearch] = useState("");

  /* ===============================
     FETCH COURSES
  ================================ */
  useEffect(() => {
    api
      .get("/courses", { params: { search } })
      .then(res => setCourses(res.data.data));
  }, [search]);

  /* ===============================
     FETCH ENROLLMENTS
  ================================ */
  useEffect(() => {
    if (!user) return;
    api.get("/enrollments/me").then(res =>
      setEnrollments(res.data.data.map(e => e.courseId._id))
    );
  }, [user]);

  /* ===============================
     ENROLL HANDLER
  ================================ */
  const enroll = async (course) => {
    if (!user) {
      toast.error("Login required to enroll");
      navigate("/login", {
        state: { redirectTo: `/courses/${course._id}` }
      });
      return;
    }

    try {
      // ✅ FREE COURSE
      if (course.price === 0) {
        await api.post("/enrollments", { courseId: course._id });
        toast.success("Enrolled successfully");
        setEnrollments(prev => [...prev, course._id]);
        return;
      }

      // 💳 PAID COURSE → STRIPE
      const res = await api.post("/payments/checkout", {
        courseId: course._id
      });

      window.location.href = res.data.url;
    } catch (err) {
      toast.error(err.response?.data?.message || "Enrollment failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search courses..."
          className="border p-2 rounded w-full max-w-sm"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard
              key={course._id}
              course={course}
              enrolled={enrollments.includes(course._id)}
              onEnroll={enroll}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
