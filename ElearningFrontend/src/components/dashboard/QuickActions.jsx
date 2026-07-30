import { BookOpen, Award, Compass, ShieldCheck, Library } from "lucide-react";

import ActionCard from "./ActionCard";

export default function QuickActions({ user }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Quick Actions</h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ActionCard
          icon={<BookOpen size={20} />}
          title="My Courses"
          description="Resume your enrolled courses"
          to="/my-courses"
        />

        <ActionCard
          icon={<Compass size={20} />}
          title="Browse Courses"
          description="Explore new courses"
          to="/courses"
        />

        <ActionCard
          icon={<Award size={20} />}
          title="Certificates"
          description="View and download certificates"
          to="/certificates"
        />

        <ActionCard
          icon={<Library size={20} />}
          title="Library"
          description="Interview Questions, Notes & More"
          to="/dashboard/library"
        />

        {user.role === "admin" && (
          <ActionCard
            icon={<ShieldCheck size={20} />}
            title="Admin Panel"
            description="Manage courses and users"
            to="/admin"
          />
        )}
      </div>
    </div>
  );
}
