import { getQuestionCheckingPrompt } from "./getQuestionCheckingPrompt.js";

export const getUndeterminedQuestionsCheckingPrompt = (
  undeterminedQuestions,
) => {
  return `
    You are an assistant that evaluates answers, correcting them or giving feedback if they are wrong.
    
    ${undeterminedQuestions.map((uq) =>
      getQuestionCheckingPrompt(uq.question, uq.response),
    )}
    
   Your task:
   - Provide constructive feedback to guide the student’s improvement in the feedback field.
   - Assign marks in the marksAwarded field based on the accuracy of the response.
   - If the question carries negative marking, award negative marks for incorrect responses.
  `;
};