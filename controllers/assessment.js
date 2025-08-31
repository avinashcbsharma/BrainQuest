import mongoose from "mongoose";
import { Assessment } from '../models/index.js';
import { CalculateTotalMarks } from '../utils/index.js';
import { AssessmentQuestions } from "../utils/AssessmentQuestions.js";

export const createAssessmentfromAI = async (req, res, next) => {  
  try {
    const questions = await AssessmentQuestions(req.body);
    const totalMarks = CalculateTotalMarks(questions ?? []);

    const assessmentData = {
      ...req.body,
      totalMarks: totalMarks,
      questions: questions,
    }
    
    const assessment = new Assessment(assessmentData);    
    const AssessmentSaved = await assessment.save();

    return res.status(201).json({
      success: true,
      message: "AssessmentByAI creation is successfull.",
      AssessmentSaved,
    });
  }
  catch (er) {
    const error = new Error("Failed to create questions from UI", {
      cause: er,
    });
    return next(error);
  }
}

export const createAssessment = async (req, res, next) => {
  try {
    const questions = req.body.questions || [];
    const totalMarks = CalculateTotalMarks(questions);

    const assessmentData = {
      ...req.body,
      totalMarks: totalMarks,
    };
    const assessment = new Assessment(assessmentData);
    const AssessmentSaved = await assessment.save();

    return res.status(201).json({
      success: true,
      message: "Assessment created successfully.",
      // data: AssessmentSaved,
    })

  } catch (er) {
    throw error = new Error("Failed to create assessment", {
      cause: er,
    });
  }
};

export const getAllAssessments = async (req, res, next) => {
    
  try {
    const assessments = await Assessment.find({}).populate("template");
    return res.status(200).json({
      success: true,
      data: assessments,
      message: "getAllAssessments",
    });
  } catch (er) {
    const error = new Error("Fail to fetch Assessments",
      { cause: er }
    );
    return next(error);
  }
};

export const getAssessmentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error("Assessment-ID required");
      return next(error);
    }

    const assessment = await Assessment.findById(id);

    if (!assessment) {
      const error = new Error(`No Assessment found with id: ${id}`);
      return next(error);
    }

    return res.status(200).json({
      success: true,
      data: assessment,
      message: "getAssessmentById",
    });
  } catch (er) {
    const error = new Error("Failed to fetch the Assessment by ID", { cause: er });
    return next(error);
  }
};


export const deleteAssessmentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) {
      error.status = 400;
      return next(error);
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid Assessment-ID format");
      error.status = 400;
      return next(error);
    }
    const assessment = await Assessment.findByIdAndDelete(id);
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found"
      });
    }
    return res.status(200).json({
      Success: true,
      AssessmentID: id,
      message: "Assessment deleted successfully"
    });

  } catch (er) {
    const error = new Error("Failed to delete Assessment By Id",
      { cause: er }
    );
    next(error);
  }

};