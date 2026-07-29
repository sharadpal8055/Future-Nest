import { Link } from "react-router-dom";
import { BookOpen, PlayCircle } from "lucide-react";

export default function ContinueLearning({ enrollment }) {
  if (!enrollment) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Continue Learning
        </h2>

        <div className="mt-8 flex flex-col items-center justify-center">
          <BookOpen
            size={52}
            className="text-slate-300"
          />

          <h3 className="mt-4 text-lg font-medium text-slate-700">
            No active course
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Enroll in a course to begin your learning journey.
          </p>

          <Link
            to="/courses"
            className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex flex-col gap-6 lg:flex-row">

        <img
          src={enrollment.courseId.thumbnailUrl}
          alt={enrollment.courseId.title}
          className="h-44 w-full rounded-xl object-cover lg:w-72"
        />

        <div className="flex flex-1 flex-col">

          <span className="text-sm font-medium text-indigo-600">
            Continue Learning
          </span>

          <h2 className="mt-1 text-2xl font-semibold text-slate-900">
            {enrollment.courseId.title}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {enrollment.completedLessons} of{" "}
            {enrollment.totalLessons} lessons completed
          </p>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">

            <div
              className="h-full rounded-full bg-indigo-600 transition-all"
              style={{
                width: `${enrollment.progressPercent}%`,
              }}
            />

          </div>

          <div className="mt-2 flex justify-between text-sm text-slate-500">

            <span>
              {enrollment.progressPercent}% Completed
            </span>

            <span>
              {enrollment.completedLessons}/
              {enrollment.totalLessons}
            </span>

          </div>

          <Link
            to={`/my-learning/${enrollment._id}`}
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-white transition hover:bg-indigo-700"
          >
            <PlayCircle size={18} />
            Resume Learning
          </Link>

        </div>

      </div>

    </div>
  );
}