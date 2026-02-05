import React, { memo } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
// 1. Change VRTour to AmenityTour (which exists in your types)
import { AmenityTour } from "../types/building";

const tourIcon = L.divIcon({
  html: `<div style="background-color: #102a43; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 15px rgba(0,0,0,0.3);"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg></div>`,
  className: "virtual-tour-marker",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

interface VirtualTourPolygonProps {
  // 2. Update type usage to AmenityTour
  tour: AmenityTour;
  onSelect: (tour: AmenityTour) => void;
}

const VirtualTourPolygon = memo<VirtualTourPolygonProps>(({ tour, onSelect }) => {
  // 3. Fix: Swap [x, y] to [lat, lng] for Leaflet, just like we did for polygons
  // Ensure tour.position exists before accessing indices to prevent runtime errors
  const leafletPosition: L.LatLngExpression = tour.position 
    ? [tour.position[1], tour.position[0]] 
    : [0, 0]; 

  return (
    <Marker
      position={leafletPosition}
      icon={tourIcon}
      zIndexOffset={1000}
      eventHandlers={{
        click: (e: L.LeafletMouseEvent) => {
          L.DomEvent.stopPropagation(e);
          if (typeof onSelect === "function") onSelect(tour);
        },
      }}
    />
  );
});

export default VirtualTourPolygon;