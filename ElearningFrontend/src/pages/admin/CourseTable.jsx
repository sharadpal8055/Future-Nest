export default function CourseTable({
  courses,
  onEdit,
  onDelete,
  deletingId
}) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl border">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Price</th>
            <th className="px-4 py-3 text-right font-medium">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {/* Empty state */}
          {courses.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-6 text-center text-gray-500"
              >
                No courses available
              </td>
            </tr>
          )}

          {courses.map(course => (
            <tr
              key={course._id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-4 py-3 font-medium text-gray-800">
                {course.title}
              </td>

              <td className="px-4 py-3 text-gray-600">
                {course.category || "—"}
              </td>

              <td className="px-4 py-3">
                {course.price ? `₹${course.price}` : "Free"}
              </td>

              <td className="px-4 py-3 text-right space-x-4">
                <button
                  onClick={() => onEdit(course)}
                  className="text-indigo-600 hover:underline"
                >
                  Edit
                </button>

                <button
                  disabled={deletingId === course._id}
                  onClick={() => onDelete(course._id)}
                  className={`font-medium ${
                    deletingId === course._id
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-600 hover:underline"
                  }`}
                >
                  {deletingId === course._id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
