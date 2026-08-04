import { useAuth } from "../../auth/useAuth";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { BookOpen, GraduationCap, Award, ShieldCheck } from "lucide-react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCard from "../../components/dashboard/StatCard";
import ContinueLearning from "../../components/dashboard/ContinueLearning";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentActivity from "../../components/dashboard/RecentActivity";
import Library from "../library/Library";
export default function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    enrolled: 0,
    certificates: 0,
  });
  const [continueLearning, setContinueLearning] = useState(null);

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      const [enrollmentsRes, certificatesRes] = await Promise.all([
        api.get("/enrollments/me"),
        api.get("/certificates/me"),
      ]);

      const enrollments = enrollmentsRes.data.data;
      const certificates = certificatesRes.data.data;

      setStats({
        enrolled: enrollments.length,
        certificates: certificates.length,
      });

      if (enrollments.length > 0) {
        const activeEnrollment = [...enrollments]
          .filter((e) => e.progressPercent < 100)
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0];

        setContinueLearning(activeEnrollment || enrollments[0]);
      }

      const recent = [];

      certificates.forEach((certificate) => {
        recent.push({
          type: "certificate",
          title: `Earned certificate for ${certificate.course.title}`,
          date: certificate.completionDate,
        });
      });

      enrollments.forEach((enrollment) => {
        recent.push({
          type: "course",
          title: `Enrolled in ${enrollment.courseId.title}`,
          time: new Date(enrollment.createdAt).toLocaleDateString(),
        });
      });
      recent.sort((a, b) => new Date(b.date) - new Date(a.date));

      setActivities(
        recent.slice(0, 5).map((item) => ({
          ...item,
          time: new Date(item.date).toLocaleDateString(),
        })),
      );
    } catch (err) {
      console.error(err);

      setStats({
        enrolled: 0,
        certificates: 0,
      });

      setContinueLearning(null);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="h-60 animate-pulse rounded-3xl bg-slate-200" />

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-3xl bg-white"
              />
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 h-[340px] animate-pulse rounded-3xl bg-white" />

            <div className="h-[340px] animate-pulse rounded-3xl bg-white" />
          </div>

          <div className="h-[250px] animate-pulse rounded-3xl bg-white" />
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Hero */}

        {/* <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white shadow-lg">
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
        </div> */}
        <DashboardHeader
          user={user}
          enrolled={stats.enrolled}
          certificates={stats.certificates}
        />
        {/* Stats */}

        {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
        </div> */}

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<BookOpen size={22} />}
            title="Enrolled Courses"
            value={stats.enrolled}
            subtitle="Currently active courses"
            color="text-blue-600"
            to="/my-courses"
          />

          <StatCard
            icon={<Award size={22} />}
            title="Certificates"
            value={stats.certificates}
            subtitle="Certificates earned"
            color="text-yellow-600"
            to="/certificates"
          />

          <StatCard
            icon={<GraduationCap size={22} />}
            title="Role"
            value={user.role}
            subtitle="Learning account"
            color="text-violet-600"
          />

          <StatCard
            icon={<ShieldCheck size={22} />}
            title="Account"
            value="Active"
            subtitle="Everything looks good"
            color="text-green-600"
          />
        </div>
        {/* Quick Actions */}

        {/* <div className="rounded-2xl bg-white p-6 shadow">
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
        </div> */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContinueLearning enrollment={continueLearning} />
          </div>

          <RecentActivity activities={activities} />
        </div>

        <QuickActions user={user} />
      </div>
    </div>
  );
}

/* ================================================= */

/* ================================================= */
