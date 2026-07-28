import { Link } from "react-router-dom";

export default function CourseCard({ course, onEnroll, enrolled }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col">
      {course.thumbnailUrl && (
        <Link to={`/courses/${course._id}`}>
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="w-full h-40 object-cover rounded-lg mb-4"
            onError={e => (e.target.style.display = "none")}
          />
        </Link>
      )}

      <h3 className="text-lg font-semibold mb-2">
        <Link to={`/courses/${course._id}`} className="hover:text-indigo-600">
          {course.title}
        </Link>
      </h3>

      <p className="text-sm text-gray-600 grow line-clamp-3">
        {course.description}
      </p>

      <div className="mt-4 flex justify-between items-center">
        <span className="font-semibold text-indigo-600">
          {course.price ? `₹${course.price}` : "Free"}
        </span>

        {enrolled ? (
          <span className="text-green-600 text-sm font-medium">
            Enrolled
          </span>
        ) : (
          <button
            onClick={() => onEnroll(course)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {course.price > 0 ? "Buy Course" : "Enroll"}
          </button>
        )}
      </div>
    </div>
  );
}
