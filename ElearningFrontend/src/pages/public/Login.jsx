import { useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.redirectTo || "/dashboard";

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(form); // navigation handled in AuthContext
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
              Welcome back
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              Login to continue learning
            </p>
          </div>

          <input
            type="email"
            required
            value={form.email}
            placeholder="sharad@example.com"
            className="w-full rounded-lg border px-4 py-2.5"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            required
            value={form.password}
            placeholder="••••••••"
            className="w-full rounded-lg border px-4 py-2.5"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            disabled={loading}
            className={`w-full py-2.5 rounded-lg font-semibold text-white ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-500">
            New here?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-indigo-600 font-medium cursor-pointer hover:underline"
            >
              Create an account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
