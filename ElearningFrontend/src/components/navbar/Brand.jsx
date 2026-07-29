import { GraduationCap } from "lucide-react";
import { NavLink } from "react-router-dom";

const APP_NAME = "FutureNest";

export default function Brand() {
  return (
    <NavLink to="/" className="group flex items-center gap-3 select-none">
      {/* Logo */}
      <div
        className="
          flex h-11 w-11 items-center justify-center
          rounded-xl
          bg-gradient-to-br
          from-indigo-600
          via-violet-600
          to-purple-600
          text-white
          shadow-md
          transition-all
          duration-300
          group-hover:scale-105
          group-hover:shadow-lg
        "
      >
        <GraduationCap size={22} strokeWidth={2.2} />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col leading-tight">
        <span
          className="
            text-xl
            font-extrabold
            tracking-tight
            bg-gradient-to-r
            from-indigo-600
            via-violet-600
            to-purple-600
            bg-clip-text
            text-transparent
          "
        >
          {APP_NAME}
        </span>

        <span className="hidden text-xs text-gray-500 sm:block">
          Learn • Build • Grow
        </span>
      </div>
    </NavLink>
  );
}
