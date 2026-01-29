import React from "react";
import { useBuilding } from "../context/BuildingContext";
import { Maximize, Bed, Bath, Heart, ChevronRight, Inbox } from "lucide-react";

export default function UnitGrid() {
  const {
    filteredUnits,
    selectUnit,
    activeUnit,
    favorites,
    toggleFavorite,
    gridTab,
  } = useBuilding();

  // Handle empty states gracefully
  if (!filteredUnits || filteredUnits.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 py-20 animate-in fade-in duration-500">
        <div className="p-8 bg-white rounded-3xl shadow-inner mb-6 text-slate-200">
          <Inbox size={64} strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-bold text-slate-800">
          {gridTab === "favorites" ? "No favorites yet" : "No units found"}
        </h3>
        <p className="text-sm mt-2 max-w-[280px] text-center leading-relaxed">
          {gridTab === "favorites"
            ? "Your favorite units will appear here once you save them from the map or list view."
            : "Try adjusting your filters to explore more availability."}
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto p-6 md:p-12 bg-slate-50 no-scrollbar pb-24 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-[1600px] mx-auto">
        {filteredUnits.map((unit) => {
          const isFav = favorites.includes(unit.id);
          const isActive = activeUnit?.id === unit.id;

          return (
            <div
              key={unit.id}
              onClick={() => selectUnit(unit.id)}
              className={`bg-white rounded-[1rem] shadow-sm border-2 transition-all duration-300 cursor-pointer overflow-hidden group hover:shadow-2xl hover:-translate-y-1 ${
                isActive ? "border-slate-900" : "border-transparent"
              }`}
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                <img
                  src={unit.image}
                  alt={unit.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(unit.id);
                  }}
                  className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-lg transition-all ${
                    isFav
                      ? "bg-rose-500 text-white"
                      : "bg-white/90 text-slate-400 hover:text-rose-500"
                  }`}
                >
                  <Heart size={18} fill={isFav ? "currentColor" : "none"} />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-black uppercase rounded-lg shadow-sm">
                    {unit.floorName}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg leading-none mb-1">
                      {unit.title}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {unit.model}
                    </p>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-slate-300 group-hover:text-slate-900 transition-colors"
                  />
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-slate-50 text-slate-400">
                  <div className="flex items-center gap-2">
                    <Maximize size={16} />
                    <span className="text-sm font-bold text-slate-700">
                      {unit.sqft}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed size={16} />
                    <span className="text-sm font-bold text-slate-700">
                      {unit.numOfBeds}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath size={16} />
                    <span className="text-sm font-bold text-slate-700">
                      {unit.numOfBaths}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
