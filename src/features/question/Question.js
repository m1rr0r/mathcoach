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
    <div  className={styles.value}>
        <div>
            <p>{questionText}</p>
        </div>
        <div>
            {(!showAnswer) && <p>&nbsp;</p>}

            {(showAnswer && userAnswerIsTheCorrectAnswer) && (
                <p>{userAnswer} is correct!</p>
            )}

            {(showAnswer && !userAnswerIsTheCorrectAnswer) && (
                <p>Answer: {correctAnswer}</p>
            )}
        </div>

        <input 
            className={styles.textbox}
            value={answer} 
            onChange={e => setAnswer(e.target.value)}
        />
        {(!showAnswer && <div><button
            className={styles.button}
            onClick={() => {
                const userAnswer = answer;
                dispatch(recordAnswer(userAnswer === correctAnswer));
                dispatch(submitAnswer({userAnswer}));
            }}
        >
          Submit answer
        </button></div>)}
        
        {(showAnswer && <div>
            <button
                className={styles.button}
                onClick={() => {
                    const nextQuestion = askMulDivQuestion();
                    dispatch(askQuestion(nextQuestion));
                    setAnswer('');
                }}
            >
            Next question
            </button>
        </div>)}

    </div>
  );
}
