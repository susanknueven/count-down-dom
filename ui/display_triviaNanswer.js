function handleTriviaStateChange(triviaState) {
  switch (triviaState) {
    case SHOW_TRIVIA:
      loadTriviaAndDisplay();
      break;
    case SHOW_ANSWER:
      loadAnswerAndDisplay();
  }
}

function getTriviaByIndex(index) {
  return JSON.parse(localStorage.getItem(triviaKey))[index];
}

function showTrivia() {
  document.getElementById('category').style.display = '';
  document.getElementById('question').style.display = '';
}

function hideTrivia() {
  document.getElementById('category').style.display = 'none';
  document.getElementById('question').style.display = 'none';
}

function showAnswer() {
  document.getElementById('answer').style.display = '';
}

function hideAnswer() {
  document.getElementById('answer').style.display = 'none';
}

function getTriviaIndex() {
  return JSON.parse(localStorage.getItem(triviaIndexKey));
}

function loadTrivia() {
  const trivia = getTriviaByIndex(getTriviaIndex());
  document.getElementById('category').innerHTML = `${trivia.category}:`;
  document.getElementById('question').innerHTML = trivia.q;
  document.getElementById('answer').innerHTML = trivia.a;
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
