"use strict";
// src/models/FireModel.ts
// Realistic multi-layer flame — 8 animation frames (40 × 52 px each).
// Each frame has independent sway + flicker offsets for organic motion.
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIRE_H = exports.FIRE_W = void 0;
exports.makeFireTextures = makeFireTextures;
exports.FIRE_W = 40;
exports.FIRE_H = 52;
function makeFireTextures(scene) {
    for (let f = 0; f < 8; f++) {
        const g = scene.make.graphics({ x: 0, y: 0, add: false });
        const sway = Math.sin(f * 0.9) * 3; // lateral lean per frame
        const flick = Math.cos(f * 1.4) * 2; // tip flicker per frame
        const cx = exports.FIRE_W / 2;
        // Layer 1 — dark ember base glow
        g.fillStyle(0x8b1a00, 0.7);
        g.fillEllipse(cx + sway * 0.3, exports.FIRE_H - 6, 36, 14);
        // Layer 2 — deep red outer flame body + side bulges
        g.fillStyle(0xcc2200);
        g.fillEllipse(cx + sway * 0.5, exports.FIRE_H - 14, 30, 28);
        g.fillEllipse(cx - 8 + sway, exports.FIRE_H - 18, 18, 22);
        g.fillEllipse(cx + 8 + sway, exports.FIRE_H - 16, 16, 20);
        // Layer 3 — orange mid flame
        g.fillStyle(0xff5500);
        g.fillEllipse(cx + sway * 0.7, exports.FIRE_H - 22, 24, 30);
        g.fillEllipse(cx - 5 + sway, exports.FIRE_H - 28, 14, 22);
        g.fillEllipse(cx + 6 + flick, exports.FIRE_H - 26, 13, 20);
        // Layer 4 — bright orange-yellow + rising tongue
        g.fillStyle(0xff8800);
        g.fillEllipse(cx + sway * 0.5, exports.FIRE_H - 30, 18, 26);
        const tongueH = 18 + Math.sin(f * 1.1) * 4;
        g.fillEllipse(cx + sway + flick, exports.FIRE_H - 36 - tongueH * 0.3, 10, tongueH);
        // Layer 5 — yellow hot core
        g.fillStyle(0xffcc00);
        g.fillEllipse(cx + sway * 0.3, exports.FIRE_H - 34, 13, 20);
        g.fillEllipse(cx + sway * 0.2 + flick * 0.5, exports.FIRE_H - 40, 8, 14);
        // Layer 6 — white-hot inner tip
        g.fillStyle(0xfff5aa);
        g.fillEllipse(cx + sway * 0.15, exports.FIRE_H - 40, 6, 10);
        g.fillStyle(0xffffff, 0.85);
        g.fillEllipse(cx + sway * 0.1, exports.FIRE_H - 43, 4, 7);
        // Embers — scattered dots that flicker on/off
        const embers = [
            [3, flick * 3, exports.FIRE_H - 28, 0xffaa00],
            [17, -sway * 2, exports.FIRE_H - 22, 0xff6600],
            [7, sway * 4, exports.FIRE_H - 44, 0xffcc44],
            [13, -flick * 3, exports.FIRE_H - 38, 0xffdd00],
            [5, sway * 2, exports.FIRE_H - 18, 0xff4400],
        ];
        embers.forEach(([seed, ox, oy, col]) => {
            if ((f + seed) % 3 !== 0) {
                g.fillStyle(col, 0.9);
                g.fillRect(cx + ox - 1, oy - (seed % 4), 2, 2);
            }
        });
        // Heat shimmer at ground level
        g.fillStyle(0xff3300, 0.18);
        g.fillEllipse(cx, exports.FIRE_H - 2, 38, 8);
        g.generateTexture(`fire_${f}`, exports.FIRE_W, exports.FIRE_H);
        g.destroy();
    }
}
