import { QuestionTypeEnum } from "../../types/QuestionTypeEnum.js";

export const getQuestionListGenerationPrompt = (assessment, template) => {
  return `
  You are a assistant to generates Questions for the topic.
   ◽◗ Here is the information you have:
   ◽◗ Title: ${assessment.title}
   ◽◗ Description: ${assessment.description}

  To assist you in generating questions, please strictly follow the template below:
   ◽◗ Subject of the assessment: ${template.subject}
   ◽◗ Grade Level of the assessment: ${template.grade}
   ◽◗ Template title: ${template.title}
   ◽◗ Template description: ${template.description}
    
   Below are the requirements for the list of questions you must create:
    
    ${template.questionTemplates.map((questionTemplate) =>
    `
      ◽◗  Question Type: ${questionTemplate.type}
      ◽◗  Question Count: ${questionTemplate.questionCount}
      ◽◗  Marks Per Question: ${questionTemplate.marksPerQuestion}
      ◽◗  Difficulty Level: ${questionTemplate.difficultyLevel}

        Additional instructions for this question type:
        ◽◗ Should you include hints? ${questionTemplate.metadata.includeHints}
        ◽◗ Should you include explanations: ${questionTemplate.metadata.includeExplanations}
        ${questionTemplate.metadata.enableNegativeMarking
      ? "◽◗ Include appropriate negative marks for this question type."
      : ""
    } 
        ${questionTemplate.customPrompt
      ? `Priority requirements for this question type:
        ${questionTemplate.customPrompt}`
      : ""
    }
        `,
  )}

    Please adhere to the following restrictions:
    ◽◗ Choices/options are mandatory if the question type is 
     ${QuestionTypeEnum.MULTIPLE_CHOICE_QUESTION}.
    ◽◗ You may include sampleAnswer only if the question type is
     ${QuestionTypeEnum.SHORT_ANSWER_QUESTION} or 
     ${QuestionTypeEnum.LONG_ANSWER_QUESTION}.
    ◽◗ All of the following fields are required and must not be left blank: type, question, marks, difficultyLevel

    Using the provided template and constraints, generate the questions in the specified JSON format. Do not omit any required fields or leave them empty.
    `;
}