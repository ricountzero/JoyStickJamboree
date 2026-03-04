// src/models/MoonModel.ts
// Waxing half moon — 50% illumination, right half lit (60 × 60 px).
// Idempotent: skips generation if texture already exists.

export function makeMoonTexture(scene: Phaser.Scene): void {
  if (scene.textures.exists('moon')) return;

  const R  = 22;
  const cx = R + 8;
  const cy = R + 8;
  const g  = scene.make.graphics({ x: 0, y: 0, add: false });

  // Soft outer glow halos
  g.fillStyle(0xfffbe8, 0.12); g.fillCircle(cx, cy, R + 8);
  g.fillStyle(0xfffbe8, 0.10); g.fillCircle(cx, cy, R + 6);

  // Dark (unlit) side disc
  g.fillStyle(0x3a4a30);
  g.fillCircle(cx, cy, R);

  // Lit right half — row-by-row fill starting from the vertical centre axis
  g.fillStyle(0xf5e8c0);
  for (let dy = -R; dy <= R; dy++) {
    const hw = Math.sqrt(R * R - dy * dy);
    g.fillRect(cx, cy + dy, hw, 1);   // x >= cx → right half only
  }

  // Craters on the lit side
  g.fillStyle(0xd4c090, 0.5);
  g.fillCircle(cx + 8,  cy - 5,  3);
  g.fillCircle(cx + 12, cy + 8,  2);
  g.fillCircle(cx + 5,  cy + 11, 2);

  // Thin bright limb outline
  g.lineStyle(1, 0xfffbe8, 0.6);
  g.strokeCircle(cx, cy, R);

  g.generateTexture('moon', (R + 8) * 2, (R + 8) * 2);
  g.destroy();
}
