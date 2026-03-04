"use strict";
// src/models/TerrainModel.ts
// Ground tile (32 × 40 px) and floating platform tile (32 × 32 px).
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeGroundTexture = makeGroundTexture;
exports.makePlatformTexture = makePlatformTexture;
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
