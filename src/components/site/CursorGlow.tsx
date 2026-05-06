import { useEffect, useState } from "react";

export const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let id = 0;
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setTrail((t) => [...t.slice(-8), { x: e.clientX, y: e.clientY, id: id++ }]);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Hide on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed z-[9999] h-8 w-8 rounded-full mix-blend-screen"
        style={{
          left: pos.x - 16,
          top: pos.y - 16,
          background: "radial-gradient(circle, hsl(var(--primary) / 0.9), transparent 70%)",
          transition: "transform 0.08s ease-out",
        }}
      />
      {trail.map((t, i) => (
        <div
          key={t.id}
          className="pointer-events-none fixed z-[9998] rounded-full mix-blend-screen"
          style={{
            left: t.x - 4,
            top: t.y - 4,
            width: 8,
            height: 8,
            background: "hsl(var(--primary) / " + (i / 12) + ")",
            filter: "blur(4px)",
          }}
        />
      ))}
    </>
  );
};

export default CursorGlow;