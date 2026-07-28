import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-50 via-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}

          <div>
            <div className="flex items-center gap-2">
              <GraduationCap className="text-indigo-600" size={28} />

              <h2 className="text-2xl font-bold text-indigo-600">
                Future-Nest
              </h2>
            </div>

            <p className="mt-4 max-w-sm text-gray-600 leading-7">
              Learn industry-ready skills through structured courses, practical
              projects, and personalized learning paths.
            </p>
          </div>

          {/* Links */}

          <div>
            <h3 className="font-semibold text-gray-900 mb-5">Quick Links</h3>

            <div className="flex flex-col gap-3">
              <Link
                className="text-gray-600 hover:text-indigo-600 transition"
                to="/"
              >
                Home
              </Link>

              <Link
                className="text-gray-600 hover:text-indigo-600 transition"
                to="/courses"
              >
                Courses
              </Link>

              <Link
                className="text-gray-600 hover:text-indigo-600 transition"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="text-gray-600 hover:text-indigo-600 transition"
                to="/signup"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Contact */}

          <div>
            <h3 className="font-semibold text-gray-900 mb-5">Contact</h3>

            <p className="text-gray-600">support@futurenest.com</p>

            <p className="mt-3 text-gray-600">India</p>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Future-Nest. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
