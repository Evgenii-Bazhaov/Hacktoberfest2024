import { createSlice } from "@reduxjs/toolkit";
import { getQuestions } from "../Utils/getQuestions";
const initialState = {
  totalQuestions: 0,
  questionNumber: 1,
  questionList: [],
  rightAnswer: [],
  wrongAnswer: [],
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    resetQuestions: (state, actions) => {
      state.totalQuestions = actions.payload.totalQuestions;
      state.questionNumber = 1;
      state.questionList = getQuestions({
        questionBucket: actions.payload.totalQuestions,
      });
      state.rightAnswer = [];
      state.wrongAnswer = [];
    },

    submitAnswer: (state, actions) => {
      const { isRightAnswer, questionData, selectedAnswer } = actions.payload;
      isRightAnswer
        ? state.rightAnswer.push({ ...questionData, selectedAnswer })
        : state.wrongAnswer.push({ ...questionData, selectedAnswer });
      state.questionNumber = state.questionNumber + 1;
    },
  },
});

export const { resetQuestions, submitAnswer } = questionSlice.actions;

export default questionSlice.reducer;
