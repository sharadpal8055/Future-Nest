import { Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import {
  BookOpen,
  BarChart3,
  Award,
  ArrowRight,
} from "lucide-react";

import heroImage from '../../assets/hero/hero.svg'

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="bg-gradient-to-br from-slate-50 via-indigo-50 to-white">

      {/* HERO */}
 <section className="max-w-7xl mx-auto px-6 pt-32 md:pt-36 pb-24">
 <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}
          <div>

            <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium">
              Future-Ready Learning Platform
            </span>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
              Learn Today.
              <br />
              Build
              <span className="text-indigo-600"> Tomorrow.</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Master industry-ready skills through structured courses,
              practical projects and personalized learning progress.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">

              {!user ? (
                <>
                  <Link
                    to="/signup"
                    className="h-12 px-7 rounded-xl bg-indigo-600
                    text-white font-semibold flex items-center justify-center
                    hover:bg-indigo-700 transition"
                  >
                    Get Started
                  </Link>

                  <Link
                    to="/courses"
                    className="h-12 px-7 rounded-xl border
                    border-indigo-600 text-indigo-600
                    font-semibold flex items-center justify-center
                    hover:bg-indigo-50 transition"
                  >
                    Browse Courses
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </>
              ) : (
                <Link
                  to="/dashboard"
                  className="h-12 px-7 rounded-xl bg-indigo-600
                  text-white font-semibold inline-flex items-center"
                >
                  Go to Dashboard
                </Link>
              )}

            </div>

          </div>

          {/* Right */}

          <div className="flex justify-center">
            <img
  src={heroImage}
  alt="Future Nest Learning"
  className="
      w-full
      max-w-lg
      mx-auto
      object-contain
      drop-shadow-xl
  "
/>
          </div>

        </div>
      </section>

      {/* STATS */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-3 gap-6">

          <Stat value="10+" label="Students Enrolled" />
          <Stat value="15+" label="Expert Courses" />
          <Stat value="82%" label="Completion Rate" />

        </div>

      </section>

      {/* FEATURES */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center mb-12">

          <h2 className="text-3xl font-bold text-gray-900">
            Why Choose Future-Nest?
          </h2>

          <p className="mt-3 text-gray-600">
            Everything you need to become job-ready.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <FeatureCard
            icon={<BookOpen size={30} />}
            title="Structured Courses"
            description="Step-by-step learning paths designed by experienced instructors."
          />

          <FeatureCard
            icon={<BarChart3 size={30} />}
            title="Track Progress"
            description="Stay motivated with progress tracking and learning milestones."
          />

          <FeatureCard
            icon={<Award size={30} />}
            title="Career Ready"
            description="Learn practical skills through projects and assessments."
          />


        </div>

      </section>

      {/* CTA */}

<section className="max-w-7xl mx-auto px-6 py-24">
  <div className="rounded-3xl bg-indigo-600 text-white p-10 md:p-16 text-center">

    <h2 className="text-3xl md:text-4xl font-bold">
      Ready to start your learning journey?
    </h2>

    <p className="mt-4 text-indigo-100 max-w-2xl mx-auto">
      Join thousands of learners building real-world skills with
      structured courses, projects, and progress tracking.
    </p>

    <div className="mt-8">

      {!user ? (
        <Link
          to="/signup"
          className="inline-flex items-center rounded-xl bg-white
          text-indigo-600 px-7 py-3 font-semibold hover:bg-gray-100 transition"
        >
          Get Started Free
        </Link>
      ) : (
        <Link
          to="/courses"
          className="inline-flex items-center rounded-xl bg-white
          text-indigo-600 px-7 py-3 font-semibold hover:bg-gray-100 transition"
        >
          Explore Courses
        </Link>
      )}

    </div>

  </div>
</section>

    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
      <h3 className="text-4xl font-bold text-indigo-600">
        {value}
      </h3>

      <p className="mt-2 text-gray-600">
        {label}
      </p>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div
      className="bg-white rounded-2xl border border-gray-200
      shadow-sm p-8 hover:-translate-y-1
      hover:shadow-lg transition"
    >
      <div className="w-14 h-14 rounded-xl bg-indigo-100
      text-indigo-600 flex items-center justify-center">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}