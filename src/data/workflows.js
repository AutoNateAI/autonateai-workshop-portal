function promptBlock({title, body}) {
  return {title, body};
}

function workflow({
  slug,
  name,
  trackId,
  summary,
  useCase,
  connectors,
  sheet,
  prompts,
}) {
  return {
    slug,
    name,
    trackId,
    summary,
    useCase,
    connectors,
    sheet,
    prompts,
  };
}

export const studentWorkflows = [
  workflow({
    slug: 'daily-time-grid',
    name: 'Daily Time Grid',
    trackId: 'student',
    summary: 'A sheet that turns your day into a visible operating grid with priorities, roles, and debrief notes.',
    useCase: 'Use this first thing in the morning and again at the end of the day.',
    connectors: ['ChatGPT', 'Web Search', 'Google Sheets'],
    sheet: {
      title: 'Student Day Grid',
      purpose: 'Balance class, work, family, side projects, and recovery in one time-blocked sheet.',
      outcome: 'A day plan that is realistic, human, and reviewable.',
      columns: ['Time Block', 'Role', 'Priority', 'Task', 'Expected Output', 'Notes', 'Debrief'],
    },
    prompts: [
      promptBlock({
        title: 'Build Today Sheet',
        body:
          'I am a student using a daily time-block sheet in Google Sheets. Help me fill the sheet for today. I need you to turn my responsibilities into realistic time blocks with buffers. My priorities are: [insert priorities]. My roles today are: [student, worker, parent, founder, etc]. My constraints are: [insert constraints]. Format the output so it maps cleanly into these columns: Time Block, Role, Priority, Task, Expected Output, Notes, Debrief. Make the plan ambitious but human.',
      }),
      promptBlock({
        title: 'Rebalance The Day',
        body:
          'I already have a daily time-block sheet. I need you to rebalance it because my day changed. Here is the current sheet content: [paste rows]. Here are the new interruptions, delays, or opportunities: [insert changes]. Rebuild the rest of the day while protecting the highest-value priorities and preserving some recovery space.',
      }),
      promptBlock({
        title: 'Analyze The Day',
        body:
          'I finished my day and filled in the Debrief notes for each row in my Google Sheet. Analyze my day across productivity, focus, distraction, energy, emotional state, and realism of planning. Here are the rows: [paste rows]. Tell me what patterns you see, what hurt my execution, what helped it, and what one strong adjustment I should make for tomorrow.',
      }),
    ],
  }),
  workflow({
    slug: 'assignment-sprint-planner',
    name: 'Assignment Sprint Planner',
    trackId: 'student',
    summary: 'A sheet for breaking large assignments into smaller execution steps with dependencies and blockers.',
    useCase: 'Use when an assignment feels too big, vague, or stressful.',
    connectors: ['ChatGPT', 'Google Sheets'],
    sheet: {
      title: 'Assignment Sprint Sheet',
      purpose: 'Turn a large deliverable into a clean execution sprint.',
      outcome: 'A clear path from prompt to submission.',
      columns: ['Deliverable', 'Subtask', 'Dependency', 'Due Date', 'Risk', 'Status', 'Help Needed'],
    },
    prompts: [
      promptBlock({
        title: 'Map The Assignment',
        body:
          'I have an assignment and I want to structure it inside my Assignment Sprint Sheet. Here is the assignment prompt: [paste prompt]. Here is the due date: [insert date]. Format the work into these columns: Deliverable, Subtask, Dependency, Due Date, Risk, Status, Help Needed. Separate research, planning, drafting, revision, and submission steps.',
      }),
      promptBlock({
        title: 'Find The Blockers',
        body:
          'Look at this Assignment Sprint Sheet and identify what will likely block or delay me. Here are the rows: [paste rows]. Tell me where the risky dependencies are, what I should do first, and which tasks should happen sooner than I think.',
      }),
      promptBlock({
        title: 'Submission Review',
        body:
          'I am close to submitting this assignment. Using my Assignment Sprint Sheet and current progress, help me identify what is still unfinished, what quality gaps remain, and what final pass I should make before submitting. Here are the rows: [paste rows].',
      }),
    ],
  }),
  workflow({
    slug: 'reading-capture-matrix',
    name: 'Reading Capture Matrix',
    trackId: 'student',
    summary: 'A sheet that converts lectures, textbook sections, or articles into claims, terms, and testable notes.',
    useCase: 'Use right after reading or class while the material is fresh.',
    connectors: ['ChatGPT', 'Google Sheets'],
    sheet: {
      title: 'Reading Capture Matrix',
      purpose: 'Turn passive reading into structured notes you can search and review.',
      outcome: 'Cleaner memory and faster exam prep.',
      columns: ['Concept', 'Definition', 'Claim', 'Evidence', 'Question', 'Confusion', 'Review Rank'],
    },
    prompts: [
      promptBlock({
        title: 'Extract Structured Notes',
        body:
          'I am using a Reading Capture Matrix in Google Sheets. Convert this reading into structured rows for these columns: Concept, Definition, Claim, Evidence, Question, Confusion, Review Rank. The material is: [paste notes, text, or summary]. Separate core ideas from supporting details and flag anything likely to appear on a quiz or exam.',
      }),
      promptBlock({
        title: 'Generate Review Questions',
        body:
          'Using my Reading Capture Matrix rows, generate strong review questions and short-answer prompts that test understanding instead of memorization. Here are the rows: [paste rows]. Organize the questions by easy, medium, and challenging.',
      }),
      promptBlock({
        title: 'Spot Weak Understanding',
        body:
          'Look at my Reading Capture Matrix and identify where my understanding looks weak, shallow, or incomplete. Here are the rows: [paste rows]. Tell me which concepts I should revisit and what questions I should ask myself next.',
      }),
    ],
  }),
  workflow({
    slug: 'study-heatmap-board',
    name: 'Study Heatmap Board',
    trackId: 'student',
    summary: 'A sheet for ranking what you know, what is urgent, and where your study time should actually go.',
    useCase: 'Use during exam prep when everything feels important at once.',
    connectors: ['ChatGPT', 'Google Sheets', 'Figma'],
    sheet: {
      title: 'Study Heatmap Board',
      purpose: 'Rank exam topics by urgency, confidence, and effort required.',
      outcome: 'A sharper study plan with fewer wasted hours.',
      columns: ['Topic', 'Confidence', 'Urgency', 'Practice Needed', 'Study Method', 'Next Session', 'Notes'],
    },
    prompts: [
      promptBlock({
        title: 'Build The Heatmap',
        body:
          'I need to populate my Study Heatmap Board for an upcoming exam. The exam is on [insert date]. The topics are: [insert topics]. My current confidence on each is: [insert confidence]. Format the output for these columns: Topic, Confidence, Urgency, Practice Needed, Study Method, Next Session, Notes. Make it prioritize what is both weak and high impact.',
      }),
      promptBlock({
        title: 'Design The Study Plan',
        body:
          'Using my Study Heatmap Board, create a study sequence for the next [insert number] days. Here are the rows: [paste rows]. I want a study sequence that alternates hard and medium topics, uses active recall, and avoids burnout.',
      }),
      promptBlock({
        title: 'Turn This Into A Visual Board',
        body:
          'I am using a Study Heatmap Board in Sheets and I want a matching Figma board layout. Based on these rows: [paste rows], create a visual structure for a heatmap dashboard that makes weak zones, priority topics, and review schedule obvious at a glance.',
      }),
    ],
  }),
  workflow({
    slug: 'paper-source-matrix',
    name: 'Paper Source Matrix',
    trackId: 'student',
    summary: 'A sheet for structuring paper sources, claims, evidence, and citation status.',
    useCase: 'Use when starting or organizing a paper.',
    connectors: ['ChatGPT', 'Web Search', 'Google Sheets'],
    sheet: {
      title: 'Paper Source Matrix',
      purpose: 'Turn a research paper into a visible source map instead of scattered tabs and notes.',
      outcome: 'A stronger thesis, cleaner sources, and faster writing.',
      columns: ['Source', 'Type', 'Claim', 'Evidence', 'Use In Paper', 'Credibility Notes', 'Citation Status'],
    },
    prompts: [
      promptBlock({
        title: 'Build The Source Matrix',
        body:
          'I am starting a paper and want to fill my Paper Source Matrix. My topic is: [insert topic]. My assignment requirements are: [insert requirements]. Use web search when useful and propose rows for these columns: Source, Type, Claim, Evidence, Use In Paper, Credibility Notes, Citation Status. Keep the sources relevant and varied.',
      }),
      promptBlock({
        title: 'Find Thesis Angles',
        body:
          'Using the rows in my Paper Source Matrix, help me identify 3 strong thesis directions. Here are the rows: [paste rows]. For each thesis direction, explain which sources support it, where the evidence is weak, and what angle feels strongest.',
      }),
      promptBlock({
        title: 'Outline The Paper',
        body:
          'Turn my Paper Source Matrix into a paper outline. Here are the rows: [paste rows]. Create a clean structure that moves from thesis to body sections to evidence use, and tell me where I still need better support.',
      }),
    ],
  }),
  workflow({
    slug: 'day-debrief-lab',
    name: 'Day Debrief Lab',
    trackId: 'student',
    summary: 'A sheet-backed review loop for seeing how your schedule actually performed across multiple dimensions.',
    useCase: 'Use nightly to tighten the student operating system.',
    connectors: ['ChatGPT', 'Google Sheets'],
    sheet: {
      title: 'Day Debrief Lab',
      purpose: 'Convert your daily execution data into signal.',
      outcome: 'Better planning, better awareness, and compounding feedback.',
      columns: ['Block', 'Completed', 'Focus', 'Distraction', 'Energy', 'Emotion', 'Lesson', 'Tomorrow Shift'],
    },
    prompts: [
      promptBlock({
        title: 'Interpret The Debrief',
        body:
          'I use a Day Debrief Lab in Google Sheets. Analyze these rows and tell me what patterns exist in my focus, distraction, energy, and emotional state. Here are the rows: [paste rows]. Do not just summarize. Tell me what is structurally wrong or right about the way I planned and executed.',
      }),
      promptBlock({
        title: 'Detect Hidden Friction',
        body:
          'Look at my Day Debrief Lab and identify hidden friction patterns. Here are the rows: [paste rows]. Tell me if I am overestimating energy, underestimating transition time, or stacking my hardest work in the wrong windows.',
      }),
      promptBlock({
        title: 'Rewrite Tomorrow',
        body:
          'Based on my Day Debrief Lab, redesign tomorrow so it is more realistic and higher leverage. Here are the rows: [paste rows]. Preserve my important priorities, but improve the timing, pacing, and recovery decisions.',
      }),
    ],
  }),
];

