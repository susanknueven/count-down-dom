function handleTriviaStateChange(triviaState) {
  switch (triviaState) {
    case SHOW_CATEGORY:
      loadTriviaAndDisplayCategory();
      blurTriviaWrapperImage();
      break;
    case SHOW_TRIVIA:
      loadQuestionAndDisplay();
      break;
    case SHOW_ANSWER:
      loadAnswerAndDisplay();
      break;
    case CLEAR_DISPLAY:
      hideAllTrivia();
      unBlurTriviaWrapperImage();
  }
}

function blurTriviaWrapperImage() {
  const triviaWrapper = getById('triviaWrapper');
  triviaWrapper.className = "triviaWrapper blur";
}

function unBlurTriviaWrapperImage() {
  const triviaWrapper = getById('triviaWrapper');
  triviaWrapper.className = "triviaWrapper";
}
function getTriviaByIndex(index) {
  return JSON.parse(localStorage.getItem(triviaKey))[index];
}

function showCategory() {
  getById('category').style.visibility = 'visible';
}

function showTrivia() {
  getById('question').style.visibility = 'visible';
}

function showAnswer() {
  getById('answer').style.visibility = 'visible';
}

function hideAnswer() {
  getById('answer').style.visibility = 'hidden';
}

function hideAllTrivia() {
  getById('category').style.visibility = 'hidden';
  getById('question').style.visibility = 'hidden';
  getById('answer').style.visibility = 'hidden';
}

function getTriviaIndex() {
  return JSON.parse(localStorage.getItem(triviaIndexKey));
}

function getQuestionNumberFromQuestionIndex(index) {
  return index + 1;
}

function loadTrivia() {
  const triviaIndex = parseInt(getTriviaIndex());
  const trivia = getTriviaByIndex(triviaIndex);
  const questionNumber = getQuestionNumberFromQuestionIndex(triviaIndex);
  getById('category').innerHTML = `${trivia.category}:`;
  getById('question').innerHTML = trivia.q;
  getById('answer').innerHTML = trivia.a;
}

function displayTriviaCategory() {
  hideAllTrivia();
  showCategory();
}

function loadQuestionAndDisplay() {
  loadTrivia();
  showCategory();
  showTrivia();
}

function loadTriviaAndDisplayCategory() {
  loadTrivia();
  displayTriviaCategory();
}

function loadAnswerAndDisplay() {
  loadTrivia();
  showCategory();
  showTrivia();
  showAnswer();
}