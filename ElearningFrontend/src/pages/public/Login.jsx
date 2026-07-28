import { useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
    const redirectTo = location.state?.redirectTo || "/dashboard";
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!form.email.trim()) {
      return toast.error("Email is required");
    }

    if (!form.password.trim()) {
      return toast.error("Password is required");
    }

    setLoading(true);

    try {
      // Existing functionality remains unchanged
      await login(form);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-300 pl-11 pr-11 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition disabled:bg-gray-100";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={submit}
          className="bg-white rounded-3xl shadow-xl p-8 space-y-6"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome Back 👋
            </h1>

            <p className="text-gray-500 mt-2">Login to continue learning.</p>
          </div>

          {/* Email */}

          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="relative mt-1">
              <Mail
                size={20}
                className="absolute left-3 top-3.5 text-gray-400"
              />

              <input
                autoFocus
                autoComplete="email"
                type="email"
                required
                disabled={loading}
                placeholder="you@example.com"
                value={form.email}
                className={inputClass}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Password */}

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative mt-1">
              <Lock
                size={20}
                className="absolute left-3 top-3.5 text-gray-400"
              />

              <input
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                required
                disabled={loading}
                placeholder="Enter your password"
                value={form.password}
                className={inputClass}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
              />

              <button
                type="button"
                disabled={loading}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>

            <button
              type="button"
              className="text-indigo-600 hover:underline"
              onClick={() => toast("Forgot Password feature coming soon.")}
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}

          <button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Logging In...
              </span>
            ) : (
              "Login"
            )}
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 border-t" />

            <span className="text-gray-400 text-sm">OR</span>

            <div className="flex-1 border-t" />
          </div>

          {/* Google Login Placeholder */}

          <button
            type="button"
            disabled
            className="w-full border rounded-xl py-3 text-gray-400 bg-gray-50 cursor-not-allowed"
          >
            Continue with Google (Coming Soon)
          </button>

          <p className="text-center text-sm text-gray-500">
            New here?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Create an account
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
