import { model, Schema } from "mongoose";
import { QuestionDifficultyEnum } from "../../types/QuestionDifficultyEnum.js";
import { QuestionTypeEnum } from '../../types/QuestionTypeEnum.js'

export const BaseQuestionSchema = new Schema({
  type: {
    type: String,
    enum: Object.values(QuestionTypeEnum),
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  difficultyLevel: {
    type: String,
    enum: Object.values(QuestionDifficultyEnum),
    required: true,
  },
  hints: {
    type: [String],
  },
  explanation: {
    type: [String],
  },
  negativeMarks: {
    type: Number,
    default: 0,
  },
 },
  {
    discriminatorKey: "type",
  },
);