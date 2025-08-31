import { Router } from "express";
import { 
  getAllSubmissions, 
  getSubmissionById, 
  startAssessment,
  submitAssessment
} from "../controllers/index.js";

export const submissionRouter = Router();

submissionRouter.post('/', startAssessment);
submissionRouter.get('/', getAllSubmissions);

submissionRouter.post('/:id', submitAssessment);
submissionRouter.get('/:id', getSubmissionById)