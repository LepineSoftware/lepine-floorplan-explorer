import { useEffect } from "react";
import {
  MapContainer,
  ImageOverlay,
  Marker,
  ZoomControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { MAP_CONFIG, floorplans } from "../data/floorplans";
import "leaflet/dist/leaflet.css";

// Controller to handle the coordinate system and initial zoom fit
function MapController({ bounds }) {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
      map.fitBounds(bounds, { padding: [20, 20] });
    }, 100);
    return () => clearTimeout(timer);
  }, [map, bounds]);

  return (
    <div className="leaflet-top leaflet-left mt-20 ml-2">
      <div className="leaflet-bar custom-control-button">
        <a
          href="#"
          title="Recenter Map"
          onClick={(e) => {
            e.preventDefault();
            map.fitBounds(bounds, { padding: [20, 20] });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function FloorplanMap({ activeUnitId, onSelectUnit }) {
  const bounds = [
    [0, 0],
    [MAP_CONFIG.height, MAP_CONFIG.width],
  ];

  return (
    <MapContainer
      crs={L.CRS.Simple}
      bounds={bounds}
      zoomSnap={0}
      attributionControl={false}
      zoomControl={false}
      className="h-full w-full bg-[#f8fafc]"
    >
      <ZoomControl position="topleft" />
      <ImageOverlay url={MAP_CONFIG.url} bounds={bounds} />
      <MapController bounds={bounds} />

      {floorplans.map((unit) => (
        <Marker
          key={unit.id}
          position={[unit.y, unit.x]}
          eventHandlers={{ click: () => onSelectUnit(unit) }}
          icon={L.divIcon({
            className: `floorplan-base-pin ${activeUnitId === unit.id ? "pin-active" : ""}`,
            iconSize: [30, 30],
            iconAnchor: [15, 15],
          })}
        />
      ))}
    </MapContainer>
  );
}