export const researcherWorkflows = [
  workflow({
    slug: 'source-intake-sheet',
    name: 'Source Intake Sheet',
    trackId: 'researcher',
    summary: 'A sheet that captures papers, articles, and notes in a clean intake structure from day one.',
    useCase: 'Use whenever new sources start piling up.',
    connectors: ['ChatGPT', 'Web Search', 'Google Sheets'],
    sheet: {
      title: 'Source Intake Sheet',
      purpose: 'Normalize incoming sources and make them searchable later.',
      outcome: 'A cleaner front door for the research process.',
      columns: ['Source', 'Author', 'Year', 'Method', 'Topic', 'Core Claim', 'Evidence Type', 'Tags'],
    },
    prompts: [
      promptBlock({
        title: 'Normalize Incoming Sources',
        body:
          'I am using a Source Intake Sheet in Google Sheets. Convert these new sources into clean rows for these columns: Source, Author, Year, Method, Topic, Core Claim, Evidence Type, Tags. Here are the sources or notes: [paste input]. Use web search if needed to fill missing metadata carefully.',
      }),
      promptBlock({
        title: 'Cluster The Intake',
        body:
          'Look at my Source Intake Sheet and cluster the sources by method, topic, and likely relevance to my main question. Here are the rows: [paste rows]. Tell me what patterns are already forming.',
      }),
      promptBlock({
        title: 'Find Missing Coverage',
        body:
          'Using my Source Intake Sheet, identify what parts of the landscape are still missing. Here are the rows: [paste rows]. Tell me where I need more recent work, better methods, different populations, or stronger opposing views.',
      }),
    ],
  }),
  workflow({
    slug: 'claim-graph-matrix',
    name: 'Claim Graph Matrix',
    trackId: 'researcher',
    summary: 'A sheet for extracting claims, evidence, methods, and limitations into a comparison-ready matrix.',
    useCase: 'Use after reading when you want rigor, not just notes.',
    connectors: ['ChatGPT', 'Google Sheets'],
    sheet: {
      title: 'Claim Graph Matrix',
      purpose: 'Make claims and evidence comparable across sources.',
      outcome: 'A research graph you can reason over.',
      columns: ['Source', 'Claim', 'Evidence', 'Method', 'Limitation', 'Confidence', 'Contradiction Flag'],
    },
    prompts: [
      promptBlock({
        title: 'Extract Claims Into Rows',
        body:
          'I am building a Claim Graph Matrix in Google Sheets. Convert these notes or excerpts into rows for these columns: Source, Claim, Evidence, Method, Limitation, Confidence, Contradiction Flag. Here is the input: [paste excerpts]. Be explicit about limitations and uncertainty.',
      }),
      promptBlock({
        title: 'Compare The Claims',
        body:
          'Using my Claim Graph Matrix, tell me where sources agree, where they diverge, and where evidence quality is thin. Here are the rows: [paste rows]. I want a synthesis that respects nuance.',
      }),
      promptBlock({
        title: 'Surface Contradictions',
        body:
          'I want to use my Claim Graph Matrix to find contradictions or unresolved tensions. Here are the rows: [paste rows]. Tell me which claims cannot comfortably coexist, what the conflict might actually be about, and what follow-up reading would sharpen this.',
      }),
    ],
  }),
  workflow({
    slug: 'theme-cluster-board',
    name: 'Theme Cluster Board',
    trackId: 'researcher',
    summary: 'A sheet-backed synthesis board for recurring themes, tensions, and implications.',
    useCase: 'Use once you have enough notes to start seeing patterns.',
    connectors: ['ChatGPT', 'Google Sheets', 'Figma'],
    sheet: {
      title: 'Theme Cluster Board',
      purpose: 'Turn many rows into meaningful clusters and thematic structure.',
      outcome: 'Faster synthesis and stronger framing.',
      columns: ['Theme', 'Supporting Sources', 'Tension Points', 'Implication', 'Confidence', 'Next Question'],
    },
    prompts: [
      promptBlock({
        title: 'Build Themes From Notes',
        body:
          'Using my notes or my existing claim matrix, create rows for a Theme Cluster Board with these columns: Theme, Supporting Sources, Tension Points, Implication, Confidence, Next Question. Here is the input: [paste rows or notes]. Do not flatten disagreement just to make the themes feel neat.',
      }),
      promptBlock({
        title: 'Strengthen The Synthesis',
        body:
          'Look at my Theme Cluster Board and tell me which themes feel strongest, which are weak or under-supported, and which hidden patterns may be emerging. Here are the rows: [paste rows].',
      }),
      promptBlock({
        title: 'Map It In Figma',
        body:
          'Create a Figma board layout that visualizes my Theme Cluster Board. Here are the rows: [paste rows]. I want the board to show central themes, supporting sources, contradictions, and frontier questions in a way that is easy to present.',
      }),
    ],
  }),
  workflow({
    slug: 'gap-radar-sheet',
    name: 'Gap Radar Sheet',
    trackId: 'researcher',
    summary: 'A sheet for identifying underexplored questions, missing populations, and next-search angles.',
    useCase: 'Use when you need better direction for the next stage of research.',
    connectors: ['ChatGPT', 'Web Search', 'Google Sheets'],
    sheet: {
      title: 'Gap Radar Sheet',
      purpose: 'Turn “what is missing?” into an explicit search surface.',
      outcome: 'More targeted inquiry and better next moves.',
      columns: ['Gap', 'Why It Matters', 'Current Signal', 'Missing Context', 'Search Direction', 'Urgency'],
    },
    prompts: [
      promptBlock({
        title: 'Find Research Gaps',
        body:
          'I am using a Gap Radar Sheet in Google Sheets. Based on what I already know, help me populate these columns: Gap, Why It Matters, Current Signal, Missing Context, Search Direction, Urgency. Here is what I already know: [paste summary or rows]. Use web search carefully to sharpen missing angles.',
      }),
      promptBlock({
        title: 'Prioritize The Gaps',
        body:
          'Using my Gap Radar Sheet, rank which gaps are most worth pursuing next. Here are the rows: [paste rows]. Consider novelty, feasibility, impact, and how likely each gap is to lead to a meaningful insight.',
      }),
      promptBlock({
        title: 'Design The Next Search Cycle',
        body:
          'Turn my Gap Radar Sheet into a concrete next search cycle. Here are the rows: [paste rows]. Give me query directions, source targets, and a sequence for what I should investigate first.',
      }),
    ],
  }),
  workflow({
    slug: 'lit-review-builder',
    name: 'Lit Review Builder',
    trackId: 'researcher',
    summary: 'A sheet for organizing a literature review by sections, tensions, and source placement.',
    useCase: 'Use when moving from raw notes into formal writing.',
    connectors: ['ChatGPT', 'Google Sheets'],
    sheet: {
      title: 'Lit Review Builder',
      purpose: 'Convert synthesis into a structured review plan.',
      outcome: 'Cleaner writing with fewer blind spots.',
      columns: ['Section', 'Subsection', 'Sources', 'Central Point', 'Counterpoint', 'Evidence Need', 'Writing Status'],
    },
    prompts: [
      promptBlock({
        title: 'Build The Review Structure',
        body:
          'I want to populate my Lit Review Builder sheet. My research question is: [insert question]. Here are my current themes and sources: [paste themes or rows]. Format the output for these columns: Section, Subsection, Sources, Central Point, Counterpoint, Evidence Need, Writing Status. Organize it by meaningful themes or tensions, not a lazy chronological order.',
      }),
      promptBlock({
        title: 'Stress Test The Review',
        body:
          'Using my Lit Review Builder sheet, tell me where the review is weak, repetitive, under-supported, or structurally unclear. Here are the rows: [paste rows]. I want critique, not flattery.',
      }),
      promptBlock({
        title: 'Turn Structure Into Drafting Moves',
        body:
          'Using my Lit Review Builder, tell me what to write next. Here are the rows: [paste rows]. Break the next writing session into concrete moves so I can make visible progress.',
      }),
    ],
  }),
  workflow({
    slug: 'research-narrative-board',
    name: 'Research Narrative Board',
    trackId: 'researcher',
    summary: 'A sheet and visual board pair for turning synthesis into a talk, deck, or presentation-ready narrative.',
    useCase: 'Use when the research needs to be shown clearly to someone else.',
    connectors: ['ChatGPT', 'Google Sheets', 'Figma'],
    sheet: {
      title: 'Research Narrative Board',
      purpose: 'Move from synthesis to communication without losing the nuance.',
      outcome: 'A presentation structure with clear logic and visuals.',
      columns: ['Frame', 'Key Message', 'Evidence', 'Visual Idea', 'Takeaway', 'Open Question'],
    },
    prompts: [
      promptBlock({
        title: 'Build The Narrative Sheet',
        body:
          'I am preparing a research presentation and want to populate my Research Narrative Board sheet. Here are my strongest findings: [paste findings]. Format the output for these columns: Frame, Key Message, Evidence, Visual Idea, Takeaway, Open Question. Keep the narrative tight and cumulative.',
      }),
      promptBlock({
        title: 'Improve The Story Arc',
        body:
          'Using my Research Narrative Board, tell me where the presentation is confusing, too dense, or weakly sequenced. Here are the rows: [paste rows]. Recommend a stronger order if needed.',
      }),
      promptBlock({
        title: 'Design The Figma Frames',
        body:
          'Create a Figma-ready frame plan based on my Research Narrative Board. Here are the rows: [paste rows]. I want a clean, modern sequence that shows evidence clearly and keeps the audience oriented.',
      }),
    ],
  }),
];

export const workflowIndex = [...studentWorkflows, ...researcherWorkflows].reduce((acc, item) => {
  acc[item.slug] = item;
  return acc;
}, {});
