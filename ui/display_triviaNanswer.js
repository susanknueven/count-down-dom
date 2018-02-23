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
  document.getElementById('trivia').style.display = '';
}

function hideTrivia() {
  document.getElementById('trivia').style.display = 'none';
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

function loadTriviaAndDisplay() {
  const trivia = getTriviaByIndex(getTriviaIndex());
  document.getElementById('trivia').innerHTML = trivia.q;
  hideAnswer();
  showTrivia();
}

function loadAnswerAndDisplay() {
  const trivia = getTriviaByIndex(getTriviaIndex());
  document.getElementById('answer').innerHTML = trivia.a;
  document.getElementById('trivia').innerHTML = trivia.q;
  showTrivia();
  showAnswer();
}
