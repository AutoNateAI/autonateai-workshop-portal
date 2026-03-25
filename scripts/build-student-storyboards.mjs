import fs from 'node:fs/promises';
import path from 'node:path';
import {
  storyboardCharacters,
  storyboardStyle,
  studentStoryboardSlides,
} from '../config/storyboards/student-storyboard-plan.mjs';
import {tracks} from '../src/data/tracks.js';

const rootDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const outputDir = path.join(rootDir, 'public', 'img', 'storyboards', 'student');
const configDir = path.join(rootDir, 'config', 'storyboards');
const runtimePath = path.join(rootDir, 'src', 'data', 'slideStoryboards.js');
const SCENE_BATCH_SIZE = 25;

const frameVariants = [
  {
    suffix: 'a',
    direction:
      'opening story beat, establish the named place and the full emotional situation with strong readable environment details',
  },
  {
    suffix: 'b',
    direction:
      'second story beat, move the action forward and show character reactions becoming more specific and emotionally readable',
  },
  {
    suffix: 'c',
    direction:
      'third story beat, escalate the tension with clearer action, stronger motion, and more relevant objects from the narration',
  },
  {
    suffix: 'd',
    direction:
      'fourth story beat, show the turning point or realization with changing expressions, gestures, and plot movement',
  },
  {
    suffix: 'e',
    direction:
      'fifth story beat, push the consequences of what was said and make the scene feel sequential rather than repeated',
  },
  {
    suffix: 'f',
    direction:
      'final story beat, land the emotional or narrative conclusion of the slide with vivid expression and decisive plot progression',
  },
];

function getAnchorPath(filename) {
  return path.join(outputDir, filename);
}

function buildCharacterPrompt(character) {
  return `${character.description}, character anchor portrait, clean neutral background, ${storyboardStyle}`;
}

function getSlideVisualNarration(slide) {
  if (slide.sectionBreak) {
    return slide.title;
  }

  return [
    slide.title,
    slide.lead,
    slide.body,
    ...(slide.points || []),
    slide.activity?.prompt || '',
    ...((slide.activity?.steps || []).map((step) => step)),
  ]
    .filter(Boolean)
    .join('. ');
}

