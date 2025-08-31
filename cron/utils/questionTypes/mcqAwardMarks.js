export const mcqAwardMarks = (question, response) => {
  let marksAwarded = 0;

  const correctAnswer = (question.options ?? [])?.find(
    (opt) => opt.isCorrect );

  if (correctAnswer?.label === response) {
    marksAwarded = question.marks;
  } else { marksAwarded = question.negativeMarks;  }

  return { marksAwarded };
};