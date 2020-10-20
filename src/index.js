import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';

import { askMulDivQuestion } from './lib/math';
import { askQuestion } from './features/question/questionSlice';

const nextQuestion = askMulDivQuestion();
store.dispatch(askQuestion(nextQuestion));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);