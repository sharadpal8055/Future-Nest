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
        const exists = res.data.data.some((e) => e.courseId?._id === id);
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
        state: { redirectTo: `/courses/${id}` },
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
      toast.error(err.response?.data?.message || "Enrollment failed");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return <p className="p-10 text-center text-gray-500">Loading course…</p>;
  }

  if (!course) return null;

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6 sm:p-8 space-y-8">
        {/* ================= Hero Section ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8">
          {/* Thumbnail */}
          <div className="space-y-4">
            {course.thumbnailUrl ? (
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                className="w-full h-64 sm:h-72 lg:h-80 object-cover rounded-2xl shadow-lg"
                onError={(e) => (e.target.style.display = "none")}
              />
            ) : (
              <div className="w-full h-64 sm:h-72 lg:h-80 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                {course.title.charAt(0)}
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <InfoCard title="Duration" value={course.duration || "N/A"} />

              <InfoCard title="Language" value={course.language || "N/A"} />

              <InfoCard title="Level" value={course.difficulty} />

              <InfoCard title="Category" value={course.category} />
            </div>
          </div>

          {/* Course Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {course.title}
              </h1>

              {course.subtitle && (
                <p className="mt-3 text-lg text-gray-600">{course.subtitle}</p>
              )}
            </div>

            {/* Instructor */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium">
                {course.faculty}
              </span>

              <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full font-medium">
                 {course.averageRating || "New"}
              </span>

              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
                 {course.enrollmentCount} Students
              </span>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold mb-2">About this course</h2>

              <p className="text-gray-600 leading-7">{course.description}</p>
            </div>

            {/* Price + CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div>
                <p className="text-3xl font-bold text-indigo-600">
                  {course.price === 0 ? "Free" : `₹${course.price}`}
                </p>
              </div>

              <button
                onClick={enroll}
                disabled={enrolling || enrolled}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300
        ${
          enrolled
            ? "bg-green-100 text-green-700 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 text-white"
        }`}
              >
                {enrolled
                  ? "Already Enrolled"
                  : enrolling
                    ? "Enrolling..."
                    : course.price > 0
                      ? "Buy Course"
                      : "Enroll Now"}
              </button>
            </div>
          </div>
        </div>

{/* ================= Learning Outcomes ================= */}
{course.learningOutcomes?.length > 0 && (
  <section className="mt-12">
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        What You'll Learn
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {course.learningOutcomes.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-xl bg-green-50 p-4"
          >
            <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white text-sm font-bold">
              ✓
            </div>

            <p className="text-gray-700 leading-6">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
)}

{/* ================= Requirements ================= */}
{course.requirements?.length > 0 && (
  <section className="mt-8">
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="text-2xl font-bold mb-6">
        Requirements
      </h2>

      <ul className="space-y-4">
        {course.requirements.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3"
          >
            <span className="text-indigo-600 text-xl">
              •
            </span>

            <span className="text-gray-700 leading-7">
              {item}
            </span>
          </li>
        ))}
      </ul>

    </div>
  </section>
)}


        {/* Syllabus */}
        
       {/* ================= Course Content ================= */}
<section className="mt-10">
  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
    {/* Header */}
    <div className="border-b border-gray-200 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Course Content
          </h2>

          <p className="mt-1 text-gray-500">
            {course.lessons?.length || 0} Lessons
          </p>
        </div>

        <span className="self-start rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
          {course.duration || "Self Paced"}
        </span>
      </div>
    </div>

    {/* Lessons */}
    {course.lessons?.length > 0 ? (
      <div>
        {course.lessons.map((lesson, index) => (
          <div
            key={lesson._id || index}
            className="border-b border-gray-100 px-5 py-5 transition-colors hover:bg-gray-50 last:border-b-0"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Left */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                  {index + 1}
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {lesson.title}
                  </h3>

                  {lesson.description && (
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      {lesson.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-wrap items-center gap-2">
                {lesson.duration && (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    ⏱ {lesson.duration}
                  </span>
                )}

                {lesson.isPreview ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Preview
                  </span>
                ) : (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    Locked
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="p-8 text-center">
        <p className="text-gray-500">
          Lessons will be added soon.
        </p>
      </div>
    )}
  </div>
</section>

{/* ================= Instructor ================= */}
<InstructorSection course={course} />

   
      </div>
    </div>
  );
}

/* -------------------- UI PARTS -------------------- */

function Badge({ label, variant = "default" }) {
  const styles = {
    default: "bg-indigo-50 text-indigo-700",
    price: "bg-green-50 text-green-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[variant] || styles.default
      }`}
    >
      {label}
    </span>
  );
}
function InstructorSection({ course }) {
  const instructor = course?.faculty || "Instructor";

  const initials = instructor
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        Instructor
      </h2>

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {/* Avatar */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl font-bold text-white">
          {initials}
        </div>

        {/* Details */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">
            {instructor}
          </h3>

          <p className="mt-2 text-gray-600 leading-7">
            Dedicated instructor passionate about helping students build
            practical skills through real-world projects and structured
            learning.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <InfoCard
              title="Students"
              value={course?.enrollmentCount ?? 0}
            />

            <InfoCard
              title="Rating"
              value={course?.averageRating ?? "New"}
            />

            <InfoCard
              title="Courses"
              value="1"
            />

            <InfoCard
              title="Language"
              value={course?.language || "N/A"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
function InfoCard({ title, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center transition hover:border-indigo-200 hover:bg-indigo-50">
      <p className="text-xs uppercase tracking-wider text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-lg font-semibold text-gray-900">
        {value}
      </p>
    </div>
  );
}