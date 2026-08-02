import { ArrowRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export default function LibraryCard({ item }) {
  const Icon = item.icon;

  if (item.available) {
    return (
      <Link
        to={item.path}
        className="group overflow-hidden rounded-3xl border bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-xl"
      >
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.color} text-white`}
        >
          <Icon size={30} />
        </div>

        <h2 className="mt-6 text-2xl font-bold">
          {item.title}
        </h2>

        <p className="mt-3 text-slate-500">
          {item.description}
        </p>

        <div className="mt-8 flex items-center justify-between">

          <span className="font-medium text-indigo-600">
            Explore
          </span>

          <ArrowRight
            className="transition group-hover:translate-x-1"
            size={20}
          />

        </div>
      </Link>
    );
  }

  return (
    <div className="rounded-3xl border bg-slate-50 p-7 opacity-80">

      <div
        className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.color} text-white`}
      >
        <Icon size={30} />
      </div>

      <h2 className="mt-6 text-2xl font-bold">
        {item.title}
      </h2>

      <p className="mt-3 text-slate-500">
        {item.description}
      </p>

      <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-200 px-4 py-2 text-sm font-medium">

        <Lock size={16} />

        Coming Soon

      </div>

    </div>
  );
}