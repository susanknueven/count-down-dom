import {
  QUESTION_LOADED,
  SHOW_CATEGORY,
  SHOW_ANSWER,
  SHOW_QUESTION
} from '../utils/stateConstants.js';

const getDisabledButtons = gameState => {
  const disabled = 'disabled';
  let isDisabled = {
    nextQuestion: disabled,
    showCategory: disabled,
    showQuestion: disabled,
    showAnswer: disabled
  };

  switch (gameState.gameOperatorView) {
    case QUESTION_LOADED:
      isDisabled.showCategory = '';
      break;
    case SHOW_CATEGORY:
      isDisabled.showQuestion = '';
      break;
    case SHOW_QUESTION:
      isDisabled.showAnswer = '';
      break;
    case SHOW_ANSWER:
      isDisabled.nextQuestion = '';
    default:
  }

  return isDisabled;
};

export const triviaControlButtons = gameState => {
  const isDisabled = getDisabledButtons(gameState);
  return `<div id="triviaControlButtons">
    <button id="nextQuestionButton" ${
      isDisabled.nextQuestion
    }>Next Question</button>
    <button id="showCategory" ${isDisabled.showCategory}>Show Category</button>
    <button id="showQuestion" ${isDisabled.showQuestion}>Show Question</button>
    <button id="showAnswer" ${isDisabled.showAnswer}>Show Answer</button>
   </div>`;
};

const getDisplayClass = gameState => {
  const display = 'display';
  const displayClass = {
    triviaCategory: '',
    triviaQuestion: '',
    triviaAnswer: ''
  };

  switch (gameState.gameOperatorView) {
    case SHOW_ANSWER:
      displayClass.triviaAnswer = display;
    case SHOW_QUESTION:
      displayClass.triviaQuestion = display;
    case SHOW_CATEGORY:
      displayClass.triviaCategory = display;
  }

  return displayClass;
};

export const triviaPreviewText = gameState => {
  const displayClass = getDisplayClass(gameState);
  return `
    <div id="questionPreviewText">
      <div id="questionPreviewLabel">Question Loaded:</div>
      <div id="triviaCategory" class=${displayClass.triviaCategory}>Category: ${
    gameState.triviaCategory
  }</div>
      <div id="triviaQuestion" class=${displayClass.triviaQuestion}>Question: ${
    gameState.triviaQuestion
  }</div>
      <div id="triviaAnswer" class=${displayClass.triviaAnswer}>Answer: ${
    gameState.triviaAnswer
  }</div>
    </div>
  `;
};
