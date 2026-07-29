import { NavLink } from "react-router-dom";
import {
  guestLinks,
  userLinks,
  adminLinks,
} from "./navigationLinks";

export default function NavLinks({
  user,
}) {
  const linkClass = ({ isActive }) =>
    `
      relative
      px-3
      py-2
      rounded-lg
      text-sm
      font-medium
      transition-all
      duration-200
      ${
        isActive
          ? "text-indigo-600 bg-indigo-50"
          : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
      }
      after:absolute
      after:left-0
      after:bottom-0
      after:h-0.5
      after:rounded-full
      after:bg-indigo-600
      after:transition-all
      after:duration-300
      ${
        isActive
          ? "after:w-full"
          : "after:w-0 hover:after:w-full"
      }
    `;

  if (!user) {
    return (
      <>
        {guestLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={
              link.primary
                ? "rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                : linkClass
            }
          >
            {link.name}
          </NavLink>
        ))}
      </>
    );
  }

  return (
    <>
      {userLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={linkClass}
        >
          {link.name}
        </NavLink>
      ))}

      {user.role === "admin" &&
        adminLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className="
              rounded-lg
              bg-indigo-100
              px-3
              py-2
              text-sm
              font-semibold
              text-indigo-700
              transition
              hover:bg-indigo-200
            "
          >
            {link.name}
          </NavLink>
        ))}
    </>
  );
}