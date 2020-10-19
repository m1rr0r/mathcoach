import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectTotalQuestions,
  selectCorrectAnswers
} from './statisticsSlice';

export function Statistics() {
  const totalQuestions = useSelector(selectTotalQuestions);
  const correctAnswers = useSelector(selectCorrectAnswers);

  return (
    <div>
        <p>Total questions: {totalQuestions}</p>
        <p>Correct answers: {correctAnswers}</p>
    </div>
  );
}
