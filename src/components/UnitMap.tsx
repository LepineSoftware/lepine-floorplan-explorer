import React, { useEffect } from "react";
import { MapContainer, ImageOverlay, useMap } from "react-leaflet";
import L from "leaflet";
import MapController from "./MapController";
import UnitPolygon from "./UnitPolygon";
import AmenityTourMarker from "./AmenityTourMarker"; 
import RecenterControl from "./RecenterControl";
import { MAP_VIEW_SETTINGS } from "../config/viewConfigs";
import { Unit, AmenityTour, Tour, FloorConfig } from "../types/building";
import "leaflet/dist/leaflet.css";

// 1. Import Geoman JS and CSS
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";

interface UnitMapProps {
  config: FloorConfig;
  units: Unit[];
  amenityTours: AmenityTour[];
  activeUnitId: string | undefined;
  onSelect: (unit: Unit) => void;
  onTourSelect: (tour: Tour) => void;
  recenterTrigger?: number;
}

function AutoRecenter({ trigger, bounds, padding }: { trigger: number; bounds: L.LatLngBoundsExpression; padding: L.PointExpression }) {
  const map = useMap();

  useEffect(() => {
    if (trigger > 0) {
      map.invalidateSize();
      map.fitBounds(bounds, { padding, animate: true });
    }
  }, [trigger, map, bounds, padding]);

  return null;
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

export default function UnitMap({
  config,
  units,
  amenityTours,
  activeUnitId,
  onSelect,
  onTourSelect,
  recenterTrigger = 0,
}: UnitMapProps) {
  const bounds: L.LatLngBoundsExpression = [
    [0, 0],
    [config.height, config.width],
  ];
  const settings = MAP_VIEW_SETTINGS.floorplan;

  return (
    <div className="w-full h-full relative">
      <MapContainer
        crs={L.CRS.Simple}
        className="h-full w-full"
        style={{ background: MAP_VIEW_SETTINGS.defaultBackground }}
        attributionControl={false}
        keyboard={false}
        fadeAnimation={false}
        zoomAnimation={false}
        markerZoomAnimation={false}
        {...settings}
      >
        {/* 3. Add the DebugControls component inside the MapContainer */}
        <DebugControls />
        
        <AutoRecenter trigger={recenterTrigger} bounds={bounds} padding={settings.padding} />
        <ImageOverlay url={config.url} bounds={bounds} />
        
        <MapController
          mode="floorplan"
          bounds={bounds}
          imageWidth={config.width}
          imageHeight={config.height}
        />

        {units.map((unit: Unit) => (
          <UnitPolygon
            key={unit.id}
            unit={unit}
            isActive={activeUnitId === unit.id}
            onSelect={onSelect}
          />
        ))}

        {amenityTours.map((tour: AmenityTour) => (
          <AmenityTourMarker 
            key={tour.id} 
            tour={tour} 
            onSelect={onTourSelect} 
          />
        ))}

        <RecenterControl bounds={bounds} padding={settings.padding} />
      </MapContainer>
    </div>
  );
}