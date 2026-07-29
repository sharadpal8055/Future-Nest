import {
  CheckCircle2,
  Award,
  BookOpen,
} from "lucide-react";

export default function RecentActivity({
  activities = [],
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold text-slate-900">
        Recent Activity
      </h2>

      {activities.length === 0 ? (
        <p className="mt-6 text-sm text-slate-500">
          No recent activity.
        </p>
      ) : (
        <div className="mt-6 space-y-5">

          {activities.map((activity, index) => {

            const Icon =
              activity.type === "certificate"
                ? Award
                : activity.type === "lesson"
                ? CheckCircle2
                : BookOpen;

            return (
              <div
                key={index}
                className="flex items-start gap-4"
              >

                <div className="rounded-full bg-slate-100 p-2 text-indigo-600">
                  <Icon size={18} />
                </div>

                <div>

                  <p className="font-medium text-slate-800">
                    {activity.title}
                  </p>

                  <p className="text-sm text-slate-500">
                    {activity.time}
                  </p>

                </div>

              </div>
            );

          })}

        </div>
      )}

    </div>
  );
}