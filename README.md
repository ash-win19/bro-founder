# Bro Founder

Bro Founder is a full-stack "AI co-founder" app. The React UI guides users through idea validation, market research, business strategy, MVP planning, dev planning, and pitch creation. The backend is a NestJS API that exposes Mastra-powered agent endpoints, with optional KeywordsAI prompt management.

## Project structure
- backend/ NestJS API + Mastra agents
- frontend/ Vite + React + TypeScript UI (Tailwind + shadcn-ui)

## Requirements
- Node.js 18+ and npm

## Local development
Backend:
```bash
cd backend
npm install
npm run start:dev
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

Defaults:
- Backend: http://localhost:3000
- Frontend: http://localhost:8080

## Environment variables
backend/.env
- KEYWORDSAI_API_KEY=... (required for managed prompts)
- KEYWORDSAI_BASE_URL=... (optional, defaults to https://api.keywordsai.co)
- PORT=3000 (optional)

frontend/.env
- VITE_API_URL=http://localhost:3000

## API overview
- GET /agents/list
- POST /agents/orchestrator (body: { task, context? })
- POST /agents/general (body: { question, context? })
- POST /agents/prompts/run (body: { promptId, variables? })
- POST /agents/prompts/market-research
- POST /agents/:agentName (orchestrator, general, business, mvpPlanner, brainstorm, market-research)

## Build
Backend:
```bash
cd backend
npm run build
npm run start:prod
```

Frontend:
```bash
cd frontend
npm run build
```

Production build output:
- frontend/dist
