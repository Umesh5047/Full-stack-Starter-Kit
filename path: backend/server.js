import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import resumeRoutes from './routes/resumeRoutes.js';
import pool from './db/index.js';
import fs from 'fs';
import path from 'path';


const app = express();


app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*'}));
app.use(express.json({ limit: '1mb' }));


// health
app.get('/api/health', (_req, res) => res.json({ ok: true }));


// init schema convenience route (optional for local dev)
app.get('/api/dev/init-db', async (_req, res) => {
try {
const schemaPath = path.join(process.cwd(), 'db', 'schema.sql');
const sql = fs.readFileSync(schemaPath, 'utf8');
await pool.query(sql);
res.json({ ok: true });
} catch (e) {
res.status(500).json({ error: e.message });
}
});


app.use('/api/resumes', resumeRoutes);


const port = Number(process.env.PORT || 5000);
app.listen(port, () => console.log(`Backend listening on :${port}`));
