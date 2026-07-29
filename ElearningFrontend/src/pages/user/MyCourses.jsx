import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpen,
  Clock3,
  Globe,
  PlayCircle,
  User,
} from "lucide-react";
import api from "../../api/axios";
export default function MyCourses() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/enrollments/me")
      .then((res) => setEnrollments(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="h-36 animate-pulse rounded-2xl bg-white border" />

          <div className="mt-8 space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="grid grid-cols-1 lg:grid-cols-[260px_1fr] overflow-hidden rounded-2xl border bg-white"
              >
                <div className="h-60 animate-pulse bg-slate-200" />

                <div className="space-y-5 p-6">
                  <div className="h-7 w-1/2 animate-pulse rounded bg-slate-200" />

                  <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />

                  <div className="flex gap-3">
                    <div className="h-8 w-24 animate-pulse rounded-full bg-slate-100" />

                    <div className="h-8 w-24 animate-pulse rounded-full bg-slate-100" />

                    <div className="h-8 w-24 animate-pulse rounded-full bg-slate-100" />
                  </div>

                  <div className="h-2 rounded-full bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* ================= Header ================= */}
        <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">
                Dashboard
              </p>

              <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                My Learning
              </h1>

              <p className="mt-3 max-w-2xl text-slate-500">
                Continue where you left off, monitor your progress, and complete
                your learning journey.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-5">
                <p className="text-sm text-slate-500">Enrolled</p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {enrollments.length}
                </h2>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-5">
                <p className="text-sm text-slate-500">Completed</p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {enrollments.filter((e) => e.progressPercent === 100).length}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Empty State ================= */}

        {enrollments.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-16 text-center shadow-sm">
            <div className="text-6xl">📚</div>

            <h2 className="mt-5 text-2xl font-bold text-gray-800">
              No Courses Yet
            </h2>

            <p className="mt-3 text-gray-500">
              You haven't enrolled in any course yet.
            </p>

            <Link
              to="/courses"
              className="mt-8 inline-flex rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Continue Learning
              </h2>

              <p className="text-gray-500">
                {enrollments.length} Course
                {enrollments.length > 1 && "s"}
              </p>
            </div>

            <div className="space-y-6">
              {enrollments.map((enroll) => {
                if (!enroll.courseId) return null;

                const course = enroll.courseId;

                const total =
                  enroll.totalLessons ?? course.lessons?.length ?? 0;

                const completed = enroll.completedLessons ?? 0;

                const percent = enroll.progressPercent ?? 0;

                return (
                  <div
                    key={enroll._id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-lg"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr]">
                      {/* Thumbnail */}

                      <Link
                        to={`/courses/${course._id}`}
                        className="overflow-hidden"
                      >
                        {course.thumbnailUrl ? (
                          <img
                            src={course.thumbnailUrl}
                            alt={course.title}
                            className="h-full min-h-[220px] w-full object-cover transition duration-500 hover:scale-105"
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        ) : (
                          <div className="flex h-full min-h-[220px] items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-6xl font-bold text-white">
                            {course.title.charAt(0)}
                          </div>
                        )}
                      </Link>

                      {/* Right */}

                      <div className="flex flex-col p-6">
                        {/* Top */}

                        {/* Header */}

                        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                          <div className="flex-1">
                            <Link
                              to={`/courses/${course._id}`}
                              className="text-xl font-semibold tracking-tight text-slate-900 transition-colors hover:text-indigo-600"
                            >
                              {course.title}
                            </Link>

                            {course.subtitle && (
                              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                                {course.subtitle}
                              </p>
                            )}

                            {/* Metadata */}

                            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-600">
                              {course.faculty && (
                                <div className="flex items-center gap-2">
                                  <User size={16} className="text-slate-400" />
                                  <span>{course.faculty}</span>
                                </div>
                              )}

                              {course.language && (
                                <div className="flex items-center gap-2">
                                  <Globe size={16} className="text-slate-400" />
                                  <span>{course.language}</span>
                                </div>
                              )}

                              {course.duration && (
                                <div className="flex items-center gap-2">
                                  <Clock3
                                    size={16}
                                    className="text-slate-400"
                                  />
                                  <span>{course.duration}</span>
                                </div>
                              )}

                              {course.difficulty && (
                                <div className="flex items-center gap-2">
                                  <BookOpen
                                    size={16}
                                    className="text-slate-400"
                                  />
                                  <span>{course.difficulty}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Progress */}

                          <div className="min-w-[120px] text-left lg:text-right">
                            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                              Progress
                            </p>

                            <h2 className="mt-1 text-3xl font-bold text-slate-900">
                              {percent}%
                            </h2>
                          </div>
                        </div>

                        {/* Progress */}

                        {/* Progress */}

                        <div className="mt-8">
                          <div className="mb-3 flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-slate-700">
                                Course Progress
                              </p>

                              <p className="mt-1 text-sm text-slate-500">
                                {completed} of {total} lessons completed
                              </p>
                            </div>

                            <span className="text-sm font-semibold text-slate-700">
                              {percent}%
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-indigo-600 transition-all duration-700"
                              style={{
                                width: `${percent}%`,
                              }}
                            />
                          </div>
                        </div>
                        {/* Bottom */}

                        {/* Footer */}

                        <div className="mt-8 border-t border-slate-100 pt-6">
                          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                              {percent === 100 ? (
                                <div className="flex items-center gap-2 text-emerald-600">
                                  <Award size={18} />

                                  <span className="font-medium">
                                    Course Completed
                                  </span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 text-indigo-600">
                                  <PlayCircle size={18} />

                                  <span className="font-medium">
                                    Continue your learning journey
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="flex gap-3">
                              {percent === 100 && (
                                <Link
                                  to={`/certificates`}
                                  className="inline-flex items-center rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                  Certificate
                                </Link>
                              )}

                              <Link
                                to={`/my-learning/${enroll._id}`}
                                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black"
                              >
                                {percent === 100
                                  ? "Review Course"
                                  : "Resume Course"}

                                <ArrowRight size={16} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
