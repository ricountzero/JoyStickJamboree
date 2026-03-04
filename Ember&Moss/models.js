// models.js — compiled from TypeScript source files
// DO NOT EDIT — edit src/**/*.ts then run: tsc
// Loaded by platformer.html before the game script.

// ──────────────────────────────────────────────────────────────────────
// constants.ts
// ──────────────────────────────────────────────────────────────────────
// src/constants.ts
// Shared constants for FireJump — depth layers, world layout, spawn positions.
// Imported by every model and both game scenes.
// ── Canvas size ───────────────────────────────────────────────────────────────
const BASE_W = 800;
const BASE_H = 450;
const WORLD_W = 3200;
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
const DEPTH = {
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
const SWAMP_ZONES = [
    [640, 704],
    [1280, 1344],
    [1920, 1984],
    [2560, 2624],
];
// ── Fire spawn X positions ────────────────────────────────────────────────────
const FIRE_POSITIONS = [
    300, 500, 700, 850, 1050, 1150,
    1400, 1600, 1750, 1900, 2100, 2300,
    2500, 2700, 2850, 3000, 3100,
];
// ── Decorative fern X positions ───────────────────────────────────────────────
const FERN_DECO_POSITIONS = [
    150, 330, 490, 680, 820, 1020, 1160, 1310, 1480, 1650,
    1810, 1970, 2140, 2310, 2490, 2660, 2820, 2990, 3120,
];
// ── Floating platform layout [x, y, tileCount] ───────────────────────────────
const PLATFORM_LAYOUT = [
    [200, 310, 4], [380, 240, 3], [560, 310, 4], [760, 200, 3], [900, 290, 5], [1080, 230, 3],
    [1200, 310, 4], [1350, 220, 3], [1520, 290, 4], [1700, 200, 3], [1860, 270, 5], [2020, 200, 3],
    [2200, 310, 4], [2360, 240, 3], [2520, 300, 4], [2700, 200, 3], [2900, 260, 5], [3050, 200, 4],
];
// ── Collectible fern positions [x, y] ────────────────────────────────────────
const COLLECTIBLE_POSITIONS = [
    [220, 280], [260, 280], [380, 210], [900, 260], [940, 260], [1100, 200], [1360, 190], [1540, 260],
    [1720, 170], [1880, 240], [2220, 280], [2380, 210], [2540, 270], [2720, 170], [2920, 230],
    [3060, 170], [3100, 170], [3140, 170],
];

// ──────────────────────────────────────────────────────────────────────
// models/PlayerModel.ts
// ──────────────────────────────────────────────────────────────────────
// src/models/PlayerModel.ts
// Pixel-art player sprite — 4 walk-cycle frames (24 × 28 px each).
function makePlayerTextures(scene) {
    for (let f = 0; f < 4; f++) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xf7e7ce);
        g.fillRect(4, 12, 16, 14); // blue body
        g.fillStyle(0xf4a261);
        g.fillRect(5, 2, 14, 12); // skin head
        g.fillStyle(0xffffff);
        g.fillRect(7, 5, 4, 3); // eye white L
        g.fillRect(13, 5, 4, 3); // eye white R
        g.fillStyle(0x1a1a2e);
        g.fillRect(8 + (f % 2), 6, 2, 2); // pupil L (shifts for blink)
        g.fillRect(14, 6, 2, 2); // pupil R
        g.fillStyle(0x6d2b00);
        g.fillRect(5, 2, 14, 4); // hair
        g.fillRect(4, 24, 7, 4); // shoe L
        g.fillRect(13, 24, 7, 4); // shoe R
        g.fillStyle(0xf4a261); // arms
        if (f < 2) {
            g.fillRect(1, 13, 4, 8);
            g.fillRect(19, 13, 4, 8);
        } // arms up
        else {
            g.fillRect(1, 16, 4, 8);
            g.fillRect(19, 16, 4, 8);
        } // arms down
        g.generateTexture(`player_${f}`, 24, 28);
        g.destroy();
    }
}

