import { NavLink, Link } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";
import PropertySwitcher from "./PropertySwitcher";
import { useProperty } from "@/context/PropertyContext";
import { buildWhatsApp } from "@/data/villa";

const links = [
  { to: "/", label: "Home" },
  { to: "/gallery", label: "Gallery" },
  { to: "/availability", label: "Availability" },
  { to: "/contact", label: "Contact Us" },
];

export const Nav = () => {
  const [open, setOpen] = useState(false);
  const { selected } = useProperty();
  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-gradient text-primary-foreground shadow-warm font-display font-bold">
            O
          </span>
          <span className="font-display text-base md:text-lg tracking-wide">Off The Grid Villas</span>
        </Link>

        <nav className="hidden rounded-full border border-border bg-card px-2 py-1.5 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm transition-all ${
                  isActive ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={buildWhatsApp(selected.name)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary-gradient px-4 py-2 text-sm font-semibold text-primary-foreground shadow-warm hover:scale-105 transition-transform"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Property switcher row */}
      <div className="mx-auto flex max-w-7xl items-center justify-center px-4 pb-3 md:px-8">
        <PropertySwitcher size="sm" />
      </div>

      {open && (
        <div className="mx-4 mb-3 flex flex-col gap-1 rounded-2xl border border-border bg-card p-3 md:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
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
