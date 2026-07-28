import { Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-800 leading-tight">
          Learn. Grow. <span className="text-indigo-600">Succeed.</span>
        </h1>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-lg">
          Learn industry-ready skills with structured courses, progress tracking,
          and real-world projects.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          {!user ? (
            <>
              <Link
                to="/signup"
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold
                  hover:bg-indigo-700 transition"
              >
                Get Started Free
              </Link>

              <Link
                to="/courses"
                className="px-6 py-3 rounded-xl border border-indigo-600
                  text-indigo-600 font-semibold hover:bg-indigo-50 transition"
              >
                Browse Courses
              </Link>
            </>
          ) : (
            <Link
              to="/dashboard"
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold
                hover:bg-indigo-700 transition"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-y">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <Stat label="Students Enrolled" value="10,000+" />
          <Stat label="Expert Courses" value="150+" />
          <Stat label="Completion Rate" value="92%" />
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="Structured Courses"
            description="Clear lesson flow designed for real learning."
          />
          <FeatureCard
            title="Progress Tracking"
            description="Track completion and learning milestones."
          />
          <FeatureCard
            title="Admin-Curated Content"
            description="High-quality, reviewed learning material."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 text-center">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-3xl font-bold text-indigo-600">{value}</p>
      <p className="mt-1 text-sm text-gray-600">{label}</p>
    </div>
  );
}
