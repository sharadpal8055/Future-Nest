import { useAuth } from "../../auth/useAuth";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Dashboard() {
  const { user } = useAuth();
  const [enrolledCount, setEnrolledCount] = useState(0);

  useEffect(() => {
    api.get("/enrollments/me")
      .then(res => setEnrolledCount(res.data.data.length))
      .catch(() => setEnrolledCount(0));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col sm:flex-row sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Welcome back, {user.name} 👋
            </h1>
            <p className="text-gray-500 mt-1">
              Continue learning and track your progress
            </p>
          </div>

          <Link
            to="/courses"
            className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white
              font-semibold hover:bg-indigo-700 transition"
          >
            Explore Courses
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Stat label="Role" value={user.role} />
          <Stat label="Enrolled Courses" value={enrolledCount} />
          <Stat label="Account Status" value="Active" accent />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ActionCard
              to="/my-courses"
              title="My Courses"
              desc="Resume your learning"
            />
            <ActionCard
              to="/courses"
              title="Browse Courses"
              desc="Find new skills"
            />
            {user.role === "admin" && (
              <ActionCard
                to="/admin"
                title="Admin Panel"
                desc="Manage platform content"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${accent ? "text-green-600" : "text-gray-800"}`}>
        {value}
      </p>
    </div>
  );
}

function ActionCard({ to, title, desc }) {
  return (
    <Link
      to={to}
      className="p-4 border rounded-xl hover:border-indigo-500
        hover:bg-indigo-50 transition"
    >
      <p className="font-semibold text-gray-800">{title}</p>
      <p className="text-sm text-gray-500 mt-1">{desc}</p>
    </Link>
  );
}
