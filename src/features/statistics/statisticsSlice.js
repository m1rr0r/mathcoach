import { createSlice } from '@reduxjs/toolkit';

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState: {
    totalQuestions: 0,
    correctAnswers: 0,
    correctInARow: 0,
  },
  reducers: {
    recordAnswer: (state, action) => {
        state.totalQuestions += 1;
        console.log(action);
        if (action.payload) {
          state.correctAnswers += 1;
          state.correctInARow += 1;
        } else {
          state.correctInARow = 0;
        }
    },
  },
});

export const { recordAnswer } = statisticsSlice.actions;

export const selectTotalQuestions = state => state.statistics.totalQuestions;
export const selectCorrectAnswers = state => state.statistics.correctAnswers;
export const selectCorrectInARow = state => state.statistics.correctInARow;

export default statisticsSlice.reducer;
