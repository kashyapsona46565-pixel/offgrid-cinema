import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="relative mt-32 border-t border-border/40 bg-background">
    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
      <div className="md:col-span-2">
        <div className="font-display text-3xl text-primary text-glow">Off The Grid</div>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          A cinematic 2BHK luxury villa tucked into Lonavala. Disconnect from
          the noise. Reconnect with what matters.
        </p>
      </div>
      <div>
        <div className="mb-3 text-sm font-semibold tracking-wide uppercase">Explore</div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/villa" className="hover:text-primary">Villa</Link></li>
          <li><Link to="/amenities" className="hover:text-primary">Amenities</Link></li>
          <li><Link to="/gallery" className="hover:text-primary">Gallery</Link></li>
          <li><Link to="/booking" className="hover:text-primary">Book</Link></li>
        </ul>
      </div>
      <div>
        <div className="mb-3 text-sm font-semibold tracking-wide uppercase">Reach</div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>Lonavala, Maharashtra</li>
          <li>+91 99999 99999</li>
          <li>hello@offthegrid.stay</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border/40 px-6 py-6 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} Off The Grid Villa · Disconnect to Reconnect
    </div>
  </footer>
);

export default Footer;