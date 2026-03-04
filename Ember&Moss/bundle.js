const fs = require('fs');
const path = require('path');

const header = `// models.js — compiled from TypeScript source files
// DO NOT EDIT — edit src/**/*.ts then run: tsc
// Loaded by platformer.html before the game script.

`;

const files = [
  'dist/constants.js',
  'dist/models/SkyModel.js',
  'dist/models/MoonModel.js',
  'dist/models/TerrainModel.js',
  'dist/models/SwampModel.js',
  'dist/models/FernModel.js',
  'dist/models/FireModel.js',
  'dist/models/PlayerModel.js'
];

let output = header;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8')
    .replace(/"use strict";?\n?/g, '')
    .replace(/Object\.defineProperty\(exports.*\n/g, '')
    .replace(/exports\.\w+\s*=.*void 0;?\n?/g, '')
    .replace(/exports\.(\w+)\s*=\s*\1;?\n?/g, '')
    .replace(/exports\.(\w+)\s*=/g, 'const $1 =')
    .replace(/exports\.(\w+)/g, '$1')
    .trim();
  
  output += `// ──────────────────────────────────────────────────────────────────────\n`;
  output += `// ${path.basename(path.dirname(file))}/${path.basename(file)}\n`;
  output += `// ──────────────────────────────────────────────────────────────────────\n`;
  output += content + '\n\n';
});

fs.writeFileSync('models.js', output);
console.log('✓ models.js bundled');
