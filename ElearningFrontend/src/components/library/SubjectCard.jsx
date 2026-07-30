import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function SubjectCard({ subject }) {
  return (
    <Link
      to={`/library/interview/${subject._id}`}
      className="group rounded-2xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {subject.name}
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {subject.questionCount || 0} Questions
          </p>
        </div>

        <ArrowRight
          size={22}
          className="text-blue-600 transition group-hover:translate-x-1"
        />
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-gray-200">
        <div className="h-full w-full bg-blue-600"></div>
      </div>
    </Link>
  );
}

export default SubjectCard;