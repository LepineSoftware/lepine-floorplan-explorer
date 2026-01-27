import React, { useState, useEffect } from "react";
import FloorplanMap from "./components/FloorplanMap";
import Sidebar from "./components/Sidebar";
import GalleryModal from "./components/GalleryModal";
import { floorplans } from "./data/floorplans";

function App() {
  const [activeUnit, setActiveUnit] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Replicate original behavior: Auto-select first unit on load
  useEffect(() => {
    if (floorplans.length > 0) {
      setActiveUnit(floorplans[0]);
    }
  }, []);

  const currentIndex = floorplans.findIndex((u) => u.id === activeUnit?.id);

  const navigateUnit = (dir) => {
    let nextIndex = currentIndex + dir;
    if (nextIndex >= floorplans.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = floorplans.length - 1;
    setActiveUnit(floorplans[nextIndex]);
  };

  return (
    <div className="h-screen supports-[height:100dvh]:h-[100dvh] w-screen overflow-hidden flex flex-col md:flex-row bg-slate-50 text-slate-900 relative">
      {/* Mobile Title Header */}
      <div className="md:hidden px-6 py-4 bg-white border-b border-slate-200 z-30 shrink-0">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight text-center">
          1581 Lépine Blvd
        </h2>
      </div>

      {/* Map Section */}
      <div className="h-[35vh] w-full md:h-full md:flex-1 relative z-0 shrink-0">
        <FloorplanMap
          activeUnitId={activeUnit?.id}
          onSelectUnit={setActiveUnit}
        />
      </div>

      {/* Sidebar Section */}
      <Sidebar
        unit={activeUnit}
        onNext={() => navigateUnit(1)}
        onPrev={() => navigateUnit(-1)}
        currentIndex={currentIndex}
        total={floorplans.length}
        onOpenGallery={() => setIsGalleryOpen(true)}
      />

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={isGalleryOpen}
        images={activeUnit?.gallery}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  );
}

export default App;
