// src/context/BuildingContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

const BuildingContext = createContext();

export function BuildingProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFloorId, setActiveFloorId] = useState(null);
  const [activeUnitId, setActiveUnitId] = useState(null);

  const [viewMode, setViewMode] = useState("map");
  const [gridTab, setGridTab] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [activeTour, setActiveTour] = useState(null); // Centralized Tour State

  useEffect(() => {
    fetch("/data/building.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const floors = useMemo(() => data?.config?.floors || [], [data]);

  const allUnits = useMemo(() => {
    return floors.flatMap((floor) =>
      floor.units.map((unit) => ({
        ...unit,
        floorId: floor.id,
        floorName: floor.name,
      })),
    );
  }, [floors]);

  // Updated selectFloor to pick the first unit by default
  const selectFloor = (id) => {
    const floor = floors.find((f) => f.id === id);
    setActiveFloorId(id);
    if (floor && floor.units.length > 0) {
      setActiveUnitId(floor.units[0].id);
    }
    setViewMode("map");
  };

  const handleUnitSelect = (unitId) => {
    const unitData = allUnits.find((u) => u.id === unitId);
    if (unitData) {
      setActiveFloorId(unitData.floorId);
      setActiveUnitId(unitId);
    }
  };

  const activeFloor = useMemo(
    () => floors.find((f) => f.id === activeFloorId) || null,
    [floors, activeFloorId],
  );
  const activeUnit = useMemo(
    () => allUnits.find((u) => u.id === activeUnitId) || null,
    [allUnits, activeUnitId],
  );

  // Global Filtering Logic
  const filteredUnits = useMemo(() => {
    const baseSet =
      gridTab === "favorites"
        ? allUnits.filter((u) => favorites.includes(u.id))
        : allUnits;
    return baseSet; // Add filter logic here as needed
  }, [allUnits, favorites, gridTab]);

  const value = {
    data,
    loading,
    activeFloor,
    activeUnit,
    selectFloor,
    selectUnit: handleUnitSelect,
    goBackToBuilding: () => {
      setActiveFloorId(null);
      setActiveUnitId(null);
    },
    floors,
    viewMode,
    setViewMode,
    gridTab,
    setGridTab,
    favorites,
    toggleFavorite: (id) =>
      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
      ),
    filteredUnits,
    activeTour,
    setActiveTour,
  };

  return (
    <BuildingContext.Provider value={value}>
      {children}
    </BuildingContext.Provider>
  );
}

export const useBuilding = () => useContext(BuildingContext);