// ──────────────────────────────────────────────────────────────────────
// models/FireModel.ts
// ──────────────────────────────────────────────────────────────────────
// src/models/FireModel.ts
// Realistic multi-layer flame — 8 animation frames (40 × 52 px each).
// Each frame has independent sway + flicker offsets for organic motion.
const FIRE_W = 40;
const FIRE_H = 52;
function makeFireTextures(scene) {
    for (let f = 0; f < 8; f++) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        const sway = Math.sin(f * 0.9) * 3; // lateral lean per frame
        const flick = Math.cos(f * 1.4) * 2; // tip flicker per frame
        const cx = FIRE_W / 2;
        // Layer 1 — dark ember base glow
        g.fillStyle(0x8b1a00, 0.7);
        g.fillEllipse(cx + sway * 0.3, FIRE_H - 6, 36, 14);
        // Layer 2 — deep red outer flame body + side bulges
        g.fillStyle(0xcc2200);
        g.fillEllipse(cx + sway * 0.5, FIRE_H - 14, 30, 28);
        g.fillEllipse(cx - 8 + sway, FIRE_H - 18, 18, 22);
        g.fillEllipse(cx + 8 + sway, FIRE_H - 16, 16, 20);
        // Layer 3 — orange mid flame
        g.fillStyle(0xff5500);
        g.fillEllipse(cx + sway * 0.7, FIRE_H - 22, 24, 30);
        g.fillEllipse(cx - 5 + sway, FIRE_H - 28, 14, 22);
        g.fillEllipse(cx + 6 + flick, FIRE_H - 26, 13, 20);
        // Layer 4 — bright orange-yellow + rising tongue
        g.fillStyle(0xff8800);
        g.fillEllipse(cx + sway * 0.5, FIRE_H - 30, 18, 26);
        const tongueH = 18 + Math.sin(f * 1.1) * 4;
        g.fillEllipse(cx + sway + flick, FIRE_H - 36 - tongueH * 0.3, 10, tongueH);
        // Layer 5 — yellow hot core
        g.fillStyle(0xffcc00);
        g.fillEllipse(cx + sway * 0.3, FIRE_H - 34, 13, 20);
        g.fillEllipse(cx + sway * 0.2 + flick * 0.5, FIRE_H - 40, 8, 14);
        // Layer 6 — white-hot inner tip
        g.fillStyle(0xfff5aa);
        g.fillEllipse(cx + sway * 0.15, FIRE_H - 40, 6, 10);
        g.fillStyle(0xffffff, 0.85);
        g.fillEllipse(cx + sway * 0.1, FIRE_H - 43, 4, 7);
        // Embers — scattered dots that flicker on/off
        const embers = [
            [3, flick * 3, FIRE_H - 28, 0xffaa00],
            [17, -sway * 2, FIRE_H - 22, 0xff6600],
            [7, sway * 4, FIRE_H - 44, 0xffcc44],
            [13, -flick * 3, FIRE_H - 38, 0xffdd00],
            [5, sway * 2, FIRE_H - 18, 0xff4400],
        ];
        embers.forEach(([seed, ox, oy, col]) => {
            if ((f + seed) % 3 !== 0) {
                g.fillStyle(col, 0.9);
                g.fillRect(cx + ox - 1, oy - (seed % 4), 2, 2);
            }
        });
        // Heat shimmer at ground level
        g.fillStyle(0xff3300, 0.18);
        g.fillEllipse(cx, FIRE_H - 2, 38, 8);
        g.generateTexture(`fire_${f}`, FIRE_W, FIRE_H);
        g.destroy();
    }
}

