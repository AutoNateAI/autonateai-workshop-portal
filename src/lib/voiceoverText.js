function cleanText(text) {
  return String(text || '').replace(/\s+/g, ' ').trim();
}

function joinSentences(parts) {
  return parts
    .map((part) => cleanText(part))
    .filter(Boolean)
    .join(' ');
}

function numberedPoints(points, intro = 'Key points:') {
  if (!points?.length) {
    return '';
  }

  return joinSentences([
    intro,
    ...points.map((point, index) => `${index + 1}. ${point}.`),
  ]);
}

function activityNarration(activity) {
  if (!activity) {
    return '';
  }

  return joinSentences([
    `Activity. ${activity.title}.`,
    activity.prompt,
    numberedPoints(activity.steps, 'Do this in order:'),
  ]);
}

export function getSlideNarration(track, slide, index) {
  const intro =
    index === 0
      ? `Welcome to the ${track.label} workshop.`
      : `Slide ${index + 1}.`;

  return joinSentences([
    intro,
    slide.eyebrow ? `${slide.eyebrow}.` : '',
    `${slide.title}.`,
    slide.lead,
    slide.body,
    numberedPoints(slide.points),
    activityNarration(slide.activity),
  ]);
}

export function getTrackNarrationBundle(track) {
  return track.lectureSlides.map((slide, index) => ({
    index,
    title: slide.title,
    text: getSlideNarration(track, slide, index),
  }));
}
