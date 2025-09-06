# Backend (Node.js/Express)


## Setup
1. Copy `.env.example` to `.env` and fill values.
2. Install deps: `npm install`
3. Start dev server: `npm run dev`
4. (Optional) Initialize schema: `GET http://localhost:5000/api/dev/init-db`


## Routes
- `POST /api/resumes/upload` (multipart/form-data, field: `resume`)
- `GET /api/resumes` -> list
- `GET /api/resumes/:id` -> details
