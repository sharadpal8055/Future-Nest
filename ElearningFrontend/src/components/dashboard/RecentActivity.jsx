import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
} from "lucide-react";

export default function RecentActivity({
  activities = [],
}) {
  const getActivity = (type) => {
    switch (type) {
      case "certificate":
        return {
          icon: Award,
          bg: "bg-yellow-100",
          text: "text-yellow-600",
        };

      case "lesson":
        return {
          icon: CheckCircle2,
          bg: "bg-green-100",
          text: "text-green-600",
        };

      default:
        return {
          icon: BookOpen,
          bg: "bg-indigo-100",
          text: "text-indigo-600",
        };
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-900">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest learning updates
          </p>

        </div>

        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
          Latest
        </span>

      </div>

      {/* Empty */}

      {activities.length === 0 ? (
        <div className="flex flex-col items-center py-14 text-center">

          <div className="rounded-full bg-slate-100 p-5">

            <Clock3
              size={34}
              className="text-slate-400"
            />

          </div>

          <h3 className="mt-5 text-lg font-semibold text-slate-800">
            Nothing yet
          </h3>

          <p className="mt-2 max-w-xs text-sm text-slate-500">
            Start learning a course to see your activity appear here.
          </p>

        </div>
      ) : (
        <div className="relative mt-8">

          {/* Timeline */}

          <div className="absolute left-5 top-2 bottom-2 w-px bg-slate-200" />

          <div className="space-y-6">

            {activities.map((activity, index) => {
              const {
                icon: Icon,
                bg,
                text,
              } = getActivity(activity.type);

              return (
                <div
                  key={index}
                  className="group relative flex gap-5"
                >

                  {/* Icon */}

                  <div
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bg} ${text} shadow-sm transition group-hover:scale-110`}
                  >
                    <Icon size={18} />
                  </div>

                  {/* Card */}

                  <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition group-hover:border-indigo-200 group-hover:bg-white group-hover:shadow-sm">

                    <h3 className="font-semibold text-slate-900">
                      {activity.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      {activity.time}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      )}

    </section>
  );
}