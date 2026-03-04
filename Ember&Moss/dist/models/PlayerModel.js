"use strict";
// src/models/PlayerModel.ts
// Pixel-art player sprite — 4 walk-cycle frames (24 × 28 px each).
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePlayerTextures = makePlayerTextures;
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
