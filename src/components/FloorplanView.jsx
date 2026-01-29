// src/components/FloorplanView.jsx
import React, { useState } from "react";
import { ChevronUp, Map as MapIcon, LayoutGrid, Heart, X } from "lucide-react";
import { useBuilding } from "../context/BuildingContext";
import UnitMap from "./UnitMap";
import UnitGrid from "./UnitGrid";
import Sidebar from "./Sidebar";
import VirtualTourEmbed from "./VirtualTourEmbed";
import GalleryModal from "./GalleryModal";
import { UI_TRANSITIONS } from "../config/viewConfigs";

export default function FloorplanView() {
  const {
    activeFloor,
    activeUnit,
    selectFloor,
    selectUnit,
    viewMode,
    setViewMode,
    gridTab,
    setGridTab,
    favorites,
    floors,
    goBackToBuilding,
    activeTour,
    setActiveTour,
  } = useBuilding();

  const [isFloorMenuOpen, setIsFloorMenuOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  if (!activeFloor) return null;

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-slate-50 font-['Jost']">
      <div className="flex-1 relative flex flex-col min-w-0">
        <div className="z-[1001] bg-white border-b border-slate-200 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === "map" ? "bg-white text-[#102a43] shadow-sm" : "text-slate-400"}`}
              >
                <MapIcon size={14} /> Map
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === "grid" ? "bg-white text-[#102a43] shadow-sm" : "text-slate-400"}`}
              >
                <LayoutGrid size={14} /> List
              </button>
            </div>
            {viewMode === "grid" && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGridTab("all")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg ${gridTab === "all" ? "bg-slate-100 text-[#102a43]" : "text-slate-400"}`}
                >
                  All Units
                </button>
                <button
                  onClick={() => setGridTab("favorites")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-2 ${gridTab === "favorites" ? "bg-rose-50 text-rose-600" : "text-slate-400"}`}
                >
                  <Heart
                    size={12}
                    fill={gridTab === "favorites" ? "currentColor" : "none"}
                  />{" "}
                  Favorites ({favorites.length})
                </button>
              </div>
            )}
            <button
              onClick={goBackToBuilding}
              className="bg-[#102a43] text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2"
            >
              <X size={14} /> Back to Building
            </button>
          </div>
        </div>

        <div className="flex-1 relative overflow-hidden">
          {viewMode === "map" ? (
            <UnitMap
              config={activeFloor.config}
              units={activeFloor.units}
              vrTours={activeFloor.vrTours || []}
              activeUnitId={activeUnit?.id}
              onSelect={(unit) => selectUnit(unit.id)}
              onTourSelect={setActiveTour} // Properly passing Tour Trigger
            />
          ) : (
            <UnitGrid />
          )}
          {/* Floor Menu logic remains same... */}
        </div>
      </div>

      <Sidebar onOpenGallery={() => setIsGalleryOpen(true)} />

      <VirtualTourEmbed
        isOpen={!!activeTour}
        url={activeTour?.url}
        label={activeTour?.label}
        onClose={() => setActiveTour(null)}
      />
      <GalleryModal
        isOpen={isGalleryOpen}
        images={activeUnit?.gallery}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  );
}
