import { Link } from "react-router-dom";

export default function CourseCard({ course, onEnroll, enrolled }) {
  const difficultyColor = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-yellow-100 text-yellow-700",
    Advanced: "bg-red-100 text-red-700",
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Thumbnail */}
      <Link to={`/courses/${course._id}`} className="overflow-hidden">
        {course.thumbnailUrl ? (
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
            onError={(e) => (e.target.style.display = "none")}
          />
        ) : (
          <div className="flex h-52 items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-5xl font-bold text-white">
            {course.title.charAt(0)}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Difficulty */}
        <div className="mb-3 flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              difficultyColor[course.difficulty] || "bg-gray-100 text-gray-700"
            }`}
          >
            {course.difficulty || "Course"}
          </span>

          <span className="text-sm text-yellow-500 font-semibold">
             {course.averageRating || "New"}
          </span>
        </div>

        {/* Title */}
        <Link
          to={`/courses/${course._id}`}
          className="text-xl font-bold text-gray-900 transition hover:text-indigo-600"
        >
          {course.title}
        </Link>

        {/* Subtitle */}
        {course.subtitle && (
          <p className="mt-2 line-clamp-2 text-sm text-gray-500">
            {course.subtitle}
          </p>
        )}

        {/* Description */}
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-gray-600">
          {course.description}
        </p>

        {/* Instructor */}
        <div className="mt-4 text-sm text-gray-700">
          {course.faculty || "Instructor"}
        </div>

        {/* Stats */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-600">
          {course.duration && (
            <span className="rounded-full bg-gray-100 px-3 py-1">
               {course.duration}
            </span>
          )}

          {course.language && (
            <span className="rounded-full bg-gray-100 px-3 py-1">
               {course.language}
            </span>
          )}

          <span className="rounded-full bg-gray-100 px-3 py-1">
             {course.enrollmentCount || 0}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t pt-5">
          <div>
            <p className="text-2xl font-bold text-indigo-600">
              {course.price > 0 ? `₹${course.price}` : "Free"}
            </p>
          </div>

          {enrolled ? (
            <span className="rounded-lg bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              Enrolled
            </span>
          ) : (
            <button
              onClick={() => onEnroll(course)}
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              {course.price > 0 ? "Buy Course" : "Enroll Now"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
