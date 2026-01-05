# AI Roadmap Generator

AI Learning Path Generator that turns a user’s learning goal into a clear, step-by-step roadmap based on their current skill level and weekly time availability.

[![Video](https://cdn.loom.com/sessions/thumbnails/18408e9c420846c9b0f1aae11886761f-bbe7a73f03c69795-full-play.gif#t=0.1)](https://www.loom.com/share/18408e9c420846c9b0f1aae11886761f)

## Why this exists (problem)

Learning goals often fail because the plan is vague: unclear milestones, unrealistic timelines, and no reliable resources.

## What it does (solution)

Given:

- `goal`
- `currentSkill`
- `hoursPerWeek`

The app generates:

- a chronological roadmap broken into steps
- estimated time per step and total weeks
- learning resources per step

## Key features

- **Personalized roadmap generation** (goal + skill + hours/week)
- **Clear UX during generation** (pending state + rotating “working on it” messages)
- **Roadmap rendering** (steps, resources, estimated time)
- **Persistence** (latest roadmap saved to local storage)

## Tech stack

- **Nx** – monorepo + build orchestration
- **Express** – backend API
- **OpenAI** – roadmap generation
- **React** – frontend UI
- **TanStack Query** – async state management (mutation)
- **Tailwind CSS** – styling

## Architecture (high level)

- **Web** (`apps/web`): form submission triggers a TanStack Query mutation; the latest response is cached and used by the display component.
- **API** (`apps/api`): Express route calls OpenAI Chat Completions and returns JSON to the client.

## API

### `POST /generate-roadmap`

**Request**

```json
{
  "goal": "Learn Go for backend development",
  "currentSkill": "Basic programming concepts",
  "hoursPerWeek": 10
}
```

**Response**

```json
{
  "roadmap": {
    "goal": "...",
    "totalEstimatedWeeks": 8,
    "steps": [
      {
        "title": "...",
        "description": "...",
        "estimatedHours": 12,
        "resources": [
          { "label": "...", "url": "https://..." },
          { "label": "...", "url": "https://..." }
        ]
      }
    ]
  }
}
```

## Getting started

### 1) Install dependencies

```sh
npm install
```

### 2) Configure environment variables

Create `.env`:

```sh
OPENAI_API_KEY=YOUR_KEY_HERE
VITE_API_BASE_URL=API_LINK (if you change the backend to run on a different port from http://localhost:3333)
```


### 3) Run locally

```sh
npx nx dev api
npx nx dev web
```

- API runs on `http://localhost:3333`
- Web runs on `http://localhost:8080`

## Engineering notes (case study)

- **Async UX**: TanStack Query mutation for roadmap generation; pending state is shared via the mutation cache.
- **Perceived performance**: rotating loading messages makes the wait feel shorter.
- **Data lifecycle**: the latest roadmap is stored in the query cache and persisted to local storage.

## Next improvements

- **More reliable resources**: validate links, prefer curated domains, add deterministic fallbacks.
- **Stricter output contracts**: runtime schema validation for API responses.
- **History**: store multiple generated roadmaps per user.
