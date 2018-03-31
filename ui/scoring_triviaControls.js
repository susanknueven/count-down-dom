const triviaStateKey = 'triviaState';
const SHOW_CATEGORY = 'SHOW_CATEGORY';
const SHOW_TRIVIA = 'SHOW_TRIVIA';
const SHOW_ANSWER = 'SHOW_ANSWER';
const CLEAR_DISPLAY = 'CLEAR_DISPLAY';

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

function showNextTriviaAndSetTriviaIndex() {
  const currentTriviaIndex = getTriviaIndex();
  const nextTriviaIndex = returnNextTriviaIndex(currentTriviaIndex);
  if (!isValidTriviaIndex(nextTriviaIndex)){
    console.log('out of questions');
    // TODO: setGameState(GAME_OVER); ???
    return;
  }
  resetCountDown();
  setTriviaIndex(nextTriviaIndex);
  highlightQuestionInScoringTable(nextTriviaIndex);
  showCategory();
}

function showCategory() {
  setTriviaState(SHOW_CATEGORY);
  disableCategoryButton();
  enableTriviaButton();
}

function showTriviaAndStartCount() {
  setTriviaState(SHOW_TRIVIA);
  startCountDown();
  disableTriviaButton();
  enableAnswerButton();
}

function showAnswer() {
  setTriviaState(SHOW_ANSWER);
  disableAnswerButton();
  resetCountDown();
  if (!isLastQuestion()) {
    enableCategoryButton();
  } else {
    disableCategoryButton();
    disableTriviaButton();
  }
}

function isLastQuestion() {
  return getQuestionNumberFromQuestionIndex(getTriviaIndex()) === getNumOfQsFromLS();
}

const answerButton = getById('showTriviaAnswer');
const triviaButton = getById('showTriviaQuestion');
const categoryButton = getById('showNextTriviaCategory');

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

function disableCategoryButton() {
  categoryButton.disabled = true;
}

function enableCategoryButton() {
  categoryButton.disabled = false;
}

function clearTriviaDisplay() {
  setTriviaState(CLEAR_DISPLAY);
  enableCategoryButton();
  enableTriviaButton();
  enableAnswerButton();
}