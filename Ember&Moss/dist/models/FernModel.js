"use strict";
// src/models/FernModel.ts
// Decorative ground fern (28 × 30 px) and double-jump spark particle (4 × 4 px).
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFernTexture = makeFernTexture;
exports.makeSparkTexture = makeSparkTexture;
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
