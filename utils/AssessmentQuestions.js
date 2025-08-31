import { application, json } from 'express';
import { Template } from '../models/index.js'
import { GoogleGenAI, Type } from '@google/genai';
import { questionsListResponseSchema } from '../ai/helpers/questionsListResponseSchema.js'
import { getQuestionListGenerationPrompt } from '../ai/prompts/getQuestionListGenerationPrompt.js';
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_KEY });

export const AssessmentQuestions = async (assessment) => {
  const { template: templateObjectId } = assessment;
  const templateId = templateObjectId.toString();
  if (!templateId) return;

  const template = await Template.findById(templateId);
  if (!Template) return;

  const prompt = getQuestionListGenerationPrompt(assessment, template);
  
  try{
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: questionsListResponseSchema,
    },
  });
  const questions = JSON.parse(response.text);
  return questions;
  }
  catch (er) {
    return new Error("Failed to create questions from AI",{
      cause: error,
    });
  }  
}
