import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-hot-toast";
import {
  Loader2,
  Search,
  BookOpen,
  Users,
} from "lucide-react";

export default function EnrollmentsTable() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEnrollments();
  }, []);

  async function fetchEnrollments() {
    try {
      setLoading(true);

      const res = await api.get("/enrollments/admin");

      setEnrollments(res.data.data || []);
    } catch {
      toast.error("Failed to load enrollments");
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    return enrollments.filter((e) =>
      `${e.userId?.name || ""} ${e.userId?.email || ""} ${e.courseId?.title || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [enrollments, search]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2
          size={36}
          className="animate-spin text-indigo-600"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Course Enrollments
          </h2>

          <p className="mt-1 text-slate-500">
            View all enrolled students.
          </p>

        </div>

        <div className="relative w-full lg:w-80">

          <Search
            size={18}
            className="absolute left-3 top-3.5 text-slate-400"
          />

          <input
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border py-3 pl-10 pr-4 outline-none focus:border-indigo-500"
          />

        </div>

      </div>

      {/* Stats */}

      <div className="grid gap-4 sm:grid-cols-2">

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <div className="text-sm text-slate-500">
                Total Enrollments
              </div>

              <div className="mt-2 text-3xl font-bold">
                {filtered.length}
              </div>

            </div>

            <Users
              size={34}
              className="text-indigo-600"
            />

          </div>

        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <div className="text-sm text-slate-500">
                Courses
              </div>

              <div className="mt-2 text-3xl font-bold">
                {
                  new Set(
                    filtered.map(
                      (e) => e.courseId?._id
                    )
                  ).size
                }
              </div>

            </div>

            <BookOpen
              size={34}
              className="text-green-600"
            />

          </div>

        </div>

      </div>

      {/* Empty */}

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-white py-20 text-center">

          <Users
            size={52}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-5 text-xl font-semibold">
            No Enrollments Found
          </h3>

          <p className="mt-2 text-slate-500">
            Try another search.
          </p>

        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-slate-50">

                <tr className="text-left text-sm text-slate-600">

                  <th className="px-6 py-4">
                    Student
                  </th>

                  <th className="px-6 py-4">
                    Email
                  </th>

                  <th className="px-6 py-4">
                    Course
                  </th>

                </tr>

              </thead>

              <tbody>

                {filtered.map((e) => (
                  <tr
                    key={e._id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="px-6 py-4 font-medium">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">

                          {e.userId?.name
                            ?.charAt(0)
                            ?.toUpperCase()}

                        </div>

                        {e.userId?.name}

                      </div>

                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {e.userId?.email}
                    </td>

                    <td className="px-6 py-4">

                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">

                        {e.courseId?.title}

                      </span>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}

    </div>
  );
}