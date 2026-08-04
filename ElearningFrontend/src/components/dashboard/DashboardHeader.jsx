import { Link } from "react-router-dom";
import {
  BookOpen,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function DashboardHeader({
  user,
  enrolled = 0,
  certificates = 0,
}) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 text-white shadow-xl">

      {/* Decorative Blur */}

      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

      <div className="relative p-8 lg:p-10">

        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

          {/* Left */}

          <div className="max-w-2xl">

            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">

              <Sparkles size={16} />

              Welcome Back

            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight lg:text-5xl">

              {greeting},

              <span className="block">
                {user?.name}
              </span>

            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-indigo-100">

              Continue building your skills, complete courses,
              and earn verified certificates to strengthen
              your portfolio.

            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                to="/courses"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:scale-105"
              >
                Explore Courses

                <ArrowRight size={18} />
              </Link>

              <Link
                to="/my-courses"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 backdrop-blur transition hover:bg-white/20"
              >
                Continue Learning
              </Link>

            </div>

          </div>

          {/* Right */}

          <div className="grid w-full max-w-sm grid-cols-2 gap-4">

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

              <BookOpen
                size={28}
                className="text-white"
              />

              <h3 className="mt-4 text-3xl font-bold">

                {enrolled}

              </h3>

              <p className="mt-1 text-sm text-indigo-100">
                Enrolled Courses
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

              <Award
                size={28}
                className="text-yellow-300"
              />

              <h3 className="mt-4 text-3xl font-bold">

                {certificates}

              </h3>

              <p className="mt-1 text-sm text-indigo-100">
                Certificates
              </p>

            </div>

            <div className="col-span-2 rounded-2xl bg-white/10 p-5 backdrop-blur">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-indigo-100">

                    Learning Status

                  </p>

                  <h3 className="mt-2 text-xl font-semibold">

                    Keep Going 

                  </h3>

                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-2xl">

                  🎯

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}