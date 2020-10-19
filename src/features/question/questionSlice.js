import { createSlice } from '@reduxjs/toolkit';

export const questionSlice = createSlice({
  name: 'question',
  initialState: {
    showAnswer: false,
    question: '2 x 2 = ?',
    correctAnswer: 4,
    userAnswer: 0,
  },
  reducers: {
    askQuestion: (state, action) => {
      const { question, correctAnswer } = action.payload;
      state.question = question;
      state.correctAnswer = correctAnswer;
      state.showAnswer = false;
      state.userAnswer = false;
    },
    submitAnswer: (state, action) => {
      const { userAnswer } = action.payload;
      state.showAnswer = true;
      state.userAnswer = userAnswer;
    }
  },
});

export const { askQuestion, submitAnswer } = questionSlice.actions;

export const selectQuestionText = state => state.question.question;
export const selectCorrectAnswer = state => state.question.correctAnswer;
export const selectShowAnswer = state => state.question.showAnswer;
export const selectUserAnswer = state => state.question.userAnswer;

export default questionSlice.reducer;
