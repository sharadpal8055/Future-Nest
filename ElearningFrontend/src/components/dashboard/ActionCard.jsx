import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ActionCard({
  icon,
  title,
  description,
  to,
}) {
  return (
    <Link
      to={to}
      className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 transition hover:border-indigo-300 hover:shadow-md"
    >

      <div className="flex items-center gap-4">

        <div className="rounded-lg bg-slate-100 p-3 text-indigo-600">
          {icon}
        </div>

        <div>

          <h3 className="font-semibold text-slate-800">
            {title}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>

        </div>

      </div>

      <ArrowRight
        className="text-slate-400 transition group-hover:translate-x-1"
        size={18}
      />

    </Link>
  );
}