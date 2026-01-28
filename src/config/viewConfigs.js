// src/config/viewConfig.js

import { BACKGROUND_FILL } from "./mapStyles";

export const MAP_VIEW_SETTINGS = {
  debug: true, // Toggle this to enable/disable editing tools
  fitBoundsPadding: [0, 0],
  animationDuration: 0.5,
  maxBoundsViscosity: 1.0,
  defaultBackground: BACKGROUND_FILL,
};

export const UI_TRANSITIONS = "transition-all duration-200";
