import { useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signup(form); // navigation + toast handled in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4 sm:px-6">
      <div className="w-full max-w-md sm:max-w-lg">
        <form
          onSubmit={submit}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6"
        >
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Create your account
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              Start learning with high-quality courses
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              placeholder="Sharad Pal"
              className="w-full rounded-lg border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              placeholder="sharad@example.com"
              className="w-full rounded-lg border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              required
              value={form.password}
              placeholder="••••••••"
              className="w-full rounded-lg border px-4 py-2.5 focus:ring-2 focus:ring-indigo-500"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <button
            disabled={loading}
            className={`w-full py-2.5 rounded-lg font-semibold text-white ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-600 font-medium cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
