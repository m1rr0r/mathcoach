import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectTotalQuestions,
  selectCorrectAnswers,
  selectCorrectInARow
} from './statisticsSlice';

export function Statistics() {
  const totalQuestions = useSelector(selectTotalQuestions);
  const correctAnswers = useSelector(selectCorrectAnswers);
  const correctInARow = useSelector(selectCorrectInARow);

  return (
    <div>
        <p>Questions: {totalQuestions}; Correct: {correctAnswers}</p>
        {(correctInARow > 0) && 
          <p>Correct in a row: {correctInARow}</p>
        }

        {(correctInARow === 0) && 
          <p>&nbsp;</p>
        }

    </div>
  );
}
