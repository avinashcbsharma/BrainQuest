import mongoose from 'mongoose';
import { SubmissionStatusEnum } from "../../types/index.js";
import { SubmissionAnswerSchema } from './SubmissionAnswerSchema.js';
import { Assessment } from '../Assessment/AssessmentSchema.js';

const { Schema, model } = mongoose;
const SubmissionSchema = new Schema(
  {
    assessmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assessment",
      required: true,
    },
    startedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    submittedAt: {
      type: Date,
      // required: true,
    },
    totalMarks: {
      type: Number,
      default: 0,
    },
    maxMarks:{
      type: Number,
    },
    status: {
      type: String,
      enum: Object.values(SubmissionStatusEnum),
      default: SubmissionStatusEnum.IN_PROGRESS,
      required: true,
    },
    answers: {
      type: [SubmissionAnswerSchema],
    },
  },
  {
    timestamps: true,
  }
);

SubmissionSchema.pre("save", async function (next) {
  const assessment = await Assessment.findById(this.assessmentId);
  const maxMarks = (assessment.questions ?? [] )?.reduce(
    (totalMarks, question) => totalMarks + question.marks, 0,
  );
  console.log("maxMarks", maxMarks, assessment.questions?.length);
  
  this.maxMarks = maxMarks;
  next();
})
export const Submission = model("Submission", SubmissionSchema);