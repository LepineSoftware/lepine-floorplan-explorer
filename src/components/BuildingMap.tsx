import React, { useEffect } from "react"; // 1. Add useEffect
import { MapContainer, ImageOverlay, useMap } from "react-leaflet"; // 2. Add useMap
import L from "leaflet";
import MapController from "./MapController";
import FloorPolygon from "./FloorPolygon";
import { MAP_VIEW_SETTINGS } from "../config/viewConfigs";
import { Floor } from "../types/building";
import "leaflet/dist/leaflet.css";

// 3. Import Geoman JS and CSS
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

interface BuildingMapProps {
  config: {
    url: string;
    width: number;
    height: number;
  };
  floors: Floor[];
  onSelect: (floor: Floor) => void;
}

const formatCoordinates = (latLngs: any[]): number[][] => {
  // Leaflet polygons usually return an array of arrays (rings)
  // We take the first ring (outer boundary)
  const ring = Array.isArray(latLngs[0]) ? latLngs[0] : latLngs;
  
  return ring.map((pt: any) => {
    // Round to integers for cleaner JSON (pixel coordinates)
    // Map lng to x, lat to y
    return [Math.round(pt.lng), Math.round(pt.lat)];
  });
};

const DebugControls = () => {
  const map = useMap();
  const isDebug = MAP_VIEW_SETTINGS.debug;

  useEffect(() => {
    if (!isDebug) return;

    const pmMap = map as any;
    if (pmMap.pm) {
      pmMap.pm.addControls({
        position: "topleft",
        drawCircle: false,
        drawCircleMarker: false,
        drawText: false,
        drawMarker: false,
        drawPolyline: false,
        drawPolygon: true,
        drawRectangle: true,
        editMode: true,
        dragMode: true,
        cutPolygon: true,
        removalMode: true,
        rotateMode: false,
      });
    }

    const logCoords = (layer: any, action: string) => {
      if (layer.getLatLngs) {
        // 1. Get raw Leaflet LatLngs
        const latLngs = layer.getLatLngs();
        
        // 2. Format to [[x, y], [x, y]]
        const formattedPoints = formatCoordinates(latLngs);
        
        // 3. Log specifically for your JSON file
        console.log(`%c[${action}] JSON Format:`, "color: #00dbb5; font-weight: bold;");
        console.log(`"polygon": ${JSON.stringify(formattedPoints, null, 2)},`);
      }
    };

    const handleCreate = (e: any) => {
      const layer = e.layer;
      logCoords(layer, "CREATED");

      layer.on("pm:edit", () => logCoords(layer, "EDITED"));
      layer.on("pm:dragend", () => logCoords(layer, "DRAGGED"));
      layer.on("pm:cut", () => logCoords(layer, "CUT"));
    };

    map.on("pm:create", handleCreate);

    return () => {
      if (pmMap.pm) pmMap.pm.removeControls();
      map.off("pm:create", handleCreate);
    };
  }, [map, isDebug]);

  return null;
};

const BuildingMap: React.FC<BuildingMapProps> = ({ config, floors, onSelect }) => {
  const bounds: L.LatLngBoundsExpression = [
    [0, 0],
    [config.height, config.width],
  ];
  const settings = MAP_VIEW_SETTINGS.building;

  return (
    <MapContainer
      crs={L.CRS.Simple}
      className="h-full w-full"
      style={{ background: MAP_VIEW_SETTINGS.defaultBackground }}
      attributionControl={false}
      keyboard={false}
      zoomControl={settings.zoomControl}
      dragging={settings.dragging}
      scrollWheelZoom={settings.scrollWheelZoom}
      doubleClickZoom={settings.doubleClickZoom}
      touchZoom={settings.touchZoom}
      fadeAnimation={false}
      zoomAnimation={false}
    >
      {/* 5. Add DebugControls inside MapContainer */}
      <DebugControls />

      <ImageOverlay url={config.url} bounds={bounds} />
      <MapController
        mode="building"
        bounds={bounds}
        imageWidth={config.width}
        imageHeight={config.height}
      />
      {floors.map((floor) => (
        <FloorPolygon key={floor.id} floor={floor} onSelect={onSelect} />
      ))}
    </MapContainer>
  );
};

export default BuildingMap;