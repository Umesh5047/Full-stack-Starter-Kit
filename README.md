# Resume Analyzer

A full-stack web application that lets users upload resumes in PDF format, analyzes them with the Google Gemini LLM, and provides AI-driven structured insights and feedback.

---

## Features

* **Live Resume Analysis**

  * Upload PDF resumes.
  * Extract personal details, education, experience, projects, skills, and certifications.
  * Get AI-generated feedback: rating, improvement areas, and suggested upskilling.
  * Store results in PostgreSQL.
* **Historical Viewer**

  * View all past analyzed resumes.
  * Table with key details (name, email, file name).
  * Modal with full detailed analysis.

---

## Tech Stack

* **Frontend**: React (Vite, Axios)
* **Backend**: Node.js, Express.js
* **Database**: PostgreSQL
* **AI**: Google Gemini LLM
* **PDF Parsing**: pdf-parse

---

## Project Structure

```
├── backend/              # Express server
│   ├── db/               # Database schema & queries
│   ├── routes/           # API routes
│   ├── controllers/      # Request handlers
│   └── services/         # PDF + LLM integration
├── frontend/             # React app (Vite)
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── api.js        # API helpers
│   │   ├── App.jsx
│   │   └── main.jsx
├── sample_data/          # Example PDF resumes
├── screenshots/          # UI screenshots
└── README.md             # Project docs
```

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/resume-analyzer.git
cd resume-analyzer
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
# Fill in DB credentials and Google Gemini API key
npm start
```

### 3. Database

Run the schema file to create tables:

```sql
-- backend/db/schema.sql
CREATE TABLE resumes (
  id SERIAL PRIMARY KEY,
  file_name TEXT,
  name TEXT,
  email TEXT,
  phone TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  summary TEXT,
  work_experience JSONB,
  education JSONB,
  technical_skills TEXT[],
  soft_skills TEXT[],
  resume_rating INT,
  improvement_areas TEXT,
  upskill_suggestions TEXT[],
  uploaded_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Deployment

* **Backend**: Render / Railway / Heroku
* **Frontend**: Vercel / Netlify
* **Database**: Supabase / Neon / AWS RDS

---

## Submission Checklist

* [ ] Public GitHub repository with full code.
* [ ] `sample_data/` folder with PDFs.
* [ ] `screenshots/` folder with UI screenshots.
* [ ] Working instructions in `README.md`.
* [ ] Verified local setup (frontend + backend + DB).

---

## License

MIT
