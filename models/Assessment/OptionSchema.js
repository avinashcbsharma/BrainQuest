import { Schema } from "mongoose";
import { QuestionTypeEnum } from '../../types/QuestionTypeEnum.js'

export const OptionSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
},
  {
    _id:false,
  },
); 