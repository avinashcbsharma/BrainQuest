import { QuestionTypeEnum } from "../../types/QuestionTypeEnum.js";
import { QuestionDifficultyEnum } from "../../types/QuestionDifficultyEnum.js";
import { Type } from "@google/genai/node";
export const questionsListResponseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      type: {
        type: Type.STRING,
        enum: Object.values(QuestionTypeEnum),
      },
      question: {
        type: Type.STRING,
      },
      marks: {
        type: Type.INTEGER,
      },
      difficultyLevel: {
        type: Type.STRING,
        enum: Object.values(QuestionDifficultyEnum),
      },
      hints: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
      },
      explanation: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
      },
      negativeMarks: {
        type: Type.INTEGER,
      },
      options: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            // Use only allowed property names
            label: { type: Type.STRING },
            isCorrect: { type: Type.BOOLEAN },
          },
        },
      },
      sampleAnswer: {
        type: Type.STRING,
      },
    },
    required: ["type", "question", "marks", "difficultyLevel"],
  }
};