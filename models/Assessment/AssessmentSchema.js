import { model, Schema } from "mongoose";
import { AssessmentStatusEnum, QuestionTypeEnum } from "../../types/index.js";
import { BaseQuestionSchema } from "./BaseQuestionSchema.js";
import { OptionSchema } from "./OptionSchema.js";

const AssessmentSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    template: {
        type: Schema.Types.ObjectId,
        ref: "Template",
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(AssessmentStatusEnum),
        default: AssessmentStatusEnum.PENDING,
        required: true,
    },
    publishedAt: {
        type: Date,
    },
    totalMarks: {
        type: Number,
    },
    questions: {
        type: [BaseQuestionSchema],
        required: true,
    },
},
    {
        timestamps: true,
    },
);
//Discriminators - 
AssessmentSchema.path("questions").discriminator(
    QuestionTypeEnum.MULTIPLE_CHOICE_QUESTION,
    new Schema({
        options: {
            type: [OptionSchema],
            validate: e => e.length === 4,
        },
    }),
);

AssessmentSchema.path("questions").discriminator(
    QuestionTypeEnum.SHORT_ANSWER_QUESTION,
    new Schema({
        sampleAnswer: {
            type: String,
        },
    }),
);

AssessmentSchema.path("questions").discriminator(
    QuestionTypeEnum.LONG_ANSWER_QUESTION,
    new Schema({
        sampleAnswer: {
            type: String,
        },
    }),
);
export const Assessment = model("Assessment", AssessmentSchema); 