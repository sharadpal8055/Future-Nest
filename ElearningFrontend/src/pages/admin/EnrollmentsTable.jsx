import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

export default function EnrollmentsTable() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await api.get("/enrollments/admin");
        setEnrollments(res.data.data || []);
      } catch {
        toast.error("Failed to load enrollments");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading enrollments…</p>;
  }

  if (enrollments.length === 0) {
    return (
      <p className="text-sm text-gray-500 text-center">
        No enrollments found
      </p>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">
        Course Enrollments
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="text-left">User</th>
              <th className="text-left">Course</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map(e => (
              <tr key={e._id} className="border-b">
                <td className="py-2">
                  {e.userId?.name}{" "}
                  <span className="text-gray-400">
                    ({e.userId?.email})
                  </span>
                </td>
                <td>{e.courseId?.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
