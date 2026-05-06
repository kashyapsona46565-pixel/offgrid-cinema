import { ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import CursorGlow from "./CursorGlow";
import Loader from "./Loader";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
    <Loader />
    <CursorGlow />
    <Nav />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;