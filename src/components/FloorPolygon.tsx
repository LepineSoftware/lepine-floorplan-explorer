import React from "react";
import { Polygon, Tooltip } from "react-leaflet";
import L from "leaflet";
import { POLYGON_STYLES } from "../config/mapStyles";
import { Floor } from "../types/building";

interface FloorPolygonProps {
  floor: Floor;
  onSelect: (floor: Floor) => void;
}

export default function FloorPolygon({ floor, onSelect }: FloorPolygonProps) {
  // Fix: Map [x, y] from JSON to [y, x] (lat, lng) for Leaflet
  const leafletCoordinates = floor.polygon.map((point) => [point[1], point[0]] as [number, number]);

  return (
    <Polygon
      positions={leafletCoordinates}
      pathOptions={POLYGON_STYLES.inactive}
      eventHandlers={{
        click: (e: L.LeafletMouseEvent) => {
          L.DomEvent.stopPropagation(e);
          if (typeof onSelect === "function") {
            onSelect(floor);
          }
        },
        mouseover: (e: L.LeafletMouseEvent) => e.target.setStyle(POLYGON_STYLES.hover),
        mouseout: (e: L.LeafletMouseEvent) => e.target.setStyle(POLYGON_STYLES.inactive),
      }}
    >
      <Tooltip permanent direction="center" className="polygon-label">
        {/* {floor.name} */}
      </Tooltip>
    </Polygon>
  );
}