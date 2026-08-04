import {
  Award,
  BookOpen,
  Compass,
  Library,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import ActionCard from "./ActionCard";

export default function QuickActions({ user }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Jump directly to the features you use most.
          </p>

        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">

          <Sparkles size={16} />

          Frequently Used

        </div>

      </div>

      {/* Actions */}

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">

        <ActionCard
          icon={<BookOpen size={22} />}
          title="My Courses"
          description="Resume your enrolled courses"
          color="from-blue-500 to-indigo-600"
          to="/my-courses"
        />

        <ActionCard
          icon={<Compass size={22} />}
          title="Browse Courses"
          description="Discover new learning paths"
          color="from-violet-500 to-purple-600"
          to="/courses"
        />

        <ActionCard
          icon={<Award size={22} />}
          title="Certificates"
          description="Download achievements"
          color="from-amber-400 to-yellow-500"
          to="/certificates"
        />

        <ActionCard
          icon={<Library size={22} />}
          title="Library"
          description="Notes & Interview Questions"
          color="from-emerald-500 to-green-600"
          to="/library"
        />

        {user?.role === "admin" && (
          <ActionCard
            icon={<ShieldCheck size={22} />}
            title="Admin Panel"
            description="Manage platform"
            color="from-rose-500 to-red-600"
            to="/admin"
          />
        )}

      </div>

    </section>
  );
}