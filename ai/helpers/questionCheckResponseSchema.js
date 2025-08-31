import { Type } from "@google/genai";
const answers = [{
  questionId: "", 
  marksAwarded: 0,
  feedback: "",
  },
];

export const questionCheckResponseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      questionId: {
        type: Type.STRING,
      },
      marksAwarded: {
        type: Type.INTEGER,
      },
      feedback: {
        type: Type.STRING,
      },
    },
    required: ["questionId", "marksAwarded", "feedback"],
  },
};