import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function DashboardHeader({ user }) {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (
    <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>

          <p className="text-sm font-medium text-indigo-600">
            {greeting}
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
            Welcome back, {user.name}
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Continue where you left off, explore new courses,
            and keep building your skills.
          </p>

        </div>

        <Link
          to="/courses"
          className="inline-flex items-center gap-2 rounded-lg border border-indigo-600 bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          <BookOpen size={18} />
          Browse Courses
        </Link>
      </div>
    </header>
  );
}