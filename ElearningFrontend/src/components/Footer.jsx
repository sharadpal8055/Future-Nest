import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-white">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          {/* Logo */}

          <div>

            <h2 className="text-2xl font-bold text-indigo-600">
              Future-Nest
            </h2>

            <p className="mt-3 text-gray-600 text-sm leading-6">
              Learn industry-ready skills through practical,
              project-based education.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="font-semibold text-gray-900 mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2 text-gray-600">

              <Link to="/">Home</Link>

              <Link to="/courses">Courses</Link>

              <Link to="/login">Login</Link>

              <Link to="/signup">Sign Up</Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="font-semibold text-gray-900 mb-4">
              Contact
            </h3>

            <p className="text-gray-600">
              support@futurenest.com
            </p>

            <p className="mt-2 text-gray-600">
              India
            </p>

          </div>

        </div>

        <div className="border-t mt-10 pt-6 text-center text-sm text-gray-500">

          © {new Date().getFullYear()} Future-Nest.
          All rights reserved.

        </div>

      </div>

    </footer>
  );
}