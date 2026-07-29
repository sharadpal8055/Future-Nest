import {
  X,
  LogOut,
  User,
  Shield,
  Trophy
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  guestLinks,
  userLinks,
  adminLinks,
} from "./navigationLinks";

export default function MobileDrawer({
  open,
  setOpen,
  user,
  onLogout,
}) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0 z-40 bg-black/40 transition-opacity duration-300
          ${
            open
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* Drawer */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-80 max-w-[85%]
          bg-white
          shadow-2xl
          transition-transform duration-300
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="text-lg font-bold">
              FutureNest
            </h2>

            <p className="text-xs text-gray-500">
              Learn • Build • Grow
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* User */}
        {user && (
          <div className="border-b px-5 py-5">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-indigo-600
                  to-purple-600
                  text-lg
                  font-bold
                  text-white
                "
              >
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3 className="font-semibold">
                  {user.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex flex-col gap-1 p-4 overflow-y-auto">
          {!user &&
            guestLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `
                  rounded-lg
                  px-4
                  py-3
                  text-sm
                  font-medium
                  transition
                  ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "hover:bg-gray-100"
                  }
                `
                }
              >
                {link.name}
              </NavLink>
            ))}

          {user && (
            <>
              {userLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `
                    rounded-lg
                    px-4
                    py-3
                    text-sm
                    font-medium
                    transition
                    ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "hover:bg-gray-100"
                    }
                  `
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <NavLink
                to="/profile"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3
                  rounded-lg
                  px-4
                  py-3
                  text-sm
                  font-medium
                  ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "hover:bg-gray-100"
                  }
                `
                }
              >
                <User size={18} />
                Profile
              </NavLink>

              {user.role === "admin" &&
                adminLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
                  >
                    <Shield size={18} />
                    {link.name}
                  </NavLink>
                ))}
            </>
          )}
        </div>

<NavLink
  to="/certificates"
  onClick={() => setOpen(false)}
  className={({ isActive }) =>
    `
    flex items-center gap-3
    rounded-lg
    px-4
    py-3
    text-sm
    font-medium
    ${
      isActive
        ? "bg-indigo-50 text-indigo-600"
        : "hover:bg-gray-100"
    }
  `
  }
>
  <Trophy size={18} />
  Certificates
</NavLink>

        {/* Footer */}
        {user && (
          <div className="absolute bottom-0 left-0 w-full border-t p-4 bg-white">
            <button
              onClick={async () => {
                setOpen(false);
                await onLogout();
              }}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-red-50
                px-4
                py-3
                text-sm
                font-semibold
                text-red-600
                transition
                hover:bg-red-100
              "
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}