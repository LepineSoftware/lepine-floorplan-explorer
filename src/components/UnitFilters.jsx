// src/components/UnitFilters.jsx
import React from "react";
import { useBuilding } from "../context/BuildingContext";

export default function UnitFilters() {
  const { filters, setFilters } = useBuilding();

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleFeature = (key) => {
    setFilters((prev) => ({
      ...prev,
      features: prev.features.includes(key)
        ? prev.features.filter((f) => f !== key)
        : [...prev.features, key],
    }));
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      {["beds", "baths", "status"].map((type) => (
        <select
          key={type}
          value={filters[type]}
          onChange={(e) => handleChange(type, e.target.value)}
          className="bg-slate-50 border border-slate-200 text-xs font-bold text-[#102a43] px-3 py-2 rounded-lg outline-none"
        >
          <option value="All">
            {type.charAt(0).toUpperCase() + type.slice(1)}: All
          </option>
          {type === "status"
            ? ["Available", "Leased", "On Hold"].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))
            : [1, 2, 3].map((n) => (
                <option key={n} value={n}>
                  {n} {type}
                </option>
              ))}
        </select>
      ))}

      <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
        {["balcony", "officeDen", "barrierFree"].map((feat) => (
          <button
            key={feat}
            onClick={() => toggleFeature(feat)}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase border transition-all ${filters.features.includes(feat) ? "bg-[#102a43] text-white border-[#102a43]" : "bg-white text-slate-400 border-slate-200"}`}
          >
            {feat.replace(/([A-Z])/g, " $1")}
          </button>
        ))}
      </div>
    </div>
  );
}
