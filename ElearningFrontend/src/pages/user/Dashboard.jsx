import { useAuth } from "../../auth/useAuth";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  BookOpen,
  GraduationCap,
  Award,
  Compass,
  ShieldCheck,
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    enrolled: 0,
    certificates: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const [enrollmentsRes, certificatesRes] = await Promise.all([
        api.get("/enrollments/me"),
        api.get("/certificates/me"),
      ]);

      setStats({
        enrolled: enrollmentsRes.data.data.length,
        certificates: certificatesRes.data.data.length,
      });
    } catch (err) {
      console.error(err);

      setStats({
        enrolled: 0,
        certificates: 0,
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Hero */}

        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white shadow-lg">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, {user.name} 
              </h1>

              <p className="mt-2 text-indigo-100">
                Continue learning, earn certificates, and build your future.
              </p>
            </div>

            <Link
              to="/courses"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:bg-gray-100"
            >
              Explore Courses
            </Link>
          </div>
        </div>

        {/* Stats */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<BookOpen size={26} />}
            title="Enrolled Courses"
            value={stats.enrolled}
            color="bg-blue-100 text-blue-600"
          />

          <StatCard
            icon={<Award size={26} />}
            title="Certificates"
            value={stats.certificates}
            color="bg-yellow-100 text-yellow-600"
          />

          <StatCard
            icon={<GraduationCap size={26} />}
            title="Role"
            value={user.role}
            color="bg-purple-100 text-purple-600"
          />

          <StatCard
            icon={<ShieldCheck size={26} />}
            title="Account"
            value="Active"
            color="bg-green-100 text-green-600"
          />
        </div>

        {/* Quick Actions */}

        <div className="rounded-2xl bg-white p-6 shadow">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Quick Actions</h2>

            <Compass className="text-indigo-600" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <ActionCard
              icon={<BookOpen />}
              title="My Courses"
              description="Resume your enrolled courses"
              to="/my-courses"
            />

            <ActionCard
              icon={<Compass />}
              title="Browse Courses"
              description="Explore new courses"
              to="/courses"
            />

            <ActionCard
              icon={<Award />}
              title="My Certificates"
              description="Download earned certificates"
              to="/certificates"
            />

            {user.role === "admin" && (
              <ActionCard
                icon={<ShieldCheck />}
                title="Admin Panel"
                description="Manage courses & users"
                to="/admin"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================= */

function StatCard({ icon, title, value, color }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h3 className="mt-2 text-3xl font-bold text-gray-800">{value}</h3>
        </div>

        <div className={`rounded-xl p-3 ${color}`}>{icon}</div>
      </div>
    </div>
  );
}

/* ================================================= */

function ActionCard({ icon, title, description, to }) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border bg-white p-5 transition hover:border-indigo-500 hover:shadow-lg"
    >
      <div className="mb-4 inline-flex rounded-xl bg-indigo-100 p-3 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>

      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </Link>
  );
}
