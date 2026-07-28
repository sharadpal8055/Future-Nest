import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../auth/useAuth";
import toast from "react-hot-toast";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  /* ===============================
     Fetch course
  ================================ */
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data.data);
      } catch {
        toast.error("Course not found");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  /* ===============================
     Check enrollment status
  ================================ */
  useEffect(() => {
    if (!user) return;

    const checkEnrollment = async () => {
      try {
        const res = await api.get("/enrollments/me");
        const exists = res.data.data.some(
          e => e.courseId?._id === id
        );
        setEnrolled(exists);
      } catch {
        setEnrolled(false);
      }
    };

    checkEnrollment();
  }, [id, user]);

  /* ===============================
     Enroll handler
  ================================ */
  const enroll = async () => {
    if (!user) {
      toast.error("Please login to enroll");

      // ✅ CRITICAL FIX: redirect with return path
      navigate("/login", {
        state: { redirectTo: `/courses/${id}` }
      });
      return;
    }

    if (enrolled) {
      toast("You are already enrolled", { icon: "✅" });
      return;
    }

    try {
      setEnrolling(true);
      await api.post("/enrollments", { courseId: id });
      toast.success("Enrolled successfully");
      setEnrolled(true);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Enrollment failed"
      );
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <p className="p-10 text-center text-gray-500">
        Loading course…
      </p>
    );
  }

  if (!course) return null;

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6 sm:p-8 space-y-8">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 items-start">
          {/* Thumbnail */}
          {course.thumbnailUrl && (
            <div className="w-full max-w-[240px] mx-auto md:mx-0">
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                className="w-full h-40 object-cover rounded-xl shadow-sm"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}

          {/* Content */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight">
              {course.title}
            </h1>

            <p className="text-gray-600 text-sm sm:text-base">
              {course.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <Badge label={course.category || "General"} />
              <Badge label={course.difficulty || "Beginner"} />
              <Badge
                label={course.price ? `₹${course.price}` : "Free"}
                variant="price"
              />
            </div>

            <button
              onClick={enroll}
              disabled={enrolling || enrolled}
              className={`inline-flex items-center justify-center
                px-6 py-2.5 rounded-lg font-semibold transition
                ${
                  enrolled
                    ? "bg-green-100 text-green-700 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }
                disabled:opacity-60`}
            >
              {enrolled
                ? "Already Enrolled"
                : enrolling
                ? "Enrolling..."
                : "Enroll Now"}
            </button>
          </div>
        </div>

        {/* Syllabus */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Course Syllabus
          </h2>

          <div className="space-y-2">
            {course.lessons?.length > 0 ? (
              course.lessons.map((lesson, idx) => (
                <div
                  key={lesson._id || idx}
                  className="flex justify-between items-center
                    border rounded-lg px-4 py-3 text-sm hover:bg-gray-50"
                >
                  <span>
                    {idx + 1}. {lesson.title}
                  </span>
                  <span className="text-gray-400">
                    Lesson
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                Lessons will be added soon.
              </p>
            )}
          </div>
        </section>

        {/* Instructor */}
        <InstructorSection />
      </div>
    </div>
  );
}

/* -------------------- UI PARTS -------------------- */

function Badge({ label, variant }) {
  const base =
    "px-3 py-1 rounded-full text-xs font-medium capitalize";

  const styles =
    variant === "price"
      ? "bg-green-50 text-green-600"
      : "bg-indigo-50 text-indigo-600";

  return <span className={`${base} ${styles}`}>{label}</span>;
}

function InstructorSection() {
  return (
    <section className="border-t pt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        Instructor
      </h2>

      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-full bg-indigo-100
          flex items-center justify-center text-indigo-600 font-bold"
        >
          JD
        </div>

        <div>
          <p className="font-medium text-gray-800">
            John Doe
          </p>
          <p className="text-sm text-gray-600">
            Senior Software Engineer • 10+ years experience
          </p>
        </div>
      </div>
    </section>
  );
}
