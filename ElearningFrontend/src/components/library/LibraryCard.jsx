import { ArrowRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";

function LibraryCard({ item }) {
  const Icon = item.icon;

  if (item.available) {
    return (
      <Link
        to={item.path}
        className="group rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
      >
        <div
          className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl text-white ${item.color}`}
        >
          <Icon size={28} />
        </div>

        <h3 className="text-xl font-semibold text-gray-900">
          {item.title}
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          {item.description}
        </p>

        <div className="mt-6 flex items-center font-medium text-blue-600">
          Open
          <ArrowRight
            size={18}
            className="ml-2 transition group-hover:translate-x-1"
          />
        </div>
      </Link>
    );
  }

  return (
    <div className="cursor-not-allowed rounded-2xl border bg-gray-50 p-6 opacity-80">
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl text-white ${item.color}`}
      >
        <Icon size={28} />
      </div>

      <h3 className="text-xl font-semibold">
        {item.title}
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        {item.description}
      </p>

      <div className="mt-6 inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700">
        <Lock size={14} className="mr-2" />
        Coming Soon
      </div>
    </div>
  );
}

export default LibraryCard;