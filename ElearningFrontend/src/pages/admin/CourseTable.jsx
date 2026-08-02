import {
  Pencil,
  Trash2,
  BookOpen,
  Tag,
  IndianRupee,
} from "lucide-react";

export default function CourseTable({
  courses,
  onEdit,
  onDelete,
  deletingId,
}) {
  if (courses.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed bg-white py-20 text-center">
        <BookOpen
          size={50}
          className="mx-auto text-slate-300"
        />

        <h2 className="mt-5 text-xl font-semibold">
          No Courses Found
        </h2>

        <p className="mt-2 text-slate-500">
          Create your first course to get started.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ==========================
            Desktop Table
      =========================== */}

      <div className="hidden overflow-hidden rounded-2xl border lg:block">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr className="text-left text-sm text-slate-600">
              <th className="px-6 py-4 font-semibold">
                Course
              </th>

              <th className="px-6 py-4 font-semibold">
                Category
              </th>

              <th className="px-6 py-4 font-semibold">
                Price
              </th>

              <th className="px-6 py-4 font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-right font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr
                key={course._id}
                className="border-t transition hover:bg-slate-50"
              >
                <td className="px-6 py-5">
                  <div>
                    <h3 className="font-semibold">
                      {course.title}
                    </h3>

                    <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                      {course.subtitle ||
                        course.description}
                    </p>
                  </div>
                </td>

                <td className="px-6">
                  {course.category}
                </td>

                <td className="px-6">
                  {Number(course.price) === 0 ? (
                    <span className="font-medium text-green-600">
                      Free
                    </span>
                  ) : (
                    <>₹{course.price}</>
                  )}
                </td>

                <td className="px-6">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      course.published
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {course.published
                      ? "Published"
                      : "Draft"}
                  </span>
                </td>

                <td className="px-6">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(course)}
                      className="rounded-lg border p-2 transition hover:bg-slate-100"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      disabled={
                        deletingId === course._id
                      }
                      onClick={() =>
                        onDelete(course._id)
                      }
                      className="rounded-lg border border-red-200 p-2 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ==========================
            Mobile Cards
      =========================== */}

      <div className="space-y-5 lg:hidden">
        {courses.map((course) => (
          <div
            key={course._id}
            className="rounded-2xl border bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold">
                  {course.title}
                </h2>

                <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                  {course.subtitle ||
                    course.description}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  course.published
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {course.published
                  ? "Published"
                  : "Draft"}
              </span>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Tag
                  size={18}
                  className="text-indigo-600"
                />

                <span>{course.category}</span>
              </div>

              <div className="flex items-center gap-3">
                <IndianRupee
                  size={18}
                  className="text-green-600"
                />

                <span>
                  {Number(course.price) === 0
                    ? "Free"
                    : `₹${course.price}`}
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => onEdit(course)}
                className="flex-1 rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700"
              >
                Edit
              </button>

              <button
                disabled={
                  deletingId === course._id
                }
                onClick={() =>
                  onDelete(course._id)
                }
                className="flex-1 rounded-xl bg-red-600 py-3 font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {deletingId === course._id
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}