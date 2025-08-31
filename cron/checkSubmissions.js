import { Submission } from "../models/index.js";
import { SubmissionStatusEnum } from "../types/SubmissionStatusEnum.js";
import { checkSubmissionQuestion } from "../utils/index.js";
import { awardMarks } from "./utils/awardMarks.js";

export const checkSubmissions = async () => {
  console.log("checkSubmissions:-⫸  CRON Job Started➤");

  try {
    const submissions = await Submission.find({
      status: SubmissionStatusEnum.SUBMITTED
    }).populate("assessmentId");

    console.log("checkSubmissions- submission to check:-⫸ ", submissions.length);

    for (const submission of submissions) {
      console.log("checkSubmissions- ⌚Checking:-⫸", submission._id);

      const { questions } = submission.assessmentId;
      const { answers } = submission;
      const undeterminedQuestions = [];

      for (const answer of answers) {
        const { questionId, response } = answer;
        const question = questions.find((quest) =>
          quest._id.toString() === questionId.toString()
        );

        if (!question) continue;

        const { marksAwarded, undeterminedQuestions: questionsToBeCheckedByAI } =
          awardMarks(question, response);
        answer.marksAwarded = marksAwarded;
        undeterminedQuestions.push(...questionsToBeCheckedByAI);

        if (undeterminedQuestions.length > 0) {
          const submissionFeedbacks = await checkSubmissionQuestion(
            undeterminedQuestions
          );

          for (const feedback of submissionFeedbacks) {
            const { questionId, marksAwarded, feedback: submissionFeedbacks,
            } = feedback;
            const answer = answers.find(
              (a) => a.questionId.toString() == questionId.toString(),
            );

            if (!answer) continue;
            answer.marksAwarded = marksAwarded;
            answer.feedback = submissionFeedbacks;
          }
        }

        submission.status = SubmissionStatusEnum.COMPLETED;
        submission.totalMarks = answers.reduce((total, answer) => total + answer.marksAwarded, 0)
        await submission.save();
        console.log("checkSubmissions- ✔Completed:-⫸", submission._id);
        console.log("checkSubmissions- Total Marks:-⫸", submission.totalMarks);

      }
    }

  } catch (err) {
    console.log("checkSubmissions- ⊗ Failed:-⫸", err);
  } finally {
    console.log("checkSubmissions- ✔ CRON-job Completed");
  }

};