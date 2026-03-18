import fs from 'node:fs/promises';
import path from 'node:path';
import {tracks} from '../src/data/tracks.js';
import {getTrackNarrationBundle} from '../src/lib/voiceoverText.js';

const rootDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const configPath = path.join(rootDir, 'config', 'voiceover.config.json');
const publicDir = path.join(rootDir, 'public', 'audio', 'lectures');

function parseArgs(argv) {
  const options = {
    track: 'all',
    force: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--track') {
      options.track = argv[index + 1] || 'all';
      index += 1;
    } else if (arg === '--force') {
      options.force = true;
    }
  }

  return options;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function filenameForSlide(index, title, format) {
  return `${String(index).padStart(2, '0')}-${slugify(title)}.${format}`;
}

async function synthesize({apiKey, model, voice, format, instructions, input}) {
  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      voice,
      format,
      input,
      instructions,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI TTS failed (${response.status}): ${errorText}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

const options = parseArgs(process.argv.slice(2));
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error('OPENAI_API_KEY is required');
}

const config = JSON.parse(await fs.readFile(configPath, 'utf8'));
const trackEntries = Object.entries(tracks).filter(([trackId]) => {
  return options.track === 'all' || options.track === trackId;
});

for (const [trackId, track] of trackEntries) {
  const outputDir = path.join(publicDir, trackId);
  await fs.mkdir(outputDir, {recursive: true});

  for (const slide of getTrackNarrationBundle(track)) {
    const filename = filenameForSlide(slide.index, slide.title, config.format);
    const outputPath = path.join(outputDir, filename);

    if (!options.force) {
      try {
        await fs.access(outputPath);
        console.log(`skip ${trackId}/${filename}`);
        continue;
      } catch {
        // continue
      }
    }

    console.log(`generate ${trackId}/${filename}`);
    const audio = await synthesize({
      apiKey,
      model: config.model,
      voice: config.voice,
      format: config.format,
      instructions: config.instructions,
      input: slide.text,
    });

    await fs.writeFile(outputPath, audio);
  }
}

await import('./build-voiceover-manifest.mjs');
console.log('voiceover generation complete');
