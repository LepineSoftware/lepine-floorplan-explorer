// Helper to generate consistent unit data across floors
function generateFloor(floorNum, name, buildingCoords) {
  return {
    id: `floor-${floorNum}`,
    name: name,
    // Hotspot on the building.jpg
    polygon: buildingCoords,
    config: {
      width: 2273,
      height: 1146,
      url: "/assets/floorplan.svg",
    },
    units: [
      {
        id: floorNum * 100 + 1,
        title: `Unit ${floorNum}01`,
        type: "Corner Suite",
        available: true,
        sqft: 1136,
        beds: 3,
        baths: 2,
        polygon: [
          [577, 181],
          [844, 181],
          [844, 405],
          [577, 405],
        ],
        description: `Premium corner unit on the ${name} with expansive views.`,
        img: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=600&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=90",
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=90",
        ],
      },
      {
        id: floorNum * 100 + 2,
        title: `Unit ${floorNum}02`,
        type: "Standard Suite",
        available: floorNum % 2 === 0,
        sqft: 950,
        beds: 2,
        baths: 1,
        polygon: [
          [292, 652],
          [546, 652],
          [546, 883],
          [292, 883],
        ],
        description: "Modern open-concept living in the heart of the building.",
        img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=90",
        ],
      },
      {
        id: floorNum * 100 + 6,
        title: `Unit ${floorNum}06`,
        type: "Studio",
        available: true,
        sqft: 650,
        beds: 1,
        baths: 1,
        polygon: [
          [598, 1526],
          [846, 1526],
          [846, 1832],
          [598, 1832],
        ],
        description: "Efficient studio layout with high-end finishes.",
        img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=600&q=80",
        gallery: [
          "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=90",
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=90",
        ],
      },
    ],
  };
}

export const BUILDING_CONFIG = {
  width: 3840,
  height: 2160,
  url: "/assets/building.jpg",
  floors: [
    generateFloor(2, "2nd Floor", [
      [514, 808],
      [627, 807],
      [732, 3134],
      [529, 3132],
    ]),
    generateFloor(3, "3rd Floor", [
      [732, 808],
      [627, 807],
      [732, 3134],
      [921, 3134],
    ]),
    generateFloor(4, "4th Floor", [
      [
        [836, 807],
        [732, 808],
        [921, 3134],
        [1113, 3135],
      ],
    ]),
    generateFloor(5, "5th Floor", [
      [943, 808],
      [836, 807],
      [1113, 3135],
      [1191, 3149],
      [1202, 3148],
      [1198, 3114],
      [1299, 3117],
    ]),
    generateFloor(6, "6th Floor", [
      [943, 808],
      [956, 808],
      [967, 877],
      [1055, 875],
      [1424, 2947],
      [1351, 2957],
      [1378, 3119],
      [1299, 3117],
    ]),
    generateFloor(7, "7th Floor", [
      [1075, 876],
      [1055, 875],
      [1419, 2918],
      [1658, 2882],
      [1490, 2168],
      [1204, 948],
      [1197, 947],
      [1191, 957],
      [1125, 958],
      [1111, 900],
      [1079, 900],
    ]),
  ],
};
