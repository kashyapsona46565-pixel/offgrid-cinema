import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { properties, propertyList, Property, PropertyId } from "@/data/villa";

type Ctx = {
  selected: Property;
  setSelected: (id: PropertyId) => void;
  list: Property[];
};

const PropertyCtx = createContext<Ctx | null>(null);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [id, setId] = useState<PropertyId>(() => {
    if (typeof window === "undefined") return "otg1";
    const stored = localStorage.getItem("otg.property") as PropertyId | null;
    return stored && stored in properties ? stored : "otg1";
  });

  useEffect(() => {
    localStorage.setItem("otg.property", id);
  }, [id]);

  return (
    <PropertyCtx.Provider value={{ selected: properties[id], setSelected: setId, list: propertyList }}>
      {children}
    </PropertyCtx.Provider>
  );
};

export const useProperty = () => {
  const ctx = useContext(PropertyCtx);
  if (!ctx) throw new Error("useProperty must be used inside PropertyProvider");
  return ctx;
};
