// src/components/UnitFilters.jsx
import React from "react";
import { useBuilding } from "../context/BuildingContext";

export default function UnitFilters() {
  const { filters, setFilters } = useBuilding();

  const handleSelect = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleFeature = (feature) => {
    setFilters((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const booleanFeatures = [
    { key: "balcony", label: "Balcony" },
    { key: "tub", label: "Tub" },
    { key: "officeDen", label: "Office/Den" },
    { key: "barrierFree", label: "Barrier Free" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Dropdown Filters */}
      {["beds", "baths", "status"].map((type) => (
        <select
          key={type}
          value={filters[type]}
          onChange={(e) => handleSelect(type, e.target.value)}
          className="bg-slate-50 border border-slate-200 text-[10px] font-black uppercase tracking-widest text-[#102a43] px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[#102a43]/10"
        >
          <option value="All">{type}: All</option>
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

      {/* Boolean Feature Toggles */}
      <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
        {booleanFeatures.map((feat) => (
          <button
            key={feat.key}
            onClick={() => toggleFeature(feat.key)}
            className={`px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-tighter border transition-all ${
              filters.features.includes(feat.key)
                ? "bg-[#102a43] text-white border-[#102a43]"
                : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
            }`}
          >
            {feat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
