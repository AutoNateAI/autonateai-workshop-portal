import fs from 'node:fs/promises';
import path from 'node:path';
import {tracks} from '../src/data/tracks.js';

const rootDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const publicDir = path.join(rootDir, 'public', 'audio', 'lectures');
const manifestPath = path.join(rootDir, 'src', 'data', 'voiceovers.js');

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function filenameForSlide(index, title) {
  return `${String(index).padStart(2, '0')}-${slugify(title)}.mp3`;
}

const manifest = {};

for (const [trackId, track] of Object.entries(tracks)) {
  manifest[trackId] = {};
  for (const [index, slide] of track.lectureSlides.entries()) {
    const filename = filenameForSlide(index, slide.title);
    const fullPath = path.join(publicDir, trackId, filename);
    try {
      await fs.access(fullPath);
      manifest[trackId][index] = `/audio/lectures/${trackId}/${filename}`;
    } catch {
      // file missing; skip
    }
  }
}

await fs.writeFile(
  manifestPath,
  `export const voiceovers = ${JSON.stringify(manifest, null, 2)};\n`,
  'utf8',
);

console.log(`wrote ${manifestPath}`);
