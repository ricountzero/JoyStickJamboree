// src/models/SkyModel.ts
// Forest night sky background (800 × 450 px).
// Gradient sky + two layers of tree silhouettes + firefly dots.

export function makeSkyTexture(scene: Phaser.Scene): void {
  const W = 800, H = 450;
  const sky = scene.make.graphics({ x: 0, y: 0, add: false });

  // Sky gradient — dark teal at top → misty grey-green at bottom
  for (let i = 0; i < H; i++) {
    const t = i / H;
    sky.fillStyle(Phaser.Display.Color.GetColor(
      Math.round(20 + t * 30),
      Math.round(35 + t * 55),
      Math.round(25 + t * 20),
    ));
    sky.fillRect(0, i, W, 1);
  }

  // Far silhouette trees (very dark)
  sky.fillStyle(0x0d2010);
  for (let x = 0; x < W; x += 38) {
    const h  = 80 + Math.sin(x * 0.07) * 30 + Math.random() * 20;
    const tw = 28 + Math.random() * 18;
    sky.fillRect(x + tw / 2 - 3, H - h - 10, 6, 20);
    sky.fillTriangle(x + tw / 2, H - h - 60,  x,       H - h - 10, x + tw,     H - h - 10);
    sky.fillTriangle(x + tw / 2, H - h - 80,  x + 4,   H - h - 30, x + tw - 4, H - h - 30);
  }

  // Mid silhouette trees (slightly lighter)
  sky.fillStyle(0x163320);
  for (let x = -20; x < W; x += 55) {
    const h  = 100 + Math.sin(x * 0.05 + 1) * 40;
    const tw = 40;
    sky.fillRect(x + tw / 2 - 4, H - h + 20, 8, 30);
    sky.fillTriangle(x + tw / 2, H - h - 40, x - 5,   H - h + 20, x + tw + 5, H - h + 20);
    sky.fillTriangle(x + tw / 2, H - h - 65, x,       H - h - 10, x + tw,     H - h - 10);
    sky.fillTriangle(x + tw / 2, H - h - 85, x + 6,   H - h - 30, x + tw - 6, H - h - 30);
  }

  // Firefly / light-mote dots
  for (let i = 0; i < 40; i++) {
    sky.fillStyle(0xccffaa, 0.7);
    sky.fillRect(Math.random() * W, H * 0.2 + Math.random() * H * 0.55, 2, 2);
  }

  sky.generateTexture('sky', W, H);
  sky.destroy();
}
