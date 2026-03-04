// src/models/SwampModel.ts
// Swamp floor texture (3200 × 28 px).
// Murky water base with dark patches, algae streaks, and slime highlights.

export function makeSwampTexture(scene: Phaser.Scene): void {
  const SW = 3200;
  const g  = scene.make.graphics({ x: 0, y: 0, add: false });

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
