import mongoose, { Schema, model } from 'mongoose';

export const QuestionTemplateMetadataSchema = new Schema({
    
    includeHints: {
        type: Boolean,
        default: false,
    },
    includeExplanations: {
        type: Boolean,
        default: false,
    },
    enableNegativeMarking: {
        type: Boolean,
        default: false,
    },
    shuffleOptions: {
        type: Boolean,
        default: false,
    },
},
    {
        _id: false,
    },
);

export const QuestionTemplateMetadata = model('QuestionTemplateMetadata',
    QuestionTemplateMetadataSchema,);