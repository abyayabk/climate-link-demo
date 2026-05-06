// src/data/seasonalData.js
export const seasonalData = {
    northern: [
        { activity: "Land Prep", start: 3, end: 5, type: "main" }, // March - May [cite: 614]
        { activity: "Planting", start: 5, end: 7, type: "main" },  // May - July [cite: 619]
        { activity: "Rainy Season", start: 5, end: 10, type: "climate" }, // May - Oct [cite: 608]
        { activity: "Lean Season", start: 6, end: 9, type: "risk" },   // June - Sept [cite: 634]
        { activity: "Harvest", start: 9, end: 12, type: "main" }   // Sept - Dec [cite: 625]
    ],
    southern: [
        { activity: "Planting", start: 2, end: 5, type: "main" },  // Feb - May [cite: 638]
        { activity: "Rainy Season", start: 2, end: 11, type: "climate" }, // Feb - Nov [cite: 643]
        { activity: "Flooding Risk", start: 6, end: 10, type: "risk" }, // June - Oct [cite: 636]
        { activity: "Main Harvest", start: 9, end: 12, type: "main" }   // Sept - Dec [cite: 640]
    ]
};