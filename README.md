# AutoNateAI Workshop Portal

Vanilla JS workshop portal for `workshop.autonateai.com`.

## Stack

- Vite for bundling
- Vanilla JS modules
- Bootstrap 5 + flexbox/grid for mobile-first layout
- Anime.js for slide and UI motion
- Cytoscape.js for graph-driven interaction
- Firebase for auth/data

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy-gh-pages.yml`, which publishes `dist/` to `gh-pages`.

## Architecture

- `src/data`: workshop and workflow definitions
- `src/components`: reusable render functions
- `src/features`: feature-specific UI orchestration
- `src/lib`: utilities, router, Firebase bootstrap
- `src/styles`: theme and layout styles

## Product shape

Each workshop track contains:

- mini-lecture
- quest
- AI workflows
- reflection loop

Initial tracks:

- AI-First Student
- AI-First Researcher
