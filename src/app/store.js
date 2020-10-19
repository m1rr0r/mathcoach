import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import statisticsReducer from '../features/statistics/statisticsSlice';
import questionReducer from '../features/question/questionSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    statistics: statisticsReducer,
    question: questionReducer,
  },
});
