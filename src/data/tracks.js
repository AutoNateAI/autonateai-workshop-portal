import {studentWorkflows, researcherWorkflows} from './workflows.js';

function graphVisual(title, nodes, edges) {
  return {type: 'graph', title, nodes, edges};
}

function tableVisual(title, columns, rows) {
  return {type: 'table', title, columns, rows};
}

function chartVisual(title, items) {
  return {type: 'chart', title, items};
}

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
    moduleCount: 5,
    lectureSlides: [
      {
        eyebrow: 'Mindset shift',
        title: 'You Already Carry AI Agents In Your Pocket',
        lead:
          'Most students already have the raw power they need. What they usually do not have is a system for steering that power with intention.',
        body:
          'Your phone is not just a chat window. It is a portable research partner, scheduling assistant, note-structuring engine, and reflection tool. The problem is not access. The problem is that most people never move from single prompts into workflow thinking.',
        points: [
          'Web Search lets the agent reach beyond your current notes.',
          'Connected Sheets turns unstructured talk into rows, matrices, and dashboards.',
          'Socratic back-and-forth with the agent is how you discover what you do not know yet.',
        ],
        visuals: [
          graphVisual(
            'Pocket agent stack',
            [
              {label: 'Student', tone: 'accent'},
              {label: 'ChatGPT Agent', tone: 'cool'},
              {label: 'Web Search', tone: 'muted'},
              {label: 'Sheets Workbook', tone: 'accent'},
              {label: 'Daily Decisions', tone: 'cool'},
            ],
            [
              'Student -> ChatGPT Agent',
              'ChatGPT Agent -> Web Search',
              'ChatGPT Agent -> Sheets Workbook',
              'Sheets Workbook -> Daily Decisions',
            ],
          ),
          chartVisual('What the agent can structure for you', [
            {label: 'Schedule load', value: 82, tone: 'accent'},
            {label: 'Assignments', value: 74, tone: 'cool'},
            {label: 'Study signals', value: 68, tone: 'muted'},
            {label: 'Reflection data', value: 88, tone: 'accent'},
          ]),
        ],
      },
      {
        eyebrow: 'Graph thinking',
        title: 'Your Student Life Is A Graph, Not A To-Do List',
        lead:
          'Classes, deadlines, job shifts, energy, family obligations, and ambition all affect each other. The real leverage comes from seeing those relationships clearly.',
        body:
          'When students think in isolated tasks, everything feels equally urgent. Graph thinking reveals dependencies, bottlenecks, and pressure points. That is what lets you make smarter choices instead of just working harder.',
        points: [
          'A bad sleep week can quietly wreck assignment quality and test prep.',
          'One overdue deliverable can distort the whole rest of the graph.',
          'The prompt packs are useful because they surface these relationships in structure.',
        ],
        visuals: [
          graphVisual(
            'Student system graph',
            [
              {label: 'Classes', tone: 'accent'},
              {label: 'Deadlines', tone: 'cool'},
              {label: 'Energy', tone: 'muted'},
              {label: 'Work', tone: 'accent'},
              {label: 'Family', tone: 'cool'},
              {label: 'Recovery', tone: 'muted'},
            ],
            [
              'Classes -> Deadlines',
              'Energy -> Study Quality',
              'Work -> Recovery',
              'Family -> Time Blocks',
              'Recovery -> Energy',
            ],
          ),
          tableVisual(
            'Graph pressure points and matching packs',
            ['Pressure point', 'What it affects', 'Use this pack'],
            [
              ['Too many roles', 'Time and energy allocation', 'Daily Time Grid'],
              ['Ambiguous assignment', 'Execution clarity', 'Assignment Sprint Planner'],
              ['Weak topic understanding', 'Exam performance', 'Reading Capture Matrix'],
            ],
          ),
        ],
      },
      {
        eyebrow: 'System design',
        title: 'Systems Turn Stress Into A Repeatable Student Loop',
        lead:
          'A system is not just a plan. It is a flow with inputs, structure, decisions, outputs, and feedback.',
        body:
          'Students usually fail from invisible process breakdowns, not because they are incapable. Once the day, the assignment, the reading, and the review process all feed each other, the chaos starts turning into signal.',
        points: [
          'Capture what is incoming.',
          'Structure it in a sheet the agent can work with.',
          'Act on the plan, then run debrief analytics to improve the next cycle.',
        ],
        visuals: [
          chartVisual('Student operating loop', [
            {label: 'Capture', value: 20, tone: 'cool'},
            {label: 'Structure', value: 40, tone: 'accent'},
            {label: 'Execute', value: 65, tone: 'muted'},
            {label: 'Debrief', value: 85, tone: 'accent'},
          ]),
          tableVisual(
            'System stage to workflow',
            ['Stage', 'Workbook', 'Why it matters'],
            [
              ['Plan the day', 'Daily Time Grid', 'Turns roles and priorities into visible blocks'],
              ['Break work down', 'Assignment Sprint Sheet', 'Makes hidden dependencies visible'],
              ['Review reality', 'Day Debrief Lab', 'Finds friction, energy patterns, and timing mistakes'],
            ],
          ),
        ],
      },
      {
        eyebrow: 'Socratic prompting',
        title: 'Use The Agent Like A Thinking Partner, Not A Vending Machine',
        lead:
          'The best insights usually come from a live conversation with the model, not from one perfect prompt.',
        body:
          'Ask the agent to challenge assumptions, compare tradeoffs, and probe what is missing from your current view. That is how you get from shallow productivity to real learning. Socratic prompting is especially strong when the sheet gives the conversation a shared structure.',
        points: [
          'Ask the model what it thinks is missing from your matrix.',
          'Request competing interpretations before asking for a final answer.',
          'Use the filled workbook as common ground for deeper dialogue.',
        ],
        visuals: [
          tableVisual(
            'Weak ask vs Socratic ask',
            ['Weak ask', 'Socratic ask'],
            [
              ['Make me a study plan.', 'What assumptions in this study plan are unrealistic for my current energy and time blocks?'],
              ['Summarize these notes.', 'Where do these notes show weak understanding, contradiction, or shallow evidence?'],
              ['Help with this assignment.', 'What questions should I answer before I trust this assignment plan?'],
            ],
          ),
          graphVisual(
            'Conversation loop',
            [
              {label: 'Question', tone: 'accent'},
              {label: 'Challenge', tone: 'cool'},
              {label: 'Revision', tone: 'muted'},
              {label: 'Insight', tone: 'accent'},
            ],
            [
              'Question -> Challenge',
              'Challenge -> Revision',
              'Revision -> Insight',
              'Insight -> Question',
            ],
          ),
        ],
      },
      {
        eyebrow: 'Workbook analytics',
        title: 'Sheets Become A Workbook The Agent Can Analyze Back To You',
        lead:
          'Once your sheets hold real rows about your life, the agent can build reports over your habits, study behavior, and execution patterns.',
        body:
          'This is where the system compounds. You can speak unstructured thoughts into ChatGPT, let it structure them into the workbook, and then ask it to generate reports over your time use, confusion zones, learning velocity, or behavior patterns.',
        points: [
          'The workbook is the memory layer.',
          'The prompt packs teach the agent how to structure and interpret that memory.',
          'Open-ended reports become possible because the underlying data is finally clean enough.',
        ],
        visuals: [
          tableVisual(
            'What becomes measurable',
            ['Workbook', 'What you can ask the agent later'],
            [
              ['Daily Time Grid', 'Where did my plan repeatedly break and why?'],
              ['Study Heatmap Board', 'Which topics stay weak even after review?'],
              ['Day Debrief Lab', 'What emotional or energy patterns keep showing up?'],
            ],
          ),
          chartVisual('Compounding value from structured rows', [
            {label: 'Raw notes', value: 24, tone: 'muted'},
            {label: 'Structured sheet', value: 55, tone: 'cool'},
            {label: 'Agent analysis', value: 78, tone: 'accent'},
            {label: 'Behavior report', value: 92, tone: 'accent'},
          ]),
        ],
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
    moduleCount: 5,
    lectureSlides: [
      {
        eyebrow: 'Mindset shift',
        title: 'You Already Have A Research Agent In Your Pocket',
        lead:
          'Most researchers use AI as a summary machine when it can actually function as a structured research partner.',
        body:
          'With web search, connected spreadsheets, and deliberate prompting, the agent can help normalize intake, compare claims, surface gaps, and produce reports over your working corpus. The power is already there. The missing piece is system design.',
        points: [
          'The agent can gather, normalize, and compare source metadata quickly.',
          'Sheets gives research conversations a stable, inspectable memory.',
          'The strongest use is not replacement. It is better synthesis and better questioning.',
        ],
        visuals: [
          graphVisual(
            'Research agent stack',
            [
              {label: 'Researcher', tone: 'accent'},
              {label: 'ChatGPT Agent', tone: 'cool'},
              {label: 'Web Search', tone: 'muted'},
              {label: 'Research Workbook', tone: 'accent'},
              {label: 'Insight Report', tone: 'cool'},
            ],
            [
              'Researcher -> ChatGPT Agent',
              'ChatGPT Agent -> Web Search',
              'ChatGPT Agent -> Research Workbook',
              'Research Workbook -> Insight Report',
            ],
          ),
          chartVisual('Where the agent helps most', [
            {label: 'Intake cleanup', value: 74, tone: 'cool'},
            {label: 'Claim comparison', value: 81, tone: 'accent'},
            {label: 'Gap detection', value: 78, tone: 'accent'},
            {label: 'Narrative prep', value: 69, tone: 'muted'},
          ]),
        ],
      },
      {
        eyebrow: 'Graph thinking',
        title: 'Research Is A Graph Of Claims, Methods, Contradictions, And Gaps',
        lead:
          'Papers are not isolated objects. They are connected arguments living inside methods, assumptions, time periods, and evidence structures.',
        body:
          'When you model research as a graph, you stop treating literature review as a pile of summaries. You start seeing who is in conversation with whom, where findings conflict, and which nodes in the graph still need coverage.',
        points: [
          'A claim means little without its method and context.',
          'Contradictions are often the start of insight, not a nuisance.',
          'Your prompt packs work best when they reveal these relationships rather than flatten them.',
        ],
        visuals: [
          graphVisual(
            'Research graph',
            [
              {label: 'Claim', tone: 'accent'},
              {label: 'Method', tone: 'cool'},
              {label: 'Evidence', tone: 'muted'},
              {label: 'Population', tone: 'accent'},
              {label: 'Contradiction', tone: 'cool'},
              {label: 'Gap', tone: 'muted'},
            ],
            [
              'Method -> Claim',
              'Evidence -> Claim',
              'Population -> Evidence',
              'Claim -> Contradiction',
              'Contradiction -> Gap',
            ],
          ),
          tableVisual(
            'Graph view to workflow',
            ['What you need to see', 'Workbook'],
            [
              ['Normalized source metadata', 'Source Intake Sheet'],
              ['How claims connect or conflict', 'Claim Graph Matrix'],
              ['Which areas lack coverage', 'Gap Radar Sheet'],
            ],
          ),
        ],
      },
      {
        eyebrow: 'System design',
        title: 'A Research System Needs Intake, Structure, Synthesis, And Output',
        lead:
          'A research process breaks when notes pile up faster than they are normalized, compared, and turned into narrative.',
        body:
          'System design lets you build a deliberate flow: intake sources, convert them into structured rows, compare and cluster them, detect gaps, then turn the result into a review, memo, presentation, or argument.',
        points: [
          'This is why the workbooks are separate but connected.',
          'Each prompt pack supports a stage in the larger research system.',
          'The goal is not more notes. The goal is better movement through the system.',
        ],
        visuals: [
          chartVisual('Research operating loop', [
            {label: 'Intake', value: 25, tone: 'cool'},
            {label: 'Structure', value: 45, tone: 'accent'},
            {label: 'Synthesize', value: 68, tone: 'muted'},
            {label: 'Present', value: 86, tone: 'accent'},
          ]),
          tableVisual(
            'System stage to workflow',
            ['Stage', 'Workbook', 'Outcome'],
            [
              ['Normalize', 'Source Intake Sheet', 'Clean source metadata and first-pass claims'],
              ['Compare', 'Claim Graph Matrix', 'Visible agreements and contradictions'],
              ['Narrate', 'Research Narrative Board', 'A shareable story of the work'],
            ],
          ),
        ],
      },
      {
        eyebrow: 'Socratic prompting',
        title: 'Use Socratic Dialogue To Pressure-Test Your Interpretation',
        lead:
          'The agent should not just echo your draft understanding. It should help you interrogate it.',
        body:
          'Ask for competing interpretations, missing variables, surprising counterarguments, and the strongest challenge to your current framing. This is how you move from summary to analysis. The workbook keeps the discussion grounded in explicit rows and evidence.',
        points: [
          'Invite the model to challenge your strongest claim.',
          'Ask what the matrix might be hiding because of your current column design.',
          'Use contradiction and uncertainty as prompts for deeper search, not as reasons to stop.',
        ],
        visuals: [
          tableVisual(
            'Weak ask vs Socratic ask',
            ['Weak ask', 'Socratic ask'],
            [
              ['Summarize these papers.', 'What claims in this matrix are overstated given the methods and evidence types?'],
              ['What is the gap here?', 'What assumptions am I making before I call this a gap?'],
              ['Help me write the review.', 'What alternative structure would expose the disagreements more honestly?'],
            ],
          ),
          graphVisual(
            'Interpretation loop',
            [
              {label: 'Claim', tone: 'accent'},
              {label: 'Challenge', tone: 'cool'},
              {label: 'Reframe', tone: 'muted'},
              {label: 'New search', tone: 'accent'},
            ],
            [
              'Claim -> Challenge',
              'Challenge -> Reframe',
              'Reframe -> New search',
              'New search -> Claim',
            ],
          ),
        ],
      },
      {
        eyebrow: 'Workbook analytics',
        title: 'Once The Workbook Is Structured, The Agent Can Build Reports Over The Corpus',
        lead:
          'This is where connected Sheets gets serious. Once the rows are meaningful, the model can generate habit reports, concept reports, contradiction reports, and narrative drafts.',
        body:
          'You can speak unstructured source notes or research questions into the model, let it clean them into the workbook, and then ask for higher-order analysis over the whole system. That opens the door to living literature reviews, gap reports, trend summaries, and presentation-ready syntheses.',
        points: [
          'The workbook is the durable memory.',
          'The prompt packs are the method for feeding and querying that memory.',
          'Advanced reports become trustworthy only when the underlying structure is sound.',
        ],
        visuals: [
          tableVisual(
            'Reports you can ask for later',
            ['Workbook', 'Question you can now ask'],
            [
              ['Claim Graph Matrix', 'Which claims cluster together and where do they diverge?'],
              ['Gap Radar Sheet', 'What domains, populations, or methods are still under-covered?'],
              ['Lit Review Builder', 'What section structure best reflects the evidence landscape?'],
            ],
          ),
          chartVisual('Value gained from structured research rows', [
            {label: 'Raw notes', value: 22, tone: 'muted'},
            {label: 'Normalized intake', value: 47, tone: 'cool'},
            {label: 'Cross-source analysis', value: 76, tone: 'accent'},
            {label: 'Insight reporting', value: 93, tone: 'accent'},
          ]),
        ],
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
