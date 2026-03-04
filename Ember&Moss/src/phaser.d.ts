// src/phaser.d.ts
// Minimal type declarations for Phaser 3 — just enough for our models.
// The real Phaser is loaded via CDN at runtime.

declare namespace Phaser {
  namespace Display {
    namespace Color {
      function GetColor(r: number, g: number, b: number): number;
    }
  }
  class Scene {
    make: { graphics(config: { x: number; y: number; add: boolean }): Graphics };
    textures: { exists(key: string): boolean };
  }
  interface Graphics {
    fillStyle(color: number, alpha?: number): this;
    fillRect(x: number, y: number, w: number, h: number): this;
    fillTriangle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): this;
    fillEllipse(x: number, y: number, w: number, h: number): this;
    fillCircle(x: number, y: number, r: number): this;
    lineStyle(width: number, color: number, alpha?: number): this;
    strokeCircle(x: number, y: number, r: number): this;
    generateTexture(key: string, w: number, h: number): this;
    destroy(): void;
  }
}
