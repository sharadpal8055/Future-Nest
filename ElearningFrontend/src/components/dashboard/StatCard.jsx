import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function StatCard({
  icon,
  title,
  value,
  subtitle,
  color = "text-indigo-600",
  to,
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md">

      <div className="flex items-center justify-between">

        <div className={`rounded-xl bg-slate-100 p-3 ${color}`}>
          {icon}
        </div>

        {to && (
          <Link
            to={to}
            className="opacity-0 transition group-hover:opacity-100"
          >
            <ArrowRight
              size={18}
              className="text-slate-400"
            />
          </Link>
        )}

      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">
        {title}
      </p>

      <h2 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
        {value}
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        {subtitle}
      </p>

    </div>
  );
}