# 🌿 Ember & Moss (FireJump)

A retro-style platformer game where you play as Ember, navigating through a mystical swamp while avoiding fires and collecting ferns.

## Game Description

Guide Ember through floating platforms in a moonlit swamp environment. Jump over dangerous fires, avoid swamp hazards, and collect magical ferns to increase your score. The game features:

- Procedurally generated flame animations
- Dynamic parallax scrolling backgrounds
- Smooth platforming physics
- Score tracking with collectible ferns
- Atmospheric swamp environment with moon and decorative elements

## Controls

- **Arrow Keys / WASD** - Move left/right and jump
- **Touch Controls** - On-screen buttons for mobile devices

## Installation & Running

### Prerequisites

- Node.js (v12 or higher)
- npm

### Setup

1. Install dependencies:
```bash
npm install
```

2. Build the game:
```bash
npm run build
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:8080/game.html
```

### Production

For production deployment, build the project and serve the files:

```bash
npm run build
npm start
```

Then open `http://localhost:8080/game.html`

## Development

The game is built with TypeScript and Phaser 3. Source files are in `src/`:

- `src/constants.ts` - Game constants and layout data
- `src/models/` - Game object models (Player, Fire, Terrain, etc.)

The build process compiles TypeScript to JavaScript and bundles everything into `models.js`.

### Watch Mode

Run in development mode with auto-rebuild:

```bash
npm run dev
```

This watches for changes in TypeScript files and automatically rebuilds the bundle.

## Tech Stack

- **Phaser 3** - Game framework
- **TypeScript** - Type-safe game logic
- **Node.js** - Build tooling
- **http-server** - Local development server
