import React from "react";
import { useBuilding } from "../context/BuildingContext";
import BuildingMap from "./BuildingMap";

const BuildingView: React.FC = () => {
  const { data, floors, selectFloor } = useBuilding();

  if (!data) return null; // Type guard for data

  return (
    <div className="h-full w-full relative">
      <div className="absolute top-8 left-8 z-[1000] bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white shadow-2xl max-w-md hidden md:block">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">{data.name}</h1>
        {/* ... rest of UI ... */}
      </div>

      <BuildingMap
        config={data.config}
        floors={floors}
        onSelect={(floor) => selectFloor(floor.id)}
      />
    </div>
  );
};

export default BuildingView;