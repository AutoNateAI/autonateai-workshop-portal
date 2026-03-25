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
  sectionBreak = false,
  narration = '',
}) {
  return {eyebrow, title, lead, body, points, visuals, activity, sectionBreak, narration};
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
    eyebrow: null,
    title: 'Section 1: The Weight of Now',
    lead: '',
    body: '',
    sectionBreak: true,
  }),
  slide({
    eyebrow: 'Opening Scene',
    title: 'It Is Two PM And Everything Is Happening At Once',
    lead:
      'Marques and Tammye are trying to survive senior year, and Nate is right there with them, cracking jokes, catching patterns, and noticing exactly how the chaos keeps stacking on the friend group.',
    body:
      'They are in a Forest Hills High hallway, but the pressure is bigger than one building. Their phones are full of messages from friends at City High/Middle and EGR High/Middle, and those students are already stunting with cleaner schedules, sharper projects, and better-looking outputs powered by Thinking Systems. College names are floating around like judgment clouds: Grand Valley State University, the University of Michigan, MSU. Add assignments, family responsibilities, and work on top, and the whole day starts feeling like a machine built to overload students on purpose.',
    points: [
      'The problem is not laziness.',
      'The problem is cognitive overload without structure.',
      'The pressure is local, but the stakes feel massive.',
    ],
    visuals: [
      graphVisual(
        'The pressure web',
        [
          {label: 'Assignments', tone: 'accent'},
          {label: 'College', tone: 'cool'},
          {label: 'Work', tone: 'accent'},
          {label: 'Family', tone: 'muted'},
          {label: 'Friends', tone: 'cool'},
          {label: 'Sleep', tone: 'muted'},
        ],
        ['Assignments -> Stress', 'College -> Pressure', 'Work -> Time', 'Family -> Energy', 'Sleep -> Focus'],
      ),
    ],
  }),
  slide({
    eyebrow: 'Inciting Incident',
    title: 'Tammye Says The Dangerous Sentence',
    lead:
      'Imagine doing this without Google lands like a joke for half a second and then reality starts bending.',
    body:
      'The lights flicker. Marques drops his phone. Nate clocks the pattern break before anybody else and gives the universe one offended look. One second they are drowning in modern student life. The next second the hallway tears open and they are falling backward through the history of learning itself.',
    points: [
      'This is the plot trigger.',
      'The question is bigger than technology.',
      'The group is about to learn what really changed history.',
    ],
    visuals: [
      chartVisual('Reality destabilizing', [
        {label: 'Present', value: 100, tone: 'accent'},
        {label: 'Stability', value: 41, tone: 'cool'},
        {label: 'Confusion', value: 92, tone: 'accent'},
      ]),
    ],
  }),
  slide({
    eyebrow: 'Era 1',
    title: 'The 1500s Were An Access Problem, Not A Talent Problem',
    lead:
      'They land in a library where books are scarce, locked down, and slow to circulate.',
    body:
      'This is the first revelation. Students in the past were not less intelligent. They were trapped inside slower systems for storing and moving knowledge. Nate says what nobody else has words for yet while standing in the middle of it with his friends: the bottleneck was never the person. It was the infrastructure.',
    points: [
      'Books were rare.',
      'Knowledge moved slowly.',
      'Access was the bottleneck.',
    ],
    visuals: [
      tableVisual('Information flow in the 1500s', ['Reality', 'Consequence'], [
        ['Books chained or scarce', 'Access equals privilege'],
        ['Hand copying', 'Ideas move slowly'],
        ['Geographic isolation', 'Most people never reach advanced knowledge'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Era 2',
    title: 'Print, Mail, Roads, And Libraries Changed The Ceiling',
    lead:
      'They rush forward into a world where information can finally travel farther than one room.',
    body:
      'Printing presses multiply ideas. Mail carries methods and instructions. Libraries and cities make knowledge more reachable. Tammye realizes the wild part is not just that books exist. It is that mental models can now move between people faster than those people could discover them alone.',
    points: [
      'Distribution changed what learning could become.',
      'Ideas started moving faster than people.',
      'The system improved, but access was still uneven.',
    ],
    visuals: [
      graphVisual(
        'Distribution changes the game',
        [
          {label: 'Printing Press', tone: 'accent'},
          {label: 'Mail', tone: 'cool'},
          {label: 'Libraries', tone: 'accent'},
          {label: 'Cities', tone: 'cool'},
          {label: 'Students', tone: 'muted'},
        ],
        ['Printing Press -> Mail', 'Mail -> Libraries', 'Libraries -> Students', 'Cities -> Students'],
      ),
    ],
  }),
  slide({
    eyebrow: 'Era 3',
    title: 'The Internet Solved Access And Created A New Problem',
    lead:
      'They hit the early internet era and immediately understand that abundance can be its own trap.',
    body:
      'Now anybody can search. Anybody can open tabs. Anybody can drown. Marques is impressed for three seconds and then sees the problem. The system no longer starves students for information. It floods them with unstructured input and expects them to somehow stay coherent.',
    points: [
      'Access exploded.',
      'Structure did not.',
      'Overwhelm replaced scarcity.',
    ],
    visuals: [
      chartVisual('The bottleneck shifts', [
        {label: 'Access', value: 95, tone: 'accent'},
        {label: 'Structure', value: 28, tone: 'cool'},
        {label: 'Overwhelm', value: 89, tone: 'accent'},
      ]),
    ],
  }),
  slide({
    eyebrow: 'Return',
    title: 'They Come Back To The Present And See The Real Enemy',
    lead:
      'Back in the hallway, the same phones and same assignments now look completely different.',
    body:
      'Tammye says it first. We are not lacking information. We are drowning in it. Nate answers from inside the same pressure, but with the clearer read: modern students are getting taxed by too much signal and not enough operating structure. That lands. Hard.',
    points: [
      'The issue is overload, not lack of effort.',
      'Students need an operating layer.',
      'The next leap is better structure, not more panic.',
    ],
    visuals: [
      tableVisual('Then vs now', ['Then', 'Now'], [
        ['Information scarce', 'Information overwhelming'],
        ['Access is the problem', 'Structure is the problem'],
        ['Slow ideas', 'Fast inputs, slow sense-making'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Future Vision',
    title: 'Then They See The Future Student',
    lead:
      'One more jump forward and the entire course premise crystallizes in front of them.',
    body:
      'This future student is not a genius alien. She is a student with AI, structured workbooks, graph-based thinking, and specific Thinking Systems for specific forms of pressure. She is moving fast because she is structured. She is building quickly because she can process more information without collapsing under it.',
    points: [
      'AI is acting like a thinking partner.',
      'Workbooks are preserving memory.',
      'Thinking Systems are turning pressure into leverage.',
    ],
    visuals: [
      graphVisual(
        'The future student stack',
        [
          {label: 'Student', tone: 'accent'},
          {label: 'AI', tone: 'cool'},
          {label: 'Thinking Systems', tone: 'accent'},
          {label: 'Structured Sheets', tone: 'cool'},
          {label: 'Execution', tone: 'accent'},
        ],
        ['Student -> AI', 'AI -> Thinking Systems', 'Thinking Systems -> Structured Sheets', 'Structured Sheets -> Execution'],
      ),
    ],
  }),
  slide({
    eyebrow: 'Section 1 Closing',
    title: 'One Line Ends The First Act',
    lead:
      'We need whatever that was is the moment the whole course turns from reflection into motion.',
    body:
      'The friend group is done admiring the future. They want the tools. They want the leverage. They want the kind of system that lets a student headed to Grand Valley, Michigan, MSU, or straight into work stop feeling trapped inside noise.',
    activity: activity('Name the overload', 'Pause and name the part of school or life that feels most overloaded right now.', [
      'Say whether the pain is time, assignments, studying, research, or follow-through.',
      'Keep that answer in mind for the setup section.',
      'That pain point will tell you which Thinking System to start with later.',
    ]),
    visuals: [
      chartVisual('What Section 1 installs', [
        {label: 'Historical context', value: 53, tone: 'cool'},
        {label: 'Urgency', value: 88, tone: 'accent'},
        {label: 'Readiness to act', value: 94, tone: 'accent'},
      ]),
    ],
  }),
  slide({
    eyebrow: null,
    title: 'Section 2: Installing the Superpowers',
    lead: '',
    body: '',
    sectionBreak: true,
  }),
  slide({
    eyebrow: 'The Decision',
    title: 'They Are Not Technical And They Install Anyway',
    lead:
      'That is the entire point of this act. Non-technical students are stepping into technical leverage on purpose.',
    body:
      'Marques does not want to look at a terminal. Tammye is not trying to become a software engineer overnight. Nate keeps the tone sharp and calm from right in the middle of the mission. Respectfully, the black rectangle is dramatic, not evil. The group decides to install a coding agent anyway because the future they just saw is not happening without tools.',
    points: [
      'These tools are not just for engineers anymore.',
      'Students often already have access through existing subscriptions.',
      'The hard part is emotional friction, not genius.',
    ],
    visuals: [
      tableVisual('Possible starting agents', ['Tool', 'Why it matters'], [
        ['Codex', 'Direct OpenAI path into agentic work'],
        ['Gemini CLI', 'Good if that is your existing subscription'],
        ['Claude Code or Qwen Code', 'Valid starting point if that is your setup'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'First Friction',
    title: 'The Terminal Feels Scary Until You Understand The Pattern',
    lead:
      'This is where most students freeze, so the story has to walk right through the fear.',
    body:
      'The terminal feels like one wrong move will destroy the computer. In reality, students are usually just checking a version, installing a dependency, authenticating, and opening a project folder. Nate keeps translating the moment back into plain language while moving through the same setup with Marques and Tammye and getting everyone through the first wave of panic.',
    points: [
      'Errors are normal.',
      'The first install is mostly repetition.',
      'Confidence jumps fast after the first clean success.',
    ],
    visuals: [
      graphVisual(
        'Install flow',
        [
          {label: 'Open Terminal', tone: 'accent'},
          {label: 'Run Command', tone: 'cool'},
          {label: 'Hit Error', tone: 'accent'},
          {label: 'Fix Dependency', tone: 'cool'},
          {label: 'Retry', tone: 'accent'},
        ],
        ['Open Terminal -> Run Command', 'Run Command -> Hit Error', 'Hit Error -> Fix Dependency', 'Fix Dependency -> Retry'],
      ),
    ],
  }),
  slide({
    eyebrow: 'Reality Check',
    title: 'If You See This, Here Is What To Do',
    lead:
      'This slide breaks story mode on purpose and talks directly to the student watching.',
    body:
      'If the terminal says command not found, you probably need Node.js or a shell restart. If it says permission denied, try the admin path that matches your machine. If it looks frozen, wait a minute before assuming disaster. If it still breaks, send Nate a screenshot and the exact error at autonate.ai@gmail.com, on LinkedIn, or on Instagram at @autonatai so the fix can happen fast.',
    points: [
      'Command not found usually means a missing dependency.',
      'Permission denied usually means a permissions issue, not failure.',
      'Screenshots are better than vague descriptions when asking for help.',
    ],
    visuals: [
      tableVisual('Common setup friction', ['Signal', 'Likely move'], [
        ['command not found', 'Install the dependency or restart the shell'],
        ['permission denied', 'Use the correct elevated path for your machine'],
        ['looks stuck', 'Give the download or auth flow time to finish'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Breakthrough',
    title: 'Then The Install Works And The Fear Changes Shape',
    lead:
      'The emotional shift matters as much as the software shift.',
    body:
      'The first successful install is not just technical progress. It is identity progress. Tammye watches the tool finish setting up. Marques goes from joking to locked in. Nate grins because the pattern is already flipping. You did not just install software. You installed leverage.',
    points: [
      'The terminal stops feeling mystical.',
      'The tool becomes usable.',
      'The student starts seeing themselves differently.',
    ],
    visuals: [
      chartVisual('Confidence shift', [
        {label: 'Before install', value: 24, tone: 'muted'},
        {label: 'During friction', value: 11, tone: 'cool'},
        {label: 'After success', value: 82, tone: 'accent'},
      ]),
    ],
  }),
  slide({
    eyebrow: 'First Win',
    title: 'The First Useful Output Is Where Everything Clicks',
    lead:
      'A good first win kills a lot of doubt very quickly.',
    body:
      'Marques asks for a structured study schedule built around a real week instead of a fake perfect one. Tammye gets a history paper broken into milestones and subtasks. Nate is in the exchange too, calling out the common thread as it happens. The agent is not there for novelty. It is there to turn mess into structure.',
    points: [
      'Use a real problem, not a toy example.',
      'Let the agent ask clarifying questions.',
      'Save the first good output somewhere visible.',
    ],
    visuals: [
      tableVisual('Good first wins', ['Input', 'Output'], [
        ['Messy to-do list', 'Structured day plan'],
        ['Large assignment prompt', 'Execution breakdown'],
        ['Reading notes', 'Review matrix'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Section 2 Closing',
    title: 'The Tool Is Live But A Tool Is Not A System',
    lead:
      'The second act ends exactly where it should: they have power, but not yet direction.',
    body:
      'Tammye asks the right question. Okay, now what do we do with it. Nate gives the answer that sets up the whole next section. We do not just throw prompts at the model. We teach ourselves how to think in structures the model can actually work inside.',
    visuals: [
      chartVisual('What changes in Section 2', [
        {label: 'Fear', value: 34, tone: 'muted'},
        {label: 'Confidence', value: 72, tone: 'cool'},
        {label: 'Need for system', value: 91, tone: 'accent'},
      ]),
    ],
  }),
  slide({
    eyebrow: null,
    title: 'Section 3: How They Think',
    lead: '',
    body: '',
    sectionBreak: true,
  }),
  slide({
    eyebrow: 'The Problem',
    title: 'Random Prompting Fails Because There Is No Structure',
    lead:
      'This is the moment where the course stops being about tools and becomes about mental models.',
    body:
      'Marques throws random prompts at the model and gets average output back. Tammye does the same and gets vague help. Nate catches the obvious pattern while testing alongside them. The problem is not the AI. The problem is that nobody has told the system what shape the thinking should take.',
    points: [
      'Random prompts produce random value.',
      'The model needs structure to operate well.',
      'Students need a reasoning layer, not just a chat window.',
    ],
    visuals: [
      graphVisual(
        'Random vs structured',
        [
          {label: 'Random Prompt', tone: 'muted'},
          {label: 'Generic Output', tone: 'muted'},
          {label: 'Structured Prompt', tone: 'accent'},
          {label: 'Useful Output', tone: 'accent'},
        ],
        ['Random Prompt -> Generic Output', 'Structured Prompt -> Useful Output'],
      ),
    ],
  }),
  slide({
    eyebrow: 'Revelation',
    title: 'Spreadsheets Are Not Boring, They Are Thinking Tools',
    lead:
      'This is where graph thinking becomes visible enough for the student to use.',
    body:
      'Columns are dimensions. Rows are instances. Tabs are connected views. Once Nate lays that out inside the group conversation, Google Sheets stops feeling like paperwork and starts feeling like a way to make thinking durable. Marques sees it first. So the spreadsheet is basically a graph you can work with. Exactly.',
    points: [
      'Columns hold dimensions.',
      'Rows hold units of the system.',
      'Sheets make reasoning visible.',
    ],
    visuals: [
      tableVisual('Spreadsheet as graph', ['Sheet concept', 'Graph concept'], [
        ['Column', 'Dimension'],
        ['Row', 'Node or record'],
        ['Workbook', 'System'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Connection',
    title: 'They Were Already Thinking In Graphs',
    lead:
      'The course is not installing a foreign intelligence. It is giving a name to patterns students already feel.',
    body:
      'When work reduces study time, which increases stress, which lowers sleep, which hurts performance, that is a graph. Students already feel nodes and edges. They just cannot always see them clearly. Graph-based thinking makes the relationships visible enough to intervene on purpose.',
    points: [
      'Nodes are the things in your world.',
      'Edges are the relationships between them.',
      'Visibility is the beginning of better decisions.',
    ],
    visuals: [
      graphVisual(
        'Student graph',
        [
          {label: 'Work Shift', tone: 'cool'},
          {label: 'Study Time', tone: 'accent'},
          {label: 'Stress', tone: 'cool'},
          {label: 'Sleep', tone: 'muted'},
          {label: 'Performance', tone: 'accent'},
        ],
        ['Work Shift -> Study Time', 'Study Time -> Stress', 'Stress -> Sleep', 'Sleep -> Performance'],
      ),
    ],
  }),
  slide({
    eyebrow: 'Cognitive Offloading',
    title: 'AI Should Hold The Painful Cognition, Not Your Whole Identity',
    lead:
      'This is the healthier division of labor the course is pushing toward.',
    body:
      'The spreadsheet holds structure. The AI helps sort, draft, rank, and analyze. The student keeps judgment, taste, and final decision-making. That means less raw mental clutter and more actual thought.',
    points: [
      'Offload sorting and structure.',
      'Keep judgment and direction.',
      'Use the system to free attention for higher-order work.',
    ],
    visuals: [
      chartVisual('What gets offloaded first', [
        {label: 'Sorting and formatting', value: 86, tone: 'accent'},
        {label: 'Pattern detection', value: 73, tone: 'cool'},
        {label: 'Final judgment', value: 29, tone: 'muted'},
      ]),
    ],
  }),
  slide({
    eyebrow: 'Section 3 Closing',
    title: 'This Is Why The Thinking Systems Matter',
    lead:
      'The next layer is not random templates. It is structured surfaces for specific student pressure points.',
    body:
      'Each Thinking System gives the AI a shape to work inside and gives the student a way to stop guessing. That is the bridge from insight into execution.',
    visuals: [
      tableVisual('Pressure point to Thinking System', ['Pressure', 'System'], [
        ['My day keeps collapsing', 'Daily Time Grid'],
        ['This assignment is too big', 'Assignment Sprint Planner'],
        ['I read and forget', 'Reading Capture Matrix'],
        ['Everything feels important', 'Study Heatmap Board'],
        ['My research is scattered', 'Paper Source Matrix'],
        ['I keep repeating bad days', 'Day Debrief Lab'],
      ]),
    ],
  }),
  slide({
    eyebrow: null,
    title: 'Section 4: Thinking Systems',
    lead: '',
    body: '',
    sectionBreak: true,
  }),
  slide({
    eyebrow: 'Thinking System 1',
    title: 'Daily Time Grid: When Your Day Feels Impossible',
    lead:
      'This system turns a chaotic day into a visible operating grid.',
    body:
      'Time blocks lock decisions into reality. Roles keep identity load visible. Debrief turns execution into feedback later. This is where the student day stops being a pile of intentions and starts becoming something the AI can reason over clearly.',
    points: [
      'Use it in the morning.',
      'Use it again after the day ends.',
      'This is the front door to the whole system.',
    ],
    visuals: [
      tableVisual('Daily Time Grid columns', ['Column', 'Why it exists'], [
        ['Time Block', 'Locks choices into time'],
        ['Role', 'Shows who you need to be'],
        ['Priority', 'Protects the important work'],
        ['Debrief', 'Captures signal for tomorrow'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Thinking System 2',
    title: 'Assignment Sprint Planner: When The Deliverable Feels Too Big',
    lead:
      'This system turns a giant assignment into visible execution stairs.',
    body:
      'Deliverable, subtask, dependency, due date, risk, status, help needed. Once those fields exist, the mountain becomes a sequence. Tammye and Marques stop calling the work impossible because the first row is finally visible.',
    points: [
      'Use it when the prompt feels overwhelming.',
      'Let the system surface blockers early.',
      'Start with the first row instead of fearing the whole project.',
    ],
    visuals: [
      tableVisual('Assignment Sprint columns', ['Column', 'Job'], [
        ['Deliverable', 'Name the final output'],
        ['Subtask', 'Shrink the work'],
        ['Dependency', 'Show what comes first'],
        ['Risk', 'Expose future friction'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Thinking System 3',
    title: 'Reading Capture Matrix: When You Read But Nothing Sticks',
    lead:
      'This system turns passive reading into structured understanding.',
    body:
      'Concept, definition, claim, evidence, question, confusion, review rank. The matrix makes weak understanding visible before the test does. That is the shift from highlighting toward actual learning.',
    points: [
      'Use it right after reading or class.',
      'Capture confusion while it is still fresh.',
      'Turn later review into a targeted process.',
    ],
    visuals: [
      tableVisual('Reading Capture columns', ['Column', 'Purpose'], [
        ['Concept', 'Name the idea'],
        ['Claim', 'Track the argument'],
        ['Confusion', 'Show the weak spots'],
        ['Review Rank', 'Tell you what deserves attention'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Thinking System 4',
    title: 'Study Heatmap Board: When Everything Feels Important',
    lead:
      'This system ranks what deserves study time first.',
    body:
      'Urgency, confidence, practice needed, study method, next session. The heatmap is what stops a student from trying to study everything equally and calling that a strategy.',
    points: [
      'Use it during exam prep.',
      'Rank weak and urgent topics first.',
      'Avoid wasting energy on what is already solid enough.',
    ],
    visuals: [
      chartVisual('What the heatmap balances', [
        {label: 'Urgency', value: 84, tone: 'accent'},
        {label: 'Confidence', value: 45, tone: 'cool'},
        {label: 'Practice needed', value: 76, tone: 'muted'},
      ]),
    ],
  }),
  slide({
    eyebrow: 'Thinking System 5',
    title: 'Paper Source Matrix: When Your Sources Are Scattered',
    lead:
      'This system turns tabs and notes into a visible research map.',
    body:
      'Source, type, claim, evidence, use in paper, credibility notes, citation status. Once the sources are normalized, the thesis gets easier to see and the weak spots get easier to fix.',
    points: [
      'Use it when writing with sources.',
      'Normalize messy research fast.',
      'Let the system surface stronger thesis paths.',
    ],
    visuals: [
      tableVisual('Paper Source columns', ['Column', 'What it captures'], [
        ['Source', 'Where it came from'],
        ['Claim', 'What it says'],
        ['Evidence', 'What supports it'],
        ['Citation Status', 'What still needs work'],
      ]),
    ],
  }),
  slide({
    eyebrow: 'Thinking System 6',
    title: 'Day Debrief Lab: When You Keep Repeating The Same Bad Pattern',
    lead:
      'This system is where the whole operating layer starts compounding.',
    body:
      'Block, completed, focus, distraction, energy, emotion, lesson, tomorrow shift. The point is not to judge the day. The point is to turn the day into signal so tomorrow can be designed with more intelligence than yesterday.',
    points: [
      'Use it nightly.',
      'Convert execution into data.',
      'Let the AI surface patterns across time.',
    ],
    visuals: [
      tableVisual('Day Debrief columns', ['Column', 'Signal'], [
        ['Focus', 'Where attention really went'],
        ['Distraction', 'What broke flow'],
        ['Energy', 'What capacity was actually available'],
        ['Tomorrow Shift', 'What changes next'],
      ]),
    ],
  }),
  slide({
    eyebrow: null,
    title: 'Section 5: The New Student',
    lead: '',
    body: '',
    sectionBreak: true,
  }),
  slide({
    eyebrow: 'Closing Scene',
    title: 'Same Classroom, Different Students',
    lead:
      'The pressure did not disappear. The operating layer changed.',
    body:
      'Marques has a day grid open. Tammye has an assignment sprint lined up. Nate is in the mix reading the week back through debrief data, joking with them, and still quietly enjoying the fact that the chaos is no longer running the room. Nothing magical happened. They just learned to operate differently.',
    points: [
      'The environment stayed the same.',
      'The system changed the experience of it.',
      'That is what leverage feels like.',
    ],
    visuals: [
      graphVisual(
        'The transformation',
        [
          {label: 'Overwhelmed Student', tone: 'muted'},
          {label: 'Structured Student', tone: 'cool'},
          {label: 'Thinking Systems', tone: 'accent'},
          {label: 'AI Leverage', tone: 'accent'},
          {label: 'Builder Mindset', tone: 'cool'},
        ],
        ['Overwhelmed Student -> Thinking Systems', 'Thinking Systems -> Structured Student', 'AI Leverage -> Builder Mindset'],
      ),
    ],
  }),
  slide({
    eyebrow: 'Final Words',
    title: 'The Gap Is Not Intelligence, It Is Infrastructure',
    lead:
      'That line is the entire thesis of the deck.',
    body:
      'You do not need all six Thinking Systems today. You need the right first two. One front-door system like Daily Time Grid or Assignment Sprint Planner. One feedback or learning system like Day Debrief Lab or Reading Capture Matrix. Start there. Let it compound from there.',
    activity: activity('Launch sequence', 'Choose your first two Thinking Systems and say why each one matters right now.', [
      'Pick one system that reduces current friction immediately.',
      'Pick one system that helps you learn from the week.',
      'If setup or usage breaks, send Nate the screenshot at autonate.ai@gmail.com, on LinkedIn, or on Instagram at @autonatai and keep moving.',
    ]),
    visuals: [
      tableVisual('Simple launch paths', ['If your pain is...', 'Start with...'], [
        ['Overwhelm and no plan', 'Daily Time Grid -> Day Debrief Lab'],
        ['Big vague assignments', 'Assignment Sprint Planner -> Daily Time Grid'],
        ['Reading without retention', 'Reading Capture Matrix -> Study Heatmap Board'],
      ]),
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
