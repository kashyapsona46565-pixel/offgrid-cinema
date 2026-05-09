import { useEffect, useState } from "react";

export const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <div
      className="pointer-events-none fixed z-[9999] h-5 w-5 rounded-full opacity-40"
      style={{
        left: pos.x - 10,
        top: pos.y - 10,
        background: "radial-gradient(circle, hsl(var(--primary) / 0.5), transparent 70%)",
        transition: "left 0.15s ease-out, top 0.15s ease-out",
      }}
    />
  );
};

export default CursorGlow;
