# Bro Founder Monorepo

Monorepo with Next.js (frontend) and FastAPI (backend).

## Structure

```
bro-founder/
├── .github/
│   └── workflows/
│       └── ci.yml
├── frontend/               # Next.js (App Router)
│   ├── app/
│   ├── public/
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── tsconfig.json
├── backend/                # FastAPI
│   ├── api/
│   │   └── v1/
│   ├── core/
│   ├── models/
│   ├── schemas/
│   ├── main.py
│   ├── requirements.txt
│   └── database.py
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ (or 20+)
- Python 3.11+

### Frontend (Next.js)

1. Install dependencies:
   - `cd frontend`
   - `npm install`
2. Run dev server:
   - `npm run dev`
3. Open: `http://localhost:3000`

Tailwind is preconfigured (see `frontend/tailwind.config.js`, `frontend/postcss.config.js`, and `frontend/app/globals.css`).

### Backend (FastAPI)

1. Create a virtualenv and install deps:
   - `cd backend`
   - `python -m venv .venv`
   - `source .venv/bin/activate` (Windows: `.\.venv\Scripts\activate`)
   - `pip install -r requirements.txt`
2. Run API locally:
   - `uvicorn main:app --reload`
3. Endpoints:
   - Health: `GET http://localhost:8000/health`
   - Ping (v1): `GET http://localhost:8000/api/v1/ping`

Default CORS allows the Next.js dev server at `http://localhost:3000`.

### Environment

- Database URL (optional): set `DATABASE_URL` (defaults to `sqlite:///./app.db`).

## CI

GitHub Actions workflow (`.github/workflows/ci.yml`) builds the frontend and verifies the backend imports on pushes and PRs.

## Notes

- This is a minimal scaffold. Add models, schemas, and routes under `backend/` as your API grows.
- In the frontend, add components under `frontend/components/` and pages in `frontend/app/`.

