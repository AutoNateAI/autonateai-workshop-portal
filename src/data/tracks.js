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

function slide({
  eyebrow,
  title,
  lead,
  body,
  points = [],
  visuals = [],
  activity = null,
}) {
  return {eyebrow, title, lead, body, points, visuals, activity};
}

function activity(title, prompt, steps) {
  return {title, prompt, steps};
}

export const connectorStack = [
  'ChatGPT with Web Search enabled',
  'Google Sheets connected inside ChatGPT',
  'Figma connected for visual boards',
];

const studentSlides = [
  slide({
    eyebrow: 'Opening',
    title: 'This Workshop Is About Building A Student Operating System',
    lead:
      'You are not here to collect prompts. You are here to build a system that can think with you, organize your life, and help you learn better.',
    body:
      'For the next twenty minutes, we are going to move from a scrambled student reality into an AI-assisted operating system. Then you will start using the workflow packs naturally instead of treating them like random templates.',
    points: [
      'The lecture gives you the model.',
      'The activities let you test the model live.',
      'The prompt packs become the practical expressions of that model.',
    ],
    visuals: [
      chartVisual('Workshop rhythm', [
        {label: 'Lecture', value: 40, tone: 'accent'},
        {label: 'Activities', value: 35, tone: 'cool'},
        {label: 'Quest', value: 25, tone: 'muted'},
      ]),
    ],
  }),
  slide({
    eyebrow: 'Reality check',
    title: 'Most Students Are Not Disorganized. They Are Overloaded.',
    lead:
      'The problem is usually not laziness. It is cognitive overload without a system strong enough to hold the load.',
    body:
      'A student might be carrying classes, deadlines, work shifts, family duties, social pressure, health, and ambition all at the same time. Without structure, every decision starts happening in the same mental room.',
    points: [
      'Everything feels urgent because nothing is structured.',
      'Mental clutter makes good students feel like weak students.',
      'The solution starts with externalizing the system.',
    ],
    visuals: [
      graphVisual(
        'Typical student load',
        [
          {label: 'Classes', tone: 'accent'},
          {label: 'Deadlines', tone: 'cool'},
          {label: 'Work', tone: 'accent'},
          {label: 'Family', tone: 'cool'},
          {label: 'Health', tone: 'muted'},
          {label: 'Goals', tone: 'muted'},
        ],
        ['Classes -> Deadlines', 'Work -> Energy', 'Family -> Time', 'Health -> Focus', 'Goals -> Pressure'],
      ),
    ],
  }),
  slide({
    eyebrow: 'AI framing',
    title: 'You Already Have Agents In Your Pocket',
    lead:
      'Most people do not realize they are already carrying the beginnings of an agentic system on their phone or iPad.',
    body:
      'When ChatGPT can search the web, talk with you, and write into Sheets, it stops being a chatbot and starts functioning like an active partner in your workflow. The problem is that most people never teach it a system to operate inside.',
    points: [
      'An agent is useful when it can perceive, structure, and act within a workflow.',
      'Connected tools turn conversation into durable outputs.',
      'Your job is to provide the model and the direction.',
    ],
    visuals: [
      graphVisual(
        'Pocket agent stack',
        [
          {label: 'You', tone: 'accent'},
          {label: 'ChatGPT', tone: 'cool'},
          {label: 'Web Search', tone: 'muted'},
          {label: 'Sheets', tone: 'accent'},
          {label: 'Decisions', tone: 'cool'},
        ],
        ['You -> ChatGPT', 'ChatGPT -> Web Search', 'ChatGPT -> Sheets', 'Sheets -> Decisions'],
      ),
      chartVisual('What changes when tools connect', [
        {label: 'One-off answers', value: 28, tone: 'muted'},
        {label: 'Structured outputs', value: 61, tone: 'cool'},
        {label: 'System behavior', value: 88, tone: 'accent'},
      ]),
    ],
  }),
  slide({
    eyebrow: 'Activity',
    title: 'Activity 1: Map Your Actual Load',
    lead: 'Before we fix your system, we need to see what is actually inside it.',
    body:
      'Open ChatGPT and describe everything you are holding right now without trying to sound organized. Say it naturally. We want raw material, not polished priorities.',
    activity: activity('Life inventory', 'Tell the agent everything you are juggling right now in one messy message.', [
      'Mention classes, deadlines, personal responsibilities, emotional pressure, and goals.',
      'Do not organize it first.',
      'Notice how much is living in your head without structure.',
    ]),
    visuals: [
      tableVisual('What to include in the inventory', ['Category', 'Examples'], [
        ['Academic', 'classes, readings, papers, exams'],
        ['Life', 'sleep, health, errands, family'],
        ['Ambition', 'projects, internship prep, skill growth'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Graph thinking',
    title: 'Your Life Is A Graph, Not A Checklist',
    lead:
      'Lists flatten reality. Graphs show relationships, dependencies, and pressure transfer.',
    body:
      'When one area slips, something else pays the cost. Graph-based thinking helps you see where one commitment silently affects another. That is how better planning begins.',
    points: [
      'Energy affects reading quality.',
      'Work hours affect study timing.',
      'Recovery affects focus, mood, and realism.',
    ],
    visuals: [
      graphVisual(
        'Student graph view',
        [
          {label: 'Sleep', tone: 'muted'},
          {label: 'Energy', tone: 'cool'},
          {label: 'Study Quality', tone: 'accent'},
          {label: 'Assignments', tone: 'accent'},
          {label: 'Stress', tone: 'cool'},
          {label: 'Recovery', tone: 'muted'},
        ],
        ['Sleep -> Energy', 'Energy -> Study Quality', 'Assignments -> Stress', 'Recovery -> Energy', 'Stress -> Recovery'],
      ),
    ],
  }),
  slide({
    eyebrow: 'Workflow tie-in',
    title: 'The Prompt Packs Exist To Surface The Graph',
    lead:
      'Each workflow pack is just a different lens on the same system.',
    body:
      'The Daily Time Grid handles time and role pressure. The Assignment Sprint Sheet handles dependencies. The Reading Capture Matrix handles knowledge structure. The Day Debrief Lab handles feedback and learning.',
    points: [
      'Different packs reveal different parts of the same graph.',
      'You do not need all of them at once.',
      'You need the right one for the right point of friction.',
    ],
    visuals: [
      tableVisual('Pressure point to prompt pack', ['Pressure', 'Use this workflow'], [
        ['My day feels impossible', 'Daily Time Grid'],
        ['This assignment is too big', 'Assignment Sprint Planner'],
        ['I read but nothing sticks', 'Reading Capture Matrix'],
        ['I keep repeating mistakes', 'Day Debrief Lab'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Activity',
    title: 'Activity 2: Turn A Mess Into A Graph',
    lead: 'Now ask the model to expose the relationships inside your messy life inventory.',
    body:
      'Take the messy message you just wrote and ask the agent what nodes, dependencies, and bottlenecks it sees. This is your first move from chaos into visible structure.',
    activity: activity('Graph extraction', 'Ask: What are the main nodes, dependencies, and bottlenecks in what I just told you?', [
      'Look for where time, energy, and deadlines collide.',
      'Notice which node creates the most pressure downstream.',
      'Save that pressure point for later.',
    ]),
    visuals: [
      tableVisual('What a good extraction reveals', ['Signal', 'Why it matters'], [
        ['Key nodes', 'Shows what is actually in your system'],
        ['Dependencies', 'Reveals what affects what'],
        ['Bottlenecks', 'Shows where to intervene first'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Systems thinking',
    title: 'A System Is A Flow With Feedback',
    lead:
      'You need more than awareness. You need a repeatable loop that can absorb life and still function.',
    body:
      'Systems thinking means you define inputs, structure them, operate them, and review what happened. If there is no feedback loop, the same bad pattern just repeats under a new calendar date.',
    points: [
      'Capture',
      'Structure',
      'Operate',
      'Review',
    ],
    visuals: [
      chartVisual('Student system loop', [
        {label: 'Capture', value: 22, tone: 'cool'},
        {label: 'Structure', value: 46, tone: 'accent'},
        {label: 'Operate', value: 70, tone: 'muted'},
        {label: 'Review', value: 92, tone: 'accent'},
      ]),
    ],
  }),
  slide({
    eyebrow: 'Spreadsheet logic',
    title: 'Sheets Is The Visible Logic Layer',
    lead:
      'A spreadsheet workbook is the perfect place to drop your matrices because it can hold structure, status, and later analytics.',
    body:
      'Once the agent can write rows into a workbook, your system gains memory. Instead of living inside your head, the logic becomes visible. That means you can inspect it, change it, and ask the model to analyze it back to you later.',
    points: [
      'Rows turn vague life into observable units.',
      'Columns force clear categories and comparisons.',
      'A workbook lets the AI produce advanced reports over time.',
    ],
    visuals: [
      tableVisual('Why Sheets works so well', ['Feature', 'Value'], [
        ['Rows', 'Atomic units the model can fill and analyze'],
        ['Columns', 'Consistent dimensions for comparison'],
        ['Tabs', 'Multiple connected views of the same life system'],
      ]),
      chartVisual('Value of structured rows', [
        {label: 'Messy notes', value: 24, tone: 'muted'},
        {label: 'Structured rows', value: 57, tone: 'cool'},
        {label: 'Agent analytics', value: 90, tone: 'accent'},
      ]),
    ],
  }),
  slide({
    eyebrow: 'Workflow tie-in',
    title: 'The Daily Time Grid Is The Front Door To The System',
    lead:
      'If your day is not structured, the rest of the system is always fighting upstream.',
    body:
      'The Daily Time Grid is not a cute planner. It is the place where your roles, priorities, constraints, and recovery blocks become visible enough for the agent to help you reason about them.',
    points: [
      'It balances human roles with academic priorities.',
      'It creates a place for debrief data later.',
      'It gives the model something concrete to optimize.',
    ],
    visuals: [
      tableVisual('Daily Time Grid logic', ['Column', 'Why it exists'], [
        ['Time Block', 'Locks decisions into time'],
        ['Role', 'Keeps your identity load visible'],
        ['Debrief', 'Turns execution into feedback data'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Activity',
    title: 'Activity 3: Let The Agent Structure Your Day',
    lead:
      'Now we move from theory into the first concrete behavior of the system.',
    body:
      'Tell the model what you need to accomplish today, who you need to be today, and what constraints are real. Then let it produce the first version of your day grid.',
    activity: activity('Daily grid draft', 'Use the Daily Time Grid prompt and fill in your real priorities and constraints.', [
      'Include human roles like parent, worker, student, founder.',
      'Tell it the truth about your energy and deadlines.',
      'Do not optimize for perfection. Optimize for realism.',
    ]),
    visuals: [
      chartVisual('What the day grid balances', [
        {label: 'Urgency', value: 83, tone: 'accent'},
        {label: 'Energy', value: 61, tone: 'cool'},
        {label: 'Recovery', value: 47, tone: 'muted'},
      ]),
    ],
  }),
  slide({
    eyebrow: 'Learning theory',
    title: 'Students Usually Underuse AI For Learning',
    lead:
      'Most people ask for answers when they should be using the agent to diagnose their understanding.',
    body:
      'If you only ask for summaries, the model becomes a compression machine. If you ask it to identify weak understanding, conflicting concepts, and high-value questions, it becomes a learning partner.',
    points: [
      'Learning improves when confusion gets made visible.',
      'The Reading Capture Matrix gives the model a place to show your understanding clearly.',
      'The Study Heatmap Board turns that into review priorities.',
    ],
    visuals: [
      tableVisual('Weak learning use vs strong learning use', ['Weak use', 'Stronger use'], [
        ['Summarize the chapter', 'What concepts in this chapter am I least likely to truly understand?'],
        ['Give me quiz questions', 'Which concepts need active recall, examples, and compare-contrast prompts?'],
        ['Help me study', 'Build a confidence-ranked review structure from these rows'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Socratic dialogue',
    title: 'Use Socratic Discussion To Find New Insight',
    lead:
      'The best conversations with AI are not one-and-done commands. They are iterative conversations that pressure-test your thinking.',
    body:
      'Ask the model what it thinks is missing, which assumptions are unrealistic, and what a smarter framing would be. That style of prompting produces new insight because it makes the AI challenge and refine the system with you.',
    points: [
      'Ask for critique before asking for polish.',
      'Ask for contradictions before asking for confidence.',
      'Use your workbook as shared evidence in the conversation.',
    ],
    visuals: [
      graphVisual(
        'Socratic loop',
        [
          {label: 'Question', tone: 'accent'},
          {label: 'Challenge', tone: 'cool'},
          {label: 'Revision', tone: 'muted'},
          {label: 'Clarity', tone: 'accent'},
        ],
        ['Question -> Challenge', 'Challenge -> Revision', 'Revision -> Clarity', 'Clarity -> Question'],
      ),
    ],
  }),
  slide({
    eyebrow: 'Activity',
    title: 'Activity 4: Ask The Agent To Challenge Your Plan',
    lead:
      'Take the day grid or assignment plan you just made and ask the model to critique it.',
    body:
      'This is the moment where the AI stops being a generator and starts behaving more like a thinking partner. You are inviting stress testing instead of comfort.',
    activity: activity('Challenge prompt', 'Ask: What assumptions in this plan look unrealistic, weak, or under-supported?', [
      'Ask it to identify where you are overestimating yourself.',
      'Ask what is missing from the structure.',
      'Ask what single change would make the plan smarter.',
    ]),
    visuals: [
      tableVisual('Challenge dimensions', ['Dimension', 'Question'], [
        ['Time', 'Where am I underestimating effort?'],
        ['Energy', 'Which blocks ignore my real stamina?'],
        ['Priority', 'What looks urgent but is not truly high leverage?'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Workflow tie-in',
    title: 'Assignment, Reading, And Exam Work Each Need Their Own Matrix',
    lead:
      'You do not want one giant sheet for everything. You want specialized views that still belong to one system.',
    body:
      'The Assignment Sprint Sheet reveals execution steps. The Reading Capture Matrix structures concepts and confusion. The Study Heatmap Board ranks what deserves your attention. Each sheet solves a specific problem while feeding the larger operating system.',
    points: [
      'Specialization creates clarity.',
      'Common structure creates interoperability.',
      'The agent gets stronger when each view has a clear purpose.',
    ],
    visuals: [
      tableVisual('Prompt pack role map', ['Workbook', 'System role'], [
        ['Assignment Sprint Sheet', 'Execution planning'],
        ['Reading Capture Matrix', 'Knowledge structuring'],
        ['Study Heatmap Board', 'Review prioritization'],
        ['Paper Source Matrix', 'Source-backed writing'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Analytics',
    title: 'Once The Data Is In The Workbook, Reports Become Possible',
    lead:
      'This is where organized data turns into compound intelligence.',
    body:
      'As soon as your AI is connected to Sheets, you can talk unstructured, let the model structure the workbook, and then ask for higher-order reports over habits, focus, energy, or confusion patterns. That is a major jump in leverage.',
    points: [
      'The workbook becomes your memory layer.',
      'The agent can generate reports over patterns across days or weeks.',
      'This is how improvement becomes measurable.',
    ],
    visuals: [
      tableVisual('Reports the workbook enables', ['Workbook', 'Possible report'], [
        ['Daily Time Grid', 'Where your schedule repeatedly breaks'],
        ['Study Heatmap Board', 'What topics stay weak across review cycles'],
        ['Day Debrief Lab', 'What emotional and focus patterns repeat'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Reflection',
    title: 'The Day Debrief Lab Is Where The System Starts Compounding',
    lead:
      'Without reflection, the system produces motion. With reflection, it produces intelligence.',
    body:
      'The debrief workbook helps you see what actually happened, not what you hoped happened. That is how the system learns your real timing, energy, and distraction patterns instead of operating on fantasy.',
    points: [
      'Reflection converts execution into data.',
      'Data gives the agent something meaningful to analyze.',
      'Analysis changes tomorrow’s design.',
    ],
    visuals: [
      chartVisual('Compounding loop', [
        {label: 'Plan', value: 28, tone: 'cool'},
        {label: 'Execute', value: 55, tone: 'muted'},
        {label: 'Debrief', value: 77, tone: 'accent'},
        {label: 'Improve', value: 93, tone: 'accent'},
      ]),
    ],
  }),
  slide({
    eyebrow: 'Activity',
    title: 'Activity 5: Pick Your First Two Workflows',
    lead:
      'You do not need to use every prompt pack today. You need a sane starting sequence.',
    body:
      'Choose the two workbooks that would reduce the most friction in your life right now. The goal is not to be impressed by the system. The goal is to start operating inside it.',
    activity: activity('Pick your sequence', 'Choose your first two workflow packs and say why each one matters right now.', [
      'Pick one front-door pack like the Daily Time Grid or Assignment Sprint Sheet.',
      'Pick one feedback or learning pack like the Day Debrief Lab or Reading Capture Matrix.',
      'Commit to using them in sequence this week.',
    ]),
    visuals: [
      tableVisual('Simple starting sequences', ['If your pain is...', 'Start with...'], [
        ['Overload and no plan', 'Daily Time Grid -> Day Debrief Lab'],
        ['Big vague assignments', 'Assignment Sprint Planner -> Daily Time Grid'],
        ['Reading without retention', 'Reading Capture Matrix -> Study Heatmap Board'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Quest setup',
    title: 'The Quest Starts When The Lecture Ends',
    lead:
      'The lecture is not the workshop. The lecture is the orientation to the quest.',
    body:
      'After this, you will step into the AI-first student quest and use the workflow packs naturally. You will not be told what to memorize. You will be asked to operate the system and discover what it can do for you.',
    points: [
      'You now have the theory.',
      'You have already tested the system in small ways.',
      'The quest is where the system becomes real.',
    ],
    visuals: [
      graphVisual(
        'Workshop path',
        [
          {label: 'Lecture', tone: 'cool'},
          {label: 'Activities', tone: 'accent'},
          {label: 'Prompt Packs', tone: 'muted'},
          {label: 'Quest', tone: 'accent'},
        ],
        ['Lecture -> Activities', 'Activities -> Prompt Packs', 'Prompt Packs -> Quest'],
      ),
    ],
  }),
];

const researcherSlides = [
  slide({
    eyebrow: 'Opening',
    title: 'This Workshop Is About Building A Research Operating System',
    lead:
      'You are not here to collect AI tricks. You are here to build a system that can hold sources, claims, gaps, synthesis, and reporting.',
    body:
      'For the next twenty minutes, we are going to move from scattered notes into a research system that thinks in graphs, stores structured evidence in workbooks, and uses AI as an active research partner.',
    points: [
      'The lecture gives the system model.',
      'The activities make you test the model while learning it.',
      'The prompt packs become the operational tools of that model.',
    ],
    visuals: [
      chartVisual('Workshop rhythm', [
        {label: 'Lecture', value: 40, tone: 'accent'},
        {label: 'Activities', value: 35, tone: 'cool'},
        {label: 'Quest', value: 25, tone: 'muted'},
      ]),
    ],
  }),
  slide({
    eyebrow: 'Reality check',
    title: 'Most Research Breaks Down In The Transition From Notes To Structure',
    lead:
      'Researchers usually do not lack effort. They lack a reliable system for turning intake into comparable structure.',
    body:
      'Sources pile up, interesting claims get highlighted, but the structure needed for cross-source reasoning never becomes stable. That is why projects feel dense, messy, and difficult to synthesize.',
    points: [
      'The problem is not just volume. It is fragmentation.',
      'Without structure, contradiction and overlap stay hidden.',
      'A research OS solves flow, not just storage.',
    ],
    visuals: [
      graphVisual(
        'Research overload',
        [
          {label: 'Sources', tone: 'accent'},
          {label: 'Claims', tone: 'cool'},
          {label: 'Methods', tone: 'muted'},
          {label: 'Themes', tone: 'accent'},
          {label: 'Gaps', tone: 'cool'},
          {label: 'Narrative', tone: 'muted'},
        ],
        ['Sources -> Claims', 'Methods -> Claims', 'Claims -> Themes', 'Themes -> Narrative', 'Contradictions -> Gaps'],
      ),
    ],
  }),
  slide({
    eyebrow: 'AI framing',
    title: 'You Already Have A Research Agent In Your Pocket',
    lead:
      'With web search, connected Sheets, and deliberate prompting, AI can move beyond summary into structured research support.',
    body:
      'The model can help normalize metadata, compare claims, identify missing coverage, and produce reports over the corpus. The missing ingredient is almost always the system it is working inside.',
    points: [
      'The AI is strongest when it has durable structure to read and write.',
      'Connected Sheets gives your research process memory.',
      'The goal is better reasoning, not passive automation.',
    ],
    visuals: [
      graphVisual(
        'Research agent stack',
        [
          {label: 'Researcher', tone: 'accent'},
          {label: 'ChatGPT', tone: 'cool'},
          {label: 'Web Search', tone: 'muted'},
          {label: 'Workbook', tone: 'accent'},
          {label: 'Reports', tone: 'cool'},
        ],
        ['Researcher -> ChatGPT', 'ChatGPT -> Web Search', 'ChatGPT -> Workbook', 'Workbook -> Reports'],
      ),
      chartVisual('Agent leverage areas', [
        {label: 'Metadata cleanup', value: 71, tone: 'cool'},
        {label: 'Claim comparison', value: 84, tone: 'accent'},
        {label: 'Gap detection', value: 79, tone: 'accent'},
      ]),
    ],
  }),
  slide({
    eyebrow: 'Activity',
    title: 'Activity 1: Describe Your Research Mess Unstructured',
    lead:
      'Before you build a system, let the model see the real shape of your current research chaos.',
    body:
      'Open ChatGPT and describe your current research area, your note situation, what is piling up, and what feels unclear. Speak naturally. The point is to give the model reality, not polished academic language.',
    activity: activity('Research inventory', 'Describe your research situation in one messy message.', [
      'Mention your topic, current corpus, confusion, and bottlenecks.',
      'Include what feels repetitive or hard to synthesize.',
      'Do not organize it first.',
    ]),
    visuals: [
      tableVisual('What to include', ['Signal type', 'Examples'], [
        ['Topic scope', 'question, field, subdomain'],
        ['Corpus state', 'papers, notes, PDFs, clips, highlights'],
        ['Pain points', 'contradictions, gaps, overload, unclear framing'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Graph thinking',
    title: 'Research Is A Graph Of Claims, Methods, Contexts, And Gaps',
    lead:
      'If you treat papers like isolated summaries, the larger research graph stays invisible.',
    body:
      'Graph-based research thinking shows which claims connect, which methods drive which findings, and where contradictions or missing populations create opportunity for new insight.',
    points: [
      'Claims need methods and context attached to them.',
      'Contradictions are often signal, not noise.',
      'Gaps become clearer when the graph is visible.',
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
        ['Method -> Claim', 'Evidence -> Claim', 'Population -> Evidence', 'Claim -> Contradiction', 'Contradiction -> Gap'],
      ),
    ],
  }),
  slide({
    eyebrow: 'Workflow tie-in',
    title: 'Each Workbook Is A Different View Of The Same Research Graph',
    lead:
      'The prompt packs matter because they give you specialized surfaces for different reasoning tasks.',
    body:
      'The Source Intake Sheet normalizes the corpus. The Claim Graph Matrix compares arguments. The Gap Radar Sheet exposes missing terrain. The Research Narrative Board turns structure into communication.',
    points: [
      'Different workbooks support different research moves.',
      'The workbook set is designed to talk to itself over time.',
      'The graph gets clearer as each sheet gets populated.',
    ],
    visuals: [
      tableVisual('Research view to workbook', ['Need', 'Workbook'], [
        ['Normalize sources', 'Source Intake Sheet'],
        ['Compare arguments', 'Claim Graph Matrix'],
        ['See missing coverage', 'Gap Radar Sheet'],
        ['Build output narrative', 'Research Narrative Board'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Activity',
    title: 'Activity 2: Ask The Agent To Extract The Graph',
    lead:
      'Now let the model identify the key nodes in your research situation.',
    body:
      'Take your messy research description and ask the agent what claims, methods, contradictions, and gaps it already sees. This is the transition from note chaos into graph visibility.',
    activity: activity('Graph extraction', 'Ask: What are the main claims, methods, contradictions, and gaps in what I just described?', [
      'Look for relationships, not just themes.',
      'Ask which nodes seem most central.',
      'Notice what still feels underspecified.',
    ]),
    visuals: [
      tableVisual('What a strong extraction reveals', ['Signal', 'Why it matters'], [
        ['Core claims', 'Shows the argumentative center'],
        ['Method clusters', 'Reveals why findings may differ'],
        ['Gaps', 'Points to next search directions'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Systems thinking',
    title: 'A Research System Needs Intake, Structure, Synthesis, And Output',
    lead:
      'Research becomes much easier to reason about when you treat it as a deliberate system instead of a growing pile of documents.',
    body:
      'A stable research workflow pulls in sources, structures them into rows, compares them, surfaces gaps, then turns the structured landscape into a review, memo, talk, or argument.',
    points: [
      'Intake without structure becomes clutter.',
      'Structure without synthesis becomes bureaucracy.',
      'Synthesis without output leaves value trapped.',
    ],
    visuals: [
      chartVisual('Research operating loop', [
        {label: 'Intake', value: 24, tone: 'cool'},
        {label: 'Structure', value: 46, tone: 'accent'},
        {label: 'Synthesis', value: 71, tone: 'muted'},
        {label: 'Output', value: 91, tone: 'accent'},
      ]),
    ],
  }),
  slide({
    eyebrow: 'Spreadsheet logic',
    title: 'Sheets Is The Workbook Layer For Your Research Memory',
    lead:
      'Spreadsheets are not just storage. They are the place where your research becomes comparable enough for AI to reason over it.',
    body:
      'Rows let the model hold normalized evidence units. Columns let you compare dimensions like method, claim, relevance, or contradiction. Tabs let you preserve multiple views of the same project without losing coherence.',
    points: [
      'Rows make claims inspectable.',
      'Columns make claims comparable.',
      'Tabs make the research system extensible.',
    ],
    visuals: [
      tableVisual('Why workbooks matter', ['Workbook feature', 'Research value'], [
        ['Rows', 'Atomic evidence units'],
        ['Columns', 'Cross-source comparison'],
        ['Tabs', 'Different analytical views'],
      ]),
      chartVisual('Value of structure', [
        {label: 'Loose notes', value: 20, tone: 'muted'},
        {label: 'Normalized rows', value: 54, tone: 'cool'},
        {label: 'Cross-source reports', value: 92, tone: 'accent'},
      ]),
    ],
  }),
  slide({
    eyebrow: 'Workflow tie-in',
    title: 'Source Intake Is The Front Door To The Whole Research System',
    lead:
      'If intake is sloppy, everything downstream gets harder.',
    body:
      'The Source Intake Sheet gives you a reliable front door for source metadata, core claims, evidence types, and tagging. It is the foundation for better comparison later.',
    points: [
      'Normalize once so you can compare later.',
      'A clean intake sheet reduces repeated work.',
      'It makes later agent analysis much stronger.',
    ],
    visuals: [
      tableVisual('Source Intake Sheet logic', ['Column', 'Why it matters'], [
        ['Method', 'Explains why findings may vary'],
        ['Core Claim', 'Preserves the main argumentative unit'],
        ['Tags', 'Enables later clustering and search'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Activity',
    title: 'Activity 3: Normalize A Few Sources Live',
    lead:
      'We are going to let the agent convert raw source information into clean workbook rows.',
    body:
      'Take a few papers, notes, or links and use the Source Intake prompt pack to normalize them into rows. This is where you start feeling the difference between messy notes and structured intake.',
    activity: activity('Normalize source intake', 'Use the Source Intake prompt with 3 to 5 real sources.', [
      'Include any partial notes you already have.',
      'Let the model fill the structure carefully.',
      'Notice how much easier the source landscape becomes to read.',
    ]),
    visuals: [
      chartVisual('What gets cleaner during intake', [
        {label: 'Metadata', value: 74, tone: 'cool'},
        {label: 'Claim clarity', value: 67, tone: 'accent'},
        {label: 'Searchability', value: 89, tone: 'accent'},
      ]),
    ],
  }),
  slide({
    eyebrow: 'Interpretation',
    title: 'Summary Is Not Synthesis',
    lead:
      'A pile of summaries still leaves you with a pile.',
    body:
      'Synthesis means comparing claims, spotting patterns, surfacing conflicts, and building a more coherent understanding than any one source contains by itself.',
    points: [
      'Summary compresses.',
      'Synthesis relates.',
      'The Claim Graph Matrix exists to support that move.',
    ],
    visuals: [
      tableVisual('Summary vs synthesis', ['Summary', 'Synthesis'], [
        ['Restates one source', 'Compares multiple sources'],
        ['Compresses content', 'Finds relationships'],
        ['Stops at description', 'Moves toward interpretation'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Socratic dialogue',
    title: 'Use Socratic Dialogue To Pressure-Test Your Reading Of The Evidence',
    lead:
      'The model should challenge your interpretation, not just echo it.',
    body:
      'Ask the agent what assumptions you are making, what other interpretations are plausible, and where your matrix may be hiding disagreement. This makes the AI more like a rigorous research partner.',
    points: [
      'Invite critique before asking for prose.',
      'Use contradiction as a doorway to stronger interpretation.',
      'Ask the model what your current structure might be missing.',
    ],
    visuals: [
      graphVisual(
        'Interpretation loop',
        [
          {label: 'Claim', tone: 'accent'},
          {label: 'Challenge', tone: 'cool'},
          {label: 'Reframe', tone: 'muted'},
          {label: 'Insight', tone: 'accent'},
        ],
        ['Claim -> Challenge', 'Challenge -> Reframe', 'Reframe -> Insight', 'Insight -> Claim'],
      ),
    ],
  }),
  slide({
    eyebrow: 'Activity',
    title: 'Activity 4: Ask The Agent What Your Matrix Might Be Missing',
    lead:
      'This is where the workbook and the Socratic method start working together.',
    body:
      'Take your current rows and ask the model what variables, populations, methods, or contradictions may still be underrepresented. That question often produces better next moves than asking for a polished summary.',
    activity: activity('Gap challenge', 'Ask: What does this matrix suggest I may be missing or underweighting?', [
      'Push for missing populations, methods, and time frames.',
      'Ask whether your tags are too broad or too shallow.',
      'Use the answer to inform your next search cycle.',
    ]),
    visuals: [
      tableVisual('Gap dimensions', ['Dimension', 'Example question'], [
        ['Population', 'Who is not represented here?'],
        ['Method', 'What kind of evidence is under-sampled?'],
        ['Time', 'Am I overweighting older or newer work?'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Workflow tie-in',
    title: 'Gap Radar, Lit Review, And Narrative Packs Carry The Back Half Of The System',
    lead:
      'Once intake and comparison are strong, the later packs help you turn structure into insight and communication.',
    body:
      'The Gap Radar Sheet helps detect missing terrain. The Lit Review Builder organizes themes and disagreements. The Research Narrative Board makes the work communicable to other humans.',
    points: [
      'Back-half packs turn structured evidence into stronger output.',
      'They help you move from analysis into argument.',
      'They are only powerful because the earlier sheets did the groundwork.',
    ],
    visuals: [
      tableVisual('Back-half workflow roles', ['Workbook', 'Purpose'], [
        ['Gap Radar Sheet', 'Expose under-covered terrain'],
        ['Lit Review Builder', 'Organize themes and disagreements'],
        ['Research Narrative Board', 'Communicate the insight clearly'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Analytics',
    title: 'Once The Workbook Is Structured, The Agent Can Build Research Reports Over It',
    lead:
      'This is where connected Sheets becomes much more than storage.',
    body:
      'As soon as the workbook holds meaningful rows, the agent can produce reports over methods, contradictions, concept clusters, habit patterns in your own research process, and draft narrative structures. That is a serious jump in leverage.',
    points: [
      'Structured rows make advanced analysis possible.',
      'Reports are only trustworthy when the workbook is clean enough.',
      'You can move from intake reports to synthesis reports to output drafts.',
    ],
    visuals: [
      tableVisual('Report examples', ['Workbook', 'Possible report'], [
        ['Claim Graph Matrix', 'Where claims cluster and diverge'],
        ['Gap Radar Sheet', 'What domains are under-covered'],
        ['Lit Review Builder', 'What section structure best fits the evidence landscape'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Reflection',
    title: 'Research Systems Also Need Feedback Loops',
    lead:
      'The system improves when you review not just the evidence, but your own research behavior.',
    body:
      'What search habits are wasting time? Which sources are repeatedly unhelpful? Where are your note structures too vague? The same system logic that helps students improve can help researchers tighten their own process.',
    points: [
      'A research OS should improve both the corpus and the researcher.',
      'Behavior review is part of methodological rigor.',
      'AI can help reflect process back to you when the workbook is structured.',
    ],
    visuals: [
      chartVisual('Research feedback loop', [
        {label: 'Search', value: 27, tone: 'cool'},
        {label: 'Structure', value: 49, tone: 'muted'},
        {label: 'Reflect', value: 73, tone: 'accent'},
        {label: 'Improve', value: 94, tone: 'accent'},
      ]),
    ],
  }),
  slide({
    eyebrow: 'Activity',
    title: 'Activity 5: Choose Your First Two Research Packs',
    lead:
      'Your goal is to start a sequence, not to use every workflow on day one.',
    body:
      'Pick the two workbooks that would most improve your research flow right now. One should help with intake or comparison. The other should help with synthesis or output.',
    activity: activity('Pick your sequence', 'Choose your first two research workflow packs and explain why they matter now.', [
      'Pair an intake-side workbook with a synthesis-side workbook.',
      'Choose based on current friction, not curiosity.',
      'Plan to use them in sequence during the quest.',
    ]),
    visuals: [
      tableVisual('Simple starting sequences', ['If your pain is...', 'Start with...'], [
        ['Source chaos', 'Source Intake Sheet -> Claim Graph Matrix'],
        ['Too many contradictions', 'Claim Graph Matrix -> Gap Radar Sheet'],
        ['Weak output clarity', 'Lit Review Builder -> Research Narrative Board'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Quest setup',
    title: 'The Quest Starts When The Lecture Ends',
    lead:
      'The lecture is orientation. The quest is the real use of the system.',
    body:
      'After this, you will move into the AI-first researcher quest and operate the system instead of just hearing about it. The prompt packs will show up naturally as tools inside that path.',
    points: [
      'You now have the conceptual model.',
      'You have tested it with small activities.',
      'The quest is where the workflows become lived practice.',
    ],
    visuals: [
      graphVisual(
        'Workshop path',
        [
          {label: 'Lecture', tone: 'cool'},
          {label: 'Activities', tone: 'accent'},
          {label: 'Prompt Packs', tone: 'muted'},
          {label: 'Quest', tone: 'accent'},
        ],
        ['Lecture -> Activities', 'Activities -> Prompt Packs', 'Prompt Packs -> Quest'],
      ),
    ],
  }),
];

export const tracks = {
  student: {
    id: 'student',
    label: 'Student OS',
    audience: 'For overloaded students juggling class, life, and ambition.',
    hero: 'Run school like a system, not a scramble.',
    status: 'Active track',
    moduleCount: studentSlides.length,
    lectureSlides: studentSlides,
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
    moduleCount: researcherSlides.length,
    lectureSlides: researcherSlides,
    quest: {
      title: 'The Insight Quest',
      summary: 'Turn scattered source intake and note chaos into a connected research operating system.',
      steps: ['Normalize intake', 'Compare claims', 'Detect themes and gaps', 'Build the narrative board'],
    },
    workflows: researcherWorkflows,
  },
};
