import {model, Schema} from 'mongoose';
import { QuestionTemplateMetadataSchema } from './index.js';
import { QuestionDifficultyEnum, QuestionTypeEnum } from '../types/index.js';

export const QuestionTemplateSchema = new Schema({

    type: {
        type: String,
        enum: Object.values(QuestionTypeEnum),
        required: true,
    },
    questionCount: {
        type: Number,
        min: 1,
        required: true,
    },
    marksPerQuestion: {
        type: Number,
        required: true,
        mon: 0,
    },
    difficultyLevel: {
        type: String,
        enum: Object.values(QuestionDifficultyEnum),
        required: true,
    },
    customPrompt: {
        type: String,
    },
    metadata: {      
        type: QuestionTemplateMetadataSchema,
        required: true,
    },

});

export const QuestionTemplate = model('QuestionTemplate',
    QuestionTemplateSchema,);