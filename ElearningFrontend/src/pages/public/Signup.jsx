import { useState } from "react";
import { useAuth } from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, Phone } from "lucide-react";
import toast from "react-hot-toast";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [acceptTerms, setAcceptTerms] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const passwordStrength = () => {
    const p = form.password;

    if (p.length < 6)
      return { text: "Weak", color: "bg-red-500", width: "w-1/3" };

    const medium = /[A-Z]/.test(p) && /[0-9]/.test(p) && p.length >= 8;

    const strong = medium && /[^A-Za-z0-9]/.test(p) && p.length >= 10;

    if (strong)
      return { text: "Strong", color: "bg-green-500", width: "w-full" };

    if (medium)
      return { text: "Medium", color: "bg-yellow-500", width: "w-2/3" };

    return { text: "Weak", color: "bg-red-500", width: "w-1/3" };
  };

  const strength = passwordStrength();

  const submit = async (e) => {
    e.preventDefault();

    if (form.name.trim().length < 2) return toast.error("Enter a valid name.");

    if (!form.email.includes("@")) return toast.error("Enter a valid email.");

    if (form.password.length < 8)
      return toast.error("Password must be at least 8 characters.");

    if (form.password !== form.confirmPassword)
      return toast.error("Passwords do not match.");

    if (!acceptTerms) return toast.error("Please accept Terms & Conditions.");

    const signupData = {
      name: form.name,
      email: form.email,
      password: form.password,
      phone: form.phone,
    };

    setLoading(true);

    try {
      await signup(signupData);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 pl-11 pr-11 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Your Future-Nest Account
          </h1>

          <p className="text-gray-500 mt-2">
            Start your learning journey today.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-5">
          {/* Name */}

          <div>
            <label className="text-sm font-medium">Full Name</label>

            <div className="relative mt-1">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

              <input
                className={inputClass}
                placeholder="Sharad Pal"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Email */}

          <div>
            <label className="text-sm font-medium">Email</label>

            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

              <input
                type="email"
                className={inputClass}
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Phone */}

          <div>
            <label className="text-sm font-medium">Phone (Optional)</label>

            <div className="relative mt-1">
              <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

              <input
              type="tel"
              autoComplete="tel"
                className={inputClass?inputClass:""}
                placeholder="+91 9876543210"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Password */}

          <div>
            <label className="text-sm font-medium">Password</label>

            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                className={inputClass}
                placeholder="Enter password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${strength.color} ${strength.width} h-2 rounded-full transition-all`}
                />
              </div>

              <p className="text-xs mt-1 text-gray-500">
                Password Strength: {strength.text}
              </p>
            </div>
          </div>

          {/* Confirm Password */}

          <div>
            <label className="text-sm font-medium">Confirm Password</label>

            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />

              <input
                type={showConfirm ? "text" : "password"}
                className={inputClass}
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({
                    ...form,
                    confirmPassword: e.target.value,
                  })
                }
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Terms */}

          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-1"
            />

            <span>
              I agree to the{" "}
              <span className="text-indigo-600 font-medium">
                Terms & Conditions
              </span>{" "}
              and{" "}
              <span className="text-indigo-600 font-medium">
                Privacy Policy
              </span>
            </span>
          </label>

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
