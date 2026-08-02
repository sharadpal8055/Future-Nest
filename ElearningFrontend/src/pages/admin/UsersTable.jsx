import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-hot-toast";
import {
  Search,
  Users,
  Shield,
  User,
  Loader2,
} from "lucide-react";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);

      const res = await api.get("/users");

      setUsers(res.data.data || []);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      `${user.name} ${user.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [users, search]);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2
          size={34}
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
            Users
          </h2>

          <p className="mt-1 text-slate-500">
            Manage all registered platform users.
          </p>

        </div>

        <div className="relative w-full lg:w-80">

          <Search
            size={18}
            className="absolute left-3 top-3.5 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search users..."
            className="w-full rounded-xl border py-3 pl-10 pr-4 outline-none focus:border-indigo-500"
          />

        </div>

      </div>

      {/* Empty */}

      {filteredUsers.length === 0 && (
        <div className="rounded-2xl border border-dashed bg-white py-20 text-center">

          <Users
            size={48}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-5 text-xl font-semibold">
            No Users Found
          </h3>

          <p className="mt-2 text-slate-500">
            Try another search keyword.
          </p>

        </div>
      )}

      {filteredUsers.length > 0 && (
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-slate-50">

                <tr className="text-left text-sm text-slate-600">

                  <th className="px-6 py-4">
                    User
                  </th>

                  <th className="px-6 py-4">
                    Email
                  </th>

                  <th className="px-6 py-4">
                    Role
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-4">

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">

                          {user.name
                            ?.charAt(0)
                            ?.toUpperCase()}

                        </div>

                        <div>

                          <div className="font-medium">
                            {user.name}
                          </div>

                          <div className="text-sm text-slate-500">
                            ID: {user._id.slice(-6)}
                          </div>

                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {user.email}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >

                        {user.role === "admin" ? (
                          <Shield size={16} />
                        ) : (
                          <User size={16} />
                        )}

                        {user.role}

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