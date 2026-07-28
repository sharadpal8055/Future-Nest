import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

export default function MyCourses() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/enrollments/me")
      .then(res => setEnrollments(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-6 text-center text-gray-500">Loading your courses…</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Courses</h1>

        {enrollments.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
            You are not enrolled in any courses yet.
          </div>
        ) : (
          <div className="space-y-4">
            {enrollments.map(enroll => {
              if (!enroll.courseId) return null;

              const total = enroll.courseId.lessons.length || 0;
              const completed = Object.values(enroll.progress || {}).filter(Boolean).length;
              const percent = total ? Math.round((completed / total) * 100) : 0;

              return (
                <div key={enroll._id} className="bg-white rounded-xl shadow p-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {enroll.courseId.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {percent}% completed
                      </p>
                    </div>

                    <Link
                      to={`/progress/${enroll._id}`}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      Continue
                    </Link>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 h-2 bg-gray-200 rounded">
                    <div
                      className="h-2 bg-indigo-600 rounded"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
