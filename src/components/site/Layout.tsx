import { ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import CursorGlow from "./CursorGlow";
import Loader from "./Loader";
import MobileBar from "./MobileBar";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
    <Loader />
    <CursorGlow />
    <Nav />
    <main className="pb-24 md:pb-0">{children}</main>
    <Footer />
    <MobileBar />
  </div>
);

export default Layout;