import pool from '../db/index.js';
if (!resumeText.trim()) {
return res.status(400).json({ error: 'Could not extract text from PDF' });
}


const analysis = await analyzeWithLLM(resumeText);


const {
name, email, phone, linkedin_url, portfolio_url, summary,
work_experience, education, technical_skills, soft_skills,
projects, certifications, resume_rating, improvement_areas,
upskill_suggestions
} = analysis;


const insertQuery = `
INSERT INTO resumes(
file_name, name, email, phone, linkedin_url, portfolio_url, summary,
work_experience, education, technical_skills, soft_skills,
projects, certifications, resume_rating, improvement_areas,
upskill_suggestions
) VALUES (
$1,$2,$3,$4,$5,$6,$7,
$8,$9,$10,$11,
$12,$13,$14,$15,
$16
) RETURNING *;
`;


const values = [
req.file.originalname, name, email, phone, linkedin_url, portfolio_url, summary,
JSON.stringify(work_experience), JSON.stringify(education), JSON.stringify(technical_skills), JSON.stringify(soft_skills),
JSON.stringify(projects), JSON.stringify(certifications), resume_rating, improvement_areas,
JSON.stringify(upskill_suggestions)
];


const result = await pool.query(insertQuery, values);
return res.status(201).json(result.rows[0]);
} catch (err) {
console.error(err);
return res.status(500).json({ error: 'Server error', details: err.message });
}
}


export async function getAllResumes(_req, res) {
try {
const { rows } = await pool.query(
'SELECT id, file_name, uploaded_at, name, email, resume_rating FROM resumes ORDER BY uploaded_at DESC'
);
return res.json(rows);
} catch (err) {
console.error(err);
return res.status(500).json({ error: 'Server error', details: err.message });
}
}


export async function getResumeById(req, res) {
try {
const { id } = req.params;
const { rows } = await pool.query('SELECT * FROM resumes WHERE id=$1', [id]);
if (!rows.length) return res.status(404).json({ error: 'Not found' });
return res.json(rows[0]);
} catch (err) {
console.error(err);
return res.status(500).json({ error: 'Server error', details: err.message });
}
}
