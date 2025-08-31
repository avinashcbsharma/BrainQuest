import { QuestionTypeEnum } from "../../types/QuestionTypeEnum.js"
import { mcqAwardMarks } from "./questionTypes/mcqAwardMarks.js";

export const awardMarks = (question, response) => {
  let marksAwarded = 0;
  const undeterminedQuestions = [];

  switch (question.type) {
    case QuestionTypeEnum.MULTIPLE_CHOICE_QUESTION:
      const { marksAwarded: marks } = mcqAwardMarks(question, response);
      marksAwarded = marks;
      break;
    case QuestionTypeEnum.SHORT_ANSWER_QUESTION:
       undeterminedQuestions.push({
        response,
        question,
      });
      break;
    case QuestionTypeEnum.LONG_ANSWER_QUESTION:      
      break;
    default:
      break;
  }
  return { marksAwarded, undeterminedQuestions };
};