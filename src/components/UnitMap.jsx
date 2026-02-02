import React from "react";
import { MapContainer, ImageOverlay } from "react-leaflet";
import L from "leaflet";
import MapController from "./MapController";
import UnitPolygon from "./UnitPolygon";
import VirtualTourPolygon from "./VirtualTourPolygon";
import RecenterControl from "./RecenterControl"; // Imported external component
import { MAP_VIEW_SETTINGS } from "../config/viewConfigs";
import "leaflet/dist/leaflet.css";

export default function UnitMap({
  config,
  units,
  vrTours,
  activeUnitId,
  onSelect,
  onTourSelect,
}) {
  const bounds = [
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
      {units.map((unit) => (
        <UnitPolygon
          key={unit.id}
          unit={unit}
          isActive={activeUnitId === unit.id}
          onSelect={onSelect}
        />
      ))}
      {vrTours.map((tour) => (
        <VirtualTourPolygon key={tour.id} tour={tour} onSelect={onTourSelect} />
      ))}
      <RecenterControl bounds={bounds} padding={settings.padding} />
    </MapContainer>
  );
}
