import { useProperty } from "@/context/PropertyContext";

export const PropertySwitcher = ({ size = "md" }: { size?: "sm" | "md" }) => {
  const { selected, setSelected, list } = useProperty();
  const pad = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 shadow-warm">
      {list.map((p) => {
        const active = selected.id === p.id;
        return (
          <button
            key={p.id}
            onClick={() => setSelected(p.id)}
            className={`rounded-full font-semibold transition-all ${pad} ${
              active
                ? "bg-primary-gradient text-primary-foreground shadow-warm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {p.shortName}
          </button>
        );
      })}
    </div>
  );
};

export default PropertySwitcher;