function splitNarrationIntoSentences(narration) {
  return String(narration || '')
    .replace(/\s+/g, ' ')
    .replace(/\bKey points:\s*/gi, '')
    .replace(/\bDo this in order:\s*/gi, '')
    .replace(/\bActivity\.\s*/gi, '')
    .replace(/\b\d+\.\s*/g, '')
    .trim()
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function buildBeatTexts(slide, narration, frameCount) {
  const sentences = splitNarrationIntoSentences(narration);
  if (!sentences.length) {
    return Array.from({length: frameCount}, () => slide.focus);
  }

  const chunks = Array.from({length: frameCount}, () => []);
  sentences.forEach((sentence, index) => {
    const chunkIndex = Math.min(frameCount - 1, Math.floor((index * frameCount) / sentences.length));
    chunks[chunkIndex].push(sentence);
  });

  return chunks.map((chunk, index) => {
    const text = chunk.join(' ').trim();
    if (text) {
      return text;
    }

    const fallbackSource = sentences[Math.min(sentences.length - 1, index)] || slide.focus;
    return fallbackSource;
  });
}

function buildCuePoints(beatTexts) {
  const lengths = beatTexts.map((beat) => Math.max(beat.length, 1));
  const total = lengths.reduce((sum, length) => sum + length, 0) || 1;
  let running = 0;

  return lengths.map((length, index) => {
    if (index === 0) {
      running += length;
      return 0;
    }

    const cuePoint = Number((running / total).toFixed(4));
    running += length;
    return cuePoint;
  });
}

function buildScenePrompt(slide, beatText, previousBeatText, direction, beatIndex, frameCount) {
  const characterDescriptions = slide.characters
    .map((characterId) => storyboardCharacters.find((character) => character.id === characterId)?.description)
    .filter(Boolean)
    .join('; ');

  return `${slide.scene}. Sequential narrated comic frame ${beatIndex + 1} of ${frameCount}. Current narrated beat: ${beatText}. Previous beat context: ${previousBeatText || 'Opening moment of the slide.'}. ${direction}. Focus on ${slide.focus}. Show the named places, schools, objects, tasks, and emotions actually being described in this beat. Make the image materially different from the previous frame so the plot visibly advances. Recurring characters: ${characterDescriptions}. Keep wardrobe, facial traits, props, and environment continuity consistent with prior anchor references. ${storyboardStyle}`;
}

async function main() {
  await fs.mkdir(outputDir, {recursive: true});
  await fs.mkdir(configDir, {recursive: true});

  const anchorConfig = {
    model: 'gpt-image-1.5',
    size: '1024x1024',
    quality: 'high',
    fidelity: 'high',
    concurrency: 5,
    images: storyboardCharacters.map((character) => ({
      prompt: buildCharacterPrompt(character),
      output: getAnchorPath(character.filename),
      references: [],
    })),
  };

  const sceneImages = studentStoryboardSlides.flatMap((slide) => {
    const narration = getSlideVisualNarration(tracks.student.lectureSlides[slide.index]);
    const beatTexts = buildBeatTexts(slide, narration, frameVariants.length);
    const references = slide.characters.map((characterId) => {
      const match = storyboardCharacters.find((character) => character.id === characterId);
      return match ? getAnchorPath(match.filename) : null;
    }).filter(Boolean);

    return frameVariants.map((variant, index) => ({
      prompt: buildScenePrompt(slide, beatTexts[index], beatTexts[index - 1], variant.direction, index, frameVariants.length),
      output: path.join(outputDir, `${String(slide.index).padStart(2, '0')}-${variant.suffix}.png`),
      references,
    }));
  });

  const sceneConfigs = Array.from({length: Math.ceil(sceneImages.length / SCENE_BATCH_SIZE)}, (_, batchIndex) => ({
    model: 'gpt-image-1.5',
    size: '1024x1024',
    quality: 'high',
    fidelity: 'high',
    concurrency: 10,
    images: sceneImages.slice(batchIndex * SCENE_BATCH_SIZE, (batchIndex + 1) * SCENE_BATCH_SIZE),
  }));

  const runtimeManifest = {
    student: Object.fromEntries(
      studentStoryboardSlides.map((slide) => [
        slide.index,
        (() => {
          const beatTexts = buildBeatTexts(
            slide,
            getSlideVisualNarration(tracks.student.lectureSlides[slide.index]),
            frameVariants.length,
          );

          return {
            cuePoints: buildCuePoints(beatTexts),
          frames: frameVariants.map((variant, index) => ({
            src: `/img/storyboards/student/${String(slide.index).padStart(2, '0')}-${variant.suffix}.png`,
            alt: `${beatTexts[index]} (${variant.suffix.toUpperCase()} frame)`,
          })),
          };
        })(),
      ]),
    ),
  };

  await fs.writeFile(
    path.join(configDir, 'student-storyboard-anchors.json'),
    `${JSON.stringify(anchorConfig, null, 2)}\n`,
    'utf8',
  );

  await Promise.all(
    sceneConfigs.map((sceneConfig, index) =>
      fs.writeFile(
        path.join(configDir, `student-storyboard-scenes-${String(index + 1).padStart(2, '0')}.json`),
        `${JSON.stringify(sceneConfig, null, 2)}\n`,
        'utf8',
      ),
    ),
  );

  await fs.writeFile(
    runtimePath,
    `export const slideStoryboards = ${JSON.stringify(runtimeManifest, null, 2)};\n`,
    'utf8',
  );

  console.log(`wrote ${runtimePath}`);
  console.log(`wrote ${path.join(configDir, 'student-storyboard-anchors.json')}`);
  sceneConfigs.forEach((_, index) => {
    console.log(`wrote ${path.join(configDir, `student-storyboard-scenes-${String(index + 1).padStart(2, '0')}.json`)}`);
  });
}

await main();
