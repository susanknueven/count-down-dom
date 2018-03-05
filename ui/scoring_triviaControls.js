const triviaStateKey = 'triviaState';
const SHOW_TRIVIA = 'SHOW_TRIVIA';
const SHOW_ANSWER = 'SHOW_ANSWER';
const SHOW_RESULTS = 'SHOW_RESULTS';

function getTriviaState() {
  return JSON.parse(localStorage.getItem(triviaStateKey));
}

function setTriviaState(triviaState) {
  localStorage.setItem(triviaStateKey, JSON.stringify(triviaState));
}

function setTriviaIndex(index) {
  localStorage.setItem('triviaIndex', JSON.stringify(index));
}

function getTriviaIndex() {
  return parseInt(JSON.parse(localStorage.getItem('triviaIndex')));
}

function isValidTriviaIndex(index) {
  return index >=0 && index < getNumOfQsFromLS();
}

function returnNextTriviaIndex(currentTriviaIndex) {
  if (isNaN(currentTriviaIndex)) {
    return 0;
  } else {
    return currentTriviaIndex + 1;
  }
}

function showNextTriviaAndSetQuestionIndex() {
  const currentTriviaIndex = getTriviaIndex();
  const nextTriviaIndex = returnNextTriviaIndex(currentTriviaIndex);
  if (!isValidTriviaIndex(nextTriviaIndex)){
    console.log('out of questions');
    // TODO: setGameState(GAME_OVER); ???
    return;
  }
  resetCountDown();
  startCountDown();
  setTriviaIndex(nextTriviaIndex);
  setQuestionIndex(nextTriviaIndex);
  updateDropdownQuestionIndex(nextTriviaIndex);
  // manually update the score sheet
  generateScoringTable(nextTriviaIndex);
  showTrivia();
}

function showTrivia() {
  setTriviaState(SHOW_TRIVIA);
  disableTriviaButton();
  enableAnswerButton();
}

function showAnswer() {
  setTriviaState(SHOW_ANSWER);
  disableAnswerButton();
  if (!isLastQuestion()) {
    enableTriviaButton();
  } else {
    disableTriviaButton();
  }
}

function isLastQuestion() {
  return getTriviaIndex() + 1 === getNumOfQsFromLS();
}

const answerButton = document.getElementById('showTriviaAnswer');
const triviaButton = document.getElementById('showNextTrivia');

function disableAnswerButton() {
  answerButton.disabled = true;
}

function enableAnswerButton() {
  answerButton.disabled = false;
}

function disableTriviaButton() {
  triviaButton.disabled = true;
}

function enableTriviaButton() {
  triviaButton.disabled = false;
}