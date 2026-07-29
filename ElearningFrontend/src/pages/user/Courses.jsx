import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import api from "../../api/axios";
import CourseCard from "./CourseCard";
import toast from "react-hot-toast";
import { BookOpen, GraduationCap, Search } from "lucide-react";
export default function Courses() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [search, setSearch] = useState("");
  const totalCourses = courses.length;

  const enrolledCourses = enrollments.length;

  const totalCategories = useMemo(() => {
    return new Set(courses.map((c) => c.category).filter(Boolean)).size;
  }, [courses]);

  /* ===============================
     FETCH COURSES
  ================================ */
  useEffect(() => {
    api
      .get("/courses", { params: { search } })
      .then((res) => setCourses(res.data.data));
  }, [search]);

  /* ===============================
     FETCH ENROLLMENTS
  ================================ */
  useEffect(() => {
    if (!user) return;
    api
      .get("/enrollments/me")
      .then((res) => setEnrollments(res.data.data.map((e) => e.courseId._id)));
  }, [user]);

  /* ===============================
     ENROLL HANDLER
  ================================ */
  const enroll = async (course) => {
    if (!user) {
      toast.error("Login required to enroll");
      navigate("/login", {
        state: { redirectTo: `/courses/${course._id}` },
      });
      return;
    }

    try {
      // ✅ FREE COURSE
      if (course.price === 0) {
        await api.post("/enrollments", { courseId: course._id });
        toast.success("Enrolled successfully");
        setEnrollments((prev) => [...prev, course._id]);
        return;
      }

      // 💳 PAID COURSE → STRIPE
      const res = await api.post("/payments/checkout", {
        courseId: course._id,
      });

      window.location.href = res.data.url;
    } catch (err) {
      toast.error(err.response?.data?.message || "Enrollment failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Hero */}

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-indigo-600">
                Learning Platform
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                Explore Courses
              </h1>

              <p className="mt-3 max-w-2xl text-slate-500">
                Discover industry-focused courses, build practical skills, and
                learn from experienced instructors.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
                <BookOpen size={20} className="text-indigo-600" />

                <h2 className="mt-3 text-2xl font-bold">{totalCourses}</h2>

                <p className="text-sm text-slate-500">Courses</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
                <GraduationCap size={20} className="text-indigo-600" />

                <h2 className="mt-3 text-2xl font-bold">{enrolledCourses}</h2>

                <p className="text-sm text-slate-500">Enrolled</p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
                <BookOpen size={20} className="text-indigo-600" />

                <h2 className="mt-3 text-2xl font-bold">{totalCategories}</h2>

                <p className="text-sm text-slate-500">Categories</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}

        <div className="mt-8">
          <div className="relative max-w-xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by course title, instructor or category..."
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm outline-none transition focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Heading */}

        <div className="mt-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Available Courses
            </h2>

            <p className="mt-1 text-slate-500">
              {courses.length} course{courses.length !== 1 && "s"} available
            </p>
          </div>
        </div>

        {/* Grid */}

        <div className="mt-8">
          {courses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
              <Search size={40} className="mx-auto text-slate-300" />

              <h3 className="mt-5 text-xl font-semibold text-slate-900">
                No courses found
              </h3>

              <p className="mt-2 text-slate-500">
                Try searching with different keywords.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  enrolled={enrollments.includes(course._id)}
                  onEnroll={enroll}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