// ──────────────────────────────────────────────────────────────────────
// models/TerrainModel.ts
// ──────────────────────────────────────────────────────────────────────
// src/models/TerrainModel.ts
// Ground tile (32 × 40 px) and floating platform tile (32 × 32 px).
function makeGroundTexture(scene) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x7ec850);
    g.fillRect(0, 0, 32, 8); // grass top
    g.fillStyle(0xa0522d);
    g.fillRect(0, 8, 32, 32); // dirt body
    g.fillStyle(0x8b4513);
    g.fillRect(8, 12, 5, 5); // pebble 1
    g.fillRect(22, 20, 4, 4); // pebble 2
    g.generateTexture('ground', 32, 40);
    g.destroy();
}
function makePlatformTexture(scene) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0x7ec850);
    g.fillRect(0, 0, 32, 8); // grass top
    g.fillStyle(0xa0522d);
    g.fillRect(0, 8, 32, 24); // dirt body
    g.fillStyle(0x6daa3f);
    g.fillRect(4, 2, 6, 4); // grass tuft L
    g.fillRect(18, 1, 8, 5); // grass tuft R
    g.fillStyle(0x8b4513);
    g.fillRect(6, 14, 4, 4); // dirt detail L
    g.fillRect(20, 18, 5, 4); // dirt detail R
    g.generateTexture('platform', 32, 32);
    g.destroy();
}

// ──────────────────────────────────────────────────────────────────────
// models/SkyModel.ts
// ──────────────────────────────────────────────────────────────────────
// src/models/SkyModel.ts
// Forest night sky background (800 × 450 px).
// Gradient sky + two layers of tree silhouettes + firefly dots.
function makeSkyTexture(scene) {
    const W = 800, H = 450;
    const sky = scene.make.graphics({ x: 0, y: 0, add: false });
    // Sky gradient — dark teal at top → misty grey-green at bottom
    for (let i = 0; i < H; i++) {
        const t = i / H;
        sky.fillStyle(Phaser.Display.Color.GetColor(Math.round(20 + t * 30), Math.round(35 + t * 55), Math.round(25 + t * 20)));
        sky.fillRect(0, i, W, 1);
    }
    // Far silhouette trees (very dark)
    sky.fillStyle(0x0d2010);
    for (let x = 0; x < W; x += 38) {
        const h = 80 + Math.sin(x * 0.07) * 30 + Math.random() * 20;
        const tw = 28 + Math.random() * 18;
        sky.fillRect(x + tw / 2 - 3, H - h - 10, 6, 20);
        sky.fillTriangle(x + tw / 2, H - h - 60, x, H - h - 10, x + tw, H - h - 10);
        sky.fillTriangle(x + tw / 2, H - h - 80, x + 4, H - h - 30, x + tw - 4, H - h - 30);
    }
    // Mid silhouette trees (slightly lighter)
    sky.fillStyle(0x163320);
    for (let x = -20; x < W; x += 55) {
        const h = 100 + Math.sin(x * 0.05 + 1) * 40;
        const tw = 40;
        sky.fillRect(x + tw / 2 - 4, H - h + 20, 8, 30);
        sky.fillTriangle(x + tw / 2, H - h - 40, x - 5, H - h + 20, x + tw + 5, H - h + 20);
        sky.fillTriangle(x + tw / 2, H - h - 65, x, H - h - 10, x + tw, H - h - 10);
        sky.fillTriangle(x + tw / 2, H - h - 85, x + 6, H - h - 30, x + tw - 6, H - h - 30);
    }
    // Firefly / light-mote dots
    for (let i = 0; i < 40; i++) {
        sky.fillStyle(0xccffaa, 0.7);
        sky.fillRect(Math.random() * W, H * 0.2 + Math.random() * H * 0.55, 2, 2);
    }
    sky.generateTexture('sky', W, H);
    sky.destroy();
}

