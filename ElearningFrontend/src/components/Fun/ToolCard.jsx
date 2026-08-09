import { ArrowRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function ToolCard({
  title,
  description,
  icon,
  to,
  badge,
  available = true,
  gradient = "from-indigo-600 to-violet-600",
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-2xl ${
        !available && "opacity-90"
      }`}
    >
      {/* Background Glow */}

      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition duration-500 group-hover:opacity-5`}
      />

      {/* Badge */}

      {badge && (
        <span className="absolute right-5 top-5 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow">
          {badge}
        </span>
      )}

      {/* Content */}

      <div className="relative flex h-full flex-col p-7">
        {/* Icon */}

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg transition duration-300 group-hover:scale-110`}
        >
          {icon}
        </div>

        {/* Title */}

        <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>

        {/* Description */}

        <p className="mt-3 flex-1 text-sm leading-7 text-slate-500">
          {description}
        </p>

        {/* Footer */}

        {available ? (
          <Link
            to={to}
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-indigo-600"
          >
            Open Tool
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        ) : (
          <div className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-500">
            <Lock size={16} />
            Coming Soon
          </div>
        )}
      </div>
    </div>
  );
}
