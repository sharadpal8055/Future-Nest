import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, Trophy, User } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function UserDropdown({
  user,
  onLogout,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  if (!user) return null;

  const initial =
    user.name?.charAt(0).toUpperCase() || "U";

  return (
    <div
      className="relative ml-4"
      ref={dropdownRef}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex
          items-center
          gap-3
          rounded-xl
          border
          border-gray-200
          bg-white
          px-3
          py-2
          transition
          hover:bg-gray-50
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-indigo-600
            to-purple-600
            text-sm
            font-bold
            text-white
          "
        >
          {initial}
        </div>

        <div className="text-left">
          <p className="text-sm font-semibold text-gray-800">
            {user.name}
          </p>

          <p className="text-xs text-gray-500">
            {user.role}
          </p>
        </div>

        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            mt-3
            w-56
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-white
            shadow-xl
          "
        >
          <NavLink
            to="/profile"
            onClick={() => setOpen(false)}
            className="
              flex
              items-center
              gap-3
              px-4
              py-3
              text-sm
              hover:bg-gray-50
            "
          >
            <User size={18} />
            Profile
          </NavLink>

          <NavLink
            to="/certificates"
            onClick={() => setOpen(false)}
            className="
              flex
              items-center
              gap-3
              px-4
              py-3
              text-sm
              hover:bg-gray-50
            "
          >
            <Trophy size={18} />
            Certificates
          </NavLink>

          <div className="border-t" />

          <button
            onClick={onLogout}
            className="
              flex
              w-full
              items-center
              gap-3
              px-4
              py-3
              text-left
              text-sm
              text-red-600
              transition
              hover:bg-red-50
            "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}