// ──────────────────────────────────────────────────────────────────────
// models/SwampModel.ts
// ──────────────────────────────────────────────────────────────────────
// src/models/SwampModel.ts
// Swamp floor texture (3200 × 28 px).
// Murky water base with dark patches, algae streaks, and slime highlights.
function makeSwampTexture(scene) {
    const SW = 3200;
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    // Murky water base
    g.fillStyle(0x2d4a1a);
    g.fillRect(0, 0, SW, 28);
    // Dark deep patches
    g.fillStyle(0x1a2e0e);
    for (let i = 0; i < 80; i++)
        g.fillRect(Math.random() * SW, Math.random() * 16, 30 + Math.random() * 80, 10 + Math.random() * 10);
    // Algae streaks
    g.fillStyle(0x5a8a2a);
    for (let i = 0; i < 60; i++)
        g.fillRect(Math.random() * SW, Math.random() * 12, 20 + Math.random() * 50, 6 + Math.random() * 8);
    // Bright slime highlights
    g.fillStyle(0x7ec83a);
    for (let i = 0; i < 40; i++)
        g.fillRect(Math.random() * SW, Math.random() * 8, 6 + Math.random() * 20, 3 + Math.random() * 4);
    g.generateTexture('lava', SW, 28);
    g.destroy();
}

// ──────────────────────────────────────────────────────────────────────
// models/FernModel.ts
// ──────────────────────────────────────────────────────────────────────
// src/models/FernModel.ts
// Decorative ground fern (28 × 30 px) and double-jump spark particle (4 × 4 px).
function makeFernTexture(scene) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    // Dark outer fronds
    g.fillStyle(0x2a6614);
    g.fillTriangle(8, 28, 0, 10, 20, 18);
    g.fillTriangle(8, 28, 16, 6, 26, 16);
    // Lighter inner fronds
    g.fillStyle(0x3a8a1e);
    g.fillTriangle(8, 28, 0, 14, 18, 22);
    g.fillTriangle(8, 28, 14, 8, 24, 20);
    // Stem
    g.fillStyle(0x1e4a0c);
    g.fillRect(7, 20, 2, 8);
    g.generateTexture('fern', 28, 30);
    g.destroy();
}
function makeSparkTexture(scene) {
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0xccffaa);
    g.fillRect(0, 0, 4, 4);
    g.generateTexture('spark', 4, 4);
    g.destroy();
}

// ──────────────────────────────────────────────────────────────────────
// models/MoonModel.ts
// ──────────────────────────────────────────────────────────────────────
// src/models/MoonModel.ts
// Waxing half moon — 50% illumination, right half lit (60 × 60 px).
// Idempotent: skips generation if texture already exists.
function makeMoonTexture(scene) {
    if (scene.textures.exists('moon'))
        return;
    const R = 22;
    const cx = R + 8;
    const cy = R + 8;
    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    // Soft outer glow halos
    g.fillStyle(0xfffbe8, 0.12);
    g.fillCircle(cx, cy, R + 8);
    g.fillStyle(0xfffbe8, 0.10);
    g.fillCircle(cx, cy, R + 6);
    // Dark (unlit) side disc
    g.fillStyle(0x3a4a30);
    g.fillCircle(cx, cy, R);
    // Lit right half — row-by-row fill starting from the vertical centre axis
    g.fillStyle(0xf5e8c0);
    for (let dy = -R; dy <= R; dy++) {
        const hw = Math.sqrt(R * R - dy * dy);
        g.fillRect(cx, cy + dy, hw, 1); // x >= cx → right half only
    }
    // Craters on the lit side
    g.fillStyle(0xd4c090, 0.5);
    g.fillCircle(cx + 8, cy - 5, 3);
    g.fillCircle(cx + 12, cy + 8, 2);
    g.fillCircle(cx + 5, cy + 11, 2);
    // Thin bright limb outline
    g.lineStyle(1, 0xfffbe8, 0.6);
    g.strokeCircle(cx, cy, R);
    g.generateTexture('moon', (R + 8) * 2, (R + 8) * 2);
    g.destroy();
}

