Monorepo: `langue`

Structure
- `packages/frontend`: React + TypeScript app (Vite)
- `packages/backend`: Node.js API (Express)

Requirements
- Node.js >= 18
- npm >= 8

Scripts (run from repo root)
- `npm run dev`: start frontend and backend in parallel
- `npm run start`: start backend only
- `npm run build`: build frontend and backend

Getting started
1. Install deps: `npm install`
2. Dev mode: `npm run dev`
3. API runs on `http://localhost:3000`, Frontend on `http://localhost:5173`

Environment
- Backend: copy `packages/backend/.env.example` to `.env` and adjust as needed.
