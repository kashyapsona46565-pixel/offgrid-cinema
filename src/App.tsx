import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PropertyProvider } from "@/context/PropertyContext";
import Home from "./pages/Home.tsx";
import Gallery from "./pages/Gallery.tsx";
import Availability from "./pages/Availability.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PropertyProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/availability" element={<Availability />} />
            <Route path="/contact" element={<Contact />} />
            {/* Legacy redirects */}
            <Route path="/villa" element={<Navigate to="/" replace />} />
            <Route path="/amenities" element={<Navigate to="/" replace />} />
            <Route path="/booking" element={<Navigate to="/availability" replace />} />
            <Route path="/location" element={<Navigate to="/contact" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PropertyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
