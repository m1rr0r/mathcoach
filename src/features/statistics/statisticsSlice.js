import { createSlice } from '@reduxjs/toolkit';

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState: {
    totalQuestions: 0,
    correctAnswers: 0
  },
  reducers: {
    recordAnswer: (state, action) => {
        state.totalQuestions += 1;
        state.correctAnswers += (action.payload) ? 1 : 0;
    },
  },
});

export const { recordAnswer } = statisticsSlice.actions;

export const selectTotalQuestions = state => state.statistics.totalQuestions;
export const selectCorrectAnswers = state => state.statistics.correctAnswers;

export default statisticsSlice.reducer;
