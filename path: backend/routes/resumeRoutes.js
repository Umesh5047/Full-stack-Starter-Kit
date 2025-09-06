import { Router } from 'express';
import multer from 'multer';
import { uploadResume, getAllResumes, getResumeById } from '../controllers/resumeController.js';


const router = Router();
const upload = multer({ storage: multer.memoryStorage() });


router.post('/upload', upload.single('resume'), uploadResume);
router.get('/', getAllResumes);
router.get('/:id', getResumeById);


export default router;
