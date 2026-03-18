import cytoscape from 'cytoscape';

export function initWorkflowGraph(track) {
  const root = document.querySelector('#workflow-graph');
  if (!root || !track) {
    return;
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

  cytoscape({
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
}
