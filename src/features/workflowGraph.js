import cytoscape from 'cytoscape';

export function initWorkflowGraph(track) {
  const root = document.querySelector('#workflow-graph');
  if (!root || !track) {
    return;
  }

  const infoKicker = document.querySelector('[data-graph-info-kicker]');
  const infoTitle = document.querySelector('[data-graph-info-title]');
  const infoCopy = document.querySelector('[data-graph-info-copy]');

  function setInfo(nodeId) {
    if (!infoTitle || !infoCopy || !infoKicker) {
      return;
    }

    if (nodeId === 'lecture') {
      infoKicker.textContent = 'Lecture';
      infoTitle.textContent = 'Concept stack before the tools';
      infoCopy.textContent = 'Use the lecture deck to ground graph thinking, systems thinking, and why the sheet exists before you start copying prompts.';
      return;
    }

    if (nodeId === 'quest') {
      infoKicker.textContent = 'Quest';
      infoTitle.textContent = track.quest.title;
      infoCopy.textContent = track.quest.summary;
      return;
    }

    if (nodeId === 'reflection') {
      infoKicker.textContent = 'Reflection';
      infoTitle.textContent = 'Feedback loop';
      infoCopy.textContent = 'Reflection is where the system compounds. Debrief the sheet, detect patterns, and rewrite the next cycle.';
      return;
    }

    const workflow = track.workflows.find((item) => item.slug === nodeId);
    if (workflow) {
      infoKicker.textContent = 'Sheet kit';
      infoTitle.textContent = workflow.sheet.title;
      infoCopy.textContent = `${workflow.summary} Best use: ${workflow.useCase}`;
    }
  }

  const elements = [
    {data: {id: 'lecture', label: 'Lecture'}},
    {data: {id: 'quest', label: 'Quest'}},
    {data: {id: 'reflection', label: 'Reflection'}},
    ...track.workflows.map((workflow, index) => ({
      data: {id: workflow.slug, label: `${index + 1}. ${workflow.name}`},
    })),
    {data: {source: 'lecture', target: 'quest'}},
    {data: {source: 'quest', target: 'reflection'}},
    ...track.workflows.flatMap((workflow) => [
      {data: {source: 'quest', target: workflow.slug}},
      {data: {source: workflow.slug, target: 'reflection'}},
    ]),
  ];

  const cy = cytoscape({
    container: root,
    elements,
    layout: {
      name: 'cose',
      animate: false,
      padding: 20,
    },
    style: [
      {
        selector: 'node',
        style: {
          label: 'data(label)',
          color: '#f4f7fb',
          'text-wrap': 'wrap',
          'text-max-width': 110,
          'font-size': 11,
          'background-color': '#0f766e',
          'border-width': 2,
          'border-color': '#7dd3fc',
          width: 70,
          height: 70,
          'text-valign': 'center',
          'text-halign': 'center',
        },
      },
      {
        selector: 'edge',
        style: {
          width: 2,
          'line-color': '#1d4ed8',
          'target-arrow-shape': 'triangle',
          'target-arrow-color': '#1d4ed8',
          'curve-style': 'bezier',
        },
      },
      {
        selector: 'node[id = "lecture"], node[id = "quest"], node[id = "reflection"]',
        style: {
          'background-color': '#1d4ed8',
          'border-color': '#93c5fd',
        },
      },
    ],
  });

  function focusNode(nodeId) {
    const node = cy.getElementById(nodeId);
    if (!node || node.empty()) {
      cy.fit(undefined, 30);
      return;
    }

    cy.animate({
      fit: {
        eles: node.closedNeighborhood(),
        padding: 40,
      },
      duration: 350,
    });
    setInfo(nodeId);
  }

  cy.on('tap', 'node', (event) => {
    focusNode(event.target.id());
  });

  document.querySelectorAll('[data-graph-focus]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-graph-focus');
      if (target === 'reset') {
        cy.fit(undefined, 30);
        setInfo('lecture');
        return;
      }
      focusNode(target);
    });
  });

  setInfo('lecture');
}
