import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/villa", label: "Villa" },
  { to: "/amenities", label: "Amenities" },
  { to: "/gallery", label: "Gallery" },
  { to: "/booking", label: "Book" },
  { to: "/location", label: "Location" },
  { to: "/contact", label: "Contact" },
];

export const Nav = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between px-4 md:px-8">
        <Link to="/" className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-neon text-primary-foreground shadow-neon font-display font-bold">
            O
          </span>
          <span className="font-display text-lg tracking-wide">
            Off The Grid
          </span>
        </Link>
        <nav className="glass hidden rounded-full px-2 py-2 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm transition-all ${
                  isActive
                    ? "bg-primary/15 text-primary text-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <a
          href="https://wa.me/919999999999?text=Hi%20I'd%20like%20to%20book%20Off%20The%20Grid%20villa"
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-full bg-neon px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-neon transition-transform hover:scale-105 md:inline-flex"
        >
          Book Now
        </a>
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="glass grid h-10 w-10 place-items-center rounded-full md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="glass mx-4 mt-3 flex flex-col rounded-2xl p-3 md:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-sm ${isActive ? "bg-primary/15 text-primary" : "text-muted-foreground"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Nav;