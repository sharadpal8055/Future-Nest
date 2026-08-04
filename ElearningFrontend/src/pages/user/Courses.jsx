import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import api from "../../api/axios";
import CourseCard from "./CourseCard";
import toast from "react-hot-toast";

import {
  Search,
  BookOpen,
  GraduationCap,
  Grid3X3,
  Sparkles,
} from "lucide-react";

export default function Courses() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const [search, setSearch] = useState("");

  const totalCourses = courses.length;
  const enrolledCourses = enrollments.length;

  const totalCategories = useMemo(() => {
    return new Set(
      courses.map((c) => c.category).filter(Boolean)
    ).size;
  }, [courses]);

  /* ---------------- Fetch Courses ---------------- */

  useEffect(() => {
    api
      .get("/courses", {
        params: { search },
      })
      .then((res) => {
        setCourses(res.data.data);
      });
  }, [search]);

  /* ---------------- Fetch Enrollments ---------------- */

  useEffect(() => {
    if (!user) return;

    api.get("/enrollments/me").then((res) => {
      setEnrollments(
        res.data.data.map((e) => e.courseId._id)
      );
    });
  }, [user]);

  /* ---------------- Enroll ---------------- */

  async function enroll(course) {
    if (!user) {
      toast.error("Login required");

      navigate("/login", {
        state: {
          redirectTo: `/courses/${course._id}`,
        },
      });

      return;
    }

    try {
      if (course.price === 0) {
        await api.post("/enrollments", {
          courseId: course._id,
        });

        toast.success("Enrolled successfully");

        setEnrollments((prev) => [
          ...prev,
          course._id,
        ]);

        return;
      }

      const res = await api.post(
        "/payments/checkout",
        {
          courseId: course._id,
        }
      );

      window.location.href = res.data.url;
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Enrollment failed"
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* HERO */}

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="relative">

            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 opacity-95" />

            <div className="relative z-10 p-8 lg:p-12">

              <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

                <div className="max-w-2xl">

                  <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur">

                    <Sparkles size={16} />

                    Learn • Practice • Grow

                  </div>

                  <h1 className="mt-6 text-4xl font-bold tracking-tight text-white lg:text-5xl">

                    Discover Professional Courses

                  </h1>

                  <p className="mt-5 text-lg leading-8 text-indigo-100">

                    Explore carefully curated courses,
                    learn from experienced instructors,
                    and build industry-ready skills.

                  </p>

                </div>

                <div className="grid grid-cols-3 gap-4">

                  <div className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur">

                    <BookOpen
                      className="mx-auto text-white"
                      size={26}
                    />

                    <h2 className="mt-3 text-3xl font-bold text-white">

                      {totalCourses}

                    </h2>

                    <p className="text-sm text-indigo-100">

                      Courses

                    </p>

                  </div>

                  <div className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur">

                    <GraduationCap
                      className="mx-auto text-white"
                      size={26}
                    />

                    <h2 className="mt-3 text-3xl font-bold text-white">

                      {enrolledCourses}

                    </h2>

                    <p className="text-sm text-indigo-100">

                      Enrolled

                    </p>

                  </div>

                  <div className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur">

                    <Grid3X3
                      className="mx-auto text-white"
                      size={26}
                    />

                    <h2 className="mt-3 text-3xl font-bold text-white">

                      {totalCategories}

                    </h2>

                    <p className="text-sm text-indigo-100">

                      Categories

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* SEARCH */}

        <section className="sticky top-20 z-20 mt-8">

          <div className="rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-lg backdrop-blur">

            <div className="relative">

              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search courses, instructors or categories..."
                className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 pl-14 pr-5 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
              />

            </div>

          </div>

        </section>

        {/* SECTION HEADER */}

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900">

              Available Courses

            </h2>

            <p className="mt-2 text-slate-500">

              {courses.length} course
              {courses.length !== 1 && "s"} available

            </p>

          </div>

        </div>
                {/* COURSE GRID */}

        <div className="mt-10">

          {courses.length === 0 ? (

            <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-24 text-center shadow-sm">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">

                <Search
                  size={34}
                  className="text-slate-400"
                />

              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">

                No Courses Found

              </h3>

              <p className="mx-auto mt-3 max-w-md text-slate-500">

                We couldn't find any course matching your
                search. Try another keyword or browse all
                available courses.

              </p>

              <button
                onClick={() => setSearch("")}
                className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
              >
                Clear Search
              </button>

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