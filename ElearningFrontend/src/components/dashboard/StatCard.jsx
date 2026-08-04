import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function StatCard({
  icon,
  title,
  value,
  subtitle,
  color = "text-indigo-600",
  to,
  trend,
  loading = false,
}) {
  const CardWrapper = ({ children }) =>
    to ? (
      <Link
        to={to}
        className="block"
      >
        {children}
      </Link>
    ) : (
      children
    );

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-14 w-14 animate-pulse rounded-2xl bg-slate-200" />

        <div className="mt-6 h-4 w-28 animate-pulse rounded bg-slate-200" />

        <div className="mt-4 h-8 w-20 animate-pulse rounded bg-slate-300" />

        <div className="mt-4 h-3 w-36 animate-pulse rounded bg-slate-200" />
      </div>
    );
  }

  return (
    <CardWrapper>
      <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl">

        {/* Background Glow */}

        <div className="absolute right-0 top-0 h-28 w-28 translate-x-10 -translate-y-10 rounded-full bg-indigo-100 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

        {/* Header */}

        <div className="relative flex items-start justify-between">

          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 ${color} shadow-sm transition duration-300 group-hover:scale-110`}
          >
            {icon}
          </div>

          {to && (
            <div className="rounded-full bg-slate-100 p-2 opacity-0 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100">
              <ArrowRight
                size={16}
                className="text-slate-500"
              />
            </div>
          )}
        </div>

        {/* Content */}

        <div className="relative mt-6">

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <div className="mt-3 flex items-end justify-between">

            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              {value}
            </h2>

            {trend && (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                {trend}
              </span>
            )}

          </div>

          {subtitle && (
            <p className="mt-3 text-sm leading-6 text-slate-500">
              {subtitle}
            </p>
          )}

        </div>

      </div>
    </CardWrapper>
  );
}