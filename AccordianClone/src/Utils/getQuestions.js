import { questionsData } from "./questions";

export const getQuestions = ({ questionBucket }) => {
  const shuffledArray = questionsData.slice();

  // Shuffle the array using Fisher-Yates algorithm
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  const result = [];
  for (let i = 0; i < questionBucket; i++) {
    result.push({ id: i + 1, ...shuffledArray[i] });
  }

  return result;
};
