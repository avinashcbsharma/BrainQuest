import mongoose from 'mongoose';
import { Submission } from '../models/index.js';
import { CalculateTotalMarks } from '../utils/index.js';
import { response } from "express";
import { SubmissionStatusEnum } from "../types/SubmissionStatusEnum.js";


export const submitAssessment = async (req, res, next) => {
  try {
    let {id} = req.params;
    const { responses } = req.body;

    if (!id) {
      const error = new Error("Submission ID is required", {
        cause: new Error("Submission ID is required"),
      });
      return next(error);
    }

    const submission = await Submission.findById(id);
    if (!submission) {
      const error = new Error("Submission not found");
      return next(error);
    }

    if (submission.status !== SubmissionStatusEnum.IN_PROGRESS) {
      const error = new Error("You have already submitted the assessment", {
        cause: new Error("You have already submitted the assessment"),
      });
      return next(error);
    }
    submission.answers = responses?.map((resp) => ({
      questionId: resp.questionId,
      response: resp.response,
    }))

    submission.submittedAt = new Date();
    submission.status = SubmissionStatusEnum.SUBMITTED;

    await submission.save();

    return res.status(201).json({
      success: true,
      message: "Submission of Assessment is success.",
      submission,
    });
  } catch (er) {
    const error = new Error("Failed to submit Assessment");
    error.cause = er
    return next(error);
  }
};

export const startAssessment = async (req, res, next) => {
  try {
    const { assessmentId } = req.body;

    const submission = new Submission({
      assessmentId: assessmentId,
    });
    await submission.save();

    return res.status(201).json({
      success: true,
      message: "Start Assessment.",
      submission,
    })
  } catch (er) {
    const error = new Error("Failed to start assessment")
    error.cause = er
    return next(error);
  }
};

export const getAllSubmissions = async (req, res, next) => {

  try {
    const submissions = await Submission.find({}).populate("assessmentId");

    return res.status(200).json({
      success: true,
      data: submissions,
      message: "getAllSubmissions",
    });
  } catch (er) {
    const error = new Error("Fail to fetch Submissions",
      { cause: er }
    );
    return next(error);
  }
};

export const getSubmissionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error("Submission-ID required");
      return next(error);
    }

    const submission = await Submission.findById(id).populate("assessmentId");

    if (!submission) {
      const error = new Error(`No Submission found with id: ${id}`);
      return next(error);
    }

    return res.status(200).json({
      success: true,
      data: submission,
      message: "getSubmissionById",
    });
  } catch (er) {
    const error = new Error("Failed to fetch the Submission by ID", { cause: er });
    return next(error);
  }
};

