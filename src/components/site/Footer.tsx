import { Link } from "react-router-dom";
import { PHONE_DISPLAY, ADDRESS_LINE } from "@/data/villa";

export const Footer = () => (
  <footer className="relative mt-24 border-t border-border/60 bg-background">
    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
      <div className="md:col-span-2">
        <div className="font-display text-2xl text-primary">Off The Grid Villas</div>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          Two private 2BHK villas in Lonavala. Comfortable, quiet weekends with the people you like.
        </p>
      </div>
      <div>
        <div className="mb-3 text-sm font-semibold uppercase tracking-wide">Explore</div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/" className="hover:text-primary">Home</Link></li>
          <li><Link to="/gallery" className="hover:text-primary">Gallery</Link></li>
          <li><Link to="/availability" className="hover:text-primary">Availability</Link></li>
          <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
        </ul>
      </div>
      <div>
        <div className="mb-3 text-sm font-semibold uppercase tracking-wide">Reach Us</div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>{ADDRESS_LINE}</li>
          <li>{PHONE_DISPLAY}</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border/60 px-6 py-5 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} Off The Grid Villas · Lonavala
    </div>
  </footer>
);

export default Footer;
