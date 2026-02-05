import React from "react";
import { MapContainer, ImageOverlay } from "react-leaflet";
import L from "leaflet";
import MapController from "./MapController";
import UnitPolygon from "./UnitPolygon";
// Use the renamed marker component
import AmenityTourMarker from "./AmenityTourMarker"; 
import RecenterControl from "./RecenterControl";
import { MAP_VIEW_SETTINGS } from "../config/viewConfigs";
// Import AmenityTour and Tour types
import { Unit, AmenityTour, Tour } from "../types/building";
import "leaflet/dist/leaflet.css";

interface UnitMapProps {
  config: {
    height: number;
    width: number;
    url: string;
  };
  units: Unit[];
  // Prop renamed to match data structure
  amenityTours: AmenityTour[];
  activeUnitId: string | undefined;
  onSelect: (unit: Unit) => void;
  // Handler uses the base Tour type for versatility
  onTourSelect: (tour: Tour) => void;
}

export default function UnitMap({
  config,
  units,
  amenityTours,
  activeUnitId,
  onSelect,
  onTourSelect,
}: UnitMapProps) {
  const bounds: L.LatLngBoundsExpression = [
    [0, 0],
    [config.height, config.width],
  ];
  const settings = MAP_VIEW_SETTINGS.floorplan;

  return (
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
      {/* Render Amenity Tour Markers */}
      {amenityTours.map((tour: AmenityTour) => (
        <AmenityTourMarker 
          key={tour.id} 
          tour={tour} 
          onSelect={onTourSelect} 
        />
      ))}
      <RecenterControl bounds={bounds} padding={settings.padding} />
    </MapContainer>
  );
}