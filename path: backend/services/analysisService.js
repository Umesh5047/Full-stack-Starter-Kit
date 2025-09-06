import pdfParse from 'pdf-parse';
import { GoogleGenerativeAI } from '@google/generative-ai';


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });


export async function extractTextFromPdf(fileBuffer) {
const data = await pdfParse(fileBuffer);
return data.text || '';
}


export function buildPrompt(resumeText) {
return `You are an expert technical recruiter and career coach. Analyze the following resume text and extract the information into a valid JSON object. The JSON must be strictly valid and adhere to this exact schema. If a field is unknown, use null or an empty array. Do not include any extra commentary or code block fences.


Resume Text:\n"""
${resumeText}
"""


Return JSON only with this shape:
{
"name": "string|null",
"email": "string|null",
"phone": "string|null",
"linkedin_url": "string|null",
"portfolio_url": "string|null",
"summary": "string|null",
"work_experience": [{ "role": "string", "company": "string", "duration": "string", "description": ["string"] }],
"education": [{ "degree": "string", "institution": "string", "graduation_year": "string" }],
"technical_skills": ["string"],
"soft_skills": ["string"],
"projects": [{ "title": "string", "description": "string" }],
"certifications": ["string"],
"resume_rating": 1,
"improvement_areas": "string",
"upskill_suggestions": ["string"]
}`;
}


export async function analyzeWithLLM(resumeText) {
const prompt = buildPrompt(resumeText);
const resp = await model.generateContent(prompt);
const text = resp.response.text();


// Attempt to parse JSON safely
let json;
try {
json = JSON.parse(text);
} catch (e) {
// Some models may wrap JSON in markdown or include stray chars. Clean common patterns.
const cleaned = text
.replace(/^```(json)?/gi, '')
.replace(/```$/g, '')
.trim();
json = JSON.parse(cleaned);
}
// Minimal normalization
json.work_experience ||= [];
json.education ||= [];
json.technical_skills ||= [];
json.soft_skills ||= [];
json.projects ||= [];
json.certifications ||= [];
json.upskill_suggestions ||= [];


// Clamp rating to 1..10 if present
if (typeof json.resume_rating === 'number') {
json.resume_rating = Math.max(1, Math.min(10, Math.round(json.resume_rating)));
} else {
json.resume_rating = null;
}
return json;
}
