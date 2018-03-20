function handleTriviaStateChange(triviaState) {
  switch (triviaState) {
    case SHOW_TRIVIA:
      loadTriviaAndDisplay();
      blurTriviaWrapperImage();
      break;
    case SHOW_ANSWER:
      loadAnswerAndDisplay();
      break;
    case CLEAR_DISPLAY:
      hideTrivia();
      hideAnswer();
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

function showTrivia() {
  getById('category').style.display = '';
  getById('question').style.display = '';
}

function hideTrivia() {
  getById('category').style.display = 'none';
  getById('question').style.display = 'none';
}

function showAnswer() {
  getById('answer').style.display = '';
}

function hideAnswer() {
  getById('answer').style.display = 'none';
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

function displayTriviaQuestion() {
  hideAnswer();
  showTrivia();
}
function loadTriviaAndDisplay() {
  loadTrivia();
  displayTriviaQuestion();
}

function loadAnswerAndDisplay() {
  loadTrivia();
  showTrivia();
  showAnswer();
}