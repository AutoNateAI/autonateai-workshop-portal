import {studentWorkflows, researcherWorkflows} from './workflows.js';

export const connectorStack = [
  'ChatGPT with Web Search enabled',
  'Google Sheets connected',
  'Figma connected',
];

export const tracks = {
  student: {
    id: 'student',
    label: 'AI-First Student',
    audience: 'Students balancing classes, deadlines, personal responsibilities, and ambitious goals.',
    hero: 'Build a student operating system that turns cognitive overload into a daily workflow.',
    lectureTitle: 'Graph Thinking For Student Life',
    lectureSummary:
      'Explain how classes, deadlines, energy, family, projects, and distractions behave like a graph. Show how AI plus Sheets turns that graph into a visible system you can steer.',
    questTitle: 'The Juggling Quest',
    questSummary:
      'You are a student juggling coursework, life responsibilities, and future goals. Your quest is to build a system that converts chaos into a plan, a plan into action, and action into daily feedback.',
    outcomes: [
      'Turn priorities into a time-blocked daily schedule',
      'Break assignments into clear actions and due-date sequences',
      'Create a daily feedback loop using productivity, focus, distraction, energy, and emotion',
      'Use AI as a systems partner instead of a last-minute crutch',
    ],
    workflows: studentWorkflows,
  },
  researcher: {
    id: 'researcher',
    label: 'AI-First Researcher',
    audience: 'Researchers managing notes, claims, papers, source gaps, and synthesis across many moving parts.',
    hero: 'Build a research operating system that turns scattered information into connected insight.',
    lectureTitle: 'Graph Thinking For Research',
    lectureSummary:
      'Frame research as a graph of claims, sources, methods, evidence, contradictions, and emerging themes. Show how AI plus Sheets exposes the relationships that usually stay buried in notes.',
    questTitle: 'The Insight Quest',
    questSummary:
      'You are navigating a dense field of sources, claims, and open questions. Your quest is to structure the research graph, expose patterns, and turn synthesis into clear next moves.',
    outcomes: [
      'Structure notes into reusable source and claim matrices',
      'Detect patterns, contradictions, and research gaps faster',
      'Build workflows that move from intake to synthesis to presentation',
      'Use AI to increase signal density without losing rigor',
    ],
    workflows: researcherWorkflows,
  },
};
