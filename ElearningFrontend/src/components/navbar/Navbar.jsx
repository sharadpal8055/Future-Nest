import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

import { useAuth } from "../../auth/useAuth"

import Brand from "./Brand";
import {
  guestLinks,
  userLinks,
  adminLinks,
} from "./navigationLinks";
import UserDropdown from "./UserDropdown";
import MobileDrawer from "./MobileDrawer";
import NavLinks from "./NavLinks";

export default function Navbar() {
  const { user, logout } = useAuth();

  const location = useLocation();

  const [open, setOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close drawer on desktop resize
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navbar shadow on scroll
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleLogout() {
    try {
      await logout();
    } finally {
      setOpen(false);
    }
  }

  return (
    <>
      <nav
        className={`
          fixed
          top-0
          left-0
          right-0
          z-50
          transition-all
          duration-300
          ${
            scrolled
              ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200"
              : "bg-white/90 backdrop-blur-md border-b border-gray-100"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Brand />

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-2">
              <NavLinks user={user} />

              {user && <UserDropdown user={user} onLogout={handleLogout} />}
            </div>

            {/* Mobile */}
            <button
              onClick={() => setOpen(true)}
              className="
                md:hidden
                rounded-lg
                p-2
                transition
                hover:bg-gray-100
              "
              aria-label="Open Menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileDrawer
        open={open}
        setOpen={setOpen}
        user={user}
        onLogout={handleLogout}
      />
    </>
  );
}
