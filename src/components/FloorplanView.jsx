import React, { useState } from "react";
import { ChevronUp } from "lucide-react";
import FloorplanMap from "./FloorplanMap";
import Sidebar from "./Sidebar";
import { BUILDING_CONFIG } from "../config/floorplans";
import { UI_TRANSITIONS } from "../config/viewConfigs";

export default function FloorplanView({
  activeFloor,
  activeUnit,
  onUnitSelect,
  onFloorChange,
  onBack,
  onOpenGallery,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const currentIndex = activeFloor.units.findIndex(
    (u) => u.id === activeUnit?.id,
  );

  const navigateUnit = (dir) => {
    const units = activeFloor.units;
    let nextIndex = currentIndex + dir;
    if (nextIndex >= units.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = units.length - 1;
    onUnitSelect(units[nextIndex]);
  };

  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      <div className="flex-1 relative z-0">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute bottom-8 left-8 z-[1000] bg-white px-4 py-2 rounded-lg shadow-xl hover:bg-slate-100 font-bold text-slate-700 transition-colors border border-slate-200"
        >
          ← Back
        </button>

        {/* Dynamic Upward Dropdown */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] flex flex-col items-center">
          {/* Floor Menu (Vertical Column) */}
          <div
            className={`${UI_TRANSITIONS} mb-3 flex flex-col gap-1 bg-white p-1.5 rounded-2xl shadow-xl border border-slate-200 min-w-[160px] ${
              isOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            {BUILDING_CONFIG.floors.map((floor) => (
              <button
                key={floor.id}
                onClick={() => {
                  onFloorChange(floor);
                  setIsOpen(false);
                }}
                className={`px-4 py-2.5 rounded-xl text-left text-sm font-medium normal-case ${UI_TRANSITIONS} ${
                  activeFloor?.id === floor.id
                    ? "bg-[#102a43] text-white shadow-xl"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {floor.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-3 bg-white text-[#102a43] px-6 py-3 rounded-xl shadow-xl border border-slate-200 hover:bg-slate-50 ${UI_TRANSITIONS} active:scale-95`}
          >
            <span className="text-sm font-bold normal-case">
              {activeFloor?.name || "select floor"}
            </span>
            <ChevronUp
              size={18}
              className={`${UI_TRANSITIONS} ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <FloorplanMap
          mode="floorplan"
          config={activeFloor.config}
          items={activeFloor.units}
          activeId={activeUnit?.id}
          onSelect={onUnitSelect}
        />
      </div>

      <Sidebar
        unit={activeUnit}
        onNext={() => navigateUnit(1)}
        onPrev={() => navigateUnit(-1)}
        currentIndex={currentIndex}
        total={activeFloor.units.length}
        onOpenGallery={onOpenGallery}
      />
    </div>
  );
}
