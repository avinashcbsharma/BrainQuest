import { application, json } from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import { getUndeterminedQuestionsCheckingPrompt } from '../ai/prompts/index.js';
import { questionCheckResponseSchema } from '../ai/helpers/index.js';
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_KEY });

export const checkSubmissionQuestion = async (questions) => {
  const prompt = getUndeterminedQuestionsCheckingPrompt(questions);
  console.log("checkSubmissionQuestion- PROMPTs: ", prompt);
  
  try{
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: questionCheckResponseSchema
    },
  });
  
  const answers = JSON.parse(response.text);
  
  return answers;
  }
  catch (er) {
    return new Error("checking questions AI-process failed ",{
      cause: er,
    });
  }  
}
