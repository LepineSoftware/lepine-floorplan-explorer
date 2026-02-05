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
        // zoomControl={false} <-- REMOVED this line as it is already in {...settings}
        {...settings}
      >
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