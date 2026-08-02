import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function SubjectCard({ subject }) {
  return (
    <Link
      to={`/library/interview/${subject._id}`}
      className="
        group
        block
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Header */}

      <div className="flex items-center gap-4 border-b p-5">

        <div className="rounded-xl bg-indigo-100 p-3">

          <BookOpen
            size={24}
            className="text-indigo-600"
          />

        </div>

        <div className="flex-1">

          <h2 className="text-lg font-semibold text-slate-900">
            {subject.name}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {subject.questionCount || 0} Interview Questions
          </p>

        </div>

      </div>

      {/* Footer */}

      <div className="flex items-center justify-between p-5">

        <span className="font-medium text-indigo-600">
          Start Practice
        </span>

        <ArrowRight
          size={20}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />

      </div>
    </Link>
  );
}