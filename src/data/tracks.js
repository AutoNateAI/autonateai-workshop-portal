import {studentWorkflows, researcherWorkflows} from './workflows.js';

export const connectorStack = [
  'ChatGPT with Web Search enabled',
  'Google Sheets connected inside ChatGPT',
  'Figma connected for visual boards',
];

export const tracks = {
  student: {
    id: 'student',
    label: 'Student OS',
    audience: 'For overloaded students juggling class, life, and ambition.',
    hero: 'Run school like a system, not a scramble.',
    status: 'Active track',
    moduleCount: 4,
    lectureSlides: [
      {
        title: 'Your Life Is A Graph',
        body: 'Classes, deadlines, family, energy, and goals are connected. The point is to see the relationships before they pile up on you.',
      },
      {
        title: 'Sheets Is The Visible Logic Layer',
        body: 'A sheet is where priorities, time blocks, assignments, and reviews become something you can steer instead of just feel.',
      },
      {
        title: 'AI Is The Structuring Engine',
        body: 'ChatGPT helps you convert the mess into rows, sequences, and next moves. That is more powerful than random prompting.',
      },
      {
        title: 'Reflection Makes It Compound',
        body: 'End-of-day analysis turns your system into a feedback loop. That is where growth starts to stack.',
      },
    ],
    quest: {
      title: 'The Juggling Quest',
      summary: 'Build a student operating system that can hold classes, work, family, side projects, and recovery without melting down.',
      steps: ['Map the load', 'Build the day sheet', 'Operate the day', 'Debrief and adjust'],
    },
    workflows: studentWorkflows,
  },
  researcher: {
    id: 'researcher',
    label: 'Research OS',
    audience: 'For researchers turning notes, sources, and claims into sharper synthesis.',
    hero: 'Structure the evidence. Surface the signal.',
    status: 'Active track',
    moduleCount: 4,
    lectureSlides: [
      {
        title: 'Research Is A Graph',
        body: 'Claims, sources, methods, contradictions, and open questions are all connected. Insight appears when those connections are visible.',
      },
      {
        title: 'Sheets Organize The Terrain',
        body: 'Source matrices, claim matrices, and gap sheets give your research a stable structure instead of a pile of notes.',
      },
      {
        title: 'AI Accelerates Synthesis',
        body: 'AI helps cluster themes, compare claims, and propose next search directions without replacing your judgment.',
      },
      {
        title: 'Presentation Is Part Of The System',
        body: 'The work is not done when you know something. It is done when you can show it clearly and move the conversation forward.',
      },
    ],
    quest: {
      title: 'The Insight Quest',
      summary: 'Turn scattered source intake and note chaos into a connected research operating system.',
      steps: ['Normalize intake', 'Compare claims', 'Detect themes and gaps', 'Build the narrative board'],
    },
    workflows: researcherWorkflows,
  },
};
