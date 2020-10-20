import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    askQuestion,
    submitAnswer,
    selectQuestionText,
    selectCorrectAnswer,
    selectUserAnswer,
    selectShowAnswer,
} from './questionSlice';

import {
    recordAnswer
} from '../statistics/statisticsSlice';

import {
    askMulDivQuestion
} from '../../lib/math';

import styles from './Question.module.css';

export function Question() {
  const questionText = useSelector(selectQuestionText);
  const correctAnswer = useSelector(selectCorrectAnswer);
  const showAnswer = useSelector(selectShowAnswer);
  const userAnswer = useSelector(selectUserAnswer);

  const userAnswerIsTheCorrectAnswer = `${correctAnswer}` === `${userAnswer}`;

  const dispatch = useDispatch();
  const [answer, setAnswer] = useState('');

  return (
    <div className={styles.value}>
        <div>
            <p>{questionText}</p>
        </div>
        <div>
            {(!showAnswer) && <p className={styles.valuecorrect}>&nbsp;</p>}

            {(showAnswer && userAnswerIsTheCorrectAnswer) && (
                <p className={styles.valuecorrect}>{userAnswer} is correct!</p>
            )}

            {(showAnswer && !userAnswerIsTheCorrectAnswer) && (
                <p className={styles.valuewrong}>Answer: {correctAnswer}</p>
            )}

        </div>
        <form onSubmit={(e) => {
                e.preventDefault();
                if (showAnswer) {
                    const nextQuestion = askMulDivQuestion();
                    dispatch(askQuestion(nextQuestion));
                    setAnswer('');
                } else {
                    const userAnswer = answer;
                    dispatch(recordAnswer(`${correctAnswer}` === `${userAnswer}`));
                    dispatch(submitAnswer({userAnswer}));
                }
            }} 
        >
        <input 
            className={styles.textbox}
            value={answer} 
            onChange={e => setAnswer(e.target.value)}
        />
        {(!showAnswer && <div><button
            type="submit"
            className={styles.button}
        >
          Submit answer
        </button></div>)}
        {(showAnswer && <div>
            <button
                type="submit"
                className={styles.button}
            >
            Next question
            </button>
        </div>)}
        </form>

    </div>
  );
}
