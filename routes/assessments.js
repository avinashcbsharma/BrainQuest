import { Router } from "express";
import {
  createAssessment,
  createAssessmentfromAI,
  getAllAssessments,
  getAssessmentById,
  deleteAssessmentById
}
  from "../controllers/index.js";

export const assessmentRouter = Router();

assessmentRouter.post("/create", createAssessment);
assessmentRouter.post("/ai", createAssessmentfromAI);
assessmentRouter.get("/", getAllAssessments);
assessmentRouter.get("/:id", getAssessmentById);
assessmentRouter.delete("/:id", deleteAssessmentById);