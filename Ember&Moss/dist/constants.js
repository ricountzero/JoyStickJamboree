"use strict";
// src/constants.ts
// Shared constants for FireJump — depth layers, world layout, spawn positions.
// Imported by every model and both game scenes.
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLLECTIBLE_POSITIONS = exports.PLATFORM_LAYOUT = exports.FERN_DECO_POSITIONS = exports.FIRE_POSITIONS = exports.SWAMP_ZONES = exports.DEPTH = exports.WORLD_W = exports.BASE_H = exports.BASE_W = void 0;
// ── Canvas size ───────────────────────────────────────────────────────────────
exports.BASE_W = 800;
exports.BASE_H = 450;
exports.WORLD_W = 3200;
// ── Render depth layers ───────────────────────────────────────────────────────
// Defines exact Z-order so nothing ever overlaps incorrectly:
//   sky / moon     → 0
//   far trees      → 1
//   close trees    → 2
//   deco ferns     → 3   (behind player and fire)
//   swamp patches  → 4
//   PLAYER         → 5   ← above ferns, below fire
//   collectible 🌿 → 6
//   fire           → 7
//   score pops     → 50
//   overlay text   → 100
exports.DEPTH = {
    SKY: 0,
    MOON: 0,
    TREE_FAR: 1,
    TREE_CLOSE: 2,
    FERN_DECO: 3,
    SWAMP: 4,
    PLAYER: 5,
    FERN_ITEM: 6,
    FIRE: 7,
    SCORE_POP: 50,
    OVERLAY: 100,
};
// ── Swamp hazard zones (x1, x2) ──────────────────────────────────────────────
exports.SWAMP_ZONES = [
    [640, 704],
    [1280, 1344],
    [1920, 1984],
    [2560, 2624],
];
// ── Fire spawn X positions ────────────────────────────────────────────────────
exports.FIRE_POSITIONS = [
    300, 500, 700, 850, 1050, 1150,
    1400, 1600, 1750, 1900, 2100, 2300,
    2500, 2700, 2850, 3000, 3100,
];
// ── Decorative fern X positions ───────────────────────────────────────────────
exports.FERN_DECO_POSITIONS = [
    150, 330, 490, 680, 820, 1020, 1160, 1310, 1480, 1650,
    1810, 1970, 2140, 2310, 2490, 2660, 2820, 2990, 3120,
];
// ── Floating platform layout [x, y, tileCount] ───────────────────────────────
exports.PLATFORM_LAYOUT = [
    [200, 310, 4], [380, 240, 3], [560, 310, 4], [760, 200, 3], [900, 290, 5], [1080, 230, 3],
    [1200, 310, 4], [1350, 220, 3], [1520, 290, 4], [1700, 200, 3], [1860, 270, 5], [2020, 200, 3],
    [2200, 310, 4], [2360, 240, 3], [2520, 300, 4], [2700, 200, 3], [2900, 260, 5], [3050, 200, 4],
];
// ── Collectible fern positions [x, y] ────────────────────────────────────────
exports.COLLECTIBLE_POSITIONS = [
    [220, 280], [260, 280], [380, 210], [900, 260], [940, 260], [1100, 200], [1360, 190], [1540, 260],
    [1720, 170], [1880, 240], [2220, 280], [2380, 210], [2540, 270], [2720, 170], [2920, 230],
    [3060, 170], [3100, 170], [3140, 170],
];
