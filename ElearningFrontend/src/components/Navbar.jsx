import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";

const APP_NAME = "Future-Nest";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  // ✅ Async-safe logout (important for production)
  const handleLogout = async () => {
    await logout();
  };

  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
     ${
       isActive
         ? "text-indigo-600 bg-indigo-50"
         : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
     }
     after:absolute after:left-0 after:bottom-0 after:h-0.5 after:rounded-full
     after:bg-indigo-600 after:transition-all after:duration-300
     ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <NavLink
            to="/"
            className="text-xl font-extrabold tracking-tight
              bg-gradient-to-r from-indigo-600 to-purple-600
              bg-clip-text text-transparent"
          >
            {APP_NAME}
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {!user && (
              <>
                <NavLink to="/login" className={linkClass}>
                  Login
                </NavLink>
                <NavLink to="/signup" className={linkClass}>
                  Sign up
                </NavLink>
              </>
            )}

            {user && (
              <>
                <NavLink to="/dashboard" className={linkClass}>
                  Dashboard
                </NavLink>

                <NavLink to="/courses" className={linkClass}>
                  Courses
                </NavLink>

                <NavLink to="/my-courses" className={linkClass}>
                  My Courses
                </NavLink>

                {user.role === "admin" && (
                  <NavLink
                    to="/admin"
                    className="ml-2 px-3 py-2 rounded-lg text-sm font-semibold
                      text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition"
                  >
                    Admin
                  </NavLink>
                )}

                <button
                  onClick={handleLogout}
                  className="ml-3 inline-flex items-center gap-1
                    px-3 py-2 rounded-lg text-sm font-medium
                    text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            aria-label="Toggle navigation menu"
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="md:hidden border-t bg-white px-4 py-4 space-y-2
          animate-in slide-in-from-top-2 duration-200"
        >
          {!user && (
            <>
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 rounded-lg text-sm font-semibold
                  text-white bg-gradient-to-r from-indigo-600 to-purple-600"
              >
                Sign up
              </NavLink>
            </>
          )}

          {user && (
            <>
              <NavLink to="/dashboard" onClick={() => setOpen(false)} className={linkClass}>
                Dashboard
              </NavLink>

              <NavLink to="/courses" onClick={() => setOpen(false)} className={linkClass}>
                Courses
              </NavLink>

              <NavLink to="/my-courses" onClick={() => setOpen(false)} className={linkClass}>
                My Courses
              </NavLink>

              {user.role === "admin" && (
                <NavLink
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-semibold
                    text-indigo-700 bg-indigo-100"
                >
                  Admin
                </NavLink>
              )}

              <button
                onClick={async () => {
                  setOpen(false);
                  await handleLogout();
                }}
                className="w-full flex items-center gap-2 px-3 py-2
                  text-sm font-medium text-red-600 rounded-lg
                  hover:bg-red-50 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